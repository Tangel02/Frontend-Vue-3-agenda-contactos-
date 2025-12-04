<template>
  <section class="auth-form">
    <h2>Iniciar sesión</h2>
    <form @submit.prevent="handleSubmit">
      <label>
        Usuario
        <input v-model="username" required />
      </label>
      <label>
        Contraseña
        <input v-model="password" type="password" required />
      </label>
      <button type="submit">Entrar</button>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../services/api'
import { useAuthStore } from '../stores/auth'

const username = ref('')
const password = ref('')
const router = useRouter()
const auth = useAuthStore()

const handleSubmit = async () => {
  try {
    auth.setMessage(null)
    auth.setError(null)
  } catch (_) {}

  try {
    const data = await api.login({ username: username.value, password: password.value })
    auth.setAuth(data.token, data.user)
    auth.setMessage('Inicio de sesión exitoso')
    router.push('/agenda')
  } catch (err) {
    auth.setError(err.message)
  }
}
</script>
