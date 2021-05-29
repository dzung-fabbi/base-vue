<template>
  <div class="user-list">
    <div class="heading text-start">
      <h2>ユーザー一覧</h2>
    </div>
    <div class="content-info-group">
      <div class="content content-info">
        <div class="top-info">
          <h3>配信者数</h3>
        </div>
        <div class="bottom-info">
          <span>{{ statistical.count_distributor }}</span>
        </div>
      </div>
      <div class="content content-info">
        <div class="top-info">
          <h3>視聴者数</h3>
        </div>
        <div class="bottom-info">
          <span>{{ statistical.count_viewer }}</span>
        </div>
      </div>
      <div class="content content-info">
        <div class="top-info">
          <h3>総ユーザー数</h3>
        </div>
        <div class="bottom-info">
          <span>{{ statistical.count_user }}</span>
        </div>
      </div>
    </div>
    <div class="content">
      <ValidationObserver v-slot="{ handleSubmit }">
        <div class="table-header row">
          <ValidationProvider
              name="ID"
              rules="numeric"
              v-slot="{ errors }"
              class="input-group search"
          >
              <span class="input-group-text mb-2">
                  <SearchIcon/>
              </span>
              <input
                  type="text"
                  class="form-control mb-2"
                  placeholder="名前・ワンコインID検索"
                  v-model="filter.id"
                  @blur="handleBlur()"
              >
              <span class="error text-left f-w3">{{ errors[0] }}</span>
          </ValidationProvider>
          <div class="input-group date" id="datepicker">
            <b-form-datepicker
                id="filter-user-date-picker"
                v-model="filter.date"
                class="mb-2 filter-user-date-picker"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                placeholder="YYYY-MM-DD"
                locale="ja"
                :hide-header="true"
            >
              <span slot="button-content">
                <CalenderIcon />
              </span>
            </b-form-datepicker>
          </div>
          <div class="input-group filter">
            <b-form-select
                class="type form-select"
                v-model="filter.user_type"
                :options="userType"
            />
          </div>
          <div class="input-group filter ps-0">
            <b-form-select
                class="type form-select"
                v-model="filter.status"
                :options="status"
            />
          </div>
          <div class="input-group ps-0">
            <button class="btn btn-filter" @click="handleSubmit(getUserList)">
              検索
            </button>
          </div>
        </div>
      </ValidationObserver>
      <div class="table-content">
        <table class="table color-8B9DA5">
          <thead>
          <tr>
            <th scope="col">ワンコインID</th>
            <th scope="col">名前</th>
            <th scope="col">生年月日</th>
            <th scope="col">性別</th>
            <th scope="col">ログイン方法</th>
            <th scope="col">電話番号</th>
            <th scope="col">ユーザータイプ</th>
            <th scope="col">ステータス</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(user, index) in listUsers" :key="index">
            <td class="pt-3">{{ user.id }}</td>
            <td class="pt-3">{{ user.name }}</td>
            <td class="pt-3">{{ user.date_of_birth }}</td>
            <td class="pt-3">{{ user.gender }}</td>
            <td class="pt-3">{{ user.login_info }}</td>
            <td class="pt-3">{{ user.phone }}</td>
            <td class="pt-3">{{ user.status }}</td>
            <td class="pt-3">{{ user.user_type }}</td>
            <td>
              <router-link :to="{ name:'UserDetail', params: { id: user.id } }">
                <button class="btn">
                  <EyeIcon/>
                </button>
              </router-link>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <BasePaginate
        :current-page="paginate.currentPage"
        :total-page="paginate.total"
        :per-page="paginate.perPage"
        @onPageChanged="changePage"
    />
  </div>
</template>

<script>

import EyeIcon from "@/components/Icon/EyeIcon";
import SearchIcon from "@/components/Icon/SearchIcon";
import CalenderIcon from "@/components/Icon/CalenderIcon";
import {USER_STATUS_OPTIONS, USER_TYPE_OPTIONS} from "@/utils/const";
import BasePaginate from "@/components/BasePaginate";

export default {
  name: 'UserList',
  components: {
    BasePaginate,
    CalenderIcon,
    SearchIcon,
    EyeIcon,
  },
  data() {
    return {
      filter: {
        id: null,
        date: null,
        user_type: 1,
        status: 1,
      },
      listUsers: [
        {
          id: null,
          name: null,
          date_of_birth: null,
          gender: null,
          login_info: null,
          phone: null,
          user_type: null,
          status: null,
        }
      ],
      userType: USER_TYPE_OPTIONS,
      status: USER_STATUS_OPTIONS,
      statistical: {
        count_distributor: 0,
        count_viewer: 0,
        count_user: 0,
      },
      paginate: {
        currentPage: 1,
        total: 12,
      },
    }
  },
  created() {
    this.getUserList();
    this.getStatisticalUser();
  },
  methods: {
    async getUserList() {
      this.$root.$refs.loading.start();
      const params = {};
      if (this.filter.id !== null) {
        params.id = this.filter.id;
      } else {
        params.id = '';
      }
      if (this.filter.date !== null) {
        params.date = this.$dayjs(this.filter.date).format('DD.MM.YYYY');
      } else {
        params.date = '';
      }
      if (this.filter.user_type !== 1) {
        params.user_type = this.filter.user_type;
      } else {
        params.user_type = '';
      }
      if (this.filter.status !== 1) {
        params.status = this.filter.status;
      } else {
        params.status = '';
      }
      if (this.paginate.currentPage) {
        params.current_page = this.paginate.currentPage;
      }
      await this.$store.dispatch("user/getUsers", params);
      this.listUsers = this.$store.getters["user/listUsers"];
      this.$root.$refs.loading.finish();
    },
    async getStatisticalUser() {
      this.$root.$refs.loading.start();
      await this.$store.dispatch("user/getStatistical");
      this.statistical = this.$store.getters["user/statistical"];
      this.$root.$refs.loading.finish();
      this.$root.$refs.loading.finish();
    },
    changePage(page) {
      this.paginate.currentPage = page;
      this.getUserList();
    },
    handleBlur() {
      if (this.filter.id) {
        this.filter.id = this.filter.id.trim();
      }
    },
  },
};
</script>

<style scoped lang='scss'>
@import '@/assets/scss/user/list.scss';
</style>
