<template>
  <div class="agriculture-box">
    <Search @onSearch="onSearch" />
    <ConditionalFilter />
    <main class="main-box">
      <el-radio-group v-model="filter.orderBy" class="condition-box">
        <el-radio-button label="综合排序">综合排序</el-radio-button>
        <el-radio-button label="观看最多">观看最多</el-radio-button>
        <el-radio-button label="最新发布">最新发布</el-radio-button>
        <el-radio-button label="收藏最多">收藏最多</el-radio-button>
      </el-radio-group>
      <article-list :pageSize="12" :category="category">
        <template #default="{ list }">
          <el-row :gutter="16">
            <el-col
              class="card"
              :span="6"
              v-for="{ cover, title, date, summary, keywords, id } in list"
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
        </template>
      </article-list>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

import Search from './components/Search.vue'
import ConditionalFilter from './components/ConditionalFilter.vue'
import CardItem from '../components/listitem/CardItem.vue'
import ArticleList from '../components/ArticleList'
const route = useRoute()

const onSearch = (key) => {
  console.log(key, 123)
}

const categoryMap = {
  plant: 4,
  breed: 5,
  share: 6
}
const category = computed(() => categoryMap[route.params.id])
const filter = {
  orderBy: ''
}

const handleSelect = (e) => {
  const tagName = e.target.tagName.toLowerCase()
  const dom = tagName === 'button' ? e.target : e.target.parentNode
  const key = dom.getAttribute('key')
  console.log(key)
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
}

::v-deep .el-tabs__nav-scroll {
  display: flex;
  justify-content: center;

  .el-tabs__item {
    font-size: 16px;
  }
}
</style>
