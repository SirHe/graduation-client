export const BASE_URL = process.env.VUE_APP_URL // 请求根路径

// localStorage中对应的key
export const TOKEN = 'token' // token
export const TIME_STAMP = 'tokenStart' // 开始登录时间
export const TOKEN_TIMEOUT_VALUE = 'tokenTime' // token实效时长
export const LANG = 'language'
export const TAGS_VIEW = 'tagsView' // tags
export const MENU = 'menus'
export const USER_INFO = 'userInfo'

export const STATIC_URL = 'http://47.110.224.195:8888/'
// export const STATIC_URL = 'http://localhost:8888/'

// export * as categoryMap from './articleCategory'

export * as article from './article'
