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
    <el-sub-menu
      v-for="{ path, meta: { icon, title }, children } in menus"
      :index="path"
      :key="path"
    >
      <template #title>
        <el-icon><i class="iconfont" :class="icon" /></el-icon>
        <span>{{ title }}</span>
      </template>
      <el-menu-item
        v-for="{ path, meta: { title } } in children"
        :index="path"
        :key="path"
      >
        {{ title }}
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { ref, onBeforeMount, defineProps, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

defineProps({
  isCollapse: {
    type: Boolean
  }
})

const router = useRouter()
const route = useRoute()
const store = useStore()
const menus = computed(() => store.getters.menus)

const defaultActive = ref('')

onBeforeMount(() => {
  // 根据路由展开侧边栏
  defaultActive.value = route.fullPath
})

const handleToSelect = (key) => {
  router.push(key)
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
