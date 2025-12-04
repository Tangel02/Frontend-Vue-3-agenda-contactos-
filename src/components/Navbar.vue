<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/">📒 Agenda</router-link>
    </div>
    <div class="navbar-links">
      <router-link to="/">Inicio</router-link>
      <router-link v-if="!auth.isAuthenticated" to="/login">Login</router-link>
      <router-link v-if="!auth.isAuthenticated" to="/registro">Registro</router-link>
      <router-link v-if="auth.isAuthenticated" to="/agenda">Agenda</router-link>
      <router-link v-if="auth.isAuthenticated" to="/perfil">Perfil</router-link>
      <button v-if="auth.isAuthenticated" @click="logout" class="btn-logout">
        Cerrar sesión
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()

const logout = () => {
  auth.clearAuth()
  router.push('/login')
}
</script>
