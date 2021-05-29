<template>
  <div class='login-main'>
    <div class='login-content'>
      <div class='login-top'>
        <img :src="require('@/assets/image/logo.png')" alt=''>
      </div>
      <div class='login-form'>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent='handleSubmit(handleLogin)'>
            <div class='text-start'>
              <ValidationProvider
                  name="ID"
                  rules="required|min:4|max:20"
                  v-slot="{ errors }"
              >
                <label for='id' class='form-label'>ID</label>
                <input
                    type='text'
                    class='form-control'
                    id='id'
                    placeholder='ID'
                    v-model='user.id'
                    @blur="handleBlur()"
                    autocomplete="chrome-off"
                >
                <span class="error text-left f-w3">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class='text-start'>
              <ValidationProvider
                  name="パスワード"
                  rules="required|min:8|max:20"
                  v-slot="{ errors }"
              >
                <div class="password-group">
                  <label for='password' class='form-label'>パスワード</label>
                  <input
                      :type='passwordFieldType'
                      v-model='user.password'
                      class='form-control'
                      id='password'
                      placeholder='パスワード'
                  >
                  <button class='btn btn-toggle-password' :class="{'hidden': passwordFieldType === 'text' }" type='button'
                          id='show-password' @click='switchVisibility'>
                    <HiddenPasswordIcon />
                  </button>
                  <button class='btn btn-toggle-password' type='button'
                          :class="{'hidden': passwordFieldType === 'password' }" id='hide-password'
                          @click='switchVisibility'>
                    <EyeIcon />
                  </button>
                </div>
                <span class="error text-left f-w3">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <button type='button' class='btn btn-primary btn-login' @click='handleSubmit(handleLogin)'>ログイン</button>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import HiddenPasswordIcon from "@/components/Icon/HiddenPasswordIcon";
import EyeIcon from "@/components/Icon/EyeIcon";
import {MESSAGES, MODAL} from "@/utils/const";
export default {
  components: {
    EyeIcon,
    HiddenPasswordIcon
  },
  data() {
    return {
      user: {
        id: '',
        password: '',
      },
      loading: false,
      passwordFieldType: 'password',
    };
  },

  computed: {
    loggedIn() {
      return this.$store.getters["auth/token"];
    }
  },

  created() {
    if (this.loggedIn) {
      this.$router.push({name: 'Home'});
    }
  },

  methods: {
    handleBlur() {
      this.user.id = this.user.id.trim();
    },
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    },
    async handleLogin() {
      this.$root.$refs.loading.start();
      await this.$store
          .dispatch("auth/loginUser", {
            userName: this.user.id,
            passWord: this.user.password
          })
          .then(async () => {
            this.$root.$refs.loading.finish();
            this.$toast(
                MESSAGES.LOGIN_SUCCESS,
                MODAL.MODAL_NOTICE,
                MODAL.MODAL_TYPE_SUCCESS,
            );
            this.$router.push({ name: "Home" });
          })
          .catch(() => {
            this.$root.$refs.loading.finish();
            this.$toast(
                MESSAGES.LOGIN_FAIL,
                MODAL.MODAL_NOTICE,
                MODAL.MODAL_TYPE_DANGER
            );
          });
    }
  }
};
</script>

<style scoped lang='scss'>
@import '../assets/scss/layout.scss';
@import '../assets/scss/login.scss';
</style>
