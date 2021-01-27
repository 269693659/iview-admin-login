const express = require('express')
const router = express.Router()
const bizMdInstUser = require('../service/biz-md-inst-user')

module.exports = app => {
  // 读取环境配置
  // const sysRoleFactory = sysRole(app.getEnv());
  const bizMdInstUserFactory = bizMdInstUser(app.getEnv())

  // 注销
  router.post('/logout', function (req, res, next) {
    if (req.logout) {
      req.logout()
    }
    res.json({
      message: 'success'
    })
  })

  // 选择机构
  router.post('/select/inst/:instId', async (req, res, next) => {
    const { instId } = req.params
    if (!instId) return next(new Error('请输入选择机构ID!'))

    const { user } = req
    if (!user) {
      const error = new Error('请先先登录系统!')
      error.status = 401
      return next(error)
    }

    if (!user.user) return next(new Error('用户信息不完善！'))

    // 选择机构
    try {
      const selectResult = await bizMdInstUserFactory.select({
        instId,
        token: user.token.access_token
      })

      if (!selectResult) return res.json({})
      const { instUser, inst, roles, managerOrgTreeItems, managerOrgTrees } = selectResult
      if (!instUser || inst == null) return res.json({})
      // 设置当前选择机构,以及机构用户
      user.inst = inst
      user.instUser = instUser
      user.roles = roles || []
      user.managerOrgTreeItems = managerOrgTreeItems || []
      user.managerOrgTrees = managerOrgTrees || []
    } catch (e) {
      if (e && e.response && e.response.status) {
        const error = new Error('请先先登录系统!')
        error.status = e.response.status || 500
        return next(error)
      } else {
        return next(e)
      }
    };

    res.json({
      inst: user.inst,
      user: user.user,
      instUser: user.instUser,
      roles: user.roles,
      managerOrgTreeItems: user.managerOrgTreeItems,
      managerOrgTrees: user.managerOrgTrees
    })
  })

  // 选择机构
  router.get('/user/current', async (req, res, next) => {
    const { inst, instUser, roles, token, user } = req.user
    let rolesList = []
    roles.forEach((item) => {
      rolesList.push(item.roleId)
    })
    res.json({
      auth: {
        Authorization: token.access_token
      },
      currentUserInst: {
        birthday: user.birthday,
        created_at: instUser.createdat,
        disabled: instUser.disabled || 0,
        head_img_url: instUser.headimgurl,
        id: instUser.id,
        id_card: instUser.idcard,
        name: instUser.name,
        remark: instUser.remark,
        signature: instUser.signature,
        sn: instUser.sn,
        state: instUser.state,
        updated_at: instUser.updatedAt,
        currentInst: {
          bizMdInstUserId: instUser.id,
          id: inst.id,
          instId: inst.id,
          instName: inst.name,
          instSimpleName: inst.simpleName,
          logoImg: inst.logoImg,
          memberEndDate: inst.memberEndDate,
          memberType: inst.memberType,
          name: inst.name,
          simpleName: inst.simpleName,
          roleIds: rolesList
        }
      },
      user: {
        birthday: user.birthday,
        created_at: user.createdAt,
        disabled: user.disabled,
        head_img_url: user.headImgUrl,
        id: user.id,
        id_card: user.idCard,
        name: user.name,
        remark: user.remark,
        signature: user.signature,
        sn: user.sn,
        state: user.state,
        updated_at: user.updatedAt,
        inst: {
          bizMdInstUserId: instUser.id,
          id: inst.id,
          instId: inst.id,
          instName: inst.name,
          instSimpleName: inst.simpleName,
          logoImg: inst.logoImg,
          memberEndDate: inst.memberEndDate,
          memberType: inst.memberType,
          name: inst.name,
          simpleName: inst.simpleName,
          roleIds: rolesList
        }
      }
    })
  })

  return router
}
