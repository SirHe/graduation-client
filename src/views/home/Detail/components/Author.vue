<template>
  <div class="author-box">
    <div class="info-box">
      <div class="img-box">
        <img :src="author?.avatar" alt="" />
      </div>
      <ul class="author-info-box">
        <li class="author-name">{{ author?.name }}</li>
        <li class="author-brief">{{ author?.brief }}</li>
      </ul>
    </div>
    <ul class="honor-box">
      <li class="star-item">
        <i class="iconfont icon-dianzan_kuai"></i>
        文章获得总点赞
        {{ author?.star }}
      </li>
      <li class="pageviews-item">
        <i class="iconfont icon-liulanliang"></i>
        文章获得总浏览量
        {{ author?.pageviews }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  author: {
    type: Object,
    required: true
  }
})
</script>

<style scoped lang="less">
.author-box {
  padding: 20px;
  background: #fff;

  .info-box {
    display: flex;
    padding-bottom: 20px;
    border-bottom: 1px solid #e4e6eb;

    .img-box {
      width: 50px;
      height: 50px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .author-info-box {
      padding-left: 15px;

      .author-name {
        font-size: 16px;
        font-weight: 900;
        line-height: 30px;
      }

      .author-brief {
        line-height: 20px;
        color: #515767;
      }
    }
  }

  .honor-box {
    color: #252933;
    line-height: 20px;
    .star-item {
      margin-top: 16px;
    }
    .pageviews-item {
      margin-top: 8px;
    }

    .iconfont {
      padding: 3px;
      border-radius: 50%;
      background-color: rgba(254, 184, 0, 0.2);
      color: #feb800;
    }
  }
}
</style>
