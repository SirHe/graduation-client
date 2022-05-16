<template>
  <div class="reply-box" v-if="visible">
    <el-input
      :autofocus="true"
      v-model="message"
      :rows="2"
      type="textarea"
      :placeholder="authorName ? `回复${authorName}。。。` : '请输入评论'"
      @blur="onBlur"
      @keyup.enter="onReply"
    />
    <div class="tools-box">
      <el-button type="primary" @click="onReply">发布</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { addComment } from '../../../../../api/article'

const props = defineProps({
  visible: {
    type: Boolean
  },
  authorId: {
    type: String
  },
  authorName: {
    type: String
  },
  parentId: {
    type: String
  }
})
const emits = defineEmits(['update:visible', 'reply'])

const message = ref('')

const onBlur = () => {
  if (message.value.trim() === '') {
    emits('update:visible', false)
  }
}

const onReply = () => {
  const { authorId, parentId } = props
  const comment = {
    recipient: authorId,
    comment: message.value,
    parentId: parentId
  }
  addComment(comment)
  window.location.reload()
}
</script>

<style scoped lang="less">
.reply-box {
  padding: 15px 0;

  .tools-box {
    display: flex;
    padding-top: 10px;
    justify-content: right;
  }
}
</style>
