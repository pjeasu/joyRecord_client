import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/vuex/store.js' 
import axios from "./utils/axios";

//부트스트랩
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import './assets/css/default.css'
import 'bootstrap-icons/font/bootstrap-icons.css'


const app = createApp(App);



//전역변수
app.config.globalProperties.axios = axios;
//axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.baseURL = 'joy-record-server.n-e.kr:8080';

axios.interceptors.request.use(
    (config) => {
        config.headers['Access-Control-Allow-Origin'] = '*';  // CORS 설정(모든 리소스 허용)
        return config;
    }
)
//axios.defaults.headers.post['Accepts'] = "multipart/form-data";


app.use(router).use(store).use(BootstrapVue3).mount("#app");



