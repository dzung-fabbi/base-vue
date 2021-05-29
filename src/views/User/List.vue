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
              v-slot="{ errors }" class="input-group search"
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
    <div class="paginate d-flex justify-content-end align-items-center">
      <span class="pagination-detail">表示： {{ paginate.from_user }}-{{ this.paginate.to_user }} 件</span>
      <div class='pagination-container align-items-center ms-2'>
        <nav aria-label="Page navigation example">
          <ul class="pagination mb-0">
            <li class="page-item" :class="{'disabled': paginate.currentPage === 1}">
              <button class="btn page-link" v-on:click="decrementPage">
                <span aria-hidden="true"><PreviousPageIcon/></span>
              </button>
            </li>
            <li class="page-item">
              <button class="btn page-link">{{ paginate.currentPage }}</button>
            </li>
            <li class="page-item" :class="{'disabled': paginate.currentPage === paginate.total}">
              <button class=" btn page-link" v-on:click="incrementPage">
                <span aria-hidden="true"><NextPageIcon/></span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <span class="pagination-total ms-2">総計：{{ paginate.total }}ページ</span>
    </div>
  </div>
</template>

<script>

import PreviousPageIcon from "@/components/Icon/PreviousPageIcon";
import NextPageIcon from "@/components/Icon/NextPageIcon";
import EyeIcon from "@/components/Icon/EyeIcon";
import SearchIcon from "@/components/Icon/SearchIcon";
import CalenderIcon from "@/components/Icon/CalenderIcon";
import {USER_STATUS_OPTIONS, USER_TYPE_OPTIONS} from "@/utils/const";

export default {
  name: 'UserList',
  components: {
    CalenderIcon,
    SearchIcon,
    EyeIcon,
    NextPageIcon,
    PreviousPageIcon,
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
        perPage: 12,
        from_user: 1,
        to_user: 12,
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
    decrementPage() {
      this.paginate.currentPage -= 1;
      this.setFromUser();
      this.setToUser();
      this.getUserList();
    },
    incrementPage() {
      this.paginate.currentPage += 1;
      this.setFromUser();
      this.setToUser();
      this.getUserList();
    },
    setFromUser() {
      this.paginate.from_user = (this.paginate.perPage * this.paginate.currentPage) - (this.paginate.perPage - 1);
    },
    setToUser() {
      this.paginate.to_user = this.paginate.perPage * this.paginate.currentPage;
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
