<template>
  <div id="app">
    <el-container>
        <!-- 头部区域 -->
        <el-header class="header" height="100px">
          <h2>Vue登录模块</h2>
          <h4>路 由 配 置 登 录 跳 转</h4>
        </el-header>
        <!-- 主区域 -->
        <el-main>
          <router-view/><!-- 路由注入的地方 -->
        </el-main>
      </el-container>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  .header{
    background-color: #409EFF;
    color: white;
  }
</style>
