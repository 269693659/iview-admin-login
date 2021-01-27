<template>
  <Form ref="loginForm"
        :model="form"
        :rules="rules"
        @keydown.enter.native="handleSubmit"
        :loading="loading">
    <FormItem prop="userName">
      <Input v-model="form.userName"
             placeholder="请输入用户名">
      <span slot="prepend">
        <Icon :size="16"
              type="ios-person"></Icon>
      </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password"
             v-model="form.password"
             placeholder="请输入密码">
      <span slot="prepend">
        <Icon :size="14"
              type="md-lock"></Icon>
      </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Row>
        <Col span="17">
          <Input v-model="form.validate"
             placeholder="请输入验证码">
          </Input>
        </Col>
        <Col span="4" offset="1">
          <img style="height:32px" :src="vildImg" alt="" @click="getValidateCode()">
        </Col>
      </Row>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit"
              type="primary"
              long
              :loading="loading">登录</Button>
    </FormItem>
  </Form>
</template>
<script>
import { validate } from '@/api/user'
export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: '账号不能为空', trigger: 'blur' }]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    },
    validateRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        userName: 'admin',
        password: 'amez8888',
        validate: ''
      },
      vildImg: ''
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules,
        validate: this.validateRules
      }
    }
  },
  mounted () {
    this.getValidateCode()
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password,
            validate: this.form.validate
          })
        }
      })
    },
    getValidateCode () {
      let data = {
        vtype: 'admin',
        rmd: Date.now()
      }
      validate(data).then(res => {
        this.vildImg = window.URL.createObjectURL(res.data)
        console.log(this.vildImg)
      })
    }
  }
}
</script>
