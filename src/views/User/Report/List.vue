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
          <div class="input-group ps-0">
            <button class="btn btn-filter" @click="handleSubmit(getBlockUserList)">
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
            <th scope="col">報告者数</th>
            <th scope="col">ブロック者数</th>
            <th scope="col">ステータス</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(user, index) in listUsers" :key="index">
            <td class="pt-3">{{ user.id }}</td>
            <td class="pt-3">{{ user.name }}</td>
            <td class="pt-3">{{ user.gender }}</td>
            <td class="pt-3">{{ user.email }}</td>
            <td class="pt-3">{{ user.phone }}</td>
            <td class="pt-3">{{ user.status }}</td>
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
        :current-page="paginate.currentPage"
        :total-page="paginate.total"
        :per-page="paginate.perPage"
        @onPageChanged="changePage"
    />
  </div>
</template>

<script>

import EyeIcon from "@/components/Icon/EyeIcon";
import DeleteIcon from "@/components/Icon/DeleteIcon";
import BasePaginate from "@/components/BasePaginate";
import SearchIcon from "@/components/Icon/SearchIcon";
import {MESSAGES, MODAL} from "@/utils/const";

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
      paginate: {
        currentPage: 1,
        total: 12,
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
      if (this.filter.id !== null) {
        params.id = this.filter.id;
      } else {
        params.id = '';
      }
      if (this.paginate.currentPage) {
        params.current_page = this.paginate.currentPage;
      }
      await this.$store.dispatch("user/getBlockUserList", params);
      this.listUsers = this.$store.getters["user/listBlockUser"];
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
    }
  }
}
</script>

<style scoped lang='scss'>
@import '@/assets/scss/user/report/list.scss';
</style>
