import store from '@/store'

export const showBizErr = (vm, err) => {
  if (!err) return
  if (err && err.message && !err.response) {
    vm.$Message.error({
      content: err.message,
      duration: 10
    })
  } else if (err && err.response && err.response.status === 401) {
    vm.$Message.error({
      content: '请先登录系统!',
      duration: 10
    })
    // 执行注销
    store.dispatch('handleLogOut')
    // 跳转登录
    vm.$router.push({ name: 'login' })
  } else if (err && err.response && err.response.status === 519 && err.response.data) {
    vm.$Message.error({
      content: err.response.data.message,
      duration: 10
    })
  } else if (err && err.response && err.response.status === 403 && err.response.data) {
    vm.$Message.error({
      content: err.response.data.message,
      duration: 10
    })
  } else {
    vm.$Message.error('系统错误，请稍后重试。')
    throw err
  }
}

export const getBizMessage = (err) => {
  if (err.response && err.response.status === 519 && err.response.data) {
    let message = err.response.data.message
    if (err.response.data.data && err.response.data.data instanceof Array) {
      err.response.data.data.forEach(item => {
        message = message + ';' + item.message || ''
      })
    }
    return message
  } else if (err.response && err.response.status === 403 && err.response.data) {
    return err.response.data.message
  } else {
    return '系统错误，请稍后重试。'
  }
}

export const getBizErrorData = (err) => {
  if (err.response && err.response.status === 519 && err.response.data && err.response.data.data) {
    return err.response.data.data
  }
}
