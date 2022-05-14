<template>
  <div class="law-box">
    <browse-way v-model:isList="isList" />

    <article-list :pageSize="8" :category="1">
      <template #default="{ list }">
        <div class="list-box" v-if="isList">
          <el-card
            hoverable
            v-for="{ cover, title, date, summary, keywords, id } in list"
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
        </div>
      </template>
    </article-list>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import ListItem from '../components/listitem/ListItem.vue'
import CardItem from '../components/listitem/CardItem.vue'
import BrowseWay from '..//components/BrowseWay.vue'
import ArticleList from '../components/ArticleList'

const isList = ref(true)
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
