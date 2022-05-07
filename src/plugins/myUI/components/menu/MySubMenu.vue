<template>
  <div class="my-sub-menu" ref="subMenu">
    <div
      class="my-submenu__title"
      :class="isActive.indexOf(index) >= 0 ? 'is-active' : ''"
      @mouseenter="handleEnter"
      @mouseleave="handleLeave"
    >
      <slot name="title" />
    </div>

    <teleport to="#my-popper-container">
      <!-- <transition name="fade"> -->
      <div
        v-show="isHover"
        class="my-menu my-menu--popup"
        @click="handleClick"
        :style="{
          left: point.x + 'px',
          top: point.y + 'px',
          width: point.width + 'px'
        }"
        @mouseenter="handleEnter"
        @mouseleave="handleLeave"
      >
        <slot />
      </div>
      <!-- </transition> -->
    </teleport>
  </div>
</template>

<script setup>
import {
  provide,
  inject,
  computed,
  defineProps,
  defineEmits,
  ref,
  onMounted
} from 'vue'

const props = defineProps({
  index: {
    type: String
  }
})

const isHover = ref(false)

const subMenu = ref(null)
const getoffset = (obj) => {
  let { left: x, top: y } = obj.getBoundingClientRect()
  y = y + document.documentElement.scrollTop + 62 + 5
  return { x, y }
}
const point = ref({ x: 0, y: 0 })
const refreshPoint = () => {
  point.value = getoffset(subMenu.value)
  point.value.width = getComputedStyle(subMenu.value).width.replace('px', '')
}
onMounted(refreshPoint)

const select = inject('select')
const emits = defineEmits(['test'])

provide('isSubItem', true)

const isActive = computed(() => inject('isActive'))

const handleClick = (e) => {
  const key = e.target.getAttribute('index')
  if (!key) return
  isHover.value = false
  select(key)
}

let timer = null
const handleEnter = () => {
  if (timer) {
    clearTimeout(timer)
  }
  refreshPoint()
  isHover.value = true
}
const handleLeave = () => {
  timer = setTimeout(() => {
    isHover.value = false
  }, 200)
}
</script>

<style scoped lang="less">
.my-sub-menu {
  position: relative;

  .my-submenu__title {
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  &:hover {
    color: #4ea3ff;
    background: #e6f6ff;
    border-bottom: 2px solid #4ea3ff;
  }
}

.is-active {
  color: #4ea3ff;
  border-bottom: 2px solid #4ea3ff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
<style lang="less">
.my-menu--popup {
  position: absolute;
  z-index: 2022;
  background-color: #fff;
  box-shadow: #666 0px 0px 10px;

  & > .my-menu-item:hover {
    color: #4ea3ff;
    background: #e6f6ff;
  }
}
</style>
