<template>
  <div class="step3-box">
    <h2 class="title">{{ article.title }}</h2>
    <!-- <el-tag type="success">{{ categoryMap[article.category] }}</el-tag> -->
    <div class="img-box"><img :src="article.coverUrl" alt="" /></div>
    <p class="content" v-html="article.content"></p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { categoryMap } from '../../../../../../constant/article'

defineProps({
  article: {
    type: Object
  }
})
</script>

<style scoped lang="less">
.step3-box {
  padding: 10px 25px;

  .title {
    text-align: center;
    line-height: 35px;
    padding-bottom: 20px;
  }

  .img-box {
    width: 750px;
    margin: auto;

    img {
      width: 100%;
    }
  }

  .content {
    text-align: center;
    padding: 20px 0;
  }
}
</style>
