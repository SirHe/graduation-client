<template>
  <div class="me-box">
    <el-tabs>
      <el-tab-pane label="文章数据">文章数据</el-tab-pane>
      <el-tab-pane label="可视化数据">可视化数据</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>

<style scoped lang="less">
.me-box {
  padding: 20px;
}
</style>
