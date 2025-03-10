import axios from 'axios'
import { useAuthStore } from '../stores/auth'
import api from '../api'
import Cookies from 'js-cookie';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
})

// 获取 CSRF Token 的函数
const getCsrfToken = () => {
  const CsrfToken = Cookies.get('laravel_session');
  console.log('XSRF-TOKEN111', CsrfToken);
  return CsrfToken;
}

// 请求处理拦截器
http.interceptors.request.use(async (config) => {
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
  response => {
    // 获取响应头中的 Cookie
    
    console.log('response------>',response)
    console.log('66623422->')
    // if (cookies) {
    //   // 处理 Cookie（示例：存储到 Vuex/Pinia）
    //   console.log('Received Cookies:', parseCookies(cookies))
    // }

    return response;
  },
  error => {
    const { status, data } = error.response || {}
    getCsrfToken()
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