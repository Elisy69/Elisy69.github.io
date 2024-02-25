<script setup>
import { useSearch } from "./../composables/useSearch";
const { getProducts, getFilteredProducts, filterParam, filterValue } =
  useSearch();

const clearFilter = () => {
  filterValue.value = "";
  getProducts(1);
};
</script>
<template>
  <div class="filterBarWrapper">
    <menu class="filterMenu">
      <select class="selectFilter" v-model="filterParam">
        <option disabled value="">Please select one</option>
        <option>price</option>
        <option>brand</option>
        <option>product</option>
      </select>
      <input class="inputFiter" v-model="filterValue" type="text" />
    </menu>
    <menu class="buttonsMenu">
      <button @click="getFilteredProducts(1)" class="applyBtn">
        Apply filters
      </button>
      <button @click="clearFilter" class="applyBtn">
        Clear / Refetch data
      </button>
    </menu>
  </div>
</template>
<style scoped>
.filterBarWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.selectFilter {
  width: 50%;
}
.inputFiter {
  width: 50%;
}
.filterMenu {
  display: flex;
  gap: 0.4rem;
  justify-content: center;
  width: 30%;
  padding: 0;
  margin: 0;
}
.buttonsMenu {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 0;
  margin: 0;
  width: 30%;
}
</style>
