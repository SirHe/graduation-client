<template>
  <div class="table-box">
    <el-table :data="published.data" border>
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
          <el-button type="danger" @click="onOffline(id, title)">
            下线
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="onPageChange"
      :total="published.total"
    />
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { ElMessageBox } from 'element-plus'
import { getPublishList, offlineArticle } from '../../../api/article'
import { convertDate } from '../../../utils'
import { STATIC_URL, article as articleConst } from '../../../constant'

const published = ref({
  page: 1,
  size: 9,
  total: 0,
  data: []
})
const getPublished = async () => {
  const { data, total } = await getPublishList(
    true,
    published.value.page,
    published.value.size
  )
  published.value.data = data.map((item) => ({
    ...item,
    avatar: STATIC_URL + item.avatar,
    create_time: convertDate(item.create_time),
    category: articleConst.categoryMap[item.category]
  }))
  published.value.total = total
}
onBeforeMount(getPublished)

const onOffline = async (id, title) => {
  try {
    await ElMessageBox.confirm(
      `你确定要下线<b style="color:red"> ${title} </b>文章吗？`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true
      }
    )

    // 确定删除
    published.value.data = published.value.data.filter((item) => item.id !== id)
    offlineArticle(id)
  } catch (err) {}
}

const onPageChange = (page) => {
  published.value.page++
  getPublished()
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
