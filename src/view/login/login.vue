<style lang="less">
@import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎使用" :bordered="false">
        <div class="form-con">
          <login-form
            ref="loginForm"
            @on-success-valid="handleSubmit"
            :loading="loading"
          ></login-form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { hex_md5 } from '@/libs/md5'
import { mapActions } from 'vuex'
import { showBizErr } from '@/libs/message'
export default {
  components: {
    LoginForm
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    ...mapActions(['handleLogin']),
    handleSubmit ({ userName, password, validate }) {
      if (this.loading) return
      this.loading = true
      console.log(this.$route)
      let redirect = this.$route.query && this.$route.query.redirect
      // let md5Password = 'md5||' + hex_md5(password)
      let md5Password = password
      this.handleLogin({ username: userName, password: md5Password, valid_code: validate })
        .then((res) => {
          this.loading = false
          if (res && res.data.result === 1) {
            this.$Message.success('登录成功!')

            if (redirect) {
              this.$router.replace({
                path: redirect
              })
            } else {
              this.$router.replace({
                path: '/home'
              })
            }
          } else {
            throw new Error(res.message)
          }
        })
        .catch((error) => {
          this.loading = false
          if (error && error.data && error.data.message) {
            this.$Notice.error({
              title: '登录错误',
              desc: `${error.data.message}`
            })
            this.$refs.loginForm.getValidateCode()
          } else {
            showBizErr(this, error)
          }
        })
    }
  }
}
</script>

<style>
</style>
