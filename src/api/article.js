import {
  getRequest,
  postRequest,
  deleteRequest,
  putRequest
} from '../utils/request'

export const getCategoryList = () => {
  return getRequest('/article/category')
}

export const addArticle = (data) => {
  return postRequest('/article', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const deleteArticle = (id) => {
  return deleteRequest('/article', { id })
}

export const getDraftList = (page, size) => {
  return getRequest('/article/draft', { page, size })
}

export const getAuditList = (isPending, page, size) => {
  return getRequest('/article/audit', { page, size, isPending })
}

export const auditArticle = (id, result) => {
  return putRequest('/article/audit', { id, result })
}

export const submitAudit = (id) => {
  return postRequest('/article/audit', { id })
}

export const getArticleDetail = (id) => {
  return getRequest(`/article/${id}`)
}

export const getArticleList = (category, page, size) => {
  return getRequest('/article', { category, page, size })
}

export const getPublishList = (isPublished, page, size) => {
  return getRequest('/article/publish', { isPublished, page, size })
}

export const publishArticle = (id) => {
  return putRequest('/article/publish', { id })
}

export const offlineArticle = (id) => {
  return putRequest('/article/offline', { id })
}

export const getOfflineArticle = (page, size) => {
  return getRequest('/article/offline', { page, size })
}
