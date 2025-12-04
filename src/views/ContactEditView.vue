<template>
  <section class="contact-form">
    <h2>Editar contacto</h2>
    <form @submit.prevent="handleSubmit" v-if="loaded">
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
      <button type="submit">Actualizar</button>
    </form>
    <p v-else>Cargando...</p>
  </section>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../services/api'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const loaded = ref(false)

const form = reactive({
  nombre: '',
  apellido: '',
  telefono: '',
  email: '',
  direccion: '',
  notas: ''
})

const loadContacto = async () => {
  try {
    const contactos = await api.getContactos()
    const contacto = contactos.find((c) => String(c.id) === route.params.id)
    if (!contacto) {
      auth.setError('Contacto no encontrado')
      router.push('/agenda')
      return
    }
    Object.assign(form, contacto)
    loaded.value = true
  } catch (err) {
    auth.setError(err.message)
  }
}

const handleSubmit = async () => {
  if (!form.nombre || !form.telefono) {
    auth.setError('Nombre y teléfono son obligatorios')
    return
  }
  try {
    await api.actualizarContacto(route.params.id, form)
    auth.setMessage('Contacto actualizado')
    router.push('/agenda')
  } catch (err) {
    auth.setError(err.message)
  }
}

onMounted(loadContacto)
</script>
