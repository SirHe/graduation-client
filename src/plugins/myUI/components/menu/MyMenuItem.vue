<template>
  <div
    class="my-menu-item"
    :class="{ 'is-active': !isSubItem && isActive === index }"
    :index="index"
  >
    <slot />
  </div>
</template>

<script setup>
import { defineProps, inject, computed } from 'vue'

defineProps({
  index: {
    type: String
  }
})

const isActive = inject('isActive')
const isSubItem = inject('isSubItem')
</script>

<style scoped lang="less">
.my-menu-item {
  height: 60px;
  line-height: 60px;
  text-align: center;
  // padding: 0 20px;
  cursor: pointer;
}

.is-active {
  color: #4ea3ff;
  border-bottom: 2px solid #4ea3ff;
}
</style>
