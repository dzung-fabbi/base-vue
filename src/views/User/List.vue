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
          <span>{{ statistical.distribute_count }}</span>
        </div>
      </div>
      <div class="content content-info">
        <div class="top-info">
          <h3>視聴者数</h3>
        </div>
        <div class="bottom-info">
          <span>{{ statistical.guest_count }}</span>
        </div>
      </div>
      <div class="content content-info">
        <div class="top-info">
          <h3>総ユーザー数</h3>
        </div>
        <div class="bottom-info">
          <span>{{ statistical.all_count }}</span>
        </div>
      </div>
    </div>
    <div class="content">
      <ValidationObserver v-slot="{ handleSubmit }">
        <div class="table-header row">
          <ValidationProvider
              name="名前・ワンコインID検索"
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
                reset-button
            >
              <span slot="button-content">
                <CalenderIcon/>
              </span>
            </b-form-datepicker>
          </div>
          <div class="input-group filter pe-0">
            <b-form-select
                class="type form-select"
                v-model="filter.user_type"
                :options="userType"
            />
          </div>
          <div class="input-group filter">
            <b-form-select
                class="type form-select"
                v-model="filter.status"
                :options="status"
            />
          </div>
          <div class="input-group ps-0 group-btn-filter">
            <button class="btn btn-filter" @click="handleSubmit(handleFilterUser)">
              検索
            </button>
          </div>
        </div>
      </ValidationObserver>
      <div class="table-content">
        <table class="table color-8B9DA5">
          <thead>
          <tr>
            <th scope="col" class="col-1">ワンコインID</th>
            <th scope="col" class="col-1">名前</th>
            <th scope="col" class="col-1">生年月日</th>
            <th scope="col" class="col-1">性別</th>
            <th scope="col" class="col-2">ログイン方法</th>
            <th scope="col" class="col-1">電話番号</th>
            <th scope="col" class="col-1">所有コイン</th>
            <th scope="col" class="col-1">ユーザータイプ</th>
            <th scope="col" class="col-1">ステータス</th>
            <th scope="col" class="col-1"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(user, index) in listUsers" :key="index">
            <td class="pt-3">{{ user.user_name_display }}</td>
            <td class="pt-3">{{ user.name }}</td>
            <td class="pt-3">{{ user.birthday }}</td>
            <td class="pt-3">{{ user.gender }}</td>
            <td class="pt-3"><span class="type-login">{{ user.login_type }}: </span>{{ user.loginType }}</td>
            <td class="pt-3">{{ user.phone }}</td>
            <td class="pt-3">{{ formatMoney(user.coin_balance) }}<span class="table-currency"> コイン</span></td>
            <td class="pt-3">{{ user.userType }}</td>
            <td class="pt-3">{{ user.userStatus }}</td>
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
        :current-page.sync="paginate.currentPage"
        :total-page.sync="paginate.total"
        :per-page.sync="paginate.perPage"
        :total-record.sync="paginate.totalRecord"
        @onPageChanged="changePage"
        v-if="paginate.total > 0"
    />
  </div>
</template>

<script>

import EyeIcon from "@/components/Icon/EyeIcon";
import SearchIcon from "@/components/Icon/SearchIcon";
import CalenderIcon from "@/components/Icon/CalenderIcon";
import {
  PER_PAGE_NUMBER, USER_GENDER_OPTIONS,
  USER_STATUS_OPTIONS,
  USER_TYPE_OPTIONS,
} from "@/utils/const";
import BasePaginate from "@/components/BasePaginate";
import {numberWithCommas} from "../../utils/convert";

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
        status: 2,
      },
      listUsers: [
        {
          id: null,
          name: null,
          birthday: null,
          sex: null,
          login_type: null,
          email: null,
          phone: null,
          is_distribute: null,
          is_blocked: null,
          loginType: null,
          userType: null,
          userStatus: null,
          google_id: null,
          apple_id: null,
          line_id: null,
          gender: null,
          coin_balance: null,
        }
      ],
      userType: USER_TYPE_OPTIONS,
      status: USER_STATUS_OPTIONS,
      statistical: {
        distribute_count: 0,
        guest_count: 0,
        all_count: 0,
      },
      paginate: {
        currentPage: 1,
        total: 12,
        totalRecord: 12,
      },
    }
  },
  created() {
    this.getUserList();
    this.getStatisticalUser();
  },
  methods: {
    formatMoney(input) {
      return numberWithCommas(input)
    },
    async getUserList() {
      this.$root.$refs.loading.start();
      const params = {};
      if (this.filter.id !== null && this.filter.id !== '') {
        params.q = this.filter.id;
      } else {
        params.q = '';
      }
      if (this.filter.date !== null && this.filter.date !== '') {
        params.date = this.$dayjs(this.filter.date).format('YYYY-MM-DD');
      } else {
        params.date = '';
      }
      if (this.filter.user_type !== 1) {
        params.user_type = this.filter.user_type;
      } else {
        params.user_type = '';
      }
      if (this.filter.status !== 2) {
        params.blocked = this.filter.status;
      } else {
        params.blocked = '';
      }
      params.limit = PER_PAGE_NUMBER;
      if (this.paginate.currentPage) {
        params.page = this.paginate.currentPage;
      }
      await this.$store.dispatch("user/getUsers", params);
      this.listUsers = this.$store.getters["user/listUsers"].data;
      this.paginate.currentPage = this.$store.getters["user/listUsers"].pagination.current_page;
      this.paginate.totalRecord = this.$store.getters["user/listUsers"].pagination.total_record;
      this.paginate.total = this.$store.getters["user/listUsers"].pagination.total_page;
      this.listUsers = this.listUsers.map(user => {
        user.loginType = this.setLoginType(user.login_type, user.user_name, user.google_id, user.line_id, user.apple_id);
        user.userType = this.setUserType(user.is_distribute);
        user.userStatus = this.setUserStatus(user.is_blocked);
        user.birthday = this.setBirthDay(user.birthday);
        user.gender = this.setGender(user.sex);
        return user;
      });
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
    setLoginType(loginType, userName, googleId, lineId, appleId) {
      switch (loginType) {
        case 'GOOGLE':
          return `${googleId}`;
        case 'LINE':
          return `${lineId}`;
        case 'APPLE':
          return `${appleId}`;
        default:
          return `${userName}`;
      }
    },
    setUserType(isDistribute) {
      return isDistribute ? '配信者' : '視聴者';
    },
    setUserStatus(isBlocked) {
      return isBlocked ? 'ブロック' : 'アクティブ';
    },
    setBirthDay(birthDay) {
      if (!birthDay) return;
      return this.$dayjs(birthDay).format('DD.MM.YYYY');
    },
    handleFilterUser() {
      this.paginate.currentPage = 1;
      this.getUserList();
    },
    setGender(gender) {
      let genderFilter = USER_GENDER_OPTIONS.filter(item => {
        return item.value === gender;
      });
      if (!genderFilter.length) return gender;
      return genderFilter[0].text;
    },
  },
};
</script>

<style scoped lang='scss'>
@import '@/assets/scss/user/list.scss';
</style>
