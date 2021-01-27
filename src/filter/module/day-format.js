import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.locale('zh-cn')
dayjs.extend(LocalizedFormat)

export default (day) => {
  if (!day) return '-'
  return dayjs.unix(day).format('lll')
}
