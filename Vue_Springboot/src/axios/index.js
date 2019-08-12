import Vue from 'vue'
import axios  from 'axios'
import qs from 'qs'

axios.defaults.baseURL="http://localhost:8090"
Vue.prototype.$ajax = axios

axios.defaults.headers = {
	"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
};

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    if(config.method!='get'){
        config.data=qs.stringify(config.data);
    }
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return config;
},function (error) {
    return Promise.reject(error)
})
