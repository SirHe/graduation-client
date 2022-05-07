<template>
  <div class="fame-box">
    <Search @search="onSearch" />
    <browse-way v-model:isList="isList" />
    <div class="list-box" v-if="isList">
      <el-card shadow="hover" v-for="item in fameData" :key="item.img_src">
        <list-item
          :imgSize="160"
          :cover="item.img_src"
          :title="item.title"
          :date="item.date"
          :brief="item.brief"
          :keywords="item.keywords"
        />
      </el-card>
    </div>
    <div class="card-box" v-else>
      <el-row :gutter="16">
        <el-col
          class="card"
          :span="6"
          v-for="item in fameData"
          :key="item.img_src"
        >
          <el-card shadow="hover">
            <card-item
              :cover="item.img_src"
              :title="item.title"
              :date="item.date"
              :brief="item.brief"
              :keywords="item.keywords"
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
import { ref } from 'vue'
import Search from './components/Search.vue'
import BrowseWay from '../../../components/BrowseWay.vue'
import ListItem from '../../../components/listitem/ListItem.vue'
import CardItem from '../../../components/listitem/CardItem.vue'

import fameData from '../../../../../data/fame.json'

const isList = ref(true)

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
