<template>
  <el-form
    ref="formStateRef"
    :model="formState"
    :rules="rules"
    label-width="120px"
    class="form-box"
    :size="formSize"
  >
    <el-form-item label="标题" prop="title">
      <el-input v-model="formState.title" />
    </el-form-item>
    <el-form-item label="文章分类" prop="category">
      <el-cascader
        placeholder="请选择文章类型"
        v-model="formState.category"
        :options="categoryOptions"
      />
    </el-form-item>

    <el-form-item label="文章简介" prop="summary">
      <el-input type="textarea" v-model="formState.summary" />
    </el-form-item>

    <el-form-item label="文章关键字" prop="keywords">
      <el-tag
        :key="tag"
        v-for="tag in formState.keywords"
        closable
        :disable-transitions="false"
        @close="onClose(tag)"
      >
        {{ tag }}
      </el-tag>
      <el-input
        size="small"
        class="input-new-tag"
        v-if="keyVisible"
        v-model="keyValue"
        ref="saveTagInput"
        @keyup.enter="onKeyConfirm"
        @blur="onKeyConfirm"
      />

      <el-button
        v-else
        class="button-new-tag"
        size="mini"
        type="primary"
        @click="showKeyVisible"
      >
        + 添加新关键字
      </el-button>
    </el-form-item>

    <el-form-item label="文章封面" prop="cover">
      <el-upload
        drag
        :auto-upload="false"
        :limit="1"
        :show-file-list="false"
        :on-change="onChange"
      >
        <div class="img-box" v-if="formState.cover.url">
          <img :src="formState.cover.url" class="avatar" />
        </div>
        <i v-else class="iconfont icon-jia"></i>
      </el-upload>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, defineExpose, onBeforeMount } from 'vue'
import { getCategoryList } from '../../../../../../api/article'
import { categoryMap } from '../../../../../../constant/article'

const rules = {
  title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
  category: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
  summary: [{ required: true, message: '请输入文章简介', trigger: 'change' }]
}

const categoryOptions = ref([])
const transformOptionsFn = (options) => {
  if (!Array.isArray(options) || options.length === 0) {
    return
  }
  return options.map(({ id, name, children }) => ({
    label: categoryMap[name],
    value: id,
    children: transformOptionsFn(children)
  }))
}
onBeforeMount(async () => {
  const { data } = await getCategoryList()
  categoryOptions.value = transformOptionsFn(data)
})

// 关键字处理
const keyVisible = ref(false)
const keyValue = ref('')
const saveTagInput = ref(null)
const onClose = (tag) => {
  formState.value.keywords.splice(formState.value.keywords.indexOf(tag), 1)
}
const showKeyVisible = () => {
  keyVisible.value = true
  this.$nextTick((_) => {
    saveTagInput.value.focus()
  })
}
const onKeyConfirm = () => {
  if (keyValue.value) {
    formState.value.keywords.push(keyValue.value)
  }
  keyVisible.value = false
  keyValue.value = ''
}

const formStateRef = ref()
const formState = ref({
  title: '',
  category: [],
  summary: '',
  keywords: [],
  cover: {
    file: '',
    url: ''
  }
})
const onSubmit = () => {
  return new Promise((resolve, reject) => {
    formStateRef.value.validate((valid) => {
      if (valid) {
        const { title, category, cover, summary, keywords } = formState.value
        resolve({
          title,
          summary,
          keywords: keywords.join(','),
          coverFile: cover.file,
          coverUrl: cover.url,
          category: category.pop()
        })
      } else {
        reject(new Error('表单验证失败'))
      }
    })
  })
}

const onChange = (file) => {
  formState.value.cover = {
    url: URL.createObjectURL(file.raw),
    file: file.raw
  }
}

defineExpose({ onSubmit })
</script>

<style scoped lang="less">
.form-box {
  padding: 20px 160px;

  ::v-deep .el-upload-dragger {
    width: 750px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 425px;
    .img-box {
      width: 750px;
      height: 425px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}
</style>
