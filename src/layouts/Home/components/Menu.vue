<template>
  <my-menu
    class="menu-box"
    mode="horizontal"
    @select="handleSelect"
    :default-active="activeIndex"
  >
    <my-menu-item index="/law">法律法规</my-menu-item>
    <my-sub-menu index="/agriculture">
      <template #title>农业技术</template>
      <my-menu-item index="/agriculture/plant">种植技术</my-menu-item>
      <my-menu-item index="/agriculture/breed">养殖技术</my-menu-item>
      <my-menu-item index="/agriculture/share">技术交流</my-menu-item>
    </my-sub-menu>
    <my-menu-item index="/bulletin">乡村公告</my-menu-item>
    <my-menu-item index="/produce">特色农产品</my-menu-item>
  </my-menu>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const activeIndex = ref('')
const handleSelect = (key) => {
  router.push(`/home${key}`)
  activeIndex.value = key
}

// 监听路由，高亮菜单选项
onBeforeMount(() => {
  const path = router.currentRoute.value.fullPath.replace('/home', '')
  activeIndex.value = path
})
</script>

<style scoped lang="less"></style>
