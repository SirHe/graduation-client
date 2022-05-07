import { watch } from 'vue'
import store from '../store'

// 监听语言变化，执行相应函数
export function watchSwitchLang(...cbs) {
  watch(
    () => store.getters.language,
    () => {
      cbs.forEach((cb) => cb(store.getters.language))
    }
  )
}
