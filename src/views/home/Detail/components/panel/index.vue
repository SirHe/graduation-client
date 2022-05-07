<template>
  <div class="panel-box">
    <panel-item class="panel-item" :star="star.count" @click="handleToStar">
      <i
        class="iconfont icon-dianzan_kuai"
        :style="{ color: star.isStar ? '#feb800' : '#000' }"
      />
    </panel-item>
    <panel-item
      class="panel-item"
      :star="comment.count"
      @click="handleToComment"
    >
      <i class="iconfont icon-pinglun" />
    </panel-item>
    <panel-item
      class="panel-item"
      :star="collect.count"
      @click="handleToCollect"
    >
      <i
        class="iconfont icon-xingxing"
        :style="{ color: collect.isCollect ? '#feb800' : '#000' }"
      />
    </panel-item>
    <panel-item class="panel-item">
      <i class="iconfont icon-zhuanfa" />
    </panel-item>
    <panel-item class="panel-item" @click="handleToReport">
      <i class="iconfont icon-jubao" />
    </panel-item>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import PanelItem from './PanelItem.vue'

const emits = defineEmits(['showComment'])

// 点赞
const star = ref({
  isStar: false,
  count: 999
})
const handleToStar = () => {
  if (star.value.isStar) {
    star.value = {
      isStar: false,
      count: star.value.count - 1
    }
  } else {
    star.value = {
      isStar: true,
      count: star.value.count + 1
    }
  }
}

// 评论
const comment = ref({
  count: 18
})
const handleToComment = () => {
  emits('showComment')
}

// 收藏
const collect = ref({
  isCollect: false,
  count: 100
})
const handleToCollect = () => {
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
const handleToReport = () => {}
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
