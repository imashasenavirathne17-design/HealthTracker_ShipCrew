import axios from 'axios'
export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : 'http://localhost:5000/api' })
export const setToken = (t) => {
  if (t) api.defaults.headers.common['Authorization'] = `Bearer ${t}`
  else delete api.defaults.headers.common['Authorization']
}
