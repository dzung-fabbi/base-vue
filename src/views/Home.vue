<template>
  <div id="dashboard">
    <div class="heading">
      <div class="left-heading"><h2>ダッシュボード</h2></div>
      <div class="right-heading">
        <div class="input-group date">
          <b-form-datepicker
            id="filter-user-date-picker"
            v-model="filter.date"
            class="input-group-text"
            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
            placeholder="YYYY-MM-DD"
            locale="ja"
            :hide-header="true"
            reset-button
            @input="changeDate"
          >
            <span slot="button-content">
              <CalenderIcon/>
            </span>
          </b-form-datepicker>
        </div>
      </div>
    </div>
    <div class="tab-slider--nav index-tab">
        <ul class="tab-slider--tabs group-info">
            <li
              class="tab-slider--trigger info-item" rel="tab1"
              :class="currentTab === 1 ? 'active' : ''"
              @click="currentTab = 1"
            >
                <div class="tab-title">
                    <div class="top-info">配信者数/月</div>
                    <div class="bottom-info">{{ totalDistributor }}<span class="top-currency"> 人</span></div>
                </div>
            </li>
            <li
              class="tab-slider--trigger info-item" rel="tab2"
              :class="currentTab === 2 ? 'active' : ''"
              @click="currentTab = 2"
            >
                <div class="tab-title">
                    <div class="top-info">月商</div>
                    <div class="bottom-info"><span class="top-currency">¥ </span>{{ totalIncome }}</div>
                </div>
            </li>
            <li
              class="tab-slider--trigger info-item" rel="tab3"
              :class="currentTab === 3 ? 'active' : ''"
              @click="currentTab = 3"
            >
                <div class="tab-title">
                    <div class="top-info">新規利用者数</div>
                    <div class="bottom-info">{{ totalRegister }}<span class="top-currency"> 人</span></div>
                </div>
            </li>
        </ul>
    </div>
    <div class="content">
        <div class="chart-title">総売上グラフ</div>
        <line-chart
          :data="chartData"
        ></line-chart>
    </div>
  </div>
</template>

<script>

import {
  SETTING_DATE_RANGE_LOCALE,
} from "@/utils/const";
import CalenderIcon from "@/components/Icon/CalenderIcon";
import LineChart from '@/components/LineChart';
import * as _ from "lodash";

export default {
  name: 'Home',
  components: {
    CalenderIcon,
    LineChart
  },
  data() {
    return {
      currentTab: 1,
      filter: {
        date: null,
      },
      dataList: {},
      totalDistributor: '',
      totalIncome: '',
      totalRegister: '',
      SETTING_DATE_RANGE_LOCALE,
    }
  },
  created() {
    this.getAnalytic();
    this.getDashboardDistributor();
  },
  computed: {
    chartData() {
      return _.values(this.dataList);
    }
  },
  watch: {
    currentTab() {
      this.getData()
    }
  },
  methods: {
    changeDate() {
      this.getAnalytic();
      this.getData();
    },
    getData() {
      switch (this.currentTab) {
        case 1:
          this.getDashboardDistributor();
          break;
        case 2:
          this.getDashboardIncome();
          break;
        case 3:
          this.getDashboardRegister();
          break;
        default:
          this.getDashboardDistributor();
          break;
      }
    },
    getAnalytic() {
      this.$root.$refs.loading.start();
      let params = {};
      if (this.filter.date) {
        params = {
          ...params,
          date: this.$dayjs(this.filter.date).format('YYYY-MM-DD'),
        };
      }
      this.$store.dispatch(
        "dashboard/getDashboardAnalytic",
        params
      ).then(response => {
        this.totalDistributor = response.data?.user_live;
        this.totalIncome = response.data?.price;
        this.totalRegister = response.data?.user_new;
        this.$root.$refs.loading.finish();
      }).catch(() => {
        this.$root.$refs.loading.finish();
      });
    },
    getDashboardDistributor() {
      this.$root.$refs.loading.start();
      let params = {};
      if (this.filter.date) {
        params = {
          ...params,
          date: this.$dayjs(this.filter.date).format('YYYY-MM-DD'),
        };
      }
      this.$store.dispatch(
        "dashboard/getDashboardDistributor",
        params
      ).then(response => {
        this.dataList = JSON.parse(JSON.stringify(response.data));
        this.$root.$refs.loading.finish();
      }).catch(() => {
        this.$root.$refs.loading.finish();
      });
    },
    getDashboardIncome() {
      this.$root.$refs.loading.start();
      let params = {};
      if (this.filter.date) {
        params = {
          ...params,
          date: this.$dayjs(this.filter.date).format('YYYY-MM-DD'),
        };
      }
      this.$store.dispatch(
        "dashboard/getDashboardIncome",
        params
      ).then(response => {
        this.dataList = JSON.parse(JSON.stringify(response.data));
        this.$root.$refs.loading.finish();
      }).catch(() => {
        this.$root.$refs.loading.finish();
      });
    },
    getDashboardRegister() {
      this.$root.$refs.loading.start();
      let params = {};
      if (this.filter.date) {
        params = {
          ...params,
          date: this.$dayjs(this.filter.date).format('YYYY-MM-DD'),
        };
      }
      this.$store.dispatch(
        "dashboard/getDashboardRegister",
        params
      ).then(response => {
        this.dataList = JSON.parse(JSON.stringify(response.data));
        this.$root.$refs.loading.finish();
      }).catch(() => {
        this.$root.$refs.loading.finish();
      });
    },
    setUser(number) {
      if (!number) return;
      return `${number} 人`;
    },
    setPrice(price) {
      if (!price) return;
      return `¥ ${price}`;
    },
  }
}
</script>

<style scoped lang='scss'>
@import '../assets/scss/home.scss';
</style>
