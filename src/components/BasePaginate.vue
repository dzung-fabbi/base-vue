<template>
  <div class="paginate d-flex justify-content-end align-items-center">
    <span class="pagination-detail">表示： {{ fromRecord }}-{{ toRecord }} 件</span>
    <div class='pagination-container align-items-center ms-2'>
      <nav aria-label="Page navigation example">
        <ul class="pagination mb-0">
          <li class="page-item" :class="{'disabled': isInFirstPage }">
            <button class="btn page-link" v-on:click="decrementPage">
              <span aria-hidden="true"><PreviousPageIcon/></span>
            </button>
          </li>
          <li class="page-item">
            <button class="btn page-link">{{ currentPage }}</button>
          </li>
          <li class="page-item" :class="{'disabled': isInLastPage }">
            <button class=" btn page-link" v-on:click="incrementPage">
              <span aria-hidden="true"><NextPageIcon/></span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
    <span class="pagination-total ms-2">総計：{{ totalPage }}ページ</span>
  </div>
</template>
<script>
import NextPageIcon from "@/components/Icon/NextPageIcon";
import PreviousPageIcon from "@/components/Icon/PreviousPageIcon";
import {PER_PAGE_NUMBER} from '@/utils/const';

export default {
  components: {
    PreviousPageIcon,
    NextPageIcon
  },
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    totalPage: {
      type: Number,
      required: true,
      default: 1,
    },
    perPage: {
      type: Number,
      required: true,
      default: PER_PAGE_NUMBER,
    },
    totalRecord: {
      type: Number,
      required: true,
      default: PER_PAGE_NUMBER,
    }
  },
  data() {
    return {
      from_record: 1,
      to_record: PER_PAGE_NUMBER,
    }
  },
  computed: {
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPage;
    },
    fromRecord() {
      const fromUser = (this.perPage * this.currentPage) - (this.perPage - 1);
      if (fromUser < this.totalRecord) {
        return fromUser;
      } else {
        return this.totalRecord;
      }
    },
    toRecord() {
      const toUser = this.perPage * this.currentPage;
      if (toUser > this.totalRecord) {
        return this.totalRecord;
      } else {
        return toUser;
      }
    }
  },
  methods: {
    decrementPage() {
      this.$emit('onPageChanged', this.currentPage - 1);
    },
    incrementPage() {
      this.$emit('onPageChanged', this.currentPage + 1);
    },
  }
}
</script>
