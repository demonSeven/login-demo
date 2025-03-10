<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import Login from '../components/LoginFrom.vue'
import api from '../api'
import Cookies from 'js-cookie';

const auth = useAuthStore()

onMounted(() => {
  fetchServerInfo()
  
  
})

const fetchServerInfo = async () => {
    try {
      const response = await api.getServerInfo();
      // 获取响应头中的 Cookie
      const cookies = response.headers.get('set-cookie');
      console.log('Cookie123s:', cookies);
      console.error(`response.headers: ${JSON.stringify(response)}`)
      const CsrfToken = Cookies.get('XSRF-TOKEN');
      console.log('XSRF-TOKEN', CsrfToken);

      //获取用户信息
      auth.fetchUser()
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
