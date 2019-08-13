<template>
  <el-container style="height: 100%;">
    <!-- 头部 -->
    <el-header style="text-align: right; font-size: 12px;">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span v-if="user"> {{user.name}}
        <el-button type="warning" @click="logout">注销</el-button>
      </span>
    </el-header>
    <el-container>
      <!-- 左侧栏 -->
      <el-aside width="200px">
        <el-menu :default-active="onRoutes">
          <!--如果菜单(menu)是true 循环侧栏路由列表  -->
          <template v-for="item in menuData" v-if="item.meta.menu">
            <!-- 这里必须设置index,相当唯一标识这个菜单标签，否则菜单列表点击后随意展开 -->
            <el-submenu :index="''+item.meta.funcNode" :key="item.meta.funcNode">
              <template slot="title"><i :class="item.meta.icon"></i>{{item.meta.title}}</template>
              <!-- 如果菜单有孩子菜单，则循环孩子菜单 -->
              <template v-for="itemC in item.children" v-if="item.children">
                <el-menu-item :index="''+itemC.meta.funcNode" @click="clickMenu(itemC)" :key="itemC.meta.funcNode"><i :class="itemC.meta.icon"></i>{{itemC.meta.title}}</el-menu-item>
              </template>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <!-- 内容渲染 -->
      <el-main style="background-color: white;">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    methods: {
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
      }
    },
    computed: {
      menuData(){
        return this.$router.options.routes
      },
      user() {
        //console.log(this.$store.state)
        return this.$store.state.user
      },
      onRoutes() {//点击时此处高亮
        let path = this.$route.path.replace('/', '');
        return path ? path : '/';
      }
    }
  }
</script>

<style>
  .el-header {
    background-color: #FF9999;
    line-height: 60px;
  }

  .el-aside,
  .el-menu,
  .el-submenu,
  .el-menu-item {
    background-color: #FFCCCC;

  }

  body {
    margin: 0px;
  }
</style>
