<template>
  <div class="item-box">
    <div class="img-box" @click="onDetail(id)">
      <img :src="img" :alt="title" />
    </div>

    <div class="title-box" @click="onDetail(id)">
      <h3 class="title">{{ title }}</h3>
      <div class="desc">{{ desc }}</div>
    </div>

    <ul class="bottom">
      <p>{{ base }}</p>
      <p>{{ shed }}</p>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  id: {
    type: Number,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  base: {
    type: String,
    required: true
  },
  shed: {
    type: String,
    required: true
  }
})

const onDetail = (id) => {
  window.open(`/home/produce/detail/${id}`, '_blank')
}
</script>

<style scoped lang="less">
.item-box {
  .img-box {
    overflow: hidden;
    border-radius: 10px;
    cursor: pointer;
    vertical-align: middle;

    img {
      width: 100%;
      max-height: 180px;

      transition: transform 1s;
      &:hover {
        transform: scale(1.2);
      }
    }
  }

  .title-box {
    padding: 20px;

    .title {
      margin: 8px 0;
    }

    .desc {
      color: #00000073;
    }
  }

  .bottom {
    display: flex;
    align-items: center;
    border: 1px solid #f0f0f0;
    font-size: 16px;
    color: #00000073;

    p {
      flex: 1;
      padding: 8px;
      text-align: center;
      word-break: break-word; /* 文本行的任意字内断开 */
      word-wrap: break-word; /* IE */
      white-space: -moz-pre-wrap; /* Mozilla */
      white-space: -hp-pre-wrap; /* HP printers */
      white-space: -o-pre-wrap; /* Opera 7 */
      white-space: -pre-wrap; /* Opera 4-6 */
      white-space: pre; /* CSS2 */
      white-space: pre-wrap; /* CSS 2.1 */
      white-space: pre-line; /* CSS 3 (and 2.1 as well, actually) */
    }

    & > :first-child {
      border-right: 1px solid #f0f0f0;
    }
  }
}
</style>
