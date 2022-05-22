<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
  <!-- <Statement v-model:visible="visible" title="温馨提示" /> -->
</template>

<script setup>
import store from './store'
import { computed, ref } from 'vue'
import cn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import Statement from './components/Statement.vue'

const visible = ref(true)

const locale = computed(() => (store.getters.language === 'ch' ? cn : en))
</script>

<style lang="less"></style>
