import filters from './filters'
const importFilter = Vue => {
  // 日期格式化为距离现在的时间
  Vue.filter('dayFromNow', filters.dayFromNow)
  // 日期格式化
  Vue.filter('dayFormat', filters.dayFormat)
  // 日期格式化短格式
  Vue.filter('dayFormatShort', filters.dayFormatShort)
  // 数字格式化
  Vue.filter('numberFormat', filters.numberFormat)
}

export default importFilter
