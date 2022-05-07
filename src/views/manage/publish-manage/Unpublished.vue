<template>
  <div class="table-box">
    <el-table :data="publish.data" border>
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
        <template #default="{ row: { id } }">
          <el-button type="primary" @click="onPublish(id)"> 发布 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="onPageChange"
      :total="publish.total"
    />
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { getPublishList, publishArticle } from '../../../api/article'
import { convertDate } from '../../../utils'
import { STATIC_URL, article as articleConst } from '../../../constant'

const publish = ref({
  page: 1,
  size: 9,
  total: 0,
  data: []
})
const getPublish = async () => {
  const { data, total } = await getPublishList(
    false,
    publish.value.page,
    publish.value.size
  )
  publish.value.data = data.map((item) => ({
    ...item,
    avatar: STATIC_URL + item.avatar,
    create_time: convertDate(item.create_time),
    category: articleConst.categoryMap[item.category]
  }))
  publish.value.total = total
}
onBeforeMount(getPublish)

const onPublish = async (id) => {
  await publishArticle(id)
  getPublish()
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
