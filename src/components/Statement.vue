<template>
  <el-dialog v-model="visible" :title="title" width="30%" @close="onClose">
    <p class="content">
      <b>
        该网站使用的图片和文章均仅作为个人学习的测试数据，如有侵权，请联系站长删除。（联系方式：15211661645）
      </b>
    </p>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  title: {
    type: String
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

<style scoped lang="less">
.content {
  color: red;
}
</style>
