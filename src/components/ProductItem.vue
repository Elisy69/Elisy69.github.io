<script setup>
const props = defineProps(["productData", "index"]);
</script>
<template>
  <div class="productWrapper">
    <h3>
      {{ productData.product }}
    </h3>
    <h4 class="prodBrand">
      {{ productData.brand ? productData.brand : "Unknown brand" }}
    </h4>
    <h5>Price: {{ productData.price }}</h5>
    <span>Id: {{ productData.id }}</span>
  </div>
</template>
<style scoped>
.productWrapper {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 2px solid black;
  border-radius: 5%;
  background-color: rgb(54, 52, 52);
}
.prodBrand {
  color: gold;
}
</style>
