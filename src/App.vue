<template>
  <div>
    <Navbar />

    <main class="container">
      <div v-if="auth.message" class="alert success">{{ auth.message }}</div>
      <div v-if="auth.error" class="alert error">{{ auth.error }}</div>

      <router-view />
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import { useAuthStore } from './stores/auth'

const auth = useAuthStore()

onMounted(() => {
  auth.loadFromStorage()
})
</script>
