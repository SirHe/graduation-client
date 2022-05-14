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
  z-index: 1;
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
}

@media screen and (min-width: 1200px) {
  .law-box {
    width: 1200px;
    margin: auto;
  }
}
@media (min-width: 768px) and (max-width: 1199px) {
  .law-box {
    .card-box {
      .card-item {
        max-width: 360px;
      }
    }
  }
}
@media (max-width: 767px) {
  .law-box {
    .card-box {
      .card-item {
        max-width: 100%;
      }
    }
  }
}
</style>
