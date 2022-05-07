<template>
  <div class="table-box">
    <el-table :data="offline.data" border>
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
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="{ row: { id, title } }">
          <el-button type="danger" @click="onDelete(id, title)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="onPageChange"
      :total="offline.total"
    />
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { ElMessageBox } from 'element-plus'
import { getOfflineArticle, deleteArticle } from '../../../api/article'
import { convertDate } from '../../../utils'
import { STATIC_URL, article as articleConst } from '../../../constant'

const offline = ref({
  page: 1,
  size: 9,
  total: 0,
  data: []
})
const getOffline = async () => {
  const { data, total } = await getOfflineArticle(
    true,
    offline.value.page,
    offline.value.size
  )
  offline.value.data = data.map((item) => ({
    ...item,
    avatar: STATIC_URL + item.avatar,
    create_time: convertDate(item.create_time),
    category: articleConst.categoryMap[item.category]
  }))
  offline.value.total = total
}
onBeforeMount(getOffline)

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
    offline.value.data = offline.value.data.filter((item) => item.id !== id)
    deleteArticle(id)
  } catch (err) {}
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
