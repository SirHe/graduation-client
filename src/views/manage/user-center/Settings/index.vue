<template>
  <div class="settings-box">
    <div class="menu-box">
      <Menu v-model:tab="tab" />
    </div>
    <div class="tabs-box">
      <Basic v-if="tab === 'basic'" />
      <Safety v-else />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Menu from './components/Menu.vue'
import Basic from './components/Basic.vue'
import Safety from './components/Safety.vue'

const tab = ref('basic')
</script>

<style scoped lang="less">
.settings-box {
  display: flex;
  padding: 20px 0;

  .menu-box {
    width: 210px;
  }

  .tabs-box {
    flex: 1;
    padding: 0 20px;
  }
}
</style>
