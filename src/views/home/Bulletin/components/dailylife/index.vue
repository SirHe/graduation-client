<template>
  <div class="fame-box">
    <Search @search="onSearch" />
    <browse-way v-model:isList="isList" />
    <article-list :pageSize="6" :category="8">
      <template #default="{ list }">
        <div class="list-box" v-if="isList">
          <el-card
            shadow="hover"
            v-for="{ id, cover, title, date, summary, keywords } in list"
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
              v-for="{ id, cover, title, date, summary, keywords } in list"
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
      </template>
    </article-list>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import Search from './components/Search.vue'
import BrowseWay from '../../../components/BrowseWay.vue'
import ListItem from '../../../components/listitem/ListItem.vue'
import CardItem from '../../../components/listitem/CardItem.vue'
import ArticleList from '../../../components/ArticleList'

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
