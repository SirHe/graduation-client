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
      <el-table-column prop="create_time" label="创建时间"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="320">
        <template #default="{ row: { id } }">
          <el-button type="primary" @click="onDetail(id)">
            查看文章详情
          </el-button>
          <el-button type="success" @click="onSuccess(id)">通过</el-button>
          <el-button type="danger" @click="onFail(id)">不通过</el-button>
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
  <Detail v-model:visible="article.visible" :article="article.data" />
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { ElMessageBox } from 'element-plus'
import { convertDate } from '../../../../utils'
import { STATIC_URL, article as articleConst } from '../../../../constant'
import {
  getAuditList,
  getArticleDetail,
  auditArticle
} from '../../../../api/article'
import Detail from './components/Detail.vue'

const audit = ref({
  page: 1,
  size: 9,
  total: 0,
  data: []
})
const getAudit = async () => {
  const { data, total } = await getAuditList(
    true,
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

const onPageChange = async (page) => {
  const { data } = await getAuditList(true, page, audit.value.size)
  audit.value.data = data.map((item) => ({
    ...item,
    avatar: STATIC_URL + item.avatar,
    create_time: convertDate(item.create_time),
    category: articleConst.categoryMap[item.category]
  }))
}

const article = ref({
  visible: false,
  data: null
})
const onDetail = async (id) => {
  const { data } = await getArticleDetail(id)
  article.value = {
    data,
    visible: true
  }
}

const onSuccess = async (id) => {
  await auditArticle(id, true)
  getAudit()
}

const onFail = async (id) => {
  await auditArticle(id, false)
  getAudit()
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
