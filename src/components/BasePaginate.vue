<template>
  <div class="paginate d-flex justify-content-end align-items-center">
    <span class="pagination-detail">表示： {{ from_user }}-{{ this.to_user }} 件</span>
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
      default: 12,
    },
  },
  data() {
    return {
      from_user: 1,
      to_user: 12,
    }
  },
  computed: {
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPage;
    },
  },
  watch: {
    currentPage() {
      this.setFromUser();
      this.setToUser();
    }
  },
  methods: {
    decrementPage() {
      this.$emit('onPageChanged', this.currentPage - 1);
    },
    incrementPage() {
      this.$emit('onPageChanged', this.currentPage + 1);
    },
    setFromUser() {
      this.from_user = (this.perPage * this.currentPage) - (this.perPage - 1);
    },
    setToUser() {
      this.to_user = this.perPage * this.currentPage;
    },
  }
}
</script>
