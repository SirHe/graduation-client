<template>
  <div class="produce-box">
    <Search @search="onSearch" />
  </div>
</template>

<script setup>
import {} from 'vue'
import Search from '../components/Search.vue'

const onSearch = (key) => {
  console.log(key)
}
</script>

<style scoped lang="less">
.produce-box {
}
</style>
