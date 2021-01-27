import { findCtrlCodeByDefSn } from '@/api/common'
export default {
  state: {
    data: {}
  },
  mutations: {
    setByCtrlCodes (state, { defSn, ctrlCodes }) {
      if (!ctrlCodes) return
      const items = {}
      ctrlCodes.forEach(item => {
        items[item.sn] = item.name
      })
      state.data[defSn] = items
    }
  },
  getters: {
    getCtrlCode: state => {
      return state.data
    }
  },
  actions: {
    // 编码控制
    handlerInitCtrlCode ({ commit, state }, defSns) {
      if (!defSns) return

      const findBySn = (defSn) => {
        return new Promise((resolve, reject) => {
          // 如果存在，直接跳过
          if (state.data[defSn]) {
            return resolve()
          } else {
            findCtrlCodeByDefSn(defSn).then(res => {
              if (res && res.data) {
                commit('setByCtrlCodes', { defSn, ctrlCodes: res.data })
                return resolve(res.data)
              } else {
                return reject(new Error('not found data'))
              }
            }).catch(error => {
              return reject(error)
            })
          }
        })
      }

      const actions = []
      defSns.forEach(item => actions.push(findBySn(item)))
      return Promise.all(actions)
    }
  }
}
