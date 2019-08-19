<template>
  <div class="logindemo">
    <el-card class="login-form-layout">
      <el-form autocomplete="on" :model="user" :rules="rules" ref="loginForm" status-icon label-position="left">
        <div style="text-align: center">
          <svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF"></svg-icon>
        </div>
        <h2 class="login-title color-main">Vue-admin-web</h2>
        <el-form-item prop="name">
          <el-input name="name" type="text" v-model="user.name" autocomplete="on" placeholder="请输入用户名">
            <span slot="prefix">
              <svg-icon icon-class="user" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password" :type="pwdType" v-model="user.password" @keyup.enter.native="submit"
            autocomplete="on" placeholder="请输入密码">
            <span slot="prefix">
              <svg-icon icon-class="password" class="color-main"></svg-icon>
            </span>
            <span slot="suffix" @click="showPwd">
              <svg-icon icon-class="eye" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px">
          <el-button style="width: 100%" type="primary" :loading="loading" @click.native.prevent="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import {Loading}from 'element-ui'
  export default {
    name: "logindemo",
    data() {
      return {
        loading: false,
        pwdType: "password",
        user: {},
        rules: {
          name: [{
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }],
        },
      };
    },
    methods: {
      //登录button上加载提示：小圆圈控制
      startLoading: function() {
        loading = Loading.service({
            lock: true,
            background: 'rgba(0, 0, 0, 0.7)'
        })
       },
      endLoading: function() {
            loading.close()
       },
      //小眼睛选择密码是否可见
      showPwd() {
        if (this.pwdType === "password") {
          this.pwdType = "";
        } else {
          this.pwdType = "password";
        }
      },
      //提交表单，登录验证
      submit() {
        this.$refs.loginForm.validate(valid => {//对应el-form的ref属性
          this.loading = true;//开始登录button上小圆圈转
          if (valid) {//表单正确格式填写
            this.$ajax.post('/user/check',this.user).then((res) => {//axios发送post请求，后台验证
            if (res.data) {
              this.$store.dispatch("login", res.data).then(() => {//验证结果res.data存储在vuex.vue全局数据控制函数login中
                  this.loading = false;//登录成功，小圆圈停止
                  this.$notify({
                    type: 'success',
                    message: '欢迎你,' + res.data.name + '!',
                    duration: 3000
                  })
                  //this.$router.replace('/')
                  this.$router.push({ name: 'layoutYHGL'})//结合router/index.js规则，根据name跳转到指定url
                })
                } else {
                  this.loading = false;//登录错误，小圆圈不转
                  this.$message({
                    type: 'error',
                    message: '用户名或密码错误',
                    showClose: true
                  })
                }
              }).catch(() => {
                this.loading = false;//登录错误，小圆圈不转
                this.$message({
                  type: 'error',
                  message: '网络错误，请重试',
                  showClose: true
                })
              });
          } else {
            // eslint-disable-next-line no-console
            console.log("参数验证不合法！");
            return false;
          }
        });
      }
    }
  };
</script>

<style scoped>
  .login-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 360px;
    margin: 140px auto;
    border-top: 10px solid #409eff;
  }

  .login-title {
    text-align: center;
  }

  .login-center-layout {
    background: #409eff;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin-top: 200px;
  }
</style>
