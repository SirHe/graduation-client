<template>
  <el-card :bodyStyle="{ padding: 0 }" hoverable>
    <div class="card-box" @click="handleToDetail(id)">
      <div class="img-box"><img :src="cover" alt="" /></div>
      <h2 class="title" @click="handleToDetail(id)">{{ title }}</h2>
      <p class="content">{{ brief }}</p>
    </div>
  </el-card>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  id: {
    type: String
  },
  cover: {
    type: String
  },
  title: {
    type: String
  },
  brief: {
    type: String
  }
})

const handleToDetail = (id) => {
  window.open(`/home/detail/${id}`, '_blank')
}
</script>

<style scoped lang="less">
.card-box {
  text-align: center;
  height: 300px;
  cursor: pointer;

  .img-box {
    height: 160px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .title {
    padding: 10px 0;
    font-size: 16px;
  }

  .content {
    padding: 0 20px 0;
    color: #7a7a7a;
  }
}
</style>
