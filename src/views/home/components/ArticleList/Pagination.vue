<template>
  <el-pagination
    class="pagination-box"
    @current-change="onChange"
    background
    :page-size="size"
    layout="prev, pager, next"
    :total="total"
  />
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  size: {
    type: Number,
    default() {
      return 15
    }
  },
  total: {
    type: Number,
    default() {
      return 0
    }
  }
})

const emits = defineEmits(['onChange'])

const onChange = (page) => {
  emits('onChange', page)
}
</script>

<style scoped lang="less">
.el-pagination {
  // background: #fff;
  justify-content: right;
  padding: 20px;
}
</style>
