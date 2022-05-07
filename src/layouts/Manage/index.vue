<template>
  <el-container class="manage-box">
    <el-header class="header-box">
      <h2 class="title">智慧乡村信息服务平台</h2>
      <img :src="require('../../assets/images/user.webp')" alt="" width="35" />
    </el-header>
    <el-container>
      <el-aside class="aside-box">
        <sider-menu :isCollapse="isFold" />
      </el-aside>
      <el-main class="main-box">
        <div class="tools-box">
          <i
            class="iconfont icon-box"
            :class="isFold ? 'icon-zhankaicaidan' : 'icon-zhediecaidan'"
            @click="handleToFold"
            style="margin-right: 15px"
          />
          <bread-crumb />
        </div>

        <div class="content-box">
          <transition name="fade" mode="out-in">
            <keep-alive>
              <router-view />
            </keep-alive>
          </transition>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import SiderMenu from './components/SiderMenu.vue'
import BreadCrumb from './components/BreadCrumb.vue'
// 监听路由变化，添加path到tags中

let isFold = ref(false)
const handleToFold = () => {
  isFold.value = !isFold.value
}
</script>

<style scoped lang="less">
.manage-box {
  height: 100vh;
  background-color: #eff2f5;

  .header-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #001628;
    text-align: center;
    color: #fff;
    padding: 0 20px;
  }

  .aside-box {
    width: auto;
    background: #fff;
    height: calc(100vh - 60px);
    border-right: 1px solid grey;
    overflow-y: auto;
  }

  .main-box {
    height: calc(100vh - 60px);
    padding: 0;
    overflow-y: auto;

    .tools-box {
      position: sticky;
      top: 0px;
      display: flex;
      align-items: center;
      background-color: #fff;
      height: 45px;
      padding: 0 20px;
      z-index: 999;
    }

    .content-box {
      margin: 20px;
      min-height: calc(100vh - 60px - 85px);
      background-color: #fff;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 600ms;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(10%);
  opacity: 0.2;
}
</style>
