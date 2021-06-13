<template>
  <div id="revenue-user">
    <div class="heading text-start">
      <div class="left-heading"><h2>総売上</h2></div>
      <div class="right-heading live-management-heading">
        <button type="button"
          @click="exportData"
          class="btn btn-dark background-black float-end me-2 w-184">
          CSV 出力
        </button>
      </div>
    </div>
    <div class="content">
      <ValidationObserver v-slot="{ handleSubmit }">
        <div class="table-header row">
          <ValidationProvider
              name="名前・ワンコインID検索"
              v-slot="{ errors }"
              class="input-group search"
              rules="max:255"
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
            <th scope="col">ユーザータイプ</th>
            <th scope="col">総合ランキング</th>
            <th scope="col">総付与ポイント</th>
            <th scope="col">総使用コイン</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(revenue, index) in userRevenueList" :key="index">
            <td class="pt-3 pb-3">{{ revenue.user_name }}</td>
            <td class="pt-3 pb-3">{{ revenue.name }}</td>
            <td class="pt-3 pb-3">{{ revenue.user_type }}</td>
            <td class="pt-3 pb-3">{{ revenue.ranking }}</td>
            <td class="pt-3 pb-3">{{ revenue.point_receive }}</td>
            <td class="pt-3 pb-3">{{ revenue.coin_use }}</td>
            <td>
              <router-link :to="{ name:'RevenueUserDetail', params: { id: revenue.id } }">
                <button class="btn">
                  <EyeIcon/>
                </button>
              </router-link>
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
import { PER_PAGE_NUMBER, USER_TYPE_OPTIONS } from "@/utils/const";
import SearchIcon from "@/components/Icon/SearchIcon";
import EyeIcon from "@/components/Icon/EyeIcon";
import {numberWithCommas} from "@/utils/convert";

export default {
  name: 'RevenueUser',
  components: {
    SearchIcon,
    EyeIcon,
    BasePaginate
  },
  data() {
    return {
      userRevenueList: [],
      paginate: {
        currentPage: 1,
        total: 0,
        totalRecord: 0,
      },
      filter: {
        id: null,
      },
    }
  },
  created() {
    this.getUserRevenueList();
  },
  methods: {
    async getUserRevenueList() {
      this.$root.$refs.loading.start();
      const params = {};
      if (this.filter.id !== null && this.filter.id !== '') {
        params.q = this.filter.id;
      } else {
        params.q = '';
      }
      if (this.paginate.currentPage) {
        params.page = this.paginate.currentPage;
      }
      params.limit = PER_PAGE_NUMBER;
      await this.$store.dispatch("revenue/getUserRevenueList", params);
      const responseData = this.$store.getters["revenue/userRevenueList"];
      this.userRevenueList = responseData.data;
      this.paginate.currentPage = responseData.pagination.current_page;
      this.paginate.totalRecord = responseData.pagination.total_record;
      this.paginate.total = responseData.pagination.total_page;
      this.userRevenueList = this.userRevenueList.map(revenue => {
        return {
          ...revenue,
          user_type: this.setUserType(revenue.is_distribute),
          point_receive: this.setPointReceved(revenue.point_receive),
          coin_use: this.setCoin(revenue.coin_use)
        }
      });
      this.$root.$refs.loading.finish();
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
    changePage(page) {
      this.paginate.currentPage = page;
      this.getUserRevenueList();
    },
    handleFilter() {
      this.paginate.currentPage = 1;
      this.getUserRevenueList();
    },
    handleBlur() {
      if (this.filter.id) {
        this.filter.id = this.filter.id.trim();
      }
    },
    exportData() {
      this.$root.$refs.loading.start();
      this.$store.dispatch("revenue/export").then(res => {
        if (res.data?.url) {
          var dlink = document.createElement('a');
          dlink.href = res.data.url;
          dlink.click();
          dlink.remove();
        }
        this.$root.$refs.loading.finish();
      }).catch(() => {
        this.$root.$refs.loading.finish();
      });
    },
    formatMoney(input) {
      return numberWithCommas(input, '.')
    },
  }
}
</script>

<style scoped lang='scss'>
@import '@/assets/scss/revenue/user.scss';
</style>
