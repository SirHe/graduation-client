<template>
  <div class="edit-box">
    <el-steps :active="step" align-center class="steps-box">
      <el-step title="基本信息" description="文章标题、文章分类"></el-step>
      <el-step title="文章内容" description="文章主体内容"></el-step>
      <el-step title="新闻提交" description="保存草稿箱或者提交审核"></el-step>
    </el-steps>
    <step-1 v-if="step === 0" ref="stepRef" />
    <step-2 v-else-if="step === 1" v-model:content="article.content" />
    <step-3 v-else :article="article" />
    <div class="bottom">
      <el-button type="primary" size="large" v-if="step > 0" @click="onPrev">
        上一步
      </el-button>
      <el-button type="primary" size="large" v-if="step < 2" @click="onNext">
        下一步
      </el-button>
      <el-button
        type="primary"
        size="large"
        v-if="step === 2"
        @click="onSave"
        class="draft"
      >
        保持草稿箱
      </el-button>
      <el-button
        type="primary"
        size="large"
        v-if="step === 2"
        @click="onSubmit"
      >
        提交审核
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { addArticle } from '../../../../api/article'

import Step1 from './components/steps/Step1.vue'
import Step2 from './components/steps/Step2.vue'
import Step3 from './components/steps/Step3.vue'

const step = ref(0)

const article = ref({
  title: '',
  auditState: 0,
  category: [],
  coverFile: null,
  content: ''
})

const onSave = async () => {
  const res = await addArticle(article.value)
  console.log(res)
}

const onSubmit = async () => {
  article.value.auditState = 1
  const formData = new FormData()
  const keys = Object.keys(article.value)
  keys.forEach((key) => {
    formData.append(key, article.value[key])
  })
  addArticle(formData)
}

const stepRef = ref(null)
const onNext = async () => {
  if (step.value === 0) {
    try {
      const data = await stepRef.value.onSubmit()
      article.value = {
        ...article.value,
        ...data
      }
      step.value++
    } catch (err) {
      ElMessage({
        message: err,
        type: 'error'
      })
    }
    return
  }
  step.value++
}

const onPrev = () => {
  if (step.value > 0) {
    step.value--
  }
}
</script>

<style scoped lang="less">
.edit-box {
  .steps-box {
    padding: 25px 0;
  }
  .bottom {
    padding-bottom: 25px;
    padding-right: 25px;
    text-align: right;
  }
}
</style>
