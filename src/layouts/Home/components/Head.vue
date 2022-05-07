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
            <li>
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
</script>

<style scoped lang="less">
.outer-head-box {
  width: 100%;
  background: #fff;
  .inner-head-box {
    padding: 15px 0;
    width: 1200px;
    margin: auto;
    // z-index: 999;

    .transition-box {
      height: 146px;
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

          h2 {
            margin: 0;
            font-size: 30px;
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
        margin: auto;
        width: 1200px;
        display: flex;
        // background: rgba(255, 255, 255, 0.3);
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
}
.fade-enter-active,
.fade-leave-active {
  transition: transform 1.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(-50px);
}
</style>
