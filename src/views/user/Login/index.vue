<template>
  <div class="login-box">
    <el-form
      :model="formState"
      :rules="rules"
      ref="ruleForm"
      class="login-form"
    >
      <el-form-item>
        <h2 class="title">
          {{ $t('login.title') }}
          <Language class="language" />
        </h2>
      </el-form-item>
      <el-form-item prop="username">
        <el-input
          v-model="formState.username"
          size="large"
          :placeholder="$t('login.placeholder.username')"
          @keypress.enter="onSubmit"
        >
          <template #prepend><i class="iconfont icon-denglu"></i></template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="formState.password"
          type="password"
          size="large"
          :placeholder="$t('login.placeholder.password')"
          maxlength="18"
          show-password
          @keypress.enter="onSubmit"
        >
          <template #prepend><i class="iconfont icon-mima"></i> </template>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          size="large"
          class="submit-button"
          @click="onSubmit"
        >
          {{ $t('login.loginBtn') }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Language from '../../../components/Language.vue'

const formState = ref({
  username: '',
  password: ''
})
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 18, message: '密码长度至少为 6 个字符', trigger: 'blur' }
  ]
}
const ruleForm = ref()
const store = useStore()
const router = useRouter()
const onSubmit = () => {
  ruleForm.value.validate(async (valid) => {
    if (valid) {
      try {
        await store.dispatch('user/login', formState.value)
        router.push('/')
      } catch (err) {
        console.log(err)
      }
    }
  })
}
</script>

<style scoped lang="less">
.login-box {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../../../assets/images/login-bg.jpg');
  background-size: cover;

  .login-form {
    width: 600px;
    padding: 60px;
    border-radius: 25px;
    background-color: rgba(255, 255, 255, 0.5);

    .title {
      text-align: center;
      font-size: 35px;
      color: #1890ff;
      letter-spacing: 12px;
      width: 100%;
      position: relative;

      ::v-deep .language {
        position: absolute;
        top: 0;
        right: 0px;
        color: #333;
      }
    }

    .submit-button {
      width: 100%;
    }
  }
}
</style>
