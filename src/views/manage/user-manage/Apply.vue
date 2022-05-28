<template>
  <div class="apply-box">
    <el-table :data="applyList" border style="width: 100%">
      <el-table-column prop="date" label="申请人" />
      <el-table-column prop="name" label="申请角色" />
      <el-table-column fixed="right" label="操作" width="160">
        <template #default="{ row }">
          <el-button type="primary" @click="onAgree(row.id)">同意</el-button>
          <el-button type="danger" @click="onReject(row.id)"> 拒绝 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'

const applyList = ref([])

const onAgree = () => {}
const onReject = () => {}
</script>

<style scoped lang="less">
.apply-box {
  padding: 20px;
}
</style>
