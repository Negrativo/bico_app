import axios from 'axios';
import { API_BASE_URL } from '../../environments';
import { getToken, clearSession } from './auth';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// Injeta automaticamente o Bearer token (quando existir) em toda requisição.
api.interceptors.request.use(async config => {
  const token = await getToken();
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

// Listener para 401: limpa sessão local. A navegação para a tela de login
// é feita pelo AuthContext ao detectar user === null.
let onUnauthorized: (() => void) | null = null;
export const setOnUnauthorized = (cb: (() => void) | null) => {
  onUnauthorized = cb;
};

api.interceptors.response.use(
  response => response,
  async error => {
    if (error?.response?.status === 401) {
      await clearSession();
      if (onUnauthorized) onUnauthorized();
    }
    return Promise.reject(error);
  },
);

export default api;
