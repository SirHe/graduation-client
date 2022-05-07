<template>
  <div class="card-item-box">
    <div>
      <div class="img-box" @click="handleToDetail(id)">
        <img :src="cover" alt="" />
      </div>
      <h3 class="title" @click="handleToDetail(id)">{{ title }}</h3>
    </div>
    <div>
      <div class="keywords">
        <el-tag v-for="key in keywords" :key="key">{{ key }}</el-tag>
      </div>
      <div class="bottom">
        <div class="date">{{ date }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  cover: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  brief: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  keywords: {
    type: Array,
    default() {
      return []
    }
  },
  id: {
    type: String,
    required: true
  }
})

const handleToDetail = (id) => {
  window.open(`/home/detail/${id}`, '_blank')
}
</script>

<style scoped lang="less">
.card-item-box {
  height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .img-box {
    overflow: hidden;
    border-radius: 10px;
    cursor: pointer;

    img {
      width: 100%;

      transition: transform 1s;
      &:hover {
        transform: scale(1.2);
      }
    }
  }

  .title {
    padding: 20px 0;
    font-size: 14px;
    cursor: pointer;
  }

  .keywords {
    line-height: 30px;
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    color: #999;
  }
}
</style>
