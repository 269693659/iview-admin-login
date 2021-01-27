import { login, logout } from '@/api/user'
import { getToken, setToken } from '@/libs/util'
export default {
  state: {
    user: {},
    token: getToken()
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setUser (state, user) {
      state.user = user
    }
  },
  getters: {
    getUser: state => {
      return state.user
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, data) {
      return new Promise((resolve, reject) => {
        // commit('setUser', { 'id': 100000650, 'sn': '13480894628', 'name': '陈庚南', 'state': 'normal', 'signature': null, 'idCard': null, 'phoneNum': '13480894628', 'headImgUrl': null, 'idCardNum': null, 'birthday': null, 'createdAt': 1595470337 })
        // resolve({ data: { 'message': '登录成功!', 'success': true, 'user': { 'id': 100000650, 'sn': '13480894628', 'name': '陈庚南', 'state': 'normal', 'signature': null, 'idCard': null, 'phoneNum': '13480894628', 'headImgUrl': null, 'idCardNum': null, 'birthday': null, 'createdAt': 1595470337 } } })
        // console.log(data)
        login(data)
          .then(res => {
            if (res && res.data.result === 1) {
              // 保存用户信息
              // commit('setUser', res.data.user)

              commit('setToken', Date.now())// 模拟token
              resolve(res)
            } else {
              reject(res)
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 跳转登录
    // handleLoginJump ({ commit }, data) {
    //   return new Promise((resolve, reject) => {
    //     loginJump(data)
    //       .then(res => {
    //         if (res && res.data && res.data.success && res.data.user) {
    //           commit('setUser', res.data.user)
    //           resolve(res)
    //         } else {
    //           reject(res)
    //         }
    //       })
    //       .catch(err => {
    //         reject(err)
    //       })
    //   })
    // },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        // 调用退出接口
        // logout(state.token).then(() => {
        //   commit('setToken', '')
        //   commit('setAccess', [])
        //   resolve()
        // }).catch(err => {
        //   reject(err)
        // })

        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        commit('setToken', '')
        resolve()
      })
    }
  }
}
