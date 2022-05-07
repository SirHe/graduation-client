<template>
  <div class="tags-view-box">
    <router-link
      v-for="(tag, index) in $store.getters.tagsViewList"
      :key="tag.fullPath"
      class="tags-view-item"
      :class="isActive(tag) ? 'active' : ''"
      :to="tag.fullPath"
      @contextmenu="openMenu($event, index)"
    >
      {{ tag.title }}
      <i v-show="!isActive(tag)" @click="onClose"></i>
    </router-link>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const isActive = (tag) => tag.path === route.path
const onClose = () => {}
const openMenu = (e, index) => {}
</script>

<style scoped lang="less"></style>
