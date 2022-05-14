<template>
  <div class="bulletin-box">
    <div class="box1">
      <div class="carousel-box">
        <el-carousel indicator-position="outside" height="520px">
          <el-carousel-item v-for="i in 4" :key="i" class="img-box">
            <img
              :src="
                require(`../../../assets/images/bulletin/carousel/${i}.jpeg`)
              "
              alt=""
            />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="column-box">
        <div class="newest">
          <el-button type="primary" style="width: 100%">最新资讯</el-button>
          <my-list bordered :data-source="newData">
            <template #renderItem="{ item }">
              <my-list-item>{{ item }}</my-list-item>
            </template>
          </my-list>
        </div>
        <div class="popular">
          <el-button type="danger" style="width: 100%">最受欢迎</el-button>
          <my-list bordered :data-source="popularData">
            <template #renderItem="{ item }">
              <my-list-item>{{ item }}</my-list-item>
            </template>
          </my-list>
        </div>
      </div>
    </div>

    <div class="box2">
      <h2 class="title">特别报道</h2>
      <Swiper
        :modules="modules"
        :slides-per-view="3"
        :space-between="50"
        autoplay
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide
          v-for="{ id, cover, summary, title } in special"
          :key="id"
        >
          <CardItem :id="id" :cover="cover" :title="title" :brief="summary" />
        </swiper-slide>
      </Swiper>
    </div>

    <div class="box3">
      <div class="body">
        <el-tabs v-model="activeName" size="large">
          <el-tab-pane label="日常生活" name="1"><daily-life /></el-tab-pane>
          <el-tab-pane label="乡村商业" name="2"><Sale /></el-tab-pane>
          <el-tab-pane label="乡村婚姻" name="3"><Marriage /></el-tab-pane>
          <el-tab-pane label="光荣榜" name="4"><fame-wall /></el-tab-pane>
        </el-tabs>
      </div>
      <div class="column">
        <!-- 偏图片的内容 -->
        <h2 class="title">美丽乡村</h2>
        <el-card class="card" shadow="hover" v-for="i in 6" :key="i" hoverable>
          <img
            :src="
              require(`../../../assets/images/bulletin/beautiful/${i}.jpeg`)
            "
            alt=""
          />
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import DailyLife from './components/dailylife'
import Marriage from './components/marriage'
import Sale from './components/sale'
import FameWall from './components/famewall'
import CardItem from './components/CardItem.vue'
import cards from '../../../data/card.json'
import { STATIC_URL } from '../../../constant'
import { getArticleList } from '../../../api/article'

// 引入swiper
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
import { Autoplay } from 'swiper'
import 'swiper/swiper.min.css'
const modules = [Autoplay]

const special = ref([])

onBeforeMount(async () => {
  const { data } = await getArticleList(7, 1, 100)
  special.value = data.map((item) => ({
    ...item,
    cover: STATIC_URL + item.cover
  }))
  console.log(data)
})
const popularData = ref(null)
const newData = ref(null)

const activeName = ref('1')
</script>

<style scoped lang="less">
.bulletin-box {
  width: 1200px;
  margin: auto;
  .box1 {
    display: flex;
    align-items: center;

    .carousel-box {
      width: 900px;
      padding-right: 20px;

      .img-box {
        img {
          width: 100%;
          height: 520px;
        }
      }
    }

    .column-box {
      box-sizing: content-box;
      width: 300px;
      height: 520px;
      overflow-y: auto;

      .newest {
        background-color: #fff;
        margin-bottom: 10px;
        border-radius: 15px;
        overflow: hidden;
      }

      .popular {
        background-color: #fff;
        border-radius: 15px;
        overflow: hidden;
      }
    }
  }

  .box2 {
    width: 100%;

    & > .title {
      padding: 20px 0;
    }
  }

  .box3 {
    display: flex;
    padding-top: 20px;

    .body {
      flex: 1;
      padding-right: 25px;

      ::v-deep .el-tabs__item {
        font-size: 18px;
      }
    }

    .column {
      width: 300px;

      .title {
        text-align: center;
        padding-bottom: 20px;
      }

      .card {
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
