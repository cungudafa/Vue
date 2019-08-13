import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui' // 导航菜单栏样式
import 'element-ui/lib/theme-chalk/index.css'

//import Main from '@/components/Main.vue'//引入vue模块
//import Login from '@/components/Login.vue'

Vue.use(Router) //注册vue-router
Vue.use(ElementUI);

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'Main',
//       component: Main
//     },
//     {
//       path: '/login',
//       name: 'Login',
//       component: Login
//     },
//   ]
// })

export default new Router({
  mode: 'history',//跳转时不带#号
  routes: [{
      path: '/',
      redirect: '/login',
      meta: {
        menu: false
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/Login'),
      meta: {
        menu: false
      }
    },
    {
      path: '/user',
      name: 'layoutYHGL',//js中由this.$router.push({ name: 'layoutYHGL'})返回
      component: () => import('@/views/layout/Layout'),
      meta: {
        title: '用户管理',
        icon: 'el-icon-user',
        menu: true,
        funcNode: '1'
      },
      children: [{
          path: '/user/userList',
          name: 'UserList',
          component: () => import('@/views/user/UserList'),
          meta: {
            title: '用户列表',
            icon: 'el-icon-notebook-2',
            menu: true,
            funcNode: '1-1'
          }
        },
        {
          path: '/user/addUser',
          name: 'UserAdd',
          component: () => import('@/views/user/UserList'),
          meta: {
            title: '用户添加',
            icon: 'el-icon-circle-plus-outline',
            menu: true,
            funcNode: '1-2'
          }
        }
      ]
    },
    {
      path: '/role',
      redirect: 'user/userList',
      meta: {
        title: '角色管理',
        icon: 'el-icon-help',
        menu: true
      }
    },
    {
      path: '/sys',
      name: 'layoutXTGL',
      component: () => import('@/views/layout/Layout'),
      meta: {
        title: '系统管理',
        icon: 'el-icon-setting',
        menu: true,
        funcNode: '2'
      },
      children: [{
        path: '/sys/sysLogList',
        name: 'SysLogList',
        component: () => import('@/views/user/UserList'),
        meta: {
          title: '系统访问日志',
          icon: 'el-icon-notebook-1',
          menu: true,
          funcNode: '2-1'
        }
      }]
    },
  ]
})
