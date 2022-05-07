<template>
  <el-form :inline="true" :model="formState" class="search-form">
    <el-form-item label="居住地区">
      <el-select v-model="formState.region">
        <el-option label="铺平村" value="铺平村" />
        <el-option label="新屋村" value="新屋村" />
        <el-option label="红旗村" value="红旗村" />
        <el-option label="麻塘村" value="麻塘村" />
        <el-option label="塘口村" value="塘口村" />
      </el-select>
    </el-form-item>
    <el-form-item label="年龄">
      <el-input-number
        v-model="formState.minAge"
        controls-position="right"
        @change="handleChange"
        :min="18"
        :max="100"
      />
      {{ ' - ' }}
      <el-input-number
        v-model="formState.maxAge"
        controls-position="right"
        @change="handleChange"
        :min="18"
        :max="100"
      />
    </el-form-item>
    <el-form-item label="性别">
      <el-select v-model="formState.sex">
        <el-option label="男" value="男" />
        <el-option label="女" value="女" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">寻找缘分</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const formState = ref({
  region: '铺平村',
  maxAge: 50,
  minAge: 18,
  sex: '女'
})

const emits = defineEmits(['search'])
const onSubmit = () => {
  emits('search', formState.value)
}
</script>

<style scoped lang="less">
.search-form {
}
</style>
