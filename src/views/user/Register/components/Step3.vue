<template>
  <div class="step3-box">
    <h1>注册成功</h1>
  </div>
</template>

<script setup>
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onBeforeMount(() => {
  setTimeout(() => {
    router.replace('/login')
  }, 3000)
})
</script>

<style scoped lang="less">
.step3-box {
  padding: 90px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #67c23a;
}
</style>
