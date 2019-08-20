<template>
  <div>
    <!-- 导出按钮 -->
    <el-button @click="exportExcel" type="primary" class="button">导出2</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userList: [],
        loading: false, //加载效果
      }
    },
    methods: {
      exportExcel() {
        this.getUserList();
        this.handleDownload();
      },
      getUserList() {
        this.loading = true;
        this.$ajax.get('/user/aop/list').then((res) => { //axios发送get请求
          if (res.data) {
            this.loading = false;
            console.log(res.data)
            this.userList = res.data.data;
          } else {
            this.loading = false;
            this.$message({
              type: 'error',
              message: '查询失败',
              showClose: true
            })
          }
        })
      },
      // 下载
      handleDownload() { //数据导出方法
        require.ensure([], () => {
          const {
            export_json_to_excel
          } = require('@/vendor/Export2Excel'); //Export2Excel的地址，与配置路径相对应
          const tHeader = ['序号', '姓名', '年龄', '地址', '密码']; //表头
          const filterVal = ['id', 'name', 'age', 'address', 'password']; //list里面的对应数据
          const list = this.userList; //将导出数据赋值
          const data = this.formatJson(filterVal, list); //参数过滤方法
          export_json_to_excel(tHeader, data, '列表excel'); //表名，方法封装在在Export2Excel中
        })
      },
      // 参数过滤
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },

    }
  };
</script>
<style scoped>
</style>
