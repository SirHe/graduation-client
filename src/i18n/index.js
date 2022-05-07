import { createI18n } from 'vue-i18n'
import ch from './lang/ch'
import en from './lang/en'
const messages = {
  en,
  ch
}

const locale = 'ch'

const i18n = createI18n({
  legacy: false, // 使用composition API
  globalInjection: true, // 将t函数注册成全局函数
  locale,
  messages
})

export default i18n
// const locale = computed(() => (store.getters.language === 'ch' ? zhCN : en_GB))
