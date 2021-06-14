<template>
  <div>
    <div class="heading text-start">
      <div class="left-heading"><h2>総売上</h2></div>
      <div class="right-heading live-management-heading">
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
              @update="getSystemRevenueList"
              :opens="'left'"
              :class="{'no-value': filterDateNull }"
          >
          </date-range-picker>
          <CalenderIcon class="date-range-picker-icon"/>
        </div>
      </div>
    </div>
    <div class="content content-info">
      <div class="top-info">
        <h3>総売上</h3>
      </div>
      <div class="bottom-info">
        <div><span class="top-currency">¥</span> {{ formatMoney(this.total) }}</div>
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
          <div class="input-group filter ps-0">
            <b-form-select
                class="type form-select"
                v-model="filter.status"
                :options="status"
            />
          </div>
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
            <th scope="col">取引日</th>
            <th scope="col">取引金額</th>
            <th scope="col">与えるコイン</th>
            <th scope="col">ステータス</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(revenue, index) in systemRevenueList" :key="index">
            <td class="pt-3 pb-3">{{ revenue.user_name }}</td>
            <td class="pt-3 pb-3">{{ revenue.name }}</td>
            <td class="pt-3 pb-3">{{ revenue.create_at }}</td>
            <td class="pt-3 pb-3"><span class="table-currency">¥ </span>{{ formatMoney(revenue.price) }}</td>
            <td class="pt-3 pb-3">{{ formatMoney(revenue.coin) }}<span class="table-currency"> コイン</span></td>
            <td class="pt-3 pb-3">{{ revenue.status }}</td>
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
import {PER_PAGE_NUMBER, SYSTEM_REVENUE_STATUS_OPTIONS, SETTING_DATE_RANGE_LOCALE} from "@/utils/const";
import SearchIcon from "@/components/Icon/SearchIcon";
import CalenderIcon from "@/components/Icon/CalenderIcon";
import {numberWithCommas} from "@/utils/convert";

export default {
  name: 'RevenueSystem',
  components: {
    CalenderIcon,
    SearchIcon,
    BasePaginate
  },
  data() {
    return {
      systemRevenueList: [
        {
          id: null,
          user_id: null,
          user_name: null,
          create_at: null,
          price: null,
          coin: null,
          status: null,
        }
      ],
      paginate: {
        currentPage: 1,
        total: 0,
        totalRecord: 0,
      },
      filter: {
        id: null,
        status: 2,
        date: {
          startDate: null,
          endDate: null,
        },
      },
      status: SYSTEM_REVENUE_STATUS_OPTIONS,
      total: 0,
      SETTING_DATE_RANGE_LOCALE
    }
  },
  created() {
    this.getSystemRevenueList();
  },
  computed: {
    filterDateNull() {
      return !this.filter.date.startDate || this.filter.date.endDate;
    }
  },
  methods: {
    async getSystemRevenueList() {
      this.$root.$refs.loading.start();
      const params = {};
      if (this.filter.id !== null && this.filter.id !== '') {
        params.q = this.filter.id;
      } else {
        params.q = '';
      }
      if (this.filter.status !== null && this.filter.status !== '' && this.filter.status !== 2) {
        params.status = this.filter.status;
      } else {
        params.status = '';
      }
      if (this.filter.date.startDate !== null && this.filter.date.endDate !== null) {
        params.date_from = this.setFormatDate(this.filter.date.startDate);
        params.date_to = this.setFormatDate(this.filter.date.endDate);
      } else {
        params.date_from = '';
        params.date_to = '';
      }
      if (this.paginate.currentPage) {
        params.page = this.paginate.currentPage;
      }
      params.limit = PER_PAGE_NUMBER;
      await this.$store.dispatch("revenue/getSystemRevenueList", params);
      this.systemRevenueList = this.$store.getters["revenue/systemRevenueList"].data.data;
      this.total = this.$store.getters["revenue/systemRevenueList"].data.total;
      this.paginate.currentPage = this.$store.getters["revenue/systemRevenueList"].pagination.current_page;
      this.paginate.totalRecord = this.$store.getters["revenue/systemRevenueList"].pagination.total_record;
      this.paginate.total = this.$store.getters["revenue/systemRevenueList"].pagination.total_page;
      this.systemRevenueList = this.systemRevenueList.map(revenue => {
        revenue.create_at = this.setFormatDate(revenue.create_at);
        revenue.status = this.setStatus(revenue.status);
        return revenue;
      });
      this.$root.$refs.loading.finish();
    },
    setFormatDate(date) {
      if (!date) return;
      return this.$dayjs(date).format('YYYY-MM-DD');
    },
    setStatus(status) {
      return status ? '成功' : '失敗';
    },
    changePage(page) {
      this.paginate.currentPage = page;
      this.getSystemRevenueList();
    },
    handleFilter() {
      this.paginate.currentPage = 1;
      this.getSystemRevenueList();
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
@import '@/assets/scss/revenue/system.scss';
</style>
