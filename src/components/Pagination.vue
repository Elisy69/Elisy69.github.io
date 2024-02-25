<script setup>
import usePagination from "../composables/usePagination";
import { useSearch } from "../composables/useSearch";

const {
  getProducts,
  getFilteredProducts,
  currentPage,
  totalPages,
  filterValue,
} = useSearch();
const { pagination } = usePagination(currentPage, totalPages);

const handlePagination = (page) => {
  filterValue.value ? getFilteredProducts(page) : getProducts(page);
};
</script>

<template>
  <ul v-if="!(pagination[0] === 0)" class="wrapper">
    <li class="listBack">
      <button
        class="pagButton"
        type="button"
        @click="handlePagination(currentPage - 1)"
      >
        Previous
      </button>
    </li>
    <li v-for="(page, index) in pagination" :key="index" class="">
      <button
        v-if="typeof page === 'number'"
        type="button"
        @click="handlePagination(page)"
        :class="page === currentPage && 'pagButtonSelected'"
        class="pagButton"
      >
        {{ page }}
      </button>
      <span v-else>{{ page }}</span>
    </li>
    <li class="listPages">
      <button
        class="pagButton"
        type="button"
        @click="handlePagination(currentPage + 1)"
      >
        Next
      </button>
    </li>
  </ul>
</template>

<style scoped>
.wrapper {
  display: flex;
  gap: 1rem;
  padding-bottom: 1rem;
  justify-content: center;
}
.listPages {
  display: flex;
  justify-content: center;
}
.pagButtonSelected {
  background-color: rgb(23, 35, 146);
}
</style>
