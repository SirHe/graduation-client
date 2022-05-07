<template>
  <div class="marriage-box">
    <Search @search="onSearch" />
    <BrowseWay v-model:isList="isList" />
    <div class="list-box" v-if="isList">
      <el-card hoverable v-for="item in marriage" :key="item.img_src">
        <list-item
          :imgSize="100"
          :cover="item.img_src"
          :title="item.username"
          :date="item.date"
          :brief="item.require"
          :keywords="item.tags"
        />
      </el-card>
    </div>
    <div class="card-box" v-else>
      <el-row :gutter="16">
        <el-col
          class="card"
          :span="6"
          v-for="item in marriage"
          :key="item.img_src"
        >
          <el-card hoverable>
            <card-item
              :cover="item.img_src"
              :title="item.username"
              :date="item.date"
              :brief="item.require"
              :keywords="item.tags"
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

import marriage from '../../../../../data/marriage.json'

const onSearch = (formState) => {
  console.log(formState)
}

const isList = ref(true)
const onToggle = (state) => {
  console.log(state)
}

// 分页处理
const onPageChange = () => {}
</script>

<style scoped lang="less">
.marriage-box {
  background: #fff;
  padding: 20px;

  .pagination-box {
    padding: 20px 0;
  }
}
</style>
