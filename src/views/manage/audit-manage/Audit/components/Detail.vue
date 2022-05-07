<template>
  <el-dialog append-to-body width="80%" v-model="visible" @close="onClose">
    <template #title>
      <h1>{{ article.title }}</h1>
    </template>
    <div class=""></div>
    <p v-html="article.content"></p>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  article: {
    type: Object
  },
  visible: {
    type: Boolean
  }
})

const emits = defineEmits(['update:visible'])
const onClose = () => {
  emits('update:visible', false)
}
</script>

<style scoped lang="less"></style>
