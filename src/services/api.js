import { useAuthStore } from '../stores/auth'

// Cambia esto por la URL real de tu backend en InfinityFree
const API_BASE = 'http://localhost/backend/api'

async function request(path, options = {}) {
  const auth = useAuthStore()
  const headers = options.headers || {}

  headers['Content-Type'] = 'application/json'
  if (auth.token) {
    headers['Authorization'] = `Bearer ${auth.token}`
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  })

  const text = await response.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch (e) {
    data = { error: 'Respuesta inválida del servidor' }
  }

  if (!response.ok) {
    const errorMessage = (data && data.error) || 'Error de servidor'
    throw new Error(errorMessage)
  }

  return data
}

export const api = {
  login(credentials) {
    return request('/auth/login.php', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
  },
  register(payload) {
    return request('/auth/registrar.php', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
  },
  getContactos(q = '') {
    const query = q ? `?q=${encodeURIComponent(q)}` : ''
    return request(`/contactos/index.php${query}`)
  },
  crearContacto(payload) {
    return request('/contactos/crear.php', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
  },
  actualizarContacto(id, payload) {
    return request(`/contactos/actualizar.php?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    })
  },
  eliminarContacto(id) {
    return request(`/contactos/eliminar.php?id=${id}`, {
      method: 'DELETE'
    })
  },
  getPerfil() {
    return request('/perfil.php')
  },
  editarPerfil(payload) {
    return request('/editar.php', {
      method: 'PUT',
      body: JSON.stringify(payload)
    })
  }
}
