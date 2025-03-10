<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import Login from '../components/LoginFrom.vue'
import api from '../api'
import http from '../utils/http'

import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

import Cookies from 'js-cookie'


const auth = useAuthStore()

onMounted(() => {
  fetchServerInfo()
  //获取用户信息
  auth.fetchUser()
})

const fetchServerInfo = async () => {
    try {
      const response = await api.getServerInfo();
      console.error(`response666: ${JSON.stringify(response)}`)
      console.log('XSRF-TOKEN--666-->', document.cookie, cookies.get('XSRF-TOKEN1'));
      console.log('Set-Cookie123:', response.headers['set-cookie']);
      console.log('XSRF-TOKEN--111->', Cookies, Cookies.get('XSRF-TOKEN1'))
      
    } catch (error) {
      // 错误处理已在 store 中处理
    }
  }
</script>

<template>
  <div v-if="!auth.user">
    <h1 style="margin-bottom:20px;">登录</h1>
    <Login />
  </div>

  <div v-else>
    <h1>你好 {{ auth.user.name }}</h1>
    <button @click="auth.logout">Logout</button>
  </div>
</template>
