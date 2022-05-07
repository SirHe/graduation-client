<template>
  <el-form>
    <el-form-item>
      <el-input
        ref="replyRef"
        type="textarea"
        @blur="onBlur"
        v-model="content"
        :placeholder="
          receiver
            ? `回复${receiverName}...`
            : '输入评论（Enter换行，⌘ + Enter发送）'
        "
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">发布</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue'

const props = defineProps({
  receiverName: {
    type: String
  },
  content: {
    type: String
  }
})

// 进入组件自动聚焦，失焦
const replyRef = ref()
onMounted(() => {
  replyRef.value.focus()
})
const onBlur = () => {
  // 失焦时同步父组件数据，做状态保持
  emits('update:content', props.content)
  emits('close')
}

// 发布评论
const emits = defineEmits(['reply', 'close', 'update:content'])
const onSubmit = () => {
  emits('reply', props.content)
}
</script>

<style scoped lang="less"></style>
