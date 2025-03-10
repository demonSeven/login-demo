<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import Login from '../components/LoginFrom.vue'
import api from '../api'

const auth = useAuthStore()

onMounted(() => {
  fetchServerInfo()
  
  //获取用户信息
  auth.fetchUser()
})

const fetchServerInfo = async () => {
    try {
      const response = await api.getServerInfo();
      console.error(`Server Info: ${JSON.stringify(response.data)}`)
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
