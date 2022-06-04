<template>
  <div class="step2-box">
    <el-form
      :model="formState"
      :rules="rules"
      ref="ruleForm"
      label-position="top"
      style="padding: 20px"
    >
      <el-form-item prop="password1" label="密码">
        <el-input
          v-model="formState.password1"
          type="password"
          size="large"
          placeholder="请输入密码"
          maxlength="18"
          show-password
          @keypress.enter="onSubmit"
        >
        </el-input>
      </el-form-item>

      <el-form-item prop="password2" label="确认密码">
        <el-input
          v-model="formState.password2"
          type="password"
          size="large"
          placeholder="请输入确认密码"
          maxlength="18"
          show-password
          @keypress.enter="onSubmit"
        >
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          style="width: 100%"
          type="primary"
          size="large"
          class="submit-button"
          @click="onSubmit"
        >
          注册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { addPassword } from '../../../../api/user'

const formState = ref({
  password1: '',
  password2: ''
})

const confirmPwd = (rule, value, callback) => {
  if (value !== formState.value.password1) {
    return callback(new Error('两次输入密码不一致！'))
  } else {
    callback()
  }
}
const rules = {
  password1: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 18, message: '密码长度至少为 6 个字符', trigger: 'blur' }
  ],
  password2: [
    { required: true, message: '请输入密码确认', trigger: 'blur' },
    { min: 6, max: 18, message: '密码长度至少为 6 个字符', trigger: 'blur' },
    { validator: confirmPwd, trigger: 'blur' }
  ]
}

const ruleForm = ref(null)
const emits = defineEmits('step')
const onSubmit = () => {
  ruleForm.value.validate((valid, fields) => {
    if (valid) {
      console.log('验证成功')
      addPassword(formState.value.password1, formState.value.password2)
      emits('step')
    } else {
      console.log('error submit!')
    }
  })
}
</script>

<style scoped lang="less">
.step2-box {
}
</style>
