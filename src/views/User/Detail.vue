<template>
  <div>
    <div class="user-detail-content">
      <div class="heading">
        <div class="left-heading text-start"><h2>ユーザー情報詳細</h2></div>
        <div class="right-heading">
          <b-button class="btn btn-dark background-black float-end">ブロック</b-button>
          <b-button type="button" class="btn btn-dark background-black float-end me-2" v-on:click="showModal">情報編集
          </b-button>
        </div>
      </div>
      <div class="content text-start">
        <div class="cover-image d-flex flex-column">
          <span class="color-8B9DA5">カーバ</span>
          <img :src="userInfo.cover" class="img-fluid mt-2" alt="">
        </div>
        <div class="avatar-image d-flex flex-column">
          <span class="color-8B9DA5">アバター</span>
          <img :src="userInfo.avatar" class="" alt="">
        </div>
        <div class="detail color-8B9DA5">
          <div class="row mb-5">
            <div class="col-6">名前</div>
            <div class="col-6 text-end">{{ userInfo.name }}</div>
          </div>
          <div class="row mb-5">
            <div class="col-6">メールアドレス</div>
            <div class="col-6 text-end">{{ userInfo.email }}</div>
          </div>
          <div class="row mb-5">
            <div class="col-6">電話番号</div>
            <div class="col-6 text-end">{{ userInfo.phone }}</div>
          </div>
          <div class="row mb-5">
            <div class="col-6">性別</div>
            <div class="col-6 text-end">{{ userInfo.gender }}</div>
          </div>
          <div class="row mb-5">
            <div class="col-6">生年月日</div>
            <div class="col-6 text-end">{{ userInfo.birthday }}</div>
          </div>
          <div class="row mb-5">
            <div class="col-6">フォロワー</div>
            <div class="col-6 text-end">{{ userInfo.follower }}</div>
          </div>
          <div class="row mb-5">
            <div class="col-6">フォロー中</div>
            <div class="col-6 text-end">{{ userInfo.following }}</div>
          </div>
          <div class="row mb-5">
            <div class="col-6">イイコ</div>
            <div class="col-6 text-end">{{ userInfo.good }}</div>
          </div>
          <div class="row mb-5">
            <div class="col-6">ポイント</div>
            <div class="col-6 text-end">{{ userInfo.point }}</div>
          </div>
          <div class="row">
            <div class="col-6">ステータス</div>
            <div class="col-6 text-end">{{ userInfo.status }}</div>
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
                      :src="dataChange.cover"
                      class="img-fluid mt-2"
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
                      :src="dataChange.avatar"
                      class=""
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
                          rules="required"
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
                          rules="required"
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
                  <div class="row">
                    <div class="col-12">性別</div>
                    <div class="col-12 gender-group">
                      <div class="checkbox-rounded">
                        <input type="radio" v-model="dataChange.gender" id="male" value="男性"/>
                        <label for="male">男性</label>
                      </div>
                      <div class="checkbox-rounded">
                        <input type="radio" v-model="dataChange.gender" id="female" value="女性"/>
                        <label for="female">女性</label>
                      </div>
                      <div class="checkbox-rounded">
                        <input type="radio" v-model="dataChange.gender" id="secret" value="内緒"/>
                        <label for="secret">内緒</label>
                      </div>
                    </div>
                  </div>
                  <div class="row mb-4">
                    <div class="col-6 mb-2">生年月日</div>
                    <div class="input-group date" id="datepicker" data-date-format="DD.MM.YYYY">
                      <ValidationProvider
                          name="生年月日"
                          rules="required"
                          v-slot="{ errors }"
                          class="w-100"
                      >
                        <DatePicker
                            type="date"
                            class="f-w3 w-100"
                            v-model="dataChange.birthday"
                            format="DD.MM.YYYY"
                            value-type="DD.MM.YYYY"
                            :popup-style="{ top: '429px', 'z-index': '10001',}"
                        >
                        <span slot="icon-calendar">
                          <CalenderIcon/>
                        </span>
                        </DatePicker>
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
import moment from "moment";

export default {
  name: 'UserDetail',
  components: {
    CalenderIcon,
  },
  data() {
    return {
      userInfo: {
        id: '',
        avatar: '',
        cover: '',
        name: '',
        email: '',
        phone: '',
        gender: '',
        birthday: '',
        follower: '',
        following: '',
        good: '',
        point: '',
        status: '',
      },
      dataChange: {
        id: '',
        avatar: '',
        cover: '',
        name: '',
        email: '',
        phone: '',
        gender: '',
        birthday: '',
        follower: '',
        following: '',
        good: '',
        point: '',
        status: '',
        avatarFile: null,
        coverFile: null,
      },
      isShowModal: false,
    }
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
        this.userInfo.birthday = moment(this.userInfo.birthday).format('DD.MM.YYYY');
      }
      if (this.userInfo.gender) {
        this.userInfo.gender = '女性';
      }
      this.dataChange = {...this.userInfo};
      this.$root.$refs.loading.finish();
    },
    showModal() {
      this.isShowModal = !this.isShowModal;
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
      console.log(body)
      await this.$store.dispatch('user/updateUserInfo', body)
          .then(async () => {
            this.showModal();
            this.$toast("Update user success", "通知", "success");
            await this.getUserDetail();
            this.$root.$refs.loading.finish();
          })
          .catch(error => {
            this.$root.$refs.loading.finish();
            this.$toast(error, "通知", "success");
          });
    },
    onChangeAvatar(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.dataChange.avatar = URL.createObjectURL(files[0]);
      this.createAvatar(files[0]);
    },
    onChangeCover(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.dataChange.cover = URL.createObjectURL(files[0]);
      this.createCover(files[0]);
    },
    uploadFile(inputId) {
      document.getElementById(inputId).click();
    },
    createAvatar(file) {
      let reader = new FileReader();
      let vm = this;
      reader.onload = (e) => {
        vm.dataChange.avatarFile = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    createCover(file) {
      let reader = new FileReader();
      let vm = this;
      reader.onload = (e) => {
        vm.dataChange.coverFile = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    setData() {
      let body = {
        userId: this.dataChange.id
      };
      if (this.dataChange.coverFile) {
        body.cover = this.dataChange.coverFile
      }
      if (this.dataChange.avatarFile) {
        body.avatar = this.dataChange.avatarFile
      }
      if (this.dataChange.phone) {
        body.phone = this.dataChange.phone
      }
      if (this.dataChange.gender) {
        body.gender = this.dataChange.gender
      }
      if (this.dataChange.birthday) {
        body.birthday = this.dataChange.birthday
      }
      return body;
    }
  }
}
</script>

<style scoped lang='scss'>
@import '@/assets/scss/user/detail.scss';
</style>
