<template>
  <div class="sale-box">
    <Search @search="onSearch" />
    <browse-way v-model:isList="isList" />
    <div class="list-box" v-if="isList">
      <el-card
        shadow="hover"
        v-for="{ id, cover, title, date, summary, keywords } in sale.data"
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
          v-for="{ id, cover, title, date, summary, keywords } in sale.data"
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
      :total="8"
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

const sale = ref({
  page: 1,
  size: 6,
  total: 0,
  data: []
})
const setSale = async (page = sale.value.page, size = sale.value.size) => {
  const { data, total } = await getArticleList(11, page, size)
  sale.value.data = data.map((item) => ({
    ...item,
    cover: STATIC_URL + item.cover,
    keywords: item.keywords.split(','),
    date: convertDate(item.create_time)
  }))
  sale.value.total = total
}
onBeforeMount(setSale)

const onSearch = (formState) => {
  console.log(formState)
}
</script>

<style scoped lang="less">
.sale-box {
  padding: 20px;
  background: #fff;

  .pagination-box {
    padding: 20px 0;
  }
}
</style>
