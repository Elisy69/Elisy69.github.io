<script setup>
import FilterBar from "./components/FilterBar.vue";
import ProductList from "./components/ProductList.vue";
import Pagination from "./components/Pagination.vue";
import { onBeforeMount } from "vue";
import { useSearch } from "./composables/useSearch";
import Loader from "./components/Loader.vue";

const { isLoading, getProducts } = useSearch();

onBeforeMount(() => {
  getProducts(1);
});
</script>

<template>
  <div class="appWrapper">
    <FilterBar />
    <ProductList v-if="!isLoading" />
    <Loader v-if="isLoading" />
    <Pagination v-if="!isLoading" />
  </div>
</template>

<style scoped>
.appWrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  min-height: 100%;
  margin-top: 1rem;
}
</style>
