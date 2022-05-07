import {
  getRequest,
  postRequest,
  deleteRequest,
  putRequest
} from '../utils/request'

export const getCategoryList = () => {
  return getRequest('/api/article/category')
}

export const addArticle = (data) => {
  return postRequest('/api/article', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const deleteArticle = (id) => {
  return deleteRequest('/api/article', { id })
}

export const getDraftList = (page, size) => {
  return getRequest('/api/article/draft', { page, size })
}

export const getAuditList = (isPending, page, size) => {
  return getRequest('/api/article/audit', { page, size, isPending })
}

export const auditArticle = (id, result) => {
  return putRequest('/api/article/audit', { id, result })
}

export const submitAudit = (id) => {
  return postRequest('/api/article/audit', { id })
}

export const getArticleDetail = (id) => {
  return getRequest(`/api/article/${id}`)
}

export const getArticleList = (category, page, size) => {
  return getRequest('/api/article', { category, page, size })
}

export const getPublishList = (isPublished, page, size) => {
  return getRequest('/api/article/publish', { isPublished, page, size })
}

export const publishArticle = (id) => {
  return putRequest('/api/article/publish', { id })
}

export const offlineArticle = (id) => {
  return putRequest('/api/article/offline', { id })
}

export const getOfflineArticle = (page, size) => {
  return getRequest('/api/article/offline', { page, size })
}
