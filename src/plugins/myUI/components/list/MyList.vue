<template>
  <ul class="my-list-items">
    <!-- 可以写多个slot，只要条件符合，那么slot就会被替换成插入内容 -->
    <!-- 也就是说，一份插入内容，如果有多个slot接收，那么就会被渲染成多个视图 -->
    <!-- 通过这样使用插槽的特性以及插槽作用域，实现了一种类似react中的render-props模式 -->
    <slot name="renderItem" v-for="item in dataSource" :item="item" />
    <div
      v-if="!Array.isArray(dataSource) || dataSource.length === 0"
      class="my-list-empty-text"
    >
      <div class="empty-img">
        <svg
          class="ant-empty-img-simple"
          width="64"
          height="41"
          viewBox="0 0 64 41"
        >
          <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
            <ellipse
              class="ant-empty-img-simple-ellipse"
              fill="#F5F5F5"
              cx="32"
              cy="33"
              rx="32"
              ry="7"
            ></ellipse>
            <g
              class="ant-empty-img-simple-g"
              fill-rule="nonzero"
              stroke="#D9D9D9"
            >
              <path
                d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
              ></path>
              <path
                d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                fill="#FAFAFA"
                class="ant-empty-img-simple-path"
              ></path>
            </g>
          </g>
        </svg>
      </div>
      <div class="empty-text">暂无数据</div>
    </div>
  </ul>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  dataSource: {
    type: Array
  },
  bordered: {
    type: Boolean
  }
})
// console.log(Object.prototype.hasOwnProperty.call(props, 'bordered'))
</script>

<style scoped lang="less">
.my-list-items {
  border: 1px solid #eaeef4;

  .my-list-empty-text {
    padding: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .empty-text {
      height: 30px;
      line-height: 30px;
      color: #909399;
    }
  }
}
</style>
