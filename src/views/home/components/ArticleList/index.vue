<template>
  <slot :list="article.list" />
  <Pagination :size="article.size" :total="article.total" @change="onChange" />
  <!-- @onChange="() => (isAuto ? setArticle() : audit())" -->
</template>

<script setup>
import { ref, defineProps, watch, onBeforeMount, defineExpose } from 'vue'
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
  console.log(page)
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
const onChange = ref(setArticle)

const isAuto = ref(true)
const audit = (list, total) => {
  isAuto.value = false
  onChange.value = audit
  article.value.list = list.map((item) => ({
    ...item,
    cover: STATIC_URL + item.cover,
    keywords: item.keywords.split(','),
    date: convertDate(item.create_time)
  }))
  article.value.total = total
}
defineExpose({ audit })

onBeforeMount(setArticle)
</script>

<style scoped lang="less"></style>
