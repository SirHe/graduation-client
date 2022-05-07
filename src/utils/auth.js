import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '../constant'
import { setItem, getItem } from '../utils/storage'

// 封装一个token过期检查工具，减少服务器的压力
/**
 * 获取时间戳
 */
export function getTimeStamp() {
  return getItem(TIME_STAMP)
}
/**
 * 设置时间戳
 */
export function setTimeStamp() {
  setItem(TIME_STAMP, Date.now())
}
/**
 * 是否超时
 */
export function isCheckTimeout() {
  // 当前时间戳
  const currentTime = Date.now()
  // 缓存时间戳
  const timeStamp = getTimeStamp()
  // token实效时长
  const tokenTime = getItem(TOKEN_TIMEOUT_VALUE) || 2 * 3600 * 1000
  return currentTime - timeStamp >= tokenTime
}
