<template>
  <el-container style="height: 100%;">
    <!-- 头部 -->
    <el-header>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="6">
          <el-radio-group v-model="isCollapse" style="margin-top: 15px;" size="mini">
            <el-radio-button :label="false"><i class="el-icon-s-unfold el-icon--right"></i></el-radio-button>
            <el-radio-button :label="true"><i class="el-icon-s-fold el-icon--right"></i></el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="4" :offset="8">
          <el-dropdown style="margin-top: 15px;">
            <i class="el-icon-setting"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span v-if="user"> {{user.name}}
            <el-button type="warning" @click="logout">注销</el-button>
          </span>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 左侧栏 -->
      <el-menu default-active="onRoutes()" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        :collapse="isCollapse">
        <!--如果菜单(menu)是true 循环侧栏路由列表  -->
        <template v-for="item in menuData" v-if="item.meta.menu">
          <!-- 这里必须设置index,相当唯一标识这个菜单标签，否则菜单列表点击后随意展开 -->
          <el-submenu :index="''+item.meta.funcNode" :key="item.meta.funcNode">
            <template slot="title">
              <i :class="item.meta.icon"></i>
              <span slot="title">{{item.meta.title}}</span>
            </template>
            <!-- 如果菜单有孩子菜单，则循环孩子菜单 -->
            <template v-for="itemC in item.children" v-if="item.children">
              <el-menu-item :index="''+itemC.meta.funcNode" @click="clickMenu(itemC)" :key="itemC.meta.funcNode">
                <i :class="itemC.meta.icon"></i>
                <span slot="title">{{itemC.meta.title}}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
      </el-menu>
      <!-- 内容渲染 -->
      <el-main style="background-color: white;">
        <!-- 面包屑渲染 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/user' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for='(item,index) in levelList' :key='index' v-if='item.name'>
            {{item.meta.title}}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 具体内容 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        value: '展开', //提示折叠按钮
        isCollapse: true, //默认折叠
        levelList: null //监听的结果放在一个集合中
      };
    },
    created() {
      this.getBreadcrumb();
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      clickMenu(item) {
        this.$router.push({
          path: item.path
        }) //跳转的路由对象
        //this.$router.push({name:item.name})    通过name跳转
      },
      logout() {
        this.$store.dispatch('logout').then(() => {
          this.$router.replace('/login')
        })
      },
      getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item.name);
        //监听的是name属性，与我们跳转时用”this.$router.push({ name: 'layoutYHGL'})//结合router/index.js规则，根据name跳转到指定url”极其相似
        const first = matched[0]; //清空面包屑中已匹配的路径
        this.levelList = matched; //把新监听到的记录存入监听集合
      }
    },
    watch: {
      $route() {
        console.log(1111)
        this.getBreadcrumb(); //面包屑监听
      }
    },
    computed: {
      menuData() {
        return this.$router.options.routes
      },
      user() {
        //console.log(this.$store.state)
        return this.$store.state.user
      },
      onRoutes() { //点击时此处高亮
        let path = this.$route.path.replace('/', '');
        return path ? path : '/';
      }
    }
  }
</script>

<style>
  .el-header {
    background-color: #FF9999;
  }

  .el-radio-button {}

  .el-menu,
  .el-submenu,
  .el-menu-item {
    background-color: #FFCCCC;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .el-breadcrumb {
    background-color: #f9fafc;
    padding: 5px;
    margin: -12px -12px 10px -12px;
  }

  body {
    margin: 0px;
  }
</style>
