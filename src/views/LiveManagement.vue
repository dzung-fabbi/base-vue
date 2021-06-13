<template>
  <div>
    <div class="heading text-start">
      <div class="left-heading"><h2>ライブ管理</h2></div>
      <div class="right-heading live-management-heading">
        <div class="input-group date" id="datepicker" data-date-format="dd-mm-yyyy">
          <b-form-datepicker
              id="filter-user-date-picker"
              v-model="filter.date"
              class="input-group-text"
              :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
              placeholder="YYYY-MM-DD"
              locale="ja"
              :hide-header="true"
              reset-button
              @input="handleFilter"
          >
              <span slot="button-content">
                <CalenderIcon/>
              </span>
          </b-form-datepicker>
        </div>
      </div>
    </div>
    <div class="content">
      <ValidationObserver v-slot="{ handleSubmit }">
        <div class="table-header row">
          <ValidationProvider
              name="名前・ワンコインID検索"
              v-slot="{ errors }"
              class="input-group search"
          >
                <span class="input-group-text mb-2">
                    <SearchIcon />
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
            <th scope="col">ライブ日</th>
            <th scope="col">ライブ時間</th>
            <th scope="col">新規フォロワー</th>
            <th scope="col">付与ポイント</th>
            <th scope="col">イイコ</th>
            <th scope="col">視聴者</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(live, index) in liveManagementList" :key="index">
            <td class="pt-3 pb-3">{{ live.user_name }}</td>
            <td class="pt-3 pb-3">{{ live.name }}</td>
            <td class="pt-3 pb-3">{{ live.liveDate }}</td>
            <td class="pt-3 pb-3">{{ live.liveTime }}</td>
            <td class="pt-3 pb-3">{{ live.new_follow_count }}</td>
            <td class="pt-3 pb-3">{{ live.point }} Pt</td>
            <td class="pt-3 pb-3">{{ live.like_count }}</td>
            <td class="pt-3 pb-3">{{ live.view_count }}</td>
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
import {PER_PAGE_NUMBER} from "@/utils/const";
import SearchIcon from "@/components/Icon/SearchIcon";
import CalenderIcon from "@/components/Icon/CalenderIcon";

export default {
  name: 'LiveManagement',
  components: {CalenderIcon, SearchIcon, BasePaginate},
  data() {
    return {
      liveManagementList: [
        {
          id: 1,
          name: null,
          start_time: null,
          end_time: null,
          status: 2,
          point: 0,
          like_count: 0,
          new_follow_count: 0,
          view_count: 0,
          live_id: 1,
          liveDate: null,
          liveTime: null,
        }
      ],
      paginate: {
        currentPage: 1,
        total: 12,
        totalRecord: 12,
      },
      filter: {
        id: null,
        date: null,
      },
    }
  },
  created() {
    this.getLiveManagementList();
  },
  methods: {
    async getLiveManagementList() {
      this.$root.$refs.loading.start();
      const params = {};
      if (this.filter.id !== null && this.filter.id !== '') {
        params.q = this.filter.id;
      } else {
        params.q = '';
      }
      if (this.filter.date !== null && this.filter.date !== '') {
        params.date = this.filter.date;
      } else {
        params.date = '';
      }
      params.limit = PER_PAGE_NUMBER;
      if (this.paginate.currentPage) {
        params.page = this.paginate.currentPage;
      }
      await this.$store.dispatch("live/getLiveManagementList", params);
      this.liveManagementList = this.$store.getters["live/liveManagementList"].data;
      this.paginate.currentPage = this.$store.getters["live/liveManagementList"].pagination.current_page;
      this.paginate.totalRecord = this.$store.getters["live/liveManagementList"].pagination.total_record;
      this.paginate.total = this.$store.getters["live/liveManagementList"].pagination.total_page;
      this.liveManagementList = this.liveManagementList.map(live => {
        live.liveDate = this.getDateFormat(live.start_time);
        live.liveTime = this.getDiffHours(live.start_time, live.end_time);
        return live;
      });
      this.$root.$refs.loading.finish();
    },
    changePage(page) {
      this.paginate.currentPage = page;
      this.getLiveManagementList();
    },
    getDateFormat(date) {
      if (!date) return;
      return this.$dayjs(date).format('YYYY-MM-DD');
    },
    getTimeFormat(time) {
      if (!time) return;
      return this.$dayjs(time).format('hh:HH');
    },
    handleFilter() {
      this.paginate.currentPage = 1;
      this.getLiveManagementList();
    },
    handleBlur() {
      if (this.filter.id) {
        this.filter.id = this.filter.id.trim();
      }
    },
    getDiffHours(startTime, endTime) {
      if (!startTime || !endTime) return 0;
      const start = this.$dayjs(startTime);
      const end = this.$dayjs(endTime);

      let minutes = end.diff(start, 'minute');
      let hours = Math.floor(minutes / 60);
      minutes = minutes - (hours * 60);
      let days = Math.floor(hours / 24);
      hours = hours - (days * 24);
      if (days > 0) {
        if (days < 10) {
          days = `0${days}`;
        }
      }
      if (hours < 10) {
        hours = `0${hours}`;
      }
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      if (days > 0) {
        return `${days}:${hours}:${minutes}`;
      }
      return `${hours}:${minutes}`;
    }
  }
}
</script>

<style scoped lang='scss'>
@import '@/assets/scss/revenue/system.scss';
</style>
