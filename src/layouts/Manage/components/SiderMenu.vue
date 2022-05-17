<template>
  <!-- :style="{ width: isCollapse ? '' : '200px' }"，为了解决el-menu宽度坍塌 -->
  <el-menu
    :default-active="defaultActive"
    class="menu-box"
    :collapse="isCollapse"
    :style="{ width: isCollapse ? '' : '200px' }"
    @select="handleToSelect"
    unique-opened
  >
    <el-sub-menu index="user-center">
      <template #title>
        <el-icon><i class="iconfont icon-denglu" /></el-icon>
        <span>个人中心</span>
      </template>
      <el-menu-item index="/user-center/me">个人主页</el-menu-item>
      <el-menu-item index="/user-center/settings">个人设置</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="user-manage">
      <template #title>
        <el-icon><i class="iconfont icon-yonghuguanli" /></el-icon>
        <span>用户管理</span>
      </template>
      <el-menu-item index="/user-manage/list">用户列表</el-menu-item>
      <el-menu-item index="/user-manage/apply">申请列表</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="report-manage">
      <template #title>
        <el-icon><i class="iconfont icon-jubao" /></el-icon>
        <span>举报管理</span>
      </template>
      <el-menu-item index="/report-manage/list">举报列表</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="news-manage">
      <template #title>
        <el-icon><i class="iconfont icon-a-14xinwenguanli" /></el-icon>
        <span>新闻管理</span>
      </template>
      <el-menu-item index="/news-manage/edit">撰写新闻</el-menu-item>
      <el-menu-item index="/news-manage/draft">草稿箱</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="audit-manage">
      <template #title>
        <el-icon><i class="iconfont icon-shenheguanli" /></el-icon>
        <span>审核管理</span>
      </template>
      <el-menu-item index="/audit-manage/audit">审核新闻</el-menu-item>
      <el-menu-item index="/audit-manage/list">审核列表</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="publish-manage">
      <template #title>
        <el-icon><i class="iconfont icon-fabuguanli" /></el-icon>
        <span>发布管理</span>
      </template>
      <el-menu-item index="/publish-manage/unpublished">待发布</el-menu-item>
      <el-menu-item index="/publish-manage/published">已发布</el-menu-item>
      <el-menu-item index="/publish-manage/offline">已下线</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { ref, onBeforeMount, defineProps } from 'vue'
import { useRouter, useRoute } from 'vue-router'

defineProps({
  isCollapse: {
    type: Boolean
  }
})

const router = useRouter()
const route = useRoute()

const defaultActive = ref('')

onBeforeMount(() => {
  // 根据路由展开侧边栏
  const path = route.fullPath.replace('/manage', '')
  defaultActive.value = path
})

const handleToSelect = (key) => {
  router.push(`/manage${key}`)
}
</script>

<style scoped lang="less">
.menu-box {
  border-right: 0;
  .iconfont {
    font-size: 18px;
  }
}
</style>
