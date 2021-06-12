<template>
  <div>
    <div class="heading text-start">
      <div class="left-heading"><h2>報告詳細</h2></div>
      <div class="right-heading">
        <button @click="blockUser" :disabled="userInfo.is_blocked" type="button" class="btn btn-secondary float-end me-2">ブロック</button>
      </div>
    </div>
    <div class="content-group">
      <div class="left-content">
        <div class="avatar-image d-flex flex-column">
          <img :src="userInfo.image_avatar_path ? userInfo.image_avatar_path : null " class="" alt="">
        </div>
        <div class="detail color-8B9DA5">
          <div class="row mb-4">
            <div class="col-5 text-start">名前</div>
            <div class="col-7 text-end">{{ userInfo.name }}</div>
          </div>
          <div class="row mb-4">
            <div class="col-5 text-start">メールアドレス</div>
            <div class="col-7 text-end">{{ userInfo.email }}</div>
          </div>
          <div class="row mb-4">
            <div class="col-5 text-start">電話番号</div>
            <div class="col-7 text-end">{{ userInfo.phone }}</div>
          </div>
          <div class="row mb-4">
            <div class="col-5 text-start">性別</div>
            <div class="col-7 text-end">{{ userInfo.gender }}</div>
          </div>
          <div class="row mb-4">
            <div class="col-5 text-start">生年月日</div>
            <div class="col-7 text-end">{{ userInfo.birthday }}</div>
          </div>
          <div class="row mb-4">
            <div class="col-5 text-start">フォロワー</div>
            <div class="col-7 text-end">{{ userInfo.follow_count }}</div>
          </div>
          <div class="row mb-4">
            <div class="col-5 text-start">フォロー中</div>
            <div class="col-7 text-end">{{ userInfo.following_count }}</div>
          </div>
          <div class="row mb-4">
            <div class="col-5 text-start">イイコ</div>
            <div class="col-7 text-end">{{ userInfo.coin_balance }}</div>
          </div>
        </div>
      </div>
      <div class="right-content">
        <ValidationObserver v-slot="{ handleSubmit }">
          <div class="table-header row">
            <div class="input-group filter mt-2">
              <b-form-select
                  class="type form-select"
                  v-model="filter.status"
                  :options="status"
              />
            </div>
            <div class="input-group date mt-2" id="datepicker" data-date-format="dd-mm-yyyy">
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
            <div class="input-group group-btn-filter mt-2">
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
              <th scope="col" class="col-1">報告・ブロック者</th>
              <th scope="col" class="col-1">日付</th>
              <th scope="col" class="col-1">Tステー</th>
              <th scope="col" class="col-2">理由</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(user, index) in reporterList" :key="index">
              <td class="pt-3 pb-3">{{ user.id }}</td>
              <td class="pt-3 pb-3">{{ user.name }}</td>
              <td class="pt-3 pb-3">{{ user.date }}</td>
              <td class="pt-3 pb-3">{{ user.userStatus }}</td>
              <td class="pt-3 pb-3">{{ user.content }}</td>
            </tr>
            </tbody>
          </table>
        </div>
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

import BasePaginate from "@/components/BasePaginate";
import {MESSAGES, MODAL, PER_PAGE_NUMBER, USER_GENDER_OPTIONS, REPORT_STATUS_OPTIONS} from "@/utils/const";
import CalenderIcon from "@/components/Icon/CalenderIcon";

export default {
  name: 'UserReportDetail',
  components: {CalenderIcon, BasePaginate},
  data() {
    return {
      userInfo: {
        id: '',
        image_avatar_path: '',
        image_cover_path: '',
        name: '',
        email: '',
        phone: '',
        sex: '',
        birthday: '',
        follow_count: 0,
        following_count: 0,
        like_count: 0,
        coin_balance: 0,
        status: '',
        gender: '',
        is_blocked: false,
      },
      reporterList: [
        {
          id: '',
          name: '',
          gender: '',
          sex: '',
          userStatus: '',
          report_count: 0,
          block_count: 0,
          is_blocked: false,
          content: '',
          date: '',
        }
      ],
      paginate: {
        currentPage: 1,
        total: 12,
        totalRecord: 12,
      },
      filter: {
        status: 2,
        date: null,
      },
      status: REPORT_STATUS_OPTIONS,
    }
  },
  created() {
    this.getUserDetail();
    this.getReportList();
  },
  methods: {
    async getUserDetail() {
      this.$root.$refs.loading.start();
      const params = {
        userId: this.$route.params.id
      };
      await this.$store.dispatch('user/getUserDetail', params);
      this.userInfo = this.$store.getters['user/userDetail'];
      if (this.userInfo.birthday) {
        this.userInfo.birthday = this.$dayjs(this.userInfo.birthday).format('YYYY-MM-DD');
      }
      this.userInfo.status = this.setUserStatus(this.userInfo.is_blocked);
      this.userInfo.gender = this.setGender(this.userInfo.sex);
      this.dataChange = {...this.userInfo};
      this.$root.$refs.loading.finish();
    },

    async getReportList() {
      this.$root.$refs.loading.start();
      const params = {
        userId: this.$route.params.id,
      };
      if (this.filter.date !== null && this.filter.date !== '') {
        params.date = this.$dayjs(this.filter.date).format('YYYY-MM-DD');
      } else {
        params.date = '';
      }
      if (this.filter.status !== 2) {
        params.status = this.filter.status;
      } else {
        params.status = '';
      }
      if (this.paginate.currentPage) {
        params.page = this.paginate.currentPage;
      }
      params.limit = PER_PAGE_NUMBER;
      await this.$store.dispatch("user/getReporterList", params);
      this.reporterList = this.$store.getters["user/reporterList"].data;
      this.paginate.currentPage = this.$store.getters["user/reporterList"].pagination.current_page;
      this.paginate.totalRecord = this.$store.getters["user/reporterList"].pagination.total_record;
      this.paginate.total = this.$store.getters["user/reporterList"].pagination.total_page;
      this.reporterList = this.reporterList.map(user => {
        user.userStatus = this.setReporterStatus(user.is_blocked, user.is_report);
        user.gender = this.setGender(user.sex);
        user.date = this.setFormatDate(user.date);
        return user;
      });
      this.$root.$refs.loading.finish();
    },
    changePage(page) {
      this.paginate.currentPage = page;
      this.getReportList();
    },
    setUserStatus(isBlocked) {
      return isBlocked ? 'ブロック' : 'アクティブ';
    },
    setReporterStatus(isBlocked, isReport) {
      if (isBlocked) return 'ブロック';
      if (isReport) return '報告';
      else return '';
    },
    setGender(gender) {
      let genderFilter = USER_GENDER_OPTIONS.filter(item => {
        return item.value === gender;
      });
      if (!genderFilter.length) return gender;
      return genderFilter[0].text;
    },
    setFormatDate(date) {
      if (!date) return;
      return this.$dayjs(date).format('YYYY-MM-DD');
    },
    handleFilterUser() {
      this.paginate.currentPage = 1;
      this.getReportList();
    },

    blockUser() {
      let isBlock = false;
      this.$bvModal.msgBoxConfirm(MESSAGES.CONFIRM_BLOCK_USER, {
        title: MODAL.CONFIRM_BLOCK_USER_TITLE,
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
            isBlock = value;
            if (isBlock) {
              this.$root.$refs.loading.start();
              const body = {
                userId: this.userInfo.id,
                status: 'BLOCK',
              }
              await this.$store.dispatch('user/blockUser', body)
                  .then(async () => {
                    this.$toast(
                        MESSAGES.BLOCK_USER_SUCCESS,
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
                        MESSAGES.BLOCK_USER_FAIL,
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
  }
}
</script>

<style scoped lang='scss'>
@import '@/assets/scss/user/detail.scss';
@import '@/assets/scss/user/report/detail.scss';
</style>
