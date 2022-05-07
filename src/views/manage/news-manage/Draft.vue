<template>
  <div class="table-box">
    <el-table :data="draft.data" border>
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
      <el-table-column prop="create_time" label="创建时间"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="260">
        <template #default="{ row: { id, title } }">
          <el-button type="danger" @click="onDelete(id, title)">删除</el-button>
          <el-button type="primary" @click="onEdit(id)">编辑</el-button>
          <el-button type="success" @click="onAudit(id)">提交审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="onPageChange"
      :total="draft.total"
    />
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { ElMessageBox } from 'element-plus'
import { convertDate } from '../../../utils'
import { STATIC_URL, article as articleConst } from '../../../constant'
import { deleteArticle, getDraftList, submitAduit } from '../../../api/article'

const draft = ref({
  page: 1,
  size: 9,
  total: 0,
  data: []
})
const getDraft = async () => {
  const { page, size } = draft.value
  const { data, total } = await getDraftList(page, size)
  draft.value.data = data.map((item) => ({
    ...item,
    avatar: STATIC_URL + item.avatar,
    create_time: convertDate(item.create_time),
    category: articleConst.categoryMap[item.category]
  }))
  draft.value.total = total
}
onBeforeMount(getDraft)

const onPageChange = async (page) => {
  const { data } = await getDraftList(page, draft.value.size)
  draft.value.data = data.map((item) => ({
    ...item,
    avatar: STATIC_URL + item.avatar,
    create_time: convertDate(item.create_time),
    category: articleConst.categoryMap[item.category]
  }))
}

const onDelete = async (id, title) => {
  try {
    await ElMessageBox.confirm(
      `你确定要删除<b style="color:red"> ${title} </b>文章吗？`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true
      }
    )

    // 确定删除
    draft.value.data = draft.value.data.filter((item) => item.id !== id)
    deleteArticle(id)
  } catch (err) {}
}

const onEdit = (id) => {}

const onAudit = async (id) => {
  await submitAduit(id)
  getDraft()
}
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
