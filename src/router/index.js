import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AgendaView from '../views/AgendaView.vue'
import ContactCreateView from '../views/ContactCreateView.vue'
import ContactEditView from '../views/ContactEditView.vue'
import ProfileView from '../views/ProfileView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/registro', name: 'register', component: RegisterView },
  { path: '/agenda', name: 'agenda', component: AgendaView, meta: { requiresAuth: true } },
  { path: '/agenda/crear', name: 'agenda-create', component: ContactCreateView, meta: { requiresAuth: true } },
  { path: '/agenda/:id', name: 'agenda-edit', component: ContactEditView, meta: { requiresAuth: true } },
  { path: '/perfil', name: 'perfil', component: ProfileView, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ name: 'login' })
  } else if ((to.name === 'login' || to.name === 'register') && auth.isAuthenticated) {
    next({ name: 'agenda' })
  } else {
    next()
  }
})

export default router
