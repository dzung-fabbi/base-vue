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
      <div class="table-header row">
        <div class="input-group search">
          <span class="input-group-text">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M19.7556 18.5774L14.0682 12.89C15.1699 11.5292 15.8332 9.80003 15.8332 7.91672C15.8332 3.55177 12.2815 0.00012207 7.91656 0.00012207C3.55161 0.00012207 0 3.55173 0 7.91669C0 12.2816 3.55165 15.8333 7.9166 15.8333C9.7999 15.8333 11.5291 15.17 12.8899 14.0683L18.5773 19.7558C18.7398 19.9182 18.9531 19.9999 19.1665 19.9999C19.3798 19.9999 19.5932 19.9182 19.7557 19.7558C20.0815 19.4299 20.0815 18.9033 19.7556 18.5774ZM7.9166 14.1666C4.46996 14.1666 1.66666 11.3633 1.66666 7.91669C1.66666 4.47004 4.46996 1.66675 7.9166 1.66675C11.3632 1.66675 14.1665 4.47004 14.1665 7.91669C14.1665 11.3633 11.3632 14.1666 7.9166 14.1666Z"
                      fill="#8B9DA5"/>
              </svg>
          </span>
          <input
              type="text"
              class="form-control"
              placeholder="名前・ワンコインID検索"
              v-model="filter.id"
              @blur="handleBlur()"
          >
        </div>
        <div class="input-group date" id="datepicker" data-date-format="dd-mm-yyyy">
          <DatePicker
              type="date"
              class="f-w3 w-100"
              v-model="filter.date"
              format="YYYY-MM-DD"
              :popup-style="{ top: '318px'}"
          >
              <span slot="icon-calendar">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M17.6562 1.5625H16.7188V0H15.1562V1.5625H4.84375V0H3.28125V1.5625H2.34375C1.05141 1.5625 0 2.61391 0 3.90625V17.6562C0 18.9486 1.05141 20 2.34375 20H17.6562C18.9486 20 20 18.9486 20 17.6562V3.90625C20 2.61391 18.9486 1.5625 17.6562 1.5625ZM18.4375 17.6562C18.4375 18.087 18.087 18.4375 17.6562 18.4375H2.34375C1.91297 18.4375 1.5625 18.087 1.5625 17.6562V7.34375H18.4375V17.6562ZM18.4375 5.78125H1.5625V3.90625C1.5625 3.47547 1.91297 3.125 2.34375 3.125H3.28125V4.6875H4.84375V3.125H15.1562V4.6875H16.7188V3.125H17.6562C18.087 3.125 18.4375 3.47547 18.4375 3.90625V5.78125Z"
                      fill="#8B9DA5"/>
                  <path d="M4.53125 8.98438H2.96875V10.5469H4.53125V8.98438Z" fill="#8B9DA5"/>
                  <path d="M7.65625 8.98438H6.09375V10.5469H7.65625V8.98438Z" fill="#8B9DA5"/>
                  <path d="M10.7812 8.98438H9.21875V10.5469H10.7812V8.98438Z" fill="#8B9DA5"/>
                  <path d="M13.9062 8.98438H12.3438V10.5469H13.9062V8.98438Z" fill="#8B9DA5"/>
                  <path d="M17.0312 8.98438H15.4688V10.5469H17.0312V8.98438Z" fill="#8B9DA5"/>
                  <path d="M4.53125 12.1094H2.96875V13.6719H4.53125V12.1094Z" fill="#8B9DA5"/>
                  <path d="M7.65625 12.1094H6.09375V13.6719H7.65625V12.1094Z" fill="#8B9DA5"/>
                  <path d="M10.7812 12.1094H9.21875V13.6719H10.7812V12.1094Z" fill="#8B9DA5"/>
                  <path d="M13.9062 12.1094H12.3438V13.6719H13.9062V12.1094Z" fill="#8B9DA5"/>
                  <path d="M4.53125 15.2344H2.96875V16.7969H4.53125V15.2344Z" fill="#8B9DA5"/>
                  <path d="M7.65625 15.2344H6.09375V16.7969H7.65625V15.2344Z" fill="#8B9DA5"/>
                  <path d="M10.7812 15.2344H9.21875V16.7969H10.7812V15.2344Z" fill="#8B9DA5"/>
                  <path d="M13.9062 15.2344H12.3438V16.7969H13.9062V15.2344Z" fill="#8B9DA5"/>
                  <path d="M17.0312 12.1094H15.4688V13.6719H17.0312V12.1094Z" fill="#8B9DA5"/>
              </svg>
              </span>
          </DatePicker>
        </div>
        <div class="input-group filter">
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
        <div class="input-group">
          <button class="btn btn-filter" @click="getUserList()">
            検索
          </button>
        </div>
      </div>
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
                  <svg width="20" height="12" viewBox="0 0 20 12" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M19.9259 5.76331C19.7684 5.53413 15.9834 0.16655 9.99995 0.16655C4.86569 0.16655 0.29062 5.50331 0.0981168 5.73081C-0.0327056 5.88581 -0.0327056 6.11331 0.0981168 6.26914C0.29062 6.49664 4.86569 11.8334 9.99995 11.8334C15.1342 11.8334 19.7092 6.49664 19.9017 6.26914C20.0226 6.12581 20.0334 5.91831 19.9259 5.76331ZM9.99995 11.0001C5.88407 11.0001 1.97065 7.07501 0.97649 5.99999C1.96901 4.92416 5.87825 0.999921 9.99995 0.999921C14.8158 0.999921 18.2151 4.91916 19.0451 5.97749C18.0867 7.01833 14.1508 11.0001 9.99995 11.0001Z"
                        fill="black" stroke="black" stroke-width="0.2"/>
                    <path
                        d="M10 2.66659C8.16165 2.66659 6.66663 4.16161 6.66663 5.99996C6.66663 7.83831 8.16165 9.33333 10 9.33333C11.8384 9.33333 13.3334 7.83831 13.3334 5.99996C13.3334 4.16161 11.8384 2.66659 10 2.66659ZM10 8.50004C8.62166 8.50004 7.49996 7.37834 7.49996 6C7.49996 4.62166 8.62166 3.49996 10 3.49996C11.3783 3.49996 12.5 4.62166 12.5 6C12.5 7.37834 11.3783 8.50004 10 8.50004Z"
                        fill="black" stroke="black" stroke-width="0.2"/>
                  </svg>
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
                <span aria-hidden="true"><PreviousPage/></span>
              </button>
            </li>
            <li class="page-item">
              <button class="btn page-link">{{ paginate.currentPage }}</button>
            </li>
            <li class="page-item" :class="{'disabled': paginate.currentPage === paginate.total}">
              <button class=" btn page-link" v-on:click="incrementPage">
                <span aria-hidden="true"><NextPage/></span>
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

import moment from 'moment';
import PreviousPage from "@/components/Icon/PreviousPage";
import NextPage from "@/components/Icon/NextPage";

export default {
  name: 'UserList',
  components: {
    NextPage,
    PreviousPage,
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
      userType: [
        {value: 1, text: "ユーザータイプ"},
        {value: 2, text: "視聴者"},
        {value: 3, text: "配信者"},
      ],
      status: [
        {value: 1, text: "ステータス"},
        {value: 2, text: "アクティブ"},
        {value: 3, text: "ブロック"},
      ],
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
        params.date = moment(this.filter.date).format('YYYY-MM-DD');
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
