<template>
  <div>
    <div class="user-detail-content">
      <div class="heading">
        <div class="left-heading text-start"><h2>ユーザー情報詳細</h2></div>
        <div class="right-heading">
          <b-button @click="blockUser" :disabled="userInfo.is_blocked" class="btn btn-dark background-black float-end">ブロック</b-button>
          <b-button type="button" class="btn btn-dark background-black float-end me-2" v-on:click="showModal">情報編集
          </b-button>
        </div>
      </div>
      <div class="content text-start">
        <div class="cover-image d-flex flex-column">
          <span class="color-8B9DA5">カーバ</span>
          <img :src="userInfo.image_cover_path ? userInfo.image_cover_path : null " class="img-fluid mt-2 img-background" alt="">
        </div>
        <div class="avatar-image d-flex flex-column">
          <span class="color-8B9DA5">アバター</span>
          <img :src="userInfo.image_avatar_path ? userInfo.image_avatar_path : null " class="img-background" alt="">
        </div>
        <div class="detail color-8B9DA5">
          <div class="row mb-5">
            <div class="col-5">名前</div>
            <div class="col-7 text-end">{{ userInfo.name }}</div>
          </div>
          <div class="row mb-5">
            <div class="col-5">メールアドレス</div>
            <div class="col-7 text-end">{{ userInfo.email }}</div>
          </div>
          <div class="row mb-5">
            <div class="col-5">電話番号</div>
            <div class="col-7 text-end">{{ userInfo.phone }}</div>
          </div>
          <div class="row mb-5">
            <div class="col-5">性別</div>
            <div class="col-7 text-end">{{ userInfo.gender }}</div>
          </div>
          <div class="row mb-5">
            <div class="col-5">生年月日</div>
            <div class="col-7 text-end">{{ userInfo.birthday }}</div>
          </div>
          <div class="row mb-5">
            <div class="col-5">フォロワー</div>
            <div class="col-7 text-end">{{ userInfo.follow_count }}</div>
          </div>
          <div class="row mb-5">
            <div class="col-5">フォロー中</div>
            <div class="col-7 text-end">{{ userInfo.following_count }}</div>
          </div>
          <div class="row mb-5">
            <div class="col-5">イイコ</div>
            <div class="col-7 text-end">{{ userInfo.like_count }}</div>
          </div>
          <div class="row mb-5">
            <div class="col-5">ポイント</div>
            <div class="col-7 text-end">{{ userInfo.coin_balance }}</div>
          </div>
          <div class="row">
            <div class="col-5">ステータス</div>
            <div class="col-7 text-end">{{ userInfo.status }}</div>
          </div>
        </div>
        <div class="detail-payment">
          <router-link :to="{ name:'RevenueUserDetail', params: { id: userInfo.id } }">収入履歴詳細</router-link>
        </div>
      </div>
    </div>
    <div class="modal-edit-user-content">
      <div class="modal fade" :class="{'show': isShowModal}" id="edit-user-modal" tabindex="-1"
           aria-labelledby="edit-user-modal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered dialog-edit-user">
          <div class="modal-content">
            <ValidationObserver v-slot="{ handleSubmit }">
              <div class="modal-body text-start">
                <div class="cover-image d-flex flex-column">
                  <span class="color-8B9DA5 mb-2">カーバ</span>
                  <img
                      :src="dataChange.image_cover_path ? dataChange.image_cover_path : null "
                      class="img-fluid mt-2 img-background"
                      alt=""
                      v-on:click="uploadFile('cover-image-upload')"
                  >
                  <input
                      id="cover-image-upload"
                      type="file"
                      class="hidden"
                      @change="onChangeCover"
                  />
                </div>
                <div class="avatar-image d-flex flex-column">
                  <span class="color-8B9DA5 mb-2">アバーテ</span>
                  <img
                      :src="dataChange.image_avatar_path ? dataChange.image_avatar_path : null "
                      class="img-background"
                      alt=""
                      v-on:click="uploadFile('avatar-image-upload')"
                  >
                  <input
                      id="avatar-image-upload"
                      type="file"
                      class="hidden"
                      @change="onChangeAvatar"
                  />
                </div>
                <div class="detail color-8B9DA5">
                  <div class="row mb-4">
                    <div class="col-12 mb-2">名前</div>
                    <div class="col-12 input-group">
                      <ValidationProvider
                          name="名前"
                          rules="max:255"
                          v-slot="{ errors }"
                          class="w-100"
                      >
                        <input
                            class="form-control"
                            type="text"
                            v-model="dataChange.name"
                            placeholder="名前"
                            @blur="handleBlur">
                        <span class="error text-left f-w3">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="row mb-4">
                    <div class="col-6 mb-2">メールアドレス</div>
                    <div class="col-12 input-group">
                      <input class="form-control" type="text" v-model="dataChange.email" placeholder="メールアドレス"
                             disabled>
                    </div>
                  </div>
                  <div class="row mb-4">
                    <div class="col-6 mb-2">電話番号</div>
                    <div class="col-12 input-group">
                      <ValidationProvider
                          name="電話番号"
                          rules="digits:20"
                          v-slot="{ errors }"
                          class="w-100"
                      >
                        <input
                            class="form-control"
                            type="text"
                            v-model="dataChange.phone"
                            placeholder="電話番号"
                            @blur="handleBlur"
                        >
                        <span class="error text-left f-w3">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-12">性別</div>
                    <ValidationProvider
                        name="性別"
                        rules=""
                        v-slot="{ errors }"
                    >
                      <div class="col-12 gender-group">
                        <div class="checkbox-rounded" v-for="(gender, index) in USER_GENDER_OPTIONS" :key="index">
                          <input
                              type="radio"
                              v-model="dataChange.sex"
                              :id="gender.value"
                              :value="gender.value"
                              :checked="gender.value === dataChange.sex"
                          />
                          <label :for="gender.value">{{ gender.text }}</label>
                        </div>
                      </div>
                      <span class="error text-left f-w3">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="row mb-4">
                    <div class="col-6 mb-2">生年月日</div>
                    <div class="input-group date" id="datepicker" data-date-format="YYYY-MM-DD">
                      <ValidationProvider
                          name="生年月日"
                          rules=""
                          v-slot="{ errors }"
                          class="w-100"
                      >
                        <b-form-datepicker
                            id="modal-edit-user-date-picker"
                            v-model="dataChange.birthdayChange"
                            class="mb-2 modal-edit-user-date-picker"
                            :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
                            placeholder="YYYY-MM-DD"
                            locale="ja"
                            :hide-header="true"
                            reset-button
                        >
                          <span slot="button-content">
                            <CalenderIcon/>
                          </span>
                        </b-form-datepicker>
                        <span class="error text-left f-w3">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="button-group">
                    <button type="button" class="btn background-C4C4C4 me-2" v-on:click="showModal">キャンセル
                    </button>
                    <button type="button" class="btn btn-dark background-black float-end"
                            v-on:click="handleSubmit(updateInfo)">保存
                    </button>
                  </div>
                </div>
              </div>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CalenderIcon from "@/components/Icon/CalenderIcon";
import {MESSAGES, USER_GENDER_OPTIONS, MODAL} from "@/utils/const";

export default {
  name: 'UserDetail',
  components: {
    CalenderIcon,
  },
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
        birthdayChange: '',
        gender: '',
        is_blocked: false,
      },
      dataChange: {
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
        url_upload_cover: '',
        url_upload_avatar: '',
        birthdayChange: '',
      },
      isShowModal: false,
      USER_GENDER_OPTIONS,
    }
  },
  mounted() {
    document.getElementById('li-user').className = 'router-link-active';
  },
  created() {
    this.getUserDetail();
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
        this.userInfo.birthdayChange = this.$dayjs(this.userInfo.birthday).format('YYYY-MM-DD');
        this.userInfo.birthday = this.$dayjs(this.userInfo.birthday).format('YYYY-MM-DD');
      } else {
        this.userInfo.birthdayChange = '';
      }
      this.userInfo.status = this.setUserStatus(this.userInfo.is_blocked);
      this.userInfo.gender = this.setGender(this.userInfo.sex);
      this.dataChange = {...this.userInfo};
      this.$root.$refs.loading.finish();
    },
    showModal() {
      this.isShowModal = !this.isShowModal;
      this.dataChange = {...this.userInfo};
    },
    handleBlur() {
      if (this.dataChange.name) {
        this.dataChange.name = this.dataChange.name.trim();
      }
      if (this.dataChange.phone) {
        this.dataChange.phone = this.dataChange.phone.trim();
      }
    },
    async updateInfo() {
      this.$root.$refs.loading.start();
      const body = this.setData();
      await this.$store.dispatch('user/updateUserInfo', body)
          .then(async () => {
            this.showModal();
            this.$toast(
                MESSAGES.UPDATE_USER_SUCCESS,
                MODAL.MODAL_NOTICE,
                MODAL.MODAL_TYPE_SUCCESS
            );
            await this.getUserDetail();
            this.$root.$refs.loading.finish();
          })
          .catch(error => {
            console.log(error)
            this.$root.$refs.loading.finish();
            this.$toast(
                MESSAGES.UPDATE_USER_FAIL,
                MODAL.MODAL_NOTICE,
                MODAL.MODAL_TYPE_DANGER
            );
          });
    },
    onChangeAvatar(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createAvatar(files[0]);
    },
    onChangeCover(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createCover(files[0]);
    },
    uploadFile(inputId) {
      document.getElementById(inputId).click();
    },
    async createAvatar(file) {
      this.$root.$refs.loading.start();
      let formData = new FormData();
      formData.append("media", file);
      await this.$store.dispatch('media/uploadMedia', formData).then(response => {
        this.dataChange.image_avatar_path = response.data.url;
        this.dataChange.url_upload_avatar = this.dataChange.image_avatar_path;
      });
      this.$root.$refs.loading.finish();
    },
    async createCover(file) {
      this.$root.$refs.loading.start();
      let formData = new FormData();
      formData.append("media", file);
      await this.$store.dispatch('media/uploadMedia', formData).then(response => {
        this.dataChange.image_cover_path = response.data.url;
        this.dataChange.url_upload_cover = this.dataChange.image_cover_path;
      });
      this.$root.$refs.loading.finish();
    },
    setData() {
      let body = {
        userId: this.dataChange.id
      };
      if (this.dataChange.url_upload_cover) {
        body.image_cover_path = this.dataChange.url_upload_cover
      }
      if (this.dataChange.url_upload_avatar) {
        body.image_avatar_path = this.dataChange.url_upload_avatar
      }
      body.name = this.dataChange.name
      body.phone = this.dataChange.phone
      if (this.dataChange.sex !== '' && this.dataChange.sex !== null) {
        body.sex = this.dataChange.sex
      }
      if (this.dataChange.birthdayChange) {
        body.birthday = this.$dayjs(this.dataChange.birthdayChange).format('YYYY-MM-DD')
      } else {
        body.birthday = '';
      }
      return body;
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
  },
  beforeDestroy() {
    if (this.$route.name !== 'UserList')
      document.getElementById('li-user').className = '';
  },
}
</script>

<style scoped lang='scss'>
@import '@/assets/scss/user/detail.scss';
</style>
