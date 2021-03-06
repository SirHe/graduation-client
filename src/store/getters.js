// getters的使用，方便获取数据，类似于computed，也有缓存。
const getters = {
  token: (state) => state.user.token,
  language: (state) => state.app.language,
  tagsViewList: (state) => state.app.tagsViewList,
  menus: (state) => state.user.menus,
  userInfo: (state) => state.user.userInfo
}
export default getters
