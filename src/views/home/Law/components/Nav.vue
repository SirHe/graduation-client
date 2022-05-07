<template>
  <div class="tab-box">
    <ul class="tab-title-box">
      <li class="title-item" :class="isList ? 'isActive' : ''" @click="toggle">
        <i class="iconfont icon-liebiao"></i>列表浏览
      </li>
      <ul class="triangle-box" :class="isList ? 'isActive' : ''">
        <li class="triangle" :class="isList ? '' : 'isActive'"></li>
      </ul>
      <li class="title-item" @click="toggle" :class="isList ? '' : 'isActive'">
        <i class="iconfont icon-qiapianmoshi_kuai"></i>卡片浏览
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const emits = defineEmits(['toggle'])
const isList = ref(true)

const toggle = () => {
  isList.value = !isList.value
  emits('toggle', isList.value)
}
</script>

<style scoped lang="less">
.tab-box {
  padding: 15px 0;
  display: flex;

  .tab-title-box {
    display: flex;
    box-sizing: content-box;
    height: 36px;
    line-height: 34px;
    border: 1px solid #e4e4e4;
    color: #666;
    background-color: #fff;

    .title-item {
      padding: 0px 15px;
      cursor: pointer;

      .iconfont {
        margin-right: 5px;
        font-size: 18px;
      }
    }

    .triangle-box {
      height: 36px;
      width: 36px;
      overflow: hidden;

      .triangle {
        width: 51px;
        height: 51px;
        border: 1px solid #e4e4e4;
        background-color: #fff;
        // background-color: transparent;
        transform: rotate(45deg) translateX(14px);
      }
    }
  }
}

.isActive {
  background-color: #4ea3ff !important;
  color: #fff;
}
</style>
