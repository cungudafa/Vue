/**
 * 各种画echarts图表的方法都封装在这里
 * 注意：这里echarts没有采用按需引入的方式，只是为了方便学习
 */

import echarts from 'echarts'
import axios  from 'axios'

const install = function(Vue) {
  Object.defineProperties(Vue.prototype, {
    $chart: {
      get() {
        return {
          //画一条简单的线
          line1: function(id) {
            this.chart = echarts.init(document.getElementById(id));
            this.chart.clear(); //释放缓存
            var value = [];
            var age = [];
            axios.get('/user/aop/ageList').then((res) => { //axios发送get请求
              if (res.data != null) {
                var data = res.data.data;
                for (var i = 0; i < data.age.length; i++) {
                  age[i] = data.age[i];
                  value[i] = data.num[i];
                }
                //console.log("age:"+age+"\t value:"+value);
                //绘图
                var optionData = {
                  title: {
                    text: '直线：年龄分段', //主标题
                    subtext: '后台数据', //副标题
                    x: 'left', //x轴方向对齐方式
                  },
                  xAxis: {
                    type: 'category',
                    data: age,
                  },
                  yAxis: {
                    type: 'value'
                  },
                  series: [{
                    data: value,
                    type: 'line',
                    smooth: true
                  }]
                };
                this.chart.setOption(optionData);
              } else {
                this.$message({
                  type: 'error',
                  message: '查询失败',
                  showClose: true
                })
              }
            })
          },
          //画一个饼图
          pie1: function(id) {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById(id));
            var value = [];
            var myaddress = [];
            var addressAndvalue =[];
            axios.get('/user/aop/addressList').then((res) => { //axios发送get请求
              if (res.data != null) {
                //console.log(res.data);
                var data = res.data.data;
                for (var i = 0; i < data.num.length; i++) {
                  myaddress[i] = data.address[i];
                  value[i] = data.num[i];
                  addressAndvalue[i] = {"name":data.address[i],"value":data.num[i]};
                }
                console.log("address:"+myaddress+"\t value:"+value);
                console.log(addressAndvalue);
                // 绘制图表
                myChart.setOption({
                  title: {
                    text: '饼图：地域分布', //主标题
                    subtext: '结合后台', //副标题
                    x: 'left', //x轴方向对齐方式
                  },
                  tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                  },
                  legend: {
                    orient: 'vertical',
                    bottom: 'bottom',
                    data: myaddress //['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                  },
                  series: [{
                    name: '地址分布',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: addressAndvalue,
                    itemStyle: {
                      emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                    }
                  }]
                });
              } else {
                this.$message({
                  type: 'error',
                  message: '查询失败',
                  showClose: true
                })
              }
            })//ajax
          },

        }
      }
    }
  })
}

export default {
  install
}
