<template>
  <div class="agriculture-box">
    <Search @onSearch="onSearch" />
    <ConditionalFilter />
    <main class="main-box">
      <el-radio-group v-model="filter.order" class="condition-box">
        <el-radio-button label="综合排序">综合排序</el-radio-button>
        <el-radio-button label="浏览最多">浏览最多</el-radio-button>
        <el-radio-button label="最新发布">最新发布</el-radio-button>
        <el-radio-button label="最受欢迎">最受欢迎</el-radio-button>
      </el-radio-group>
      <article-list :pageSize="12" :category="category" ref="articleListRef">
        <template #default="{ list }">
          <div class="card-box">
            <el-card
              hoverable
              class="card-item"
              v-for="{ cover, title, date, summary, keywords, id } in list"
              :key="id"
            >
              <card-item
                :id="id"
                :cover="cover"
                :title="title"
                :date="date"
                :brief="summary"
                :keywords="keywords"
              />
            </el-card>
          </div>
        </template>
      </article-list>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { searchArticle } from '../../../api/article'
import { orderMap } from '../../../constant/article'

import Search from './components/Search.vue'
import ConditionalFilter from './components/ConditionalFilter.vue'
import CardItem from '../components/listitem/CardItem.vue'
import ArticleList from '../components/ArticleList'
const route = useRoute()

const articleListRef = ref(null)
const onSearch = async (key) => {
  filter.value.key = key
  const order = Object.keys(orderMap).map((key) => ({ [orderMap[key]]: key }))[
    filter.value.order
  ]
  const { data } = await searchArticle(key, order)
  articleListRef.value.setList(data)
}

const categoryMap = {
  plant: 4,
  breed: 5,
  share: 6
}
const category = computed(() => categoryMap[route.params.id])
const filter = ref({
  key: '',
  order: '综合排序',
  isTips: false
})

const handleSelect = (e) => {
  const tagName = e.target.tagName.toLowerCase()
  const dom = tagName === 'button' ? e.target : e.target.parentNode
  const key = dom.getAttribute('key')
  console.log(key)
}
</script>

<style scoped lang="less">
.agriculture-box {
  .main-box {
    .condition-box {
      margin-bottom: 10px;
    }
  }
}

::v-deep .el-tabs__nav-scroll {
  display: flex;
  justify-content: center;

  .el-tabs__item {
    font-size: 16px;
  }
}

.card-box {
  display: flex;
  flex-wrap: wrap;
  .card-item {
    margin: 0 10px;
    min-width: 260px;
    max-width: 280px;
    flex: 20%;
  }
}

@media screen and (min-width: 1200px) {
  .agriculture-box {
    width: 1200px;
    margin: auto;
  }
}
@media (min-width: 768px) and (max-width: 1199px) {
  .agriculture-box {
    .card-box {
      .card-item {
        max-width: 360px;
      }
    }
  }
}
@media (max-width: 767px) {
  .agriculture-box {
    .card-box {
      .card-item {
        max-width: 100%;
      }
    }
  }
}
</style>
