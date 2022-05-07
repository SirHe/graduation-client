<template>
  <nav class="my-menu" @click="handleClick"><slot /></nav>
</template>

<script setup>
import { defineProps, defineEmits, provide, ref } from 'vue'

const props = defineProps({
  defaultActive: {
    type: String
  }
})

provide('isActive', props.defaultActive)

const emits = defineEmits(['select'])

const handleClick = (e) => {
  const key = e.target.getAttribute('index')
  if (!key) return
  handleSelect(key)
}
const handleSelect = (key) => {
  emits('select', key)
}
provide('select', handleSelect)
</script>

<style scoped lang="less">
.my-menu {
  display: flex;
  ::v-deep > * {
    flex: 1;
  }

  ::v-deep > .my-menu-item:hover {
    color: #4ea3ff;
    background: #e6f6ff;
    border-bottom: 2px solid #4ea3ff;
  }
}
</style>
