import axios from 'axios'
import type { TokenType } from '../types/token.type'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use((config) => {
  const tokenObj = localStorage.getItem("token")
  if (tokenObj) {
    const {token, createdAt} = JSON.parse(tokenObj) as TokenType
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api