<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import Login from '../components/LoginFrom.vue'

const auth = useAuthStore()

onMounted(() => {
  //获取用户信息
  auth.fetchUser()
})
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
