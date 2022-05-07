import { getItem, setItem } from '../../utils/storage'
import { LANG, TAGS_VIEW } from '../../constant/index'

// 处理国际化
export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || 'ch',
    tagsViewList: getItem(TAGS_VIEW) || []
  }),
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    setLanguage(state, lang) {
      setItem(LANG, lang)
      state.language = lang
    },
    // 添加tages
    addTagesViewList(state, tag) {
      const isHave = state.tagsViewList.find((item) => item.path === tag.path)

      if (!isHave) {
        state.tagsViewList.push(tag)
        setItem(TAGS_VIEW, state.tagsViewList)
      }
    }
  }
}
