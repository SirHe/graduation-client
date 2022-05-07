<template>
  <el-breadcrumb>
    <el-breadcrumb-item>Home</el-breadcrumb-item>
    <el-breadcrumb-item><a href="">Application Center</a></el-breadcrumb-item>
    <el-breadcrumb-item><a href="">Application List</a></el-breadcrumb-item>
    <el-breadcrumb-item>An Application</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
console.log(route.fullPath)
const router = useRouter()
</script>

<style scoped lang="less"></style>
