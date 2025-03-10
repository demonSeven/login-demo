<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';

const auth = useAuthStore()
const form = ref({
  email: 'test@example.com',
  password: 'password'
})

const handleSubmit = async () => {
  try {
    await auth.login(form.value)
  } catch (error) {
    // 错误处理已在 store 中处理
  }
}
</script>

<template>
  <a-form
    :model="form"
    name="normal_login"
    class="login-form"
    @finish="handleSubmit"
  >
    <a-form-item
      label="邮箱"
      name="email"
      :rules="[{ required: true, message: '请输入邮箱!' }]"
    >
      <a-input v-model:value="form.email">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item
      label="密码"
      name="password"
      :rules="[{ required: true, message: '请输入密码!' }]"
    >
      <a-input-password v-model:value="form.password">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        class="login-form-button"
        :disabled="auth.isLoading"
      >
        登录
      </a-button>
    </a-form-item>
    <p v-if="auth.error" class="error">{{ auth.error }}</p >
  </a-form>

</template>