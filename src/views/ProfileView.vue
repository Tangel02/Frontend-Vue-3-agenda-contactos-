<template>
  <section class="profile">
    <h2>Perfil</h2>

    <div v-if="perfil">
      <p><strong>ID:</strong> {{ perfil.id }}</p>
      <p><strong>Usuario:</strong> {{ perfil.username }}</p>
      <p><strong>Fecha de registro:</strong> {{ perfil.fecha_registro }}</p>
    </div>

    <h3>Editar datos</h3>
    <form @submit.prevent="handleSubmit">
      <label>
        Nuevo usuario
        <input v-model="username" />
      </label>
      <label>
        Nueva contraseña
        <input v-model="password" type="password" minlength="4" />
      </label>
      <button type="submit">Guardar cambios</button>
    </form>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { api } from '../services/api'
import { useAuthStore } from '../stores/auth'

const perfil = ref(null)
const username = ref('')
const password = ref('')
const auth = useAuthStore()

const loadPerfil = async () => {
  try {
    perfil.value = await api.getPerfil()
  } catch (err) {
    auth.setError(err.message)
  }
}

const handleSubmit = async () => {
  const payload = {}
  if (username.value) payload.username = username.value
  if (password.value) payload.password = password.value
  if (!payload.username && !payload.password) {
    auth.setError('No hay datos para actualizar')
    return
  }
  try {
    await api.editarPerfil(payload)
    auth.setMessage('Perfil actualizado')
  } catch (err) {
    auth.setError(err.message)
  }
}

onMounted(loadPerfil)
</script>
