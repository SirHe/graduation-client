<template>
  <div class="bulletin-box">
    <div class="box1">
      <div class="carousel-box">
        <el-carousel indicator-position="outside" height="520px">
          <el-carousel-item
            v-for="{ cover, id, title } in carousel"
            :key="id"
            class="img-box"
          >
            <img :src="cover" :alt="title" @click="onDetail(id)" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="column-box">
        <div class="newest">
          <el-button type="primary" style="width: 100%">最新资讯</el-button>
          <my-list bordered :data-source="newList">
            <template #renderItem="{ item }">
              <my-list-item>
                <div class="sider-item-box" @click="onDetail(item.id)">
                  <h5 class="title">{{ item.title }}</h5>
                  <ul class="bottom">
                    <li class="view">浏览量：{{ item.pageviews }}</li>
                    <li class="time">{{ item.create_time }}</li>
                  </ul>
                </div>
              </my-list-item>
            </template>
          </my-list>
        </div>
        <div class="popular">
          <el-button type="danger" style="width: 100%">最受欢迎</el-button>
          <my-list bordered :data-source="popularList">
            <template #renderItem="{ item }">
              <my-list-item>
                <div class="sider-item-box" @click="onDetail(item.id)">
                  <h5 class="title">{{ item.title }}</h5>
                  <ul class="bottom">
                    <li class="view">浏览量：{{ item.pageviews }}</li>
                    <li class="time">{{ item.create_time }}</li>
                  </ul>
                </div>
              </my-list-item>
            </template>
          </my-list>
        </div>
      </div>
    </div>

    <div class="box2">
      <h2 class="title">特别报道</h2>
      <Swiper
        :modules="modules"
        :slides-per-view="viewNum"
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
import { ref, onBeforeMount, watch } from 'vue'
import { throttle } from 'lodash'
import DailyLife from './components/dailylife'
import Marriage from './components/marriage'
import Sale from './components/sale'
import FameWall from './components/famewall'
import CardItem from './components/CardItem.vue'
import { STATIC_URL } from '../../../constant'
import { convertDate } from '../../../utils'
import { getArticleList, getArticleSpecialList } from '../../../api/article'

// 引入swiper
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
import { Autoplay } from 'swiper'
import 'swiper/swiper.min.css'
const modules = [Autoplay]

const special = ref([])
const carousel = ref([])
const newList = ref([])
const popularList = ref([])
const viewNum = ref(1)
onBeforeMount(async () => {
  const { data: data1 } = await getArticleList(7, 1, 100)
  special.value = data1.map((item) => ({
    ...item,
    cover: STATIC_URL + item.cover
  }))
  viewNum.value = getViewNum()

  const { data: data2 } = await getArticleSpecialList('carousel')
  carousel.value = data2.map((item) => ({
    ...item,
    cover: STATIC_URL + item.cover
  }))

  const { data: data3 } = await getArticleSpecialList('new')
  newList.value = data3.map((item) => ({
    ...item,
    cover: STATIC_URL + item.cover,
    create_time: convertDate(item.create_time)
  }))

  const { data: data4 } = await getArticleSpecialList('popular')
  popularList.value = data4.map((item) => ({
    ...item,
    cover: STATIC_URL + item.cover,
    create_time: convertDate(item.create_time)
  }))
})

window.addEventListener(
  'resize',
  throttle(() => {
    viewNum.value = getViewNum()
  }, 200)
)
const getViewNum = () => {
  const width = document.body.clientWidth
  if (width >= 1200) {
    return 3
  } else if (width >= 768) {
    return 2
  }
  return 1
}

const activeName = ref('1')

const onDetail = (id) => {
  window.open(`/home/detail/${id}`, '_blank')
}
</script>

<style scoped lang="less">
.bulletin-box {
  padding-top: 15px;
  .box1 {
    display: flex;
    align-items: center;

    .carousel-box {
      width: 900px;
      padding-right: 20px;

      .img-box {
        cursor: pointer;
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

      .sider-item-box {
        padding: 5px;
        border: 1px solid #f5f6f5;
        border-radius: 5px;
        .title {
        }

        .bottom {
          display: flex;
          justify-content: space-between;
          padding: 3px 0;
          font-size: 12px;
          color: #abb0ba;
          cursor: pointer;
          .view {
          }

          .time {
          }
        }
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

@media screen and (min-width: 1200px) {
  .bulletin-box {
    width: 1200px;
    margin: auto;
  }
}
@media (min-width: 768px) and (max-width: 1199px) {
  .bulletin-box {
    .box1 {
      .carousel-box {
        height: 360px;
        .img-box {
          img {
            height: 360px;
          }
        }
      }
      .column-box {
        height: 360px;
      }
    }

    .box3 {
      .body {
        padding: 0;
      }
      .column {
        display: none;
      }
    }
  }
}
@media (max-width: 767px) {
  .bulletin-box {
    .box1 {
      .carousel-box {
        padding: 0;
        height: 260px;
        .img-box {
          img {
            height: 260px;
          }
        }
      }
      .column-box {
        display: none;
      }
    }
    .box3 {
      .body {
        padding: 0;

        ::v-deep .el-tabs__header {
          // padding: 0 20px;
          .el-tabs__item {
            font-size: 15px;
          }
        }
      }
      .column {
        display: none;
      }
    }
  }
}
</style>
