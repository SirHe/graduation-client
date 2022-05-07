<template>
  <div class="panel-item-box" @click="onClick">
    <slot />
    <div class="star" v-if="star > 0">{{ star }}</div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  star: {
    type: Number,
    default() {
      return 0
    }
  }
})
const emits = defineEmits(['click'])

const onClick = () => {
  emits('click')
}
</script>

<style scoped lang="less">
.panel-item-box {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
  position: relative;

  .star {
    padding: 0 5px;
    position: absolute;
    transform: translateX(50%);
    border-radius: 8px;
    right: 0;
    top: 0;
    line-height: 16px;
    font-size: 12px;
    color: #fff;
    background-color: #c2c8d1;
  }
}
</style>
