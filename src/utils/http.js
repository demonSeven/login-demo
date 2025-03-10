import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

// 请求处理拦截器
http.interceptors.request.use(async (config) => {
  if (['post', 'put', 'delete'].includes(config.method.toLowerCase())) {
    await http.get('/csrf-cookie')
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