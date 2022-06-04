<template>
  <div class="step1">
    <el-tabs
      v-model="formState.type"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane label="手机" name="phone">
        <el-form
          style="padding: 10px"
          ref="formRef1"
          label-position="top"
          :model="formState"
          :rules="rules1"
          label-width="120px"
        >
          <el-form-item label="手机号" size="large" prop="phone">
            <el-input v-model="formState.phone" placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item label="验证码" size="large" prop="code">
            <div style="display: flex; width: 100%">
              <el-input v-model="formState.code" placeholder="请输入验证码" />
              <el-button @click="onCode">{{ formState.button }}</el-button>
            </div>
          </el-form-item>
          <el-button
            type="primary"
            size="large"
            class="submit-button"
            style="width: 100%"
            @click="onSubmit"
          >
            注册
          </el-button>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="邮箱" name="email">
        <el-form
          style="padding: 10px"
          ref="formRef2"
          label-position="top"
          :model="formState"
          :rules="rules2"
          label-width="120px"
        >
          <el-form-item label="邮箱" size="large" prop="email">
            <el-input v-model="formState.email" placeholder="请输入邮箱" />
          </el-form-item>
          <el-form-item label="验证码" size="large" prop="code">
            <div style="display: flex; width: 100%">
              <el-input v-model="formState.code" placeholder="请输入验证码" />
              <el-button @click="onCode">{{ formState.button }}</el-button>
            </div>
          </el-form-item>
          <el-button
            type="primary"
            size="large"
            class="submit-button"
            style="width: 100%"
            @click="onSubmit"
          >
            注册
          </el-button>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { useStore } from 'vuex'
import { sendCode, checkCode } from '../../../../api/user'
import { isEmail, isPhone } from '../../../../utils/validate'
import { ElMessage } from 'element-plus'

const store = useStore()
const formState = ref({
  phone: '',
  email: '',
  code: '',
  button: '获取验证码',
  type: 'phone',
  isLoading: false
})

const onCode = async () => {
  if (formState.value.isLoading) {
    return
  }
  sendCode(
    formState.value.phone,
    formState.value.email,
    formState.value.type
  ).then(({ data: { tokenHead, token } }) => {
    store.commit('user/setToken', `${tokenHead} ${token}`)
  })
  timing(60)
  formState.value.isLoading = true
}

const timing = (time) => {
  if (time > 0) {
    setTimeout(() => {
      formState.value.button = time + ' s'
      time--
      timing(time)
    }, 1000)
  } else {
    formState.value.isLoading = false
    formState.value.button = '获取验证码'
  }
}

const checkPhone = (rule, value, callback) => {
  if (!value) {
    return callback()
  } else {
    if (isPhone(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的手机号'))
    }
  }
}
const formRef1 = ref(null)
const formRef2 = ref(null)
const checkEmail = (rule, value, callback) => {
  if (!value) {
    return callback()
  } else {
    if (isEmail(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的邮箱'))
    }
  }
}
const rules1 = {
  phone: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur'
    },
    { validator: checkPhone, trigger: 'blur' }
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur'
    }
  ]
}
const rules2 = {
  email: [
    {
      required: true,
      message: '请输入邮箱',
      trigger: 'blur'
    },
    { validator: checkEmail, trigger: 'blur' }
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur'
    }
  ]
}

const emits = defineEmits('step')
const onSubmit = async () => {
  let form = null
  if (formState.value.type === 'phone') {
    form = formRef1
  } else {
    form = formRef2
  }

  await form.value.validate(async (valid, fields) => {
    if (valid) {
      console.log('验证成功')
      const { code } = await checkCode(formState.value.code)
      if (code !== 0) {
        ElMessage.error('验证码错误')
      } else {
        emits('step')
      }
    } else {
      console.log('error submit!')
    }
  })
}
</script>

<style scoped lang="less">
.step1 {
  padding: 10px 0;
  ::v-deep .el-tabs__nav {
    width: 100%;

    .el-tabs__item {
      width: 50%;
      text-align: center;
    }
  }
}
</style>
