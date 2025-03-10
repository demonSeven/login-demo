import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';

import App from './App.vue'
import router from './router'
import VueCookies from 'vue3-cookies';


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)
app.use(VueCookies);
app.mount('#app')
