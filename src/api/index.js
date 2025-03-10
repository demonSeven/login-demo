import http from '../utils/http'

export default {

  async getServerInfo() {
    return http.get('/', {
      withCredentials: true // 如果需要发送跨域请求的凭证（如 cookies）
    });
  },

  async getCsrfCookie() {
    return http.get('/csrf-cookie');
  },

  async login(params) {
    return http.post('/login', params)
  },

  async logout() {
    return http.post('/logout')
  },

  async getUser() {
    return http.get('/api/user')
  }
}