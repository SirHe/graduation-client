<template>
  <div class="panel-box">
    <panel-item class="panel-item" :star="star.count" @click="onStar">
      <i
        class="iconfont icon-dianzan_kuai"
        :style="{ color: star.isStar ? '#feb800' : '#000' }"
      />
    </panel-item>
    <panel-item class="panel-item" :star="comment.count" @click="onComment">
      <i class="iconfont icon-pinglun" />
    </panel-item>
    <panel-item class="panel-item" :star="collect.count" @click="onCollect">
      <i
        class="iconfont icon-xingxing"
        :style="{ color: collect.isCollect ? '#feb800' : '#000' }"
      />
    </panel-item>
    <panel-item class="panel-item">
      <i class="iconfont icon-zhuanfa" />
    </panel-item>
    <panel-item class="panel-item" @click="onReport">
      <i class="iconfont icon-jubao" />
    </panel-item>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue'
import { addArticleStar, deleteArticleStar } from '../../../../../api/article'
import PanelItem from './PanelItem.vue'

const emits = defineEmits(['showComment'])
const props = defineProps({
  article: {
    type: Object,
    required: true
  }
})

// 点赞
const star = ref({
  isStar: false,
  count: 0
})
watch(
  () => props.article?.star,
  (value) => {
    const { isStar, count } = value
    star.value.count = count
    star.value.isStar = isStar
  }
)

const onStar = () => {
  const { isStar } = star.value
  const { id } = props.article
  if (isStar) {
    star.value.count--
    deleteArticleStar(id)
  } else {
    star.value.count++
    addArticleStar(id)
  }
  star.value.isStar = !isStar
}

// 评论
const comment = ref({
  count: 18
})
const onComment = () => {
  emits('showComment')
}

// 收藏
const collect = ref({
  isCollect: false,
  count: 100
})
const onCollect = () => {
  if (collect.value.isCollect) {
    collect.value = {
      isCollect: false,
      count: collect.value.count - 1
    }
  } else {
    collect.value = {
      isCollect: true,
      count: collect.value.count + 1
    }
  }
}

// 举报
const onReport = () => {}
</script>

<style scoped lang="less">
.panel-box {
  position: fixed;
  margin-left: -90px;
  top: 240px;
  z-index: 2;

  .panel-item {
    margin-bottom: 25px;
  }
}
</style>
