import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/Frontend-Vue-agenda-contactos/', // nombre EXACTO del repo en GitHub
  build: {
    outDir: 'docs', // 👈 aquí le decimos a Vite que use /docs en vez de /dist
  },
  plugins: [vue()],
})
