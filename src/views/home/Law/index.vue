<template>
  <div class="law-box">
    <Nav @toggle="toggle" />
    <div class="list-box" v-if="isList">
      <el-card
        hoverable
        v-for="{ cover, title, date, summary, keywords, id } in law.data"
        :key="id"
      >
        <list-item
          :cover="cover"
          :title="title"
          :date="date"
          :brief="summary"
          :keywords="keywords"
          :id="id"
        />
      </el-card>
    </div>
    <div class="card-box" v-else>
      <el-row :gutter="16">
        <el-col
          class="card"
          :span="6"
          v-for="{ cover, title, date, summary, keywords, id } in law.data"
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
    </div>

    <el-pagination
      class="pagination-box"
      background
      @current-change="onPageChange"
      :page-size="8"
      layout="prev, pager, next"
      :total="law.total"
    />
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import {
  getArticleList,
  deleteArticle,
  getArticleDetail
} from '../../../api/article'
import { STATIC_URL } from '../../../constant'
import { convertDate } from '../../../utils'
import ListItem from './components/ListItem.vue'
import CardItem from './components/CardItem.vue'
import Nav from './components/Nav.vue'

const isList = ref(true)

const toggle = (flag) => {
  isList.value = flag
}

const law = ref({
  page: 1,
  size: 8,
  total: 0,
  data: []
})
const setLaw = async (page = law.value.page, size = law.value.size) => {
  const { data, total } = await getArticleList(1, page, size)
  law.value.data = data.map((item) => ({
    ...item,
    cover: STATIC_URL + item.cover,
    keywords: item.keywords.split(','),
    date: convertDate(item.create_time)
  }))
  law.value.total = total
}
onBeforeMount(setLaw)

const onPageChange = async (page) => {
  setLaw(page, law.value.size)
}
</script>

<style scoped lang="less">
.law-box {
  width: 1200px;
  margin: auto;
  z-index: 1;
  .card-box {
    .card {
      margin-bottom: 15px;
    }
  }

  .el-pagination {
    // background: #fff;
    justify-content: right;
    padding: 20px;
  }
}
</style>
