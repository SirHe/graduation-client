<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <div>
      <el-tooltip :content="$t('navBar.lang')" :effect="effect">
        <i class="iconfont icon-fanyiline language-icon"></i>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'ch'" command="ch">
          中文
        </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en">
          English
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

defineProps({
  placement: {
    validator(value) {
      // 这个值必须与下列字符串中的其中一个相匹配
      return [
        'bottomLeft',
        'bottom',
        'bottomRight',
        'topLeft',
        'top',
        'topRight'
      ].includes(value)
    },
    default() {
      return 'bottom'
    }
  }
})

const store = useStore()
const language = computed(() => store.getters.language)
const i18n = useI18n()

const handleSetLanguage = (lang) => {
  // 切换 i18n 的locale
  i18n.locale.value = lang
  // 修改store中language
  store.commit('app/setLanguage', lang)
  // 提示
  ElMessage({
    message: '更新成功',
    type: 'success'
  })
}
</script>

<style scoped lang="less">
.language-icon {
  font-size: 36px;
  cursor: pointer;
}
</style>
