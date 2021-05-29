<template>
  <div>
    <div class="heading text-start">
      <h2>報告一覧: 200者数</h2>
    </div>
    <div class="content">
      <ValidationObserver v-slot="{ handleSubmit }">
        <div class="table-header row">
          <ValidationProvider
              name="ID"
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
          <div class="input-group ps-0">
            <button class="btn btn-filter" @click="handleSubmit(handleFilter)">
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
            <th scope="col" class="col-1">性別</th>
            <th scope="col" class="col-1">報告者数</th>
            <th scope="col" class="col-1">ブロック者数</th>
            <th scope="col" class="col-1">ステータス</th>
            <th scope="col" class="col-1"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(user, index) in listUsers" :key="index">
            <td class="pt-3">{{ user.id }}</td>
            <td class="pt-3">{{ user.name }}</td>
            <td class="pt-3">{{ user.gender }}</td>
            <td class="pt-3">{{ user.report_count }}</td>
            <td class="pt-3">{{ user.block_count }}</td>
            <td class="pt-3">{{ user.userStatus }}</td>
            <td>
              <router-link :to="{ name:'UserBlockDetail', params: { id: user.id } }">
                <button class="btn">
                  <EyeIcon/>
                </button>
              </router-link>
              <button class="btn" @click="deleteUser(user.id)" >
                <DeleteIcon/>
              </button>
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
    />
  </div>
</template>

<script>

import EyeIcon from "@/components/Icon/EyeIcon";
import DeleteIcon from "@/components/Icon/DeleteIcon";
import BasePaginate from "@/components/BasePaginate";
import SearchIcon from "@/components/Icon/SearchIcon";
import {MESSAGES, MODAL, PER_PAGE_NUMBER, USER_GENDER_OPTIONS} from "@/utils/const";

export default {
  name: 'UserReportList',
  components: {
    SearchIcon,
    BasePaginate,
    DeleteIcon,
    EyeIcon,
  },
  data() {
    return {
      listUsers: [
        {
          id: '',
          name: '',
          gender: '',
          sex: '',
          userStatus: '',
          report_count: 0,
          block_count: 0,
          is_blocked: false,
        }
      ],
      paginate: {
        currentPage: 1,
        total: 12,
        totalRecord: 12,
      },
      filter: {
        id: null,
      },
    }
  },
  created() {
    this.getBlockUserList();
  },
  methods: {
    async getBlockUserList() {
      this.$root.$refs.loading.start();
      const params = {};
      if (this.filter.id !== null && this.filter.id !== '') {
        params.q = this.filter.id;
      } else {
        params.q = '';
      }
      if (this.paginate.currentPage) {
        params.page = this.paginate.currentPage;
      }
      params.limit = PER_PAGE_NUMBER;
      await this.$store.dispatch("user/getReportUserList", params);
      this.listUsers = this.$store.getters["user/listReportUser"].data;
      this.paginate.currentPage = this.$store.getters["user/listReportUser"].pagination.current_page;
      this.paginate.totalRecord = this.$store.getters["user/listReportUser"].pagination.total_record;
      this.paginate.total = this.$store.getters["user/listReportUser"].pagination.total_page;
      this.listUsers = this.listUsers.map(user => {
        user.userStatus = this.setUserStatus(user.is_blocked);
        user.gender = this.setGender(user.sex);
        return user;
      });
      this.$root.$refs.loading.finish();
    },
    changePage(page) {
      this.paginate.currentPage = page;
      this.getBlockUserList();
    },
    handleBlur() {
      if (this.filter.id) {
        this.filter.id = this.filter.id.trim();
      }
    },
    deleteUser(userId) {
      let isDelete = false;
      this.$bvModal.msgBoxConfirm(MESSAGES.CONFIRM_DELETE_USER, {
        title: MODAL.CONFIRM_DELETE_USER_TITLE,
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: MODAL.LABEL_OK,
        cancelTitle: MODAL.LABEL_CANCEL,
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true,
        headerClass: 'confirm-modal',
      })
          .then(async value => {
            isDelete = value;
            if (isDelete) {
              this.$root.$refs.loading.start();
              const body = {
                userId: userId
              }
              await this.$store.dispatch('user/deleteUser', body)
                  .then(async () => {
                    this.$toast(
                        MESSAGES.DELETE_USER_SUCCESS,
                        MODAL.MODAL_NOTICE,
                        MODAL.MODAL_TYPE_SUCCESS,
                    );
                    await this.getUserDetail();
                    this.$root.$refs.loading.finish();
                  })
                  .catch(error => {
                    console.log(error)
                    this.$root.$refs.loading.finish();
                    this.$toast(
                        MESSAGES.DELETE_USER_FAIL,
                        MODAL.MODAL_NOTICE,
                        MODAL.MODAL_TYPE_DANGER,
                    );
                  });
            }
          })
          .catch(err => {
            // An error occurred
            console.log(err)
          })
    },
    setUserStatus(isBlocked) {
      return isBlocked ? 'ブロック' : 'アクティブ';
    },
    setGender(gender) {
      let genderFilter = USER_GENDER_OPTIONS.filter(item => {
        return item.value === gender;
      });
      if (!genderFilter.length) return gender;
      return genderFilter[0].text;
    },
    handleFilter() {
      this.paginate.currentPage = 1;
      this.getBlockUserList();
    }
  }
}
</script>

<style scoped lang='scss'>
@import '@/assets/scss/user/report/list.scss';
</style>
