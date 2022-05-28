import menus from '../../data/menu.json'
import { addRouters } from '../../router'
import { setItem, getItem } from '../../utils/storage'
import { TOKEN, MENU, USER_INFO } from '../../constant'
import { setTimeStamp } from '../../utils/auth'
import { login } from '../../api/user'

export default {
  namespaced: true,
  state: {
    token: getItem(TOKEN) || '',
    userInfo: getItem(USER_INFO) || {},
    menus: getItem(MENU) || []
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      setItem(USER_INFO, userInfo)
    },
    setMenus(state, arr) {
      state.menus = menus.filter((menu) => {
        menu.children = menu.children.filter(({ path }) => arr.includes(path))
        return menu.children.length > 0
      })
      addRouters('Manage', state.menus)
      setItem('menus', state.menus)
      // console.log(this)
      // this.commit('user/refresh')
    },
    refresh(state) {
      // 动态添加路由表
      addRouters('Manage', state.menus)
      // 动态控制左侧菜单栏
    },
    loginout(state) {
      // 删除token
      state.token = ''
      setItem(TOKEN, '')
      // 删除路由菜单
      state.menus = []
      setItem(MENU, '')
      this.commit('user/refresh')
      // 删除userInfo
      state.userInfo = ''
      setItem(USER_INFO, '')
    }
  },
  actions: {
    login({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ username, password })
          .then(({ data: { token, tokenHead, menus, userInfo } }) => {
            commit('setMenus', menus)
            commit('setUserInfo', userInfo)
            commit('setToken', `${tokenHead} ${token}`)
            // 保存登录时间
            setTimeStamp()
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    }

    // logout() {
    //   // resetRouter()
    //   this.commit('user/setToken', '')
    //   this.commit('user/setUserInfo', {})
    //   removeAllItem()
    //   router.push('/login')
    // }
  }
}
