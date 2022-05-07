<template>
  <div class="list-item-box">
    <div class="img-box" @click="handleToDetail(id)">
      <img :src="cover" alt="" width="270" />
    </div>
    <div class="content">
      <div @click="handleToDetail(id)">
        <h2 class="title">{{ title }}</h2>
        <p class="brief">{{ brief }}</p>
      </div>
      <div class="bottom">
        <div>{{ date }}</div>
        <div class="keywords">
          <el-tag v-for="key in keywords" :key="key">{{ key }}</el-tag>
        </div>
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
.list-item-box {
  display: flex;

  .img-box {
    overflow: hidden;
    border-radius: 10px;
    cursor: pointer;

    img {
      transition: transform 1s;
      &:hover {
        transform: scale(1.2);
      }
    }
  }

  .content {
    padding: 0 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .title {
      cursor: pointer;
    }
    .brief {
      cursor: pointer;
      color: #333;
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      color: #999;
    }
  }
}
</style>
