<template>
  <div class="report-box">
    <el-table :data="report.list" border style="width: 100%">
      <el-table-column prop="report" label="举报人" />
      <el-table-column prop="reported" label="被举报对象" />
      <el-table-column prop="content" label="举报内容" />
      <el-table-column prop="reason" label="举报理由" />
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="{ row }">
          <el-button type="primary" @click="onHandle(row.reported_id)">
            封号处理
          </el-button>
          <el-button type="danger" @click="onIgnore(row.id)">忽略</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="onPageChange"
      :total="report.total"
    />
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { getReportList, deleteReport } from '../../../api/article'
import { toggleUserState } from '../../../api/user'

const onHandle = (id) => {
  toggleUserState(id, false)
  report.value.list = report.value.list.filter(({ id: _id }) => id !== _id)
  deleteReport(id)
}
const onIgnore = (id) => {
  report.value.list = report.value.list.filter(({ id: _id }) => id !== _id)
  deleteReport(id)
}

const report = ref({
  page: 1,
  size: 8,
  total: 0,
  list: []
})

onBeforeMount(async () => {
  const { data, total } = await getReportList(1, 8)
  report.value.list = data
  report.value.total = total
})
const onPageChange = async (page) => {
  const { data } = await getReportList(page, report.value.size)
  report.value.list = data
}
</script>

<style scoped lang="less">
.report-box {
  padding: 20px;

  .el-pagination {
    justify-content: right;
    padding: 20px;
  }
}
</style>
