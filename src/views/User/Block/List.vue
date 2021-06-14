<template>
  <div>
    <div class="heading text-start">
      <h2>ブロック一覧: {{ paginate.totalRecord }}者数</h2>
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
          <div class="input-group ps-0 group-btn-filter">
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
            <th scope="col">ワンコインID</th>
            <th scope="col">名前</th>
            <th scope="col">性別</th>
            <th scope="col">ブロック日付</th>
            <th scope="col">報告表示</th>
            <th scope="col">ステータス</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(user, index) in listUsers" :key="index">
            <td class="pt-3">{{ user.user_name }}</td>
            <td class="pt-3">{{ user.name }}</td>
            <td class="pt-3">{{ user.gender }}</td>
            <td class="pt-3">{{ user.block_at }}</td>
            <td>
              <div>
                <button class="btn" v-if="user.is_report" v-on:click="goToReportDetail(user.id)">
                  <EyeIcon/>
                </button>
              </div>
            </td>
            <td class="pt-3">
              <div class="switch-black">
                <input
                    type="checkbox"
                    name=""
                    id=""
                    v-model="user.is_blocked"
                    v-on:change="switchBlockUser(user.id, user.isBlocked)"
                >
              </div>
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

import BasePaginate from "@/components/BasePaginate";
import {MESSAGES, MODAL, PER_PAGE_NUMBER, USER_GENDER_OPTIONS} from "@/utils/const";
import EyeIcon from "@/components/Icon/EyeIcon";
import SearchIcon from "@/components/Icon/SearchIcon";

export default {
  name: 'UserBlockList',
  components: {SearchIcon, EyeIcon, BasePaginate},
  data() {
    return {
      filter: {
        id: null,
      },
      listUsers: [
        {
          id: null,
          name: null,
          sex: null,
          is_distribute: null,
          is_blocked: null,
          userStatus: null,
          gender: null,
          date: null,
          block_at: null,
          is_report: false,
          isBlocked: false,
        }
      ],
      paginate: {
        currentPage: 1,
        total: 12,
        totalRecord: 0,
      },
    }
  },
  created() {
    this.getBlockList();
  },
  methods: {
    async getBlockList() {
      this.$root.$refs.loading.start();
      const params = {};
      if (this.filter.id !== null && this.filter.id !== '') {
        params.q = this.filter.id;
      } else {
        params.q = '';
      }
      params.limit = PER_PAGE_NUMBER;
      if (this.paginate.currentPage) {
        params.page = this.paginate.currentPage;
      }
      await this.$store.dispatch("user/getBlockList", params);
      this.listUsers = this.$store.getters["user/blockList"].data;
      this.paginate.currentPage = this.$store.getters["user/blockList"].pagination.current_page;
      this.paginate.totalRecord = this.$store.getters["user/blockList"].pagination.total_record;
      this.paginate.total = this.$store.getters["user/blockList"].pagination.total_page;
      this.listUsers = this.listUsers.map(user => {
        user.gender = this.setGender(user.sex);
        user.block_at = this.setFormatDate(user.block_at);
        user.isBlocked = this.setFormatDate(user.is_blocked);
        return user;
      });
      this.$root.$refs.loading.finish();
    },
    changePage(page) {
      this.paginate.currentPage = page;
      this.getBlockList();
    },
    handleBlur() {
      if (this.filter.id) {
        this.filter.id = this.filter.id.trim();
      }
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
    goToReportDetail(userId) {
      return this.$router.push({name: 'UserBlockDetail', params: {id: userId}});
    },
    handleFilter() {
      this.paginate.currentPage = 1;
      this.getBlockList();
    },
    switchBlockUser(userId, isBlocked) {
      let isBlock = false;
      if (isBlocked) {
        this.$bvModal.msgBoxConfirm(MESSAGES.CONFIRM_UNBLOCK_USER, {
          title: MODAL.CONFIRM_UNBLOCK_USER_TITLE,
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
                  userId: userId,
                  status: 'UNBLOCK',
                }
                await this.$store.dispatch('user/blockUser', body)
                    .then(async () => {
                      this.$toast(
                          MESSAGES.UNBLOCK_USER_SUCCESS,
                          MODAL.MODAL_NOTICE,
                          MODAL.MODAL_TYPE_SUCCESS,
                      );
                      await this.getBlockList();
                      this.$root.$refs.loading.finish();
                    })
                    .catch(error => {
                      console.log(error)
                      this.$root.$refs.loading.finish();
                      this.$toast(
                          MESSAGES.UNBLOCK_USER_FAIL,
                          MODAL.MODAL_NOTICE,
                          MODAL.MODAL_TYPE_DANGER,
                      );
                    });
              } else {
                this.listUsers = this.listUsers.map(user => {
                  if (user.id === userId) {
                    user.is_blocked = user.isBlocked;
                  }
                  return user;
                });
              }
            })
            .catch(err => {
              // An error occurred
              console.log(err)
            })
      } else {
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
                      await this.getBlockList();
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
              } else {
                this.listUsers = this.listUsers.map(user => {
                  if (user.id === userId) {
                    user.is_blocked = user.isBlocked;
                  }
                  return user;
                });
              }
            })
            .catch(err => {
              // An error occurred
              console.log(err)
            })
      }
    },
  }
}
</script>

<style scoped lang='scss'>
@import '@/assets/scss/user/block/list.scss';
</style>
