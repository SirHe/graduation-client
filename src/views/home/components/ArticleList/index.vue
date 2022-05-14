<template>
  <slot :list="article.list" />
  <Pagination
    :size="article.size"
    :total="article.total"
    @onChange="setArticle"
  />
</template>

<script setup>
import { ref, defineProps, watch, onBeforeMount } from 'vue'
import { getArticleList } from '../../../../api/article'
import { STATIC_URL } from '../../../../constant'
import { convertDate } from '../../../../utils'
import Pagination from './Pagination.vue'

const props = defineProps({
  pageSize: {
    type: Number,
    default() {
      return 15
    }
  },
  category: {
    type: Number
  }
})

const article = ref({
  page: 1,
  size: props.pageSize,
  category: props.category,
  total: 0,
  list: []
})

watch(
  () => props.category,
  (value) => {
    article.value.category = value
    setArticle()
  }
)

const setArticle = async (page = article.value.page) => {
  const { category, size } = article.value
  const { data, total } = await getArticleList(category, page, size)
  article.value.list = data.map((item) => ({
    ...item,
    cover: STATIC_URL + item.cover,
    keywords: item.keywords.split(','),
    date: convertDate(item.create_time)
  }))
  article.value.total = total
}

onBeforeMount(setArticle)
</script>

<style scoped lang="less"></style>
