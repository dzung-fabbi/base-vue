<template>
  <div>
    <div class="heading text-start">
      <h2>決済履歴</h2>
    </div>
    <div class="content content-info">
      <div class="top-info">
        <h3>総決済金額要</h3>
      </div>
      <div class="bottom-info">
        <div><span class="top-currency">¥</span> {{ this.total }}</div>
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
          <div class="input-group date" id="datepicker" data-date-format="dd-mm-yyyy">
            <b-form-datepicker
                id="filter-user-date-picker"
                v-model="filter.date"
                class="mb-2 filter-user-date-picker"
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
          </div>
          <div class="input-group group-btn-filter">
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
            <th scope="col">決済日</th>
            <th scope="col">決済金額</th>
            <th scope="col">実受取金額</th>
            <th scope="col">ステータス</th>
            <th scope="col">最後の更新</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(payment, index) in managementList" :key="index">
            <td class="pt-3 pb-3">{{ payment.user_name }}</td>
            <td class="pt-3 pb-3">{{ payment.name }}</td>
            <td class="pt-3 pb-3">{{ payment.create_at }}</td>
            <td class="pt-3 pb-3"><span class="table-currency">¥</span> {{ payment.money_total }}</td>
            <td class="pt-3 pb-3"><span class="table-currency">¥</span> {{ payment.money_receive }}</td>
            <td class="pt-3 pb-3">{{ payment.status }}</td>
            <td class="pt-3 pb-3">{{ payment.update_at }}</td>
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
import {PAYMENT_MANAGEMENT_STATUS_OPTIONS, PER_PAGE_NUMBER} from "@/utils/const";
import SearchIcon from "@/components/Icon/SearchIcon";
import CalenderIcon from "@/components/Icon/CalenderIcon";

export default {
  name: 'PaymentList',
  components: {CalenderIcon, SearchIcon, BasePaginate},
  data() {
    return {
      managementList: [
        {
          id: null,
          name: null,
          user_id: null,
          create_at: null,
          money_total: null,
          money_receive: null,
          status: null,
          update_at: null,
        }
      ],
      paginate: {
        currentPage: 1,
        total: 0,
        totalRecord: 0,
      },
      filter: {
        id: null,
        status: 3,
        date: null,
      },
      status: PAYMENT_MANAGEMENT_STATUS_OPTIONS,
      total: 0,
    }
  },
  created() {
    this.getPaymentManagementList();
  },
  methods: {
    async getPaymentManagementList() {
      this.$root.$refs.loading.start();
      const params = {};
      if (this.filter.id !== null && this.filter.id !== '') {
        params.q = this.filter.id;
      } else {
        params.q = '';
      }
      if (this.filter.status !== null && this.filter.status !== '' && this.filter.status !== 3) {
        params.status = this.filter.status;
      } else {
        params.status = '';
      }
      if (this.filter.date !== null && this.filter.date !== '') {
        params.date = this.filter.date;
      } else {
        params.date = '';
      }
      if (this.paginate.currentPage) {
        params.page = this.paginate.currentPage;
      }
      params.limit = PER_PAGE_NUMBER;
      await this.$store.dispatch("payment/getPaymentManagementList", params);
      this.managementList = this.$store.getters["payment/managementList"].data.data;
      this.total = this.$store.getters["payment/managementList"].data.total;
      this.paginate.currentPage = this.$store.getters["payment/managementList"].pagination.current_page;
      this.paginate.totalRecord = this.$store.getters["payment/managementList"].pagination.total_record;
      this.paginate.total = this.$store.getters["payment/managementList"].pagination.total_page;
      this.managementList = this.managementList.map(payment => {
        payment.create_at = this.setFormatDate(payment.create_at);
        payment.update_at = this.setFormatDate(payment.update_at);
        payment.status = this.setPaymentStatus(payment.status);
        return payment;
      });
      this.$root.$refs.loading.finish();
    },
    changePage(page) {
      this.paginate.currentPage = page;
      this.getPaymentManagementList();
    },
    handleBlur() {
      if (this.filter.id) {
        this.filter.id = this.filter.id.trim();
      }
    },
    handleFilter() {
      this.paginate.currentPage = 1;
      this.getPaymentManagementList();
    },
    setFormatDate(date) {
      if (!date) return;
      return this.$dayjs(date).format('YYYY-MM-DD');
    },
    setPaymentStatus(status) {
      switch (status) {
        case 1: return '成功';
        case 2: return '失敗';
        default: return '進行中';
      }
    },
  }
}
</script>

<style scoped lang='scss'>
@import '@/assets/scss/revenue/system.scss';
</style>
