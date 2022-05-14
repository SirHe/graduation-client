<template>
  <div class="outer-head-box">
    <div class="inner-head-box">
      <div class="transition-box">
        <div class="head-box1" v-if="!isTop">
          <ul class="box">
            <li class="title-box">
              <img
                :src="require('../../../assets/images/logo.png')"
                alt=""
                width="50"
              />
              <h2>智慧乡村</h2>
            </li>
            <li class="img-box">
              <img
                :src="require('../../../assets/images/header-logo.jpeg')"
                alt=""
              />
            </li>
            <li class="icon-box">
              <i class="iconfont icon-sousuo"></i>
              <ScreenFull />
              <div class="user-box" @click="handleUser">
                <img
                  :src="require('../../../assets/images/user.jpeg')"
                  alt=""
                  v-if="isLogin"
                />
                <i class="iconfont icon-user" v-else></i>
              </div>
            </li>
          </ul>
          <Menu />
        </div>
      </div>
      <transition name="fade">
        <div class="outer-head-box2" v-if="isTop">
          <div class="head-box2">
            <div class="title-box">
              <img
                :src="require('../../../assets/images/logo.png')"
                alt=""
                width="50"
              />
              <h2>智慧乡村</h2>
            </div>
            <Menu class="menu" />
            <div class="icon-box">
              <i class="iconfont icon-sousuo"></i>
              <!-- <ScreenFull /> -->
              <div class="user-box" @click="handleUser">
                <img
                  :src="require('../../../assets/images/user.jpeg')"
                  alt=""
                  v-if="isLogin"
                /><i class="iconfont icon-user" v-else></i>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
  <div class="mobile-head">
    <div class="title-box">
      <img
        :src="require('../../../assets/images/logo.png')"
        alt=""
        width="50"
      />
      <h2>智慧乡村</h2>
    </div>
    <i class="iconfont icon-liebiao icon-box" @click="isUnfold = true"></i>
    <el-drawer v-model="isUnfold" :size="200">
      <el-menu
        class="menu-box"
        @select="handleSelect"
        :default-active="activeIndex"
      >
        <el-menu-item index="/law">法律法规</el-menu-item>
        <el-sub-menu index="/agriculture">
          <template #title>农业技术</template>
          <el-menu-item index="/agriculture/plant">种植技术</el-menu-item>
          <el-menu-item index="/agriculture/breed">养殖技术</el-menu-item>
          <el-menu-item index="/agriculture/share">技术交流</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/bulletin">乡村公告</el-menu-item>
        <el-menu-item index="/produce">特色农产品</el-menu-item>
        <el-menu-item :index="isLogin ? '/manage' : '/login'">
          {{ isLogin ? '个人中心' : '登录' }}
        </el-menu-item>
      </el-menu>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import _ from 'lodash'
import Menu from './Menu.vue'
import ScreenFull from '../../../components/ScreenFull.vue'

const store = useStore()
const router = useRouter()

// 菜单切换
const isTop = ref(false)
window.addEventListener(
  'scroll',
  _.throttle(function (e) {
    let top = document.documentElement.scrollTop || document.body.srcollTop
    if (top > 90) {
      isTop.value = true
    } else {
      isTop.value = false
    }
  }, 100)
)

// 用户头像切换
const isLogin = ref(!!store.getters.token)
const handleUser = () => {
  if (isLogin.value) {
    // 如果登录，去到个人中心
    router.push('/manage')
  } else {
    // 没登录，去登录界面
    router.push('/login')
  }
}

const isUnfold = ref(false)

const handleSelect = (key) => {
  if (key === '/login' || key === '/manage') {
    router.push(key)
    return
  }
  router.push(`/home${key}`)
  if (isUnfold.value) {
    isUnfold.value = false
  }
}
</script>

<style scoped lang="less">
.outer-head-box {
  width: 100%;
  background: #fff;

  .transition-box {
    height: 166px;
  }

  .head-box1 {
    .box {
      list-style: none;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title-box {
        display: flex;
        align-items: center;
        min-width: 170px;

        h2 {
          margin: 0;
          font-size: 30px;
        }
      }

      .img-box {
        max-width: 670px;
        flex: 1;
        padding: 15px 20px;

        img {
          width: 100%;
        }
      }

      .icon-box {
        display: flex;
        align-items: center;
        cursor: pointer;
        i {
          font-size: 30px;
          padding: 0 10px;
          cursor: pointer;
        }
        .user-box {
          overflow: hidden;
          box-sizing: content-box;
          width: 50px;

          img {
            margin: 10px;
            width: calc(100% - 20px);
          }
        }
      }
    }
  }

  .outer-head-box2 {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    background: #fff;

    .head-box2 {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title-box {
        display: flex;
        align-items: center;

        h2 {
          margin: 0;
        }
      }

      ::v-deep .menu {
        flex: 1;
        margin: 0 20px;
      }

      .icon-box {
        display: flex;
        align-items: center;
        i {
          font-size: 25px;
          padding: 0 10px;
          cursor: pointer;
        }

        .user-box {
          overflow: hidden;
          box-sizing: content-box;
          width: 45px;

          img {
            margin: 10px;
            width: calc(100% - 20px);
          }
        }
      }
    }
  }
}

.mobile-head {
  display: none;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;

  .title-box {
    display: flex;
    align-items: center;
  }

  .icon-box {
    font-size: 25px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: transform 1.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(-50px);
}

@media screen and (min-width: 1200px) {
  .inner-head-box {
    width: 1200px;
    margin: auto;
  }
  .head-box2 {
    margin: auto;
    width: 1200px;
  }
}
@media (min-width: 768px) and (max-width: 1199px) {
  .inner-head-box {
    width: 100%;
  }
}
@media (max-width: 767px) {
  .outer-head-box {
    display: none;
  }
  .mobile-head {
    display: flex;
  }
}

::v-deep .el-menu {
  border: 0;
  text-align: center;
}
</style>
