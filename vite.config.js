import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/Frontend-Vue-agenda-contactos/', // <-- nombre EXACTO del repo
  plugins: [vue()],
});
