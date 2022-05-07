<template>
  <div id="richtext"></div>
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

defineProps({
  html: {
    type: String
  }
})
let editor = null
const emit = defineEmits(['updateHtml'])
const change = (html) => {
  emit('updateHtml', html)
}

const clear = () => {
  editor.txt.clear()
}
onMounted(async () => {
  editor = await createEditor('richtext', '#richtext')
  editor.config.onchange = change
})

onUnmounted(() => {
  editor.config.onchange = null
})

defineExpose({
  clear
})
</script>

<style scoped lang="less"></style>
