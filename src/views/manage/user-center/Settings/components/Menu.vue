<template>
  <el-menu default-active="basic" @select="onSelect">
    <el-menu-item index="basic">
      <span>基本设置</span>
    </el-menu-item>
    <el-menu-item index="safety">
      <span>安全设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
defineProps({
  tab: {
    type: String
  }
})

const emits = defineEmits(['update:tab'])
const onSelect = (tab) => {
  emits('update:tab', tab)
}
</script>

<style scoped lang="less">
::v-deep .el-menu-item {
  justify-content: center;
}
</style>
