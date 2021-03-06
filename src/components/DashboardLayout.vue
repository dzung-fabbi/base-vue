<template>
  <div class="layout">
    <div class="header-nav">
      <ul class="nav justify-content-end">
        <li class="nav-item dropdown">
          <b-dropdown id="dropdown-right" right :text="user.user_name" class="nav-link text-body fw-bold">
            <b-dropdown-item @click="logOut">
              <LogoutIcon/>
              <span>ログアウト</span>
            </b-dropdown-item>
          </b-dropdown>
        </li>
      </ul>
    </div>
    <nav id="sidebar" class="col sidebar">
      <router-link class="navbar-brand" :to="{ name: 'Home' }" exact>
        <img :src="require('@/assets/image/logo.png')" alt="logo" class="logo">
      </router-link>
      <ul class="nav flex-column vertical-nav">
        <router-link tag="li" class="nav-item" :to="{ name: 'Home' }" exact>
          <DashboardIcon />
          <span>ダッシュボード</span>
        </router-link>
        <li
            class='nav-item sub-menu'
            :class="isExpandUser ? 'active' : ''"
            @click="isExpandUser = !isExpandUser"
        >
          <a>
            <UserIcon />
            <span class="span-icon">ユーザー管理</span>
            <ArrowDownBold class="icon right arrow-icon" v-if="!isExpandUser"/>
            <ArrowUpBold class="icon right arrow-icon" v-if="isExpandUser" />
          </a>
          <ul class="child-item">
            <router-link
                tag="li" :to="{ name:'UserList' }"
                @click.native="onClickSub($event, 'isExpandUser')"
                exact
                id="li-user"
            >ユーザー一覧
            </router-link>
            <router-link
                tag="li" :to="{ name: 'UserReportList' }"
                @click.native="onClickSub($event, 'isExpandUser')"
            >報告一覧管理
            </router-link>
            <router-link
                tag="li" :to="{ name: 'UserBlockList' }"
                @click.native="onClickSub($event, 'isExpandUser')"
            >ブロック一覧管理
            </router-link>
          </ul>
        </li>
        <li
            class="nav-item sub-menu"
            :class="isExpandRevenue ? 'active' : ''"
            @click="isExpandRevenue = !isExpandRevenue"
        >
          <a>
            <RevenueIcon />
            <span class="span-icon">売上管理</span>
            <ArrowDownBold class="icon right arrow-icon" v-if="!isExpandRevenue"/>
            <ArrowUpBold class="icon right arrow-icon" v-if="isExpandRevenue" />
          </a>
          <ul class="child-item">
            <router-link
                tag="li" :to="{ name: 'RevenueSystem' }"
                @click.native="onClickSub($event, 'isExpandRevenue')"
            >総売上
            </router-link>
            <router-link
                tag="li" :to="{ name: 'RevenueUser' }"
                @click.native="onClickSub($event, 'isExpandRevenue')"
            >収入管理
            </router-link>
          </ul>
        </li>
        <li
            class="nav-item sub-menu"
            :class="isExpandPayment ? 'active' : ''"
            @click="isExpandPayment = !isExpandPayment"
        >
          <a>
            <PaymentIcon />
            <span class="span-icon">決済管理</span>
            <ArrowDownBold class="icon right arrow-icon" v-if="!isExpandPayment"/>
            <ArrowUpBold class="icon right arrow-icon" v-if="isExpandPayment" />
          </a>
          <ul class="child-item">
            <router-link
                tag="li" :to="{ name: 'PaymentList' }"
                @click.native="onClickSub($event, 'isExpandPayment')"
                exact
            >決済履歴
            </router-link>
            <router-link
                tag="li" :to="{ name: 'PaymentSetting' }"
                @click.native="onClickSub($event, 'isExpandPayment')"
            >設定
            </router-link>
          </ul>
        </li>
        <router-link tag="li" class="nav-item" :to="{ name: 'LiveManagement' }">
          <LiveIcon />
          <span class="span-icon">ライブ管理</span>
        </router-link>
        <router-link
            tag="li"
            class="nav-item"
            :to="{ name: 'AnnouncementList' }"
        >
          <AnnouncementIcon />
          <span class="span-icon">アナウンス管理</span>
        </router-link>
      </ul>
    </nav>
    <div class="main background-f6f9fa">
      <slot/>
    </div>
  </div>
</template>

<script>
import DashboardIcon from "@/components/Icon/DashboardIcon";
import UserIcon from "@/components/Icon/UserIcon";
import RevenueIcon from "@/components/Icon/RevenueIcon";
import PaymentIcon from "@/components/Icon/PaymentIcon";
import LiveIcon from "@/components/Icon/LiveIcon";
import LogoutIcon from "@/components/Icon/LogoutIcon";
import Cookies from "js-cookie";
import {mapGetters} from "vuex";
import {MESSAGES, MODAL} from "@/utils/const";
import ArrowDownBold from "@/components/Icon/ArrowDownBold";
import ArrowUpBold from "@/components/Icon/ArrowUpBold";
import AnnouncementIcon from "@/components/Icon/AnnouncementIcon";

export default {
  components: {
    AnnouncementIcon,
    ArrowUpBold,
    ArrowDownBold,
    DashboardIcon,
    UserIcon,
    RevenueIcon,
    PaymentIcon,
    LiveIcon,
    LogoutIcon
  },
  data() {
    return {
      isExpandUser: false,
      isExpandRevenue: false,
      isExpandPayment: false,
      isExpandDashboard: false,
      isExpandLive: false,
    }
  },
  mounted() {
    const path = window.location.pathname;
    if (path.startsWith('/users')) {
      this.isExpandUser = true;
    } else if (path.startsWith('/revenues')) {
      this.isExpandRevenue = true;
    } else if (path.startsWith('/payments')) {
      this.isExpandPayment = true;
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
    })
  },
  methods: {
    logOut() {
      this.$root.$refs.loading.start();
      Cookies.remove("access_token");
      this.$router.push({name: "Login"});
      this.$root.$refs.loading.finish();
      this.$toast(
          MESSAGES.LOGOUT_SUCCESS,
          MODAL.MODAL_NOTICE,
          MODAL.MODAL_TYPE_SUCCESS,
      );
    },
    onClickSub(event, name) {
      event.stopPropagation();
      this[name] = true;
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/layout.scss";
</style>
