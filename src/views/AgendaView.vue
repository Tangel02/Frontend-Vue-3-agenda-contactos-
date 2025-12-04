<template>
  <section>
    <header class="agenda-header">
      <h2>Mis contactos</h2>
      <div>
        <input
          v-model="search"
          @input="loadContactos"
          placeholder="Buscar por nombre o apellido"
        />
        <router-link class="btn-primary" to="/agenda/crear">+ Nuevo contacto</router-link>
      </div>
    </header>

    <table class="contacts-table" v-if="contactos.length">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Teléfono</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in contactos" :key="c.id">
          <td>{{ c.nombre }} {{ c.apellido }}</td>
          <td>{{ c.telefono }}</td>
          <td>{{ c.email }}</td>
          <td>
            <router-link :to="`/agenda/${c.id}`">Editar</router-link>
            <button @click="eliminar(c.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>No tienes contactos aún.</p>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { api } from '../services/api'
import { useAuthStore } from '../stores/auth'

const contactos = ref([])
const search = ref('')
const auth = useAuthStore()

const loadContactos = async () => {
  try {
    auth.setMessage(null)
    auth.setError(null)
    contactos.value = await api.getContactos(search.value)
  } catch (err) {
    auth.setError(err.message)
  }
}

const eliminar = async (id) => {
  if (!confirm('¿Eliminar este contacto?')) return
  try {
    await api.eliminarContacto(id)
    auth.setMessage('Contacto eliminado')
    loadContactos()
  } catch (err) {
    auth.setError(err.message)
  }
}

onMounted(loadContactos)
</script>
