<template>
  <div class="article-box">
    <h4 class="title">{{ article.title }}</h4>
    <div class="meta-box">
      {{ article.star }}点赞 · {{ article.comment }}评论
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  article: {
    type: Object,
    required: true
  }
})
</script>

<style scoped lang="less">
.article-box {
  padding: 8px 0;
  line-height: 22px;

  .title {
    font-size: 15px;
  }

  .meta-box {
    margin-top: 4px;
    font-size: 13px;
    color: #909090;
  }
}
</style>
