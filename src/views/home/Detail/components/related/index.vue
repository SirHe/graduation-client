<template>
  <div class="related-box">
    <h3 class="title">相关推荐</h3>
    <el-card shadow="hover" v-for="article in relatedList" :key="article.id">
      <related-item :article="article" />
    </el-card>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue'
import RelatedItem from './RelatedItem.vue'

defineProps({
  articleId: {
    type: String,
    required: true
  }
})

const relatedList = ref([
  {
    id: '123',
    title: '小程序的核心语法',
    star: 50,
    comment: 10
  }
])
onMounted(() => {})
</script>

<style scoped lang="less">
.related-box {
  padding: 5px;
  background: #fff;
  position: relative;

  .title {
    padding: 16px 20px;
  }
}
</style>
