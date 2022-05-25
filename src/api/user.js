import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
} from '../utils/request'

export const login = ({ username, password }) => {
  return postRequest('/api/user/login', { username, password })
}

export const setInfo = (data) => {
  return postRequest('/api/user/info', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const getInfo = () => {
  return getRequest('/api/user/info')
}

export const addUser = (userInfo) => {
  return postRequest('/api/user/add', userInfo, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const getUserList = (page, size) => {
  return getRequest('/api/user', { page, size })
}

export const deleteUser = (id) => {
  return deleteRequest('/api/user', { id })
}

export const toggleUserState = (id, enabled) => {
  return putRequest('/api/user/state', { id, enabled })
}

export const alterUserInfo = (id, userInfo) => {
  return putRequest(
    '/api/user/alter',
    {
      id,
      userInfo
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
}
