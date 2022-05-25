import md5 from 'md5'
import menus from '../../data/menu.json'
import { addRouters } from '../../router'
import { setItem, getItem } from '../../utils/storage'
import { TOKEN } from '../../constant'
import { setTimeStamp } from '../../utils/auth'
import { login } from '../../api/user'

export default {
  namespaced: true,
  state: {
    token: getItem(TOKEN) || '',
    userInfo: {},
    menus: getItem('menus') || []
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
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
    }
  },
  actions: {
    login({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then(({ data: { token, tokenHead, menus } }) => {
            commit('setMenus', menus)
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
