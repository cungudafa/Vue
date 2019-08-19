import Vue from 'vue'
// import * as echarts from 'echarts/lib/echarts';
// // 引入 echarts 主模块。
// import 'echarts/lib/echarts'
// // 引入柱形图
// import 'echarts/lib/chart/bar'
// //// 引入提示框组件、标题组件、工具箱、legend组件。
// import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/title'
// import 'echarts/lib/component/toolbox'
// import 'echarts/lib/component/legend'
//
// Vue.prototype.$echarts =echarts;

//自定义js
import myEcharts from '@/echarts/myEcharts/myEcharts.js'
Vue.use(myEcharts)
