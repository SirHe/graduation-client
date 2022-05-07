export const isEmail = (s) => {
  const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/
  return reg.test(s)
}

export const isPhone = (s) => {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  return reg.test(s)
}
