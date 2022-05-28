<template>
  <el-dialog v-model="visible" @close="onClose">
    <template #title>
      <h3 class="report-title">
        举报<i>{{ title }}</i>
      </h3>
    </template>
    <el-input type="textarea" placeholder="请输入举报理由" v-model="reason" />
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="onReport"> 提交举报 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { tableNameMap } from '../../../../constant/article'
import { addReport } from '../../../../api/article'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  title: {
    type: String
  },
  reported: {
    type: String,
    required: true
  },
  type: {
    type: Number,
    default() {
      return 0
    }
  }
})
const reason = ref('')
const emits = defineEmits(['update:visible'])
const onClose = () => {
  emits('update:visible', false)
}
const onReport = async () => {
  await addReport(props.reported, reason.value, tableNameMap[props.type])
  reason.value = ''
  emits('update:visible', false)
}
</script>

<style scoped lang="less">
.report-title {
  i {
    color: red;
  }
}
</style>
