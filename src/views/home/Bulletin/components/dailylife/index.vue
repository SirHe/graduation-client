<template>
  <div class="fame-box">
    <Search @search="onSearch" />
    <browse-way v-model:isList="isList" />
    <div class="list-box" v-if="isList">
      <el-card
        shadow="hover"
        v-for="{ id, cover, title, date, summary, keywords } in dailylife.data"
        :key="id"
      >
        <list-item
          :imgSize="160"
          :id="id"
          :cover="cover"
          :title="title"
          :date="date"
          :brief="summary"
          :keywords="keywords"
        />
      </el-card>
    </div>
    <div class="card-box" v-else>
      <el-row :gutter="16">
        <el-col
          class="card"
          :span="6"
          v-for="{
            id,
            cover,
            title,
            date,
            summary,
            keywords
          } in dailylife.data"
          :key="id"
        >
          <el-card shadow="hover">
            <card-item
              :id="id"
              :cover="cover"
              :title="title"
              :date="date"
              :brief="summary"
              :keywords="keywords"
              :boxHeight="220"
            />
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-pagination
      class="pagination-box"
      @current-change="onPageChange"
      background
      :page-size="8"
      layout="prev, pager, next"
      :total="dailylife.total"
    />
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import Search from './components/Search.vue'
import BrowseWay from '../../../components/BrowseWay.vue'
import ListItem from '../../../components/listitem/ListItem.vue'
import CardItem from '../../../components/listitem/CardItem.vue'
import { getArticleList } from '../../../../../api/article'
import { STATIC_URL } from '../../../../../constant'
import { convertDate } from '../../../../../utils'

const isList = ref(true)

const dailylife = ref({
  page: 1,
  size: 6,
  total: 0,
  data: []
})
const setDailylife = async (
  page = dailylife.value.page,
  size = dailylife.value.size
) => {
  const { data, total } = await getArticleList(8, page, size)
  dailylife.value.data = data.map((item) => ({
    ...item,
    cover: STATIC_URL + item.cover,
    keywords: item.keywords.split(','),
    date: convertDate(item.create_time)
  }))
  dailylife.value.total = total
}
onBeforeMount(setDailylife)

const onSearch = (formState) => {
  console.log(formState)
}
</script>

<style scoped lang="less">
.fame-box {
  padding: 20px;
  background: #fff;

  .pagination-box {
    padding: 20px 0;
  }
}
</style>
