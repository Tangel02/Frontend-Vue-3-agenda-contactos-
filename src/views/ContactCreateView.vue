<template>
  <section class="contact-form">
    <h2>Crear contacto</h2>
    <form @submit.prevent="handleSubmit">
      <label>
        Nombre *
        <input v-model="form.nombre" required />
      </label>
      <label>
        Apellido
        <input v-model="form.apellido" />
      </label>
      <label>
        Teléfono *
        <input v-model="form.telefono" required />
      </label>
      <label>
        Email
        <input v-model="form.email" type="email" />
      </label>
      <label>
        Dirección
        <input v-model="form.direccion" />
      </label>
      <label>
        Notas
        <textarea v-model="form.notas"></textarea>
      </label>
      <button type="submit">Guardar</button>
    </form>
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../services/api'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const form = reactive({
  nombre: '',
  apellido: '',
  telefono: '',
  email: '',
  direccion: '',
  notas: ''
})

const handleSubmit = async () => {
  if (!form.nombre || !form.telefono) {
    auth.setError('Nombre y teléfono son obligatorios')
    return
  }
  try {
    await api.crearContacto(form)
    auth.setMessage('Contacto creado correctamente')
    router.push('/agenda')
  } catch (err) {
    auth.setError(err.message)
  }
}
</script>
