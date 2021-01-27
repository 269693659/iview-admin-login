export const tofixed = (data, fix) => {
  fix = fix || 100
  return Math.round((data || 0) * fix) / fix
}
export const isNumber = (value) => {
  if (value === '') {
    return false
  } else if (parseFloat(value).toString() === 'NaN') {
    return false
  } else {
    return true
  }
}
// 手机号码验证
export const isPhoneNumber = (value) => {
  var reg = /^((\d{3}-\d{8}|\d{4}-\d{7,8})|(1[3|5|7|8][0-9]{9}))$/
  if (reg.test(value)) {
    return true
  } else {
    return false
  }
}

// 税号验证
export const isTaxNo = (value) => {
  // 15位 校验组织机构代码
  const isValidOrgCode = function (taxNo) {
    if (taxNo !== '') {
      var part1 = taxNo.substring(0, 8)
      var part2 = taxNo.substring(taxNo.length - 1, 1)
      var ws = [3, 7, 9, 10, 5, 8, 4, 2]
      var str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      var reg = /^([0-9A-Z]){8}$/
      if (!reg.test(part1)) {
        return true
      }
      var sum = 0
      for (var i = 0; i < 8; i++) {
        sum += str.indexOf(part1.charAt(i)) * ws[i]
      }
      var C9 = 11 - (sum % 11)
      var YC9 = part2 + ''
      if (C9 === 11) {
        C9 = '0'
      } else if (C9 === 10) {
        C9 = 'X'
      } else {
        C9 = C9 + ''
      }
      return YC9 !== C9
    }
  }
  // 15位 校验地址码
  const checkAddressCode = function (addressCode) {
    var provinceAndCitys = { 11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外' }
    var check = /^[1-9]\d{5}$/.test(addressCode)
    if (!check) return false
    if (provinceAndCitys[parseInt(addressCode.substring(0, 2))]) {
      return true
    } else {
      return false
    }
  }
  // 18位社会统一信任代码
  const CheckSocialCreditCodeOrg = function (Code) {
    var patrn = /^[0-9A-Z]+$/
    // 18位校验及大写校验
    if ((Code.length !== 18) || (patrn.test(Code) === false)) {
      return false
    } else {
      var Ancode// 信用代码/税号的每一个值
      var Ancodevalue// 信用代码/税号每一个值的权重
      var total = 0
      var weightedfactors = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28]// 加权因子
      var str = '0123456789ABCDEFGHJKLMNPQRTUWXY'
      // 不用I、O、S、V、Z
      for (var i = 0; i < Code.length - 1; i++) {
        Ancode = Code.substring(i, i + 1)
        Ancodevalue = str.indexOf(Ancode)
        total = total + Ancodevalue * weightedfactors[i]
        // 权重与加权因子相乘之和
      }
      var logiccheckcode = 31 - total % 31
      if (logiccheckcode === 31) {
        logiccheckcode = 0
      }
      var Str = '0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y'
      var Array_Str = Str.split(',')
      logiccheckcode = Array_Str[logiccheckcode]

      var checkcode = Code.substring(17, 18)
      if (logiccheckcode !== checkcode) {
        // 不是有效的统一社会信用编码
        return false
      } else {
        return true
      }
    }
  }

  // 验证长度在15 18 20
  var req = /^[A-Z0-9]{15}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/
  if (req.test(value)) {
    // 判断是否符合15位税号规则
    if (value !== '' && value.length === 15) {
      var addressCode = value.substring(0, 6)
      // 校验地址码
      var check = checkAddressCode(addressCode)
      if (!check) {
        return false
      }
      // 校验组织机构代码
      var orgCode = value.substring(6, 9)
      check = isValidOrgCode(orgCode)
      if (!check) {
        return false
      }
      return true
    } else {
      // 判断是否符合20位社会统一信用代码
      return CheckSocialCreditCodeOrg(value)
    }
  } else {
    return false
  }
}

// 身份证真实性验证
export const isIdCard = (value) => {
  var vcity = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
  }

  // 判断是否为空
  const isEmpty = function (card) {
    if (/^\s*$/.test(card) === true) {
      return true
    }
  }
  // 检查号码是否符合规范，包括长度，类型
  const isCardNo = function (card) {
    if (isEmpty(card)) {
      return true
    }
    // 这个代码表示身份证可以为空
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/
    if (reg.test(card) === false) {
      return false
    }
    return true
  }

  // 取身份证前两位,校验省份
  const checkProvince = function (card) {
    if (isEmpty(card)) {
      return true
    }
    var province = card.substr(0, 2)
    if (vcity[province] === undefined) {
      return false
    }
    return true
  }

  // 检查生日是否正确
  const checkBirthday = function (card) {
    var arr_data = []
    var year = 0
    var month = 0
    var day = 0
    var birthday = new Date()
    if (isEmpty(card)) {
      return true
    }
    var len = card.length
    // 身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
    if (len === '15') {
      var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/
      arr_data = card.match(re_fifteen)
      year = arr_data[2]
      month = arr_data[3]
      day = arr_data[4]
      birthday = new Date('19' + year + '/' + month + '/' + day)
      return verifyBirthday('19' + year, month, day, birthday)
    }
    // 身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
    if (len === '18') {
      var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/
      arr_data = card.match(re_eighteen)
      year = arr_data[2]
      month = arr_data[3]
      day = arr_data[4]
      birthday = new Date(year + '/' + month + '/' + day)
      return verifyBirthday(year, month, day, birthday)
    }
    return false
  }

  // 校验日期
  const verifyBirthday = (year, month, day, birthday) => {
    var now = new Date()
    var now_year = now.getFullYear()
    // 年月日是否合理z
    if (birthday.getFullYear() === year && (birthday.getMonth() + 1) === month && birthday.getDate() === day) {
      // 判断年份的范围（3岁到100岁之间)
      var time = now_year - year
      if (time >= 3 && time <= 100) {
        return true
      }
      return false
    }
    return false
  }

  // 校验位的检测
  const checkParity = function (card) {
    if (isEmpty(card)) {
      return true
    }
    // 15位转18位
    card = changeFivteenToEighteen(card)
    var len = card.length
    if (len === '18') {
      var arrInt = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]
      var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
      var cardTemp = 0
      for (var i = 0; i < 17; i++) {
        cardTemp += card.substr(i, 1) * arrInt[i]
      }
      var valnum = arrCh[cardTemp % 11]
      if (valnum === card.substr(17, 1)) {
        return true
      }
      return false
    }
    return false
  }

  // 15位转18位身份证号
  const changeFivteenToEighteen = function (card) {
    if (isEmpty(card)) {
      return true
    }
    if (card.length === '15') {
      var arrInt = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]
      var arrCh = [ '1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2' ]
      var cardTemp = 0
      card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6)
      for (var i = 0; i < 17; i++) {
        cardTemp += card.substr(i, 1) * arrInt[i]
      }
      card += arrCh[cardTemp % 11]
      return card
    }
    return card
  }

  var card = value
  // 校验长度，类型
  if (isCardNo(card) === false) {
    return false
  }
  // 检查省份
  if (checkProvince(card) === false) {
    return false
  }
  // 校验生日
  if (checkBirthday(card) === false) {
    return false
  }
  // 检验位的检测
  if (checkParity(card) === false) {
    return false
  }

  return true
}
