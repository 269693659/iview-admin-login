export default {
  name: 'QueryForm',
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      simple: { current: '', data: [] },
      quick: { data: [] },
      complex: { open: false, data: [] },
      result: { data: [] }
    }
  },
  computed: {
    simpleQueryCurrent () {
      if (!this.simple.current) return
      return this.simple.data
        .filter(item => item.name === this.simple.current)
        .shift()
    }
  },
  methods: {
    switchQuery () {
      this.complex.open = !this.complex.open
    },
    cleanQuery () {
      // 选择结果
      this.result.data = []
      // 查询条件
      this.data.forEach(item => (item.data = null))
      // 执行查询
      this.doQuery()
    },
    cleanQueryItem (name) {
      // 删除结果
      this.result.data
        .filter(item => name === item.name)
        .forEach(item => {
          let index = this.result.data.indexOf(item)
          this.result.data.splice(index, 1)
        })
      // 查询条件
      this.data
        .filter(item => name === item.name)
        .forEach(item => (item.data = null))
      // 执行查询
      this.doQuery()
    },
    cleanComplexQuery () { },
    doQuery () {
      // 清理查询结果
      this.result.data = []
      // 简单查询
      this.putSearchItem(
        this.simple.data
          .filter(item => item.name === this.simple.current)
          .shift()
      )

      // 快速选择查询
      this.quick.data.forEach(item => this.putSearchItem(item))

      // 复杂查询
      if (this.complex.open) {
        this.complex.data.forEach(group =>
          group.items.forEach(item => this.putSearchItem(item))
        )
      }

      // 构建查询条件参数
      const params = {}
      this.result.data.forEach(item => {
        params[item.name] = item.data
      })

      // 通知事件
      this.$emit('search', params)
    },
    putSearchItem (item) {
      // 检查数据是否为空
      if (!item || !item.data || !item.data === '') return
      // 检查是否已经存在
      if (this.result.data.some(resultItem => item.name === resultItem.name)) {
        return
      }

      let dataLabel
      if (item.options) {
        dataLabel = item.options
          .filter(optionItem => optionItem.value === item.data)
          .map(optionItem => optionItem.title)
          .shift()
      }

      this.result.data.push({
        title: item.title,
        name: item.name,
        type: item.type,
        ctrlcode: item.ctrlcode,
        data:
          item.type === 'date' && item.data
            ? item.data.getTime() / 1000
            : item.data,
        dataLabel: dataLabel
      })
    }
  },
  mounted () {
    if (this.data) {
      // 设置默认选择简单查询条件，如果有多个设置为default则取第一个
      this.simple.current = this.data
        .filter(item => item.default)
        .map(item => item.name)
        .shift()

      // 设置简单查询
      this.data.forEach(item => {
        if (item.area.indexOf('simple') !== -1) this.simple.data.push(item)
      })
      // 设置快速选择
      this.data.forEach(item => {
        if (item.area.indexOf('quick') !== -1) this.quick.data.push(item)
      })

      // 设置复杂查询
      let groupIndex = -1
      this.data
        .filter(item => item.area.indexOf('complex') !== -1)
        .forEach((item, index) => {
          if (index % 3 === 0) {
            groupIndex++
            this.complex.data[groupIndex] = { id: groupIndex, items: [] }
          }
          this.complex.data[groupIndex].items.push(item)
        })
    }
  }
}
