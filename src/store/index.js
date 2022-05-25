import { createStore } from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
import user from './modules/user'
import app from './modules/app'
import getters from './getters'

export default createStore({
  getters,
  modules: { app, user }
  // plugins: [
  //   createPersistedState({
  //     storage: window.sessionStorage,
  //     paths: ['user'] // 需要存储起来的模块
  //   })
  // ]
})
