<template>
  <div class="table-box">
    <el-table :data="audit.data" border>
      <el-table-column prop="title" label="文章标题"> </el-table-column>
      <el-table-column prop="author" label="作者">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-avatar :size="size" :src="scope.row.avatar"></el-avatar>
            <span style="margin-left: 10px">{{ scope.row.author }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="category" label="文章分类"> </el-table-column>
      <el-table-column prop="state" label="审核状态">
        <template #default="{ row: { audit_state } }">
          <el-tag :type="articleConst.auditStateColorMap[audit_state]">
            {{ articleConst.auditStateMap[audit_state] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="{ row: { id, title, audit_state } }">
          <el-button
            type="danger"
            v-if="audit_state === '1'"
            @click="onRevoke(id, title)"
          >
            撤销
          </el-button>
          <el-button
            type="success"
            v-else-if="audit_state === '2'"
            @click="onPublish(id, title)"
          >
            发布
          </el-button>
          <el-button
            type="primary"
            v-else-if="audit_state === '3'"
            @click="onDelete(id, title)"
          >
            修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="onPageChange"
      :total="audit.total"
    />
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { ElMessageBox } from 'element-plus'
import { STATIC_URL, article as articleConst } from '../../../constant'
import { convertDate } from '../../../utils'
import { getAuditList } from '../../../api/article'

const audit = ref({
  page: 1,
  size: 9,
  total: 0,
  data: []
})
const getAudit = async () => {
  const { data, total } = await getAuditList(
    false,
    audit.value.page,
    audit.value.size
  )
  audit.value.data = data.map((item) => ({
    ...item,
    avatar: STATIC_URL + item.avatar,
    create_time: convertDate(item.create_time),
    category: articleConst.categoryMap[item.category]
  }))
  audit.value.total = total
}
onBeforeMount(getAudit)

const onRevoke = async (id, title) => {
  try {
    await ElMessageBox.confirm(
      `你确定要撤销<b style="color:red"> ${title} </b>文章吗？`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true
      }
    )

    // 确定撤销
    audit.value.data = audit.value.data.filter((item) => item.id !== id)
  } catch (err) {}
}

const onPageChange = async (page) => {
  const { data } = await getAuditList(false, page, audit.value.size)
  audit.value.data = data.map((item) => ({
    ...item,
    avatar: STATIC_URL + item.avatar,
    create_time: convertDate(item.create_time),
    category: articleConst.categoryMap[item.category]
  }))
}

const onEdit = (id) => {}

const onPublish = (id) => {}
</script>

<style scoped lang="less">
.table-box {
  padding: 20px;
  .el-pagination {
    justify-content: right;
    padding: 20px;
  }
}
</style>
