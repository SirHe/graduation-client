<template>
  <div class="home-box">
    <Head />
    <router-view />
  </div>
</template>

<script setup>
import {} from 'vue'
import Head from './components/Head.vue'
</script>

<style scoped lang="less">
.home-box {
  // min-width: 1200px;
  background: #f4f5f5;
  // width: 1200px;
  margin: 0 auto;
}
</style>
