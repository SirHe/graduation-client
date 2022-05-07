<template>
  <el-form :inline="true" :model="formState" class="search-form">
    <el-form-item label="标题">
      <el-input v-model="formState.title"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">搜索</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const formState = ref({
  title: ''
})

const emits = defineEmits(['search'])
const onSubmit = () => {
  emits('search', formState.value)
}
</script>

<style scoped lang="less">
.search-form {
  display: flex;
  justify-content: space-between;
}
</style>
