<template>
  <div id="revenue-user-detail">
    <div class="heading">
        <div class="left-heading"><h2>収入履歴詳細</h2></div>
        <div class="right-heading">
            <div class="input-group date" id="datepicker" data-date-format="dd-mm-yyyy">
              <date-range-picker
                class="input-group-text date-range-picker"
                id="filter-user-date-picker"
                ref="picker"
                :locale-data="SETTING_DATE_RANGE_LOCALE"
                :timePicker="false"
                :show-week-numbers="false"
                :showDropdowns="false"
                :autoApply="false"
                v-model="filter.date"
                @update="changeDate"
                :opens="'left'"
                :class="{'no-value': filterDateNull }"
              />
              <CalenderIcon class="date-range-picker-icon"/>
            </div>
        </div>
    </div>

    <div class="content-group">
        <div class="left-content">
            <div class="avatar-image d-flex flex-column">
                <img :src="userInfo.image_avatar_path || null" class="img-fluid mt-2 img-background" alt="">
            </div>
            <div class="detail color-8B9DA5">
                <div class="row mb-5">
                    <div class="col-4 text-left">名前</div>
                    <div class="col-8 text-end">{{ userInfo.name }}</div>
                </div>
                <div class="row mb-5">
                    <div class="col-5 text-left">メールアドレス</div>
                    <div class="col-7 text-end">{{ userInfo.email }}</div>
                </div>
                <div class="row mb-5">
                    <div class="col-5 text-left">電話番号</div>
                    <div class="col-7 text-end">{{ userInfo.phone }}</div>
                </div>
                <div class="row mb-5">
                    <div class="col-5 text-left">性別</div>
                    <div class="col-7 text-end">{{ userInfo.gender }}</div>
                </div>
                <div class="row mb-5">
                    <div class="col-5 text-left">生年月日</div>
                    <div class="col-7 text-end">{{ userInfo.birthday }}</div>
                </div>
                <div class="row mb-5">
                    <div class="col-5 text-left">フォロワー</div>
                    <div class="col-7 text-end">{{ userInfo.follow_count }}</div>
                </div>
                <div class="row mb-5">
                    <div class="col-5 text-left">フォロー中</div>
                    <div class="col-7 text-end">{{ userInfo.following_count }}</div>
                </div>
                <div class="row mb-3">
                    <div class="col-5 text-left">イイコ</div>
                    <div class="col-7 text-end">{{ userInfo.like_count }}</div>
                </div>
            </div>
        </div>
        <div class="right-content">
            <div class="tab-slider--nav">
                <ul class="tab-slider--tabs">
                    <li
                      class="tab-slider--trigger" rel="tab1"
                      :class="currentTab === 1 ? 'active' : ''"
                      @click="currentTab = 1"
                    >
                        <div class="tab-title text-start">
                            <div class="top-title">総収入</div>
                            <div class="bottom-title">{{ totalIncome }}<span class="top-currency"> Pt</span></div>
                        </div>
                    </li>
                    <li
                      class="tab-slider--trigger" rel="tab2"
                      :class="currentTab === 2 ? 'active' : ''"
                      @click="currentTab = 2"
                    >
                        <div class="tab-title text-start">
                            <div class="top-title">総使用コイン</div>
                            <div class="bottom-title">{{ formatMoney(totalDonate) }}<span class="top-currency"> コイン</span></div>
                        </div>
                    </li>
                    <li
                      class="tab-slider--trigger" rel="tab3"
                      :class="currentTab === 3 ? 'active' : ''"
                      @click="currentTab = 3"
                    >
                        <div class="tab-title text-start">
                            <div class="top-title">総チャージ額</div>
                            <div class="bottom-title">{{ formatMoney(totalPurchase) }}<span class="top-currency"> コイン</span></div>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="tab-slider--container">
              <div class="table-content">
                <table v-if="currentTab === 1" class="table color-8B9DA5">
                  <thead>
                    <tr>
                      <th scope="col" class="col">ワンコインID</th>
                      <th scope="col" class="col">付与者</th>
                      <th scope="col" class="col">日付</th>
                      <th scope="col" class="col">与えるポイント</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(user, index) in tableData" :key="index">
                    <td class="pt-3">{{ user.user_name }}</td>
                    <td class="pt-3">{{ user.name }}</td>
                    <td class="pt-3">{{ user.created_at }}</td>
                    <td class="pt-3">{{ user.point }}</td>
                  </tr>
                  </tbody>
                </table>
                <table v-if="currentTab === 2" class="table color-8B9DA5">
                  <thead>
                    <tr>
                      <th scope="col" class="col">ワンコインID</th>
                      <th scope="col" class="col">付与された人</th>
                      <th scope="col" class="col">日付</th>
                      <th scope="col" class="col">使用コイン</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(user, index) in tableData" :key="index">
                    <td class="pt-3">{{ user.user_name }}</td>
                    <td class="pt-3">{{ user.name }}</td>
                    <td class="pt-3">{{ user.created_at }}</td>
                    <td class="pt-3">{{ user.coin }}</td>
                  </tr>
                  </tbody>
                </table>
                <table v-if="currentTab === 3" class="table color-8B9DA5">
                  <thead>
                    <tr>
                      <th scope="col" class="col">チャージ日</th>
                      <th scope="col" class="col">チャージ額</th>
                      <th scope="col" class="col">与えるコイン</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(user, index) in tableData" :key="index">
                    <td class="pt-3">{{ user.created_at }}</td>
                    <td class="pt-3">{{ user.price }}</td>
                    <td class="pt-3">{{ user.coin }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
        </div>
    </div>
    <BasePaginate
        v-if="tableData.length > 0"
        :current-page.sync="paginate.currentPage"
        :total-page.sync="paginate.total"
        :per-page.sync="paginate.perPage"
        :total-record.sync="paginate.totalRecord"
        @onPageChanged="changePage"
    />
  </div>
</template>

<script>

import {
  PER_PAGE_NUMBER,
  USER_TYPE_OPTIONS,
  SETTING_DATE_RANGE_LOCALE,
  USER_GENDER_OPTIONS
} from "@/utils/const";
import BasePaginate from "@/components/BasePaginate";
import CalenderIcon from "@/components/Icon/CalenderIcon";
import {numberWithCommas} from "@/utils/convert";

export default {
  name: 'UserRevenueDetail',
  components: {
    BasePaginate,
    CalenderIcon
  },
  data() {
    return {
      tableData: [],
      userInfo: {},
      currentTab: 1,
      paginate: {
        currentPage: 1,
        total: 0,
        totalRecord: 0,
      },
      filter: {
        date: {
          startDate: null,
          endDate: null,
        },
      },
      totalIncome: '',
      totalDonate: '',
      totalPurchase: '',
      SETTING_DATE_RANGE_LOCALE
    }
  },
  created() {
    this.getUserDetail();
    this.getAnalytic();
    this.getUserRevenueIncome();
  },
  watch: {
    currentTab() {
      this.paginate.currentPage = 1;
      this.getData()
    }
  },
  computed: {
    filterDateNull() {
      return !this.filter.date.startDate || this.filter.date.endDate;
    }
  },
  methods: {
    changeDate() {
      this.paginate.currentPage = 1;
      this.getAnalytic();
      this.getData();
    },
    getAnalytic() {
      this.$root.$refs.loading.start();
      let params = {
        revenue_id: this.$route.params.id
      };
      if (this.filter.date.startDate) {
        params = {
          ...params,
          date_from: this.$dayjs(this.filter.date.startDate).format('YYYY-MM-DD'),
          date_to: this.$dayjs(this.filter.date.endDate).format('YYYY-MM-DD'),
        };
      }
      this.$store.dispatch(
        "revenue/getUserRevenueAnalytic",
        params
      ).then(response => {
        this.totalIncome = response.data?.point_receive;
        this.totalDonate = response.data?.coin_donate;
        this.totalPurchase = response.data?.coin_purchase;
        this.$root.$refs.loading.finish();
      }).catch(() => {
        this.$root.$refs.loading.finish();
      });
    },
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
      this.$root.$refs.loading.finish();
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
    getData() {
      switch (this.currentTab) {
        case 1:
          this.getUserRevenueIncome();
          break;
        case 2:
          this.getUserRevenueDonate();
          break;
        case 3:
          this.getUserRevenuePurchase();
          break;
        default:
          this.getUserRevenueIncome();
          break;
      }
    },
    setParams() {
      let params = {
        page: this.paginate.currentPage,
        limit: PER_PAGE_NUMBER,
        revenue_id: this.$route.params.id
      };
      if (this.filter.date.startDate) {
        params = {
          ...params,
          date_from: this.$dayjs(this.filter.date.startDate).format('YYYY-MM-DD'),
          date_to: this.$dayjs(this.filter.date.endDate).format('YYYY-MM-DD'),
        };
      }
      return params;
    },
    async getUserRevenueIncome() {
      this.$root.$refs.loading.start();
      const params = this.setParams();
      this.$store.dispatch(
        "revenue/getUserRevenueIncome",
        params
      ).then(responseData => {
        this.paginate = {
          currentPage: responseData.pagination.current_page,
          totalRecord: responseData.pagination.total_record,
          total: responseData.pagination.total_page
        }
        this.tableData = (responseData.data || []).map(revenue => {
          return {
            ...revenue,
            point: this.setPointReceved(revenue.point),
            created_at: this.$dayjs(revenue.created_at).format('YYYY-MM-DD')
          }
        });
        this.$root.$refs.loading.finish();
      }).catch(() => {
        this.$root.$refs.loading.finish();
      });
    },
    async getUserRevenuePurchase() {
      this.$root.$refs.loading.start();
      const params = this.setParams();
      this.$store.dispatch(
        "revenue/getUserRevenuePurchase",
        params
      ).then(responseData => {
        this.paginate = {
          currentPage: responseData.pagination.current_page,
          totalRecord: responseData.pagination.total_record,
          total: responseData.pagination.total_page
        }
        this.tableData = (responseData.data || []).map(revenue => {
          return {
            ...revenue,
            coin: this.setCoin(revenue.coin),
            price: this.setPrice(revenue.price),
            created_at: this.$dayjs(revenue.created_at).format('YYYY-MM-DD')
          }
        });
        this.$root.$refs.loading.finish();
      }).catch(() => {
        this.$root.$refs.loading.finish();
      });
    },
    async getUserRevenueDonate() {
      this.$root.$refs.loading.start();
      const params = this.setParams();
      this.$store.dispatch(
        "revenue/getUserRevenueDonate",
        params
      ).then(responseData => {
        this.paginate = {
          currentPage: responseData.pagination.current_page,
          totalRecord: responseData.pagination.total_record,
          total: responseData.pagination.total_page
        }
        this.tableData = (responseData.data || []).map(revenue => {
          return {
            ...revenue,
            coin: this.setCoin(revenue.coin),
            created_at: this.$dayjs(revenue.created_at).format('YYYY-MM-DD')
          }
        });
        this.$root.$refs.loading.finish();
      }).catch(() => {
        this.$root.$refs.loading.finish();
      });
    },
    setUserType(type) {
      if (type) {
        return USER_TYPE_OPTIONS[2].text;
      }
      return USER_TYPE_OPTIONS[1].text;
    },
    setPointReceved(point) {
      if (!point) return;
      return `${point} Pt`;
    },
    setCoin(coin) {
      if (!coin) return;
      return `${this.formatMoney(coin)} コイン`;
    },
    setPrice(price) {
      if (!price) return;
      return `¥ ${this.formatMoney(price)}`;
    },
    changePage(page) {
      this.paginate.currentPage = page;
      this.getData();
    },
    handleFilter() {
      this.paginate.currentPage = 1;
      this.getUserRevenueIncome();
    },
    handleBlur() {
      if (this.filter.id) {
        this.filter.id = this.filter.id.trim();
      }
    },
    formatMoney(input) {
      return numberWithCommas(input, '.')
    },
  }
}
</script>

<style scoped lang='scss'>
@import '@/assets/scss/user/detail.scss';
@import '@/assets/scss/revenue/userDetail.scss';
</style>
