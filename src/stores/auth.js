import { defineStore } from 'pinia'
import api from '../api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isLoading: false,
    error: null
  }),

  actions: {
    async login(params) {
      this.isLoading = true
      try {
        await api.login(params)
        await this.fetchUser()
      } catch (error) {
        this.error = error.response?.data?.message || '登录失败'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async logout() {
      await api.logout()
      this.user = null
    },

    async fetchUser() {
      try {
        const response = await api.getUser()
        this.user = response.data
      } catch (error) {
        this.user = null
      }
    }
  }
})