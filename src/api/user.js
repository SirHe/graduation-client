import { getRequest, postRequest, putRequest } from '../utils/request'

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
