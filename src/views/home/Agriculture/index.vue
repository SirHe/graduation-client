<template>
  <div class="agriculture-box">
    <Search @onSearch="onSearch" />
    <ConditionalFilter />
    <main class="main-box">
      <el-radio-group v-model="article.condition" class="condition-box">
        <el-radio-button label="综合排序">综合排序</el-radio-button>
        <el-radio-button label="观看最多">观看最多</el-radio-button>
        <el-radio-button label="最新发布">最新发布</el-radio-button>
        <el-radio-button label="收藏最多">收藏最多</el-radio-button>
      </el-radio-group>
      <el-row :gutter="16">
        <el-col
          class="card"
          :span="6"
          v-for="{ cover, title, date, summary, keywords, id } in article.data"
          :key="id"
        >
          <el-card hoverable>
            <card-item
              :id="id"
              :cover="cover"
              :title="title"
              :date="date"
              :brief="summary"
              :keywords="keywords"
            />
          </el-card>
        </el-col>
      </el-row>
      <el-pagination
        class="pagination-box"
        @current-change="onPageChange"
        background
        :page-size="12"
        layout="prev, pager, next"
        :total="article.total"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount, watch } from 'vue'
import { useRoute } from 'vue-router'
import { STATIC_URL } from '../../../constant'
import { convertDate } from '../../../utils'
import { getArticleList } from '../../../api/article'
import Search from './components/Search.vue'
import ConditionalFilter from './components/ConditionalFilter.vue'
import CardItem from '../components/listitem/CardItem.vue'

const route = useRoute()

const onSearch = (key) => {
  console.log(key, 123)
}

const article = ref({
  page: 1,
  size: 12,
  total: 0,
  condition: '综合排序',
  data: []
})
const setArticle = async (
  category,
  page = article.value.page,
  size = article.value.size
) => {
  const { data, total } = await getArticleList(category, page, size)
  article.value.data = data.map((item) => ({
    ...item,
    cover: STATIC_URL + item.cover,
    keywords: item.keywords.split(','),
    date: convertDate(item.create_time)
  }))
  article.value.total = total
}
watch(
  () => route.params.id,
  (value) => {
    const categoryMap = {
      plant: 4,
      breed: 5,
      share: 6
    }
    setArticle(categoryMap[value])
  },
  {
    immediate: true
  }
)

const handleSelect = (e) => {
  const tagName = e.target.tagName.toLowerCase()
  const dom = tagName === 'button' ? e.target : e.target.parentNode
  const key = dom.getAttribute('key')
  console.log(key)
}

const onPageChange = (page) => {
  // videoData.value = videos.slice((page - 1) * 12, page * 12)
}
</script>

<style scoped lang="less">
.agriculture-box {
  width: 1200px;
  margin: auto;
  .main-box {
    .condition-box {
      margin-bottom: 10px;
    }
  }

  .el-pagination {
    // background: #fff;
    justify-content: right;
    padding: 20px;
  }
}

::v-deep .el-tabs__nav-scroll {
  display: flex;
  justify-content: center;

  .el-tabs__item {
    font-size: 16px;
  }
}
</style>
