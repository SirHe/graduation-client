import md5 from 'md5'
import { setItem, getItem, removeAllItem } from '../../utils/storage'
import { TOKEN } from '../../constant'
import router, { resetRouter } from '@/router'
import { setTimeStamp } from '../../utils/auth'
import { login } from '../../api/user'

export default {
  namespaced: true,
  state: {
    token: getItem(TOKEN) || '',
    userInfo: {}
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
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
          .then(({ data: { token, tokenHead } }) => {
            commit('setToken', `${tokenHead} ${token}`)
            // 保存登录时间
            setTimeStamp()
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
      // commit('setToken', '123')
    }
    // async getUserInfo(context) {
    //   const res = await getUserInfo()
    //   this.commit('user/setUserInfo', res)
    //   return res
    // },
    // logout() {
    //   // resetRouter()
    //   this.commit('user/setToken', '')
    //   this.commit('user/setUserInfo', {})
    //   removeAllItem()
    //   router.push('/login')
    // }
  }
}
