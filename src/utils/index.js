import dayjs from 'dayjs'

export const convertDate = (date, format = 'YYYY-MM-DD HH:mm') => {
  return dayjs(date).format(format)
}
