<!--基本html代码区域-->
<template>
  <div class="logindemo">
    <el-form ref="form" :model="user" :rules="rules" status-icon label-width="80px">
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-form-item label-width="70px">
            <span>
              <font color="#B3D8FF" size="5">注册登录页面</font>
            </span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item label="账户：" prop="name">
            <el-input v-model="user.name" size="small"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item label="密码：" prop="password">
            <el-input v-model="user.password" size="small"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item>
            <el-button type="primary" @click="submit">登录</el-button>
            <el-button @click="register">注册</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <font color="pink" size="3">1.账户admin，密码123，登录<br>2.点击注册返回主页</font>
      </el-row>
    </el-form>
  </div>
</template>


<!--数据存贮交互，事件控制地区-->
<script>
  export default {
    name: 'logindemo',
    data() {
      return {
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
      }
    },
    methods: {
      /*提交进行判断的函数 */
      submit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$ajax.post('/user/check',this.user).then((res) => {
              //console.log(res)
              if (res.data) {
                this.$store.dispatch('login', res.data).then(() => {
                  this.$notify({
                    type: 'success',
                    message: '欢迎你,' + res.data.name + '!',
                    duration: 3000
                  })
                  this.$router.replace('/')
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '用户名或密码错误',
                  showClose: true
                })
              }
            }).catch((err) => {
              this.$message({
                type: 'error',
                message: '网络错误，请重试',
                showClose: true
              })
            })
          } else {
            return false
          }
        })
      },
      /* submit() {
          this.$refs.form.validate((valid) => {//form是el-form 标签中ref="form"名称
           if (valid) {
             if (this.user.name === 'admin' && this.user.password === '123') {
               // dispatch采用Promise链式调用
               this.$store.dispatch('login', this.user).then(() => {
                 this.$notify({
                   type: 'success',
                   message: '欢迎你,' + this.user.name + '!',
                   duration: 3000
                 })
                 this.$router.replace('/')
               })
             } else {
               this.$message({
                 type: 'error',
                 message: '用户名或密码错误',
                 showClose: true
               })
             }
           }else {
            return false
          }
        })
      },*/
      register: function() {
        this.$router.replace('/') //返回主页
      },
    },
  }
</script>

<!-- 写样式的地方 -->
<style scoped>

</style>
