import { createApp } from 'vue'
import installElementUI from './plugins/elementUI'
import installMyUI from './plugins/myUI'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
// 全局属性
import installFilter from './filters'

import './assets/icon/iconfont.css'
import './styles/normalize.css'
import './styles/common.css'
import './styles/ant-global.less'
import './styles/variable.less'

// 引入权限控制
import './permission'

import $ from 'jquery'
window.jQuery = window.$ = $

const app = createApp(App)
installElementUI(app)

// 安装自己封装的UI组件
installMyUI(app)

installFilter(app)
app.use(store).use(router).use(i18n).mount('#app')
