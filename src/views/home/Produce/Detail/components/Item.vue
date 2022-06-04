<template>
  <div class="item-box">
    <div class="top" :style="{ visibility: isTop ? '' : 'hidden' }">
      <div class="img-box">
        <img :src="img" :alt="title" />
      </div>
      <h2 class="title">{{ title }}</h2>
      <p class="desc">{{ desc }}</p>
    </div>
    <div class="middle" :style="{ background: color }">
      <div class="circle-out" :style="{ borderColor: color }">
        <div class="circle-in" :style="{ background: color }"></div>
      </div>
    </div>
    <div class="bottom" :style="{ visibility: isTop ? 'hidden' : '' }">
      <div class="img-box">
        <img :src="img" :alt="title" />
      </div>

      <h2 class="title">{{ title }}</h2>
      <p class="desc">{{ desc }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

defineProps({
  title: {
    type: String
  },
  img: {
    type: String
  },
  desc: {
    type: String
  },
  isTop: {
    type: Boolean
  }
})

const color =
  '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6)
</script>

<style scoped lang="less">
.item-box {
  min-width: 300px;
  height: 600px;
  display: flex;
  flex-direction: column;

  .top,
  .bottom {
    flex: 1;
    border-radius: 15px;
    position: relative;
    background: #fff;

    &::after {
      position: absolute;
      content: '';
      width: 20px;
      height: 20px;
      left: 50%;
      margin-left: -10px;
      transform: rotate(45deg);
      background: #fff;
      // z-index: 0;
      transform: rotate3d(180deg);
    }

    .img-box {
      height: 150px;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      overflow: hidden;
      z-index: 100;
      img {
        width: 100%;
        height: 100%;

        transition: transform 1s;
        &:hover {
          transform: scale(1.2);
        }
      }
    }

    .title {
      padding: 8px 0;
      text-align: center;
    }

    .desc {
      padding: 5px 10px;
      text-align: center;
    }
  }

  .top {
    margin-bottom: 40px;

    &::after {
      bottom: 0;
      margin-bottom: -10px;
    }
  }

  .bottom {
    margin-top: 60px;

    &::after {
      top: 0;
      margin-top: -10px;
    }
  }

  .middle {
    width: 100%;
    height: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    .circle-out {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      border: 5px solid;
      display: flex;
      justify-content: center;
      align-items: center;

      .circle-in {
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }
    }
  }
}
</style>
