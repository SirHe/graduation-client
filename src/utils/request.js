import axios from 'axios'
import { BASE_URL } from '../constant'
import { getItem } from './storage'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: BASE_URL,
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    if (getItem('token')) {
      config.headers.authorization = getItem('token')
    }
    return config
  },
  (error) => {
    console.log(error)
  }
)

// 响应拦截器 - 统一处理消息提示
service.interceptors.response.use(
  (success) => {
    // 业务逻辑错误
    // if (success.status && success.status === 200) {
    //   // 调到接口
    //   // // 如果返回了token，就保存起来
    //   // if (success.headers.token) {
    //   //   setItem('token', success.headers.token)
    //   // }
    //   // 后端：500 业务逻辑错误，401 未登录，403 无权访问；
    //   if (
    //     success.status === 500 ||
    //     success.status === 401 ||
    //     success.status === 403
    //   ) {
    //     console.log(success)
    //     ElMessage({
    //       message: success.error,
    //       type: 'error'
    //     })
    //     return
    //   }
    //   if (!success.data.code) {
    //     // 输出后端 添加成功 之类的信息
    //     ElMessage({
    //       message: success.data.msg,
    //       type: 'success'
    //     })
    //   }
    // }
    if (success.data.code === 0) {
      ElMessage({
        message: success.data.message,
        type: 'success'
      })
    }
    return success.data
  },
  (error) => {
    if (error.response.status === 401) {
      ElMessage({
        message: error.response.data.message,
        type: 'error'
      })
    } else if (error.response.status === 504 || error.response.status === 404) {
      ElMessage({
        message: '服务器被吃掉了',
        type: 'error'
      })
    } else if (error.response.code === 403) {
      ElMessage({
        message: '权限不足，请联系管理员！',
        type: 'error'
      })
    } else if (error.response.code === 401) {
      ElMessage({
        message: '您还未登录，请登录！',
        type: 'error'
      })

      // 跳转到登录界面
    } else {
      if (error.response.data.message) {
        ElMessage({
          message: error.response.data.message,
          type: 'error'
        })
      } else {
        ElMessage({
          message: '未知错误！',
          type: 'error'
        })
      }
    }
  }
)

// 传送 json 格式的 post 请求
export const postRequest = (url, params, config) => {
  return service.post(url, params, config)
}

// 传送 json 格式的 get 请求
export const getRequest = (url, params) => {
  return service.get(url, { params })
}

// 传送 json 格式的 put 请求
export const putRequest = (url, params, config) => {
  return service.put(url, params, config)
}

// 传送 json 格式的 delete 请求
export const deleteRequest = (url, params) => {
  return service.delete(url, { data: params })
}
