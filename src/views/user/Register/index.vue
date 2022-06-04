<template>
  <div class="register-box">
    <div class="box">
      <el-form-item>
        <h2 class="title">欢迎注册智慧乡村信息服务平台</h2>
      </el-form-item>
      <el-steps :active="active" finish-status="success">
        <el-step title="验证信息" />
        <el-step title="设置密码" />
        <el-step title="注册成功" />
      </el-steps>
      <step-1 @step="nextStep" v-if="active === 0" />
      <step-2 @step="nextStep" v-if="active === 1" />
      <step-3 @step="nextStep" v-if="active === 2" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import Step1 from './components/Step1.vue'
import Step2 from './components/Step2.vue'
import Step3 from './components/Step3.vue'

const active = ref(0)

const nextStep = () => {
  active.value = active.value + 1
}
</script>

<style scoped lang="less">
.register-box {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../../../assets/images/login-bg.jpg');
  background-size: cover;

  .box {
    width: 600px;
    padding: 60px;
    border-radius: 25px;
    background-color: rgba(255, 255, 255, 0.5);

    .title {
      text-align: center;
      font-size: 30px;
      color: #1890ff;
      letter-spacing: 12px;
      width: 100%;
    }
  }
}
</style>
