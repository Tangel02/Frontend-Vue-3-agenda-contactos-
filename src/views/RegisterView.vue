<template>
  <section class="auth-form">
    <h2>Registro</h2>
    <form @submit.prevent="handleSubmit">
      <label>
        Usuario
        <input v-model="username" required />
      </label>
      <label>
        Contraseña
        <input v-model="password" type="password" required minlength="4" />
      </label>
      <button type="submit">Crear cuenta</button>
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
  auth.setMessage(null)
  auth.setError(null)
  try {
    await api.register({ username: username.value, password: password.value })
    auth.setMessage('Usuario registrado, ahora puedes iniciar sesión')
    router.push('/login')
  } catch (err) {
    auth.setError(err.message)
  }
}
</script>
