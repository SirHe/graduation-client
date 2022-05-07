<template>
  <el-tabs class="tabs-box" v-model="activeName">
    <el-tab-pane name="markdown" label="markdown">
      <Markdown :html="content" @updateHtml="updateContext" ref="markdown" />
    </el-tab-pane>
    <el-tab-pane name="richtext" label="富文本">
      <Richtext :html="content" @updateHtml="updateContext" ref="richtext" />
    </el-tab-pane>
    <el-tab-pane name="upload" label="稿件上传"></el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { ref, defineExpose, defineProps, defineEmits } from 'vue'
import Markdown from '../Markdown.vue'
import Richtext from '../Richtext.vue'

defineProps({
  content: {
    type: String
  }
})

const emits = defineEmits(['update:content'])

const activeName = ref('markdown')

const markdown = ref(null)
const richtext = ref(null)

const updateContext = (html) => {
  emits('update:content', html)
}

const onSubmit = () => {}
defineExpose({ onSubmit })
</script>

<style scoped lang="less">
.tabs-box {
  padding: 50px;
}
</style>
