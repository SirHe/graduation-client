<template>
  <div id="markdown"></div>
</template>

<script setup>
import {
  onMounted,
  onUnmounted,
  defineProps,
  defineEmits,
  defineExpose
} from 'vue'
import { createEditor } from '../utils'

const props = defineProps({
  html: {
    type: String
  }
})

let editor = null
const emit = defineEmits(['updateHtml'])
const change = () => {
  const html = editor.getHTML()
  emit('updateHtml', html)
}

const clear = () => {
  editor.reset()
}

onMounted(async () => {
  editor = await createEditor('markdown', '#markdown')
  editor.on('change', change)
})

onUnmounted(() => {
  editor.off('change', change)
})

defineExpose({
  clear
})
</script>

<style scoped lang="less"></style>
