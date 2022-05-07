<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import store from './store'
import { computed } from 'vue'
import cn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
const locale = computed(() => (store.getters.language === 'ch' ? cn : en))
</script>

<style lang="less"></style>
