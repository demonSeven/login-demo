import axios from 'axios'
import { useAuthStore } from '../stores/auth'
import api from '../api'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

// 获取 CSRF Token 的函数
const getCsrfToken = () => {
  const cookies = document.cookie.split(';')
  console.log('cookie---->', cookie)
  const tokenCookie = cookies.find(c => c.trim().startsWith('XSRF-TOKEN='))
  return tokenCookie ? tokenCookie.split('=')[1] : null
}

// 请求处理拦截器
http.interceptors.request.use(async (config) => {
  const xsrfToken = getCookie('XSRF-TOKEN');
  console.log('xsrfToken',xsrfToken)
  
  if (['post', 'put', 'patch', 'delete'].includes(config.method.toLowerCase())) {
    //确保先获取 CSRF Cookie
    if (!getCsrfToken()) {
      await api.getCsrfCookie();
    }
    config.headers['X-XSRF-TOKEN'] = getCsrfToken()
  }
  return config
})

// 响应处理拦截器
http.interceptors.response.use(
  response => response,
  error => {
    const { status, data } = error.response || {}
    switch (status) {
      case 401:
        console.error('未授权')
        break
      case 403:
        console.error('重定向')
        break
      case 419:
        console.error('认证超时', data.errors)
        break
      case 422:
        console.error('验证失败', data.errors)
        break
      case 500:
        console.error('服务端错误')
        break
      default:
        console.error('请求失败')
    }
    
    return Promise.reject(error)
  }
)

export default http