<template>
  <div></div>
</template>

<script setup>
import { onMounted } from 'vue'
import Driver from 'driver.js'
import steps from './steps'
import 'driver.js/dist/driver.min.css'

let driver = null
onMounted(() => {
  driver = new Driver({
    allowClose: false,
    closeBtnText: '',
    nextBtnText: '',
    prevBtnText: ''
  })
})
</script>

<style scoped lang="less"></style>
