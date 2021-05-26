<template>
  <div class="layout">
    <div class="header-nav">
      <ul class="nav justify-content-end">
        <li class="nav-item dropdown">
          <b-dropdown id="dropdown-right" right text="管理者" class="nav-link text-body fw-bold">
            <b-dropdown-item>
              <LogoutIcon />
              <span>ログアウト</span>
            </b-dropdown-item>
          </b-dropdown>
        </li>
      </ul>
    </div>
    <nav id="sidebar" class="col sidebar">
      <router-link class="navbar-brand" :to="{ name: 'Home' }">
        <img :src="require('@/assets/image/logo.png')" alt="logo" class="logo">
      </router-link>
      <ul class="nav flex-column vertical-nav">
        <li class="nav-item sub-menu">
          <router-link :to="{ name: 'Home' }">
            <DashboardIcon />
            <span>ダッシュボード</span>
          </router-link>
        </li>
        <li class='nav-item sub-menu'>
          <a>
            <UserIcon />
            <span>ユーザー管理</span>
            <i class="fa fa-chevron-up right" aria-hidden="true"></i>
          </a>
          <ul class="child-item">
            <li><router-link :to="{ name:'UserList' }">ユーザー一覧</router-link></li>
            <li><router-link :to="{ name: 'UserReportList' }">ブロック一覧管理</router-link></li>
            <li><router-link :to="{ name: 'UserBlockList' }">ブロック一覧管理</router-link></li>
          </ul>
        </li>
        <li class="nav-item sub-menu">
          <a>
            <RevenueIcon />
            <span>売上管理</span>
            <i class="fa fa-chevron-up right" aria-hidden="true"></i>
          </a>
          <ul class="child-item">
            <li><router-link :to="{ name: 'RevenueSystem' }">総売上</router-link></li>
            <li><router-link :to="{ name: 'RevenueUser' }">収入管理</router-link></li>
          </ul>
        </li>
        <li class="nav-item sub-menu">
          <a>
            <PaymentIcon />
            <span>決済管理</span>
            <i class="fa fa-chevron-up right" aria-hidden="true"></i>
          </a>
          <ul class="child-item">
            <li><router-link :to="{ name: 'PaymentList' }">決済履歴</router-link></li>
            <li><router-link :to="{ name: 'PaymentSetting' }">設定</router-link></li>
          </ul>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'LiveManagement' }">
            <LiveIcon />
            <span>ライブ管理</span>
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="main background-f6f9fa">
      <slot />
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
export default {
  components: {
    DashboardIcon,
    UserIcon,
    RevenueIcon,
    PaymentIcon,
    LiveIcon,
    LogoutIcon
  },
  data()  {
    return {

    }
  },
  methods: {
    
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/layout.scss";
</style>
