<script setup>
import ProductItem from "./ProductItem.vue";
import { useSearch } from "../composables/useSearch";

const { products, filteredProducts, nothingFound } = useSearch();
</script>
<template>
  <div class="productsWrapper">
    <ProductItem
      v-if="products"
      v-for="(product, index) in products"
      :productData="product"
      :index="index"
    />
    <ProductItem
      v-if="filteredProducts"
      v-for="(product, index) in filteredProducts"
      :productData="product"
      :index="index"
    />
    <h1 class="nothingFound" v-if="!products && nothingFound">
      Nothing found! Try again.
    </h1>
  </div>
</template>
<style scoped>
.nothingFound {
  text-align: center;
}
.productsWrapper {
  overflow: visible;
  overflow: auto;
  display: grid;
  gap: 1rem;
  padding: 1rem;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(auto-fit, minmax(300px, 1.5fr));
}
</style>
