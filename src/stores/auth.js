import { defineStore } from 'pinia'

const STORAGE_KEY = 'agenda_auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null,
    message: null,
    error: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    loadFromStorage() {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const data = JSON.parse(raw)
        this.token = data.token
        this.user = data.user
      }
    },
    saveToStorage() {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ token: this.token, user: this.user })
      )
    },
    setAuth(token, user) {
      this.token = token
      this.user = user
      this.saveToStorage()
    },
    clearAuth() {
      this.token = null
      this.user = null
      this.message = null
      this.error = null
      localStorage.removeItem(STORAGE_KEY)
    },
    setMessage(msg) {
      this.message = msg
      this.error = null
    },
    setError(msg) {
      this.error = msg
      this.message = null
    }
  }
})
