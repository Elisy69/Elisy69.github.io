<script setup lang="ts"></script>
<template>
  <div class="loaderWrapper">
    <div class="loader"></div>
  </div>
</template>
<style scoped>
.loaderWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader {
  margin-top: 3rem;
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: gray;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
