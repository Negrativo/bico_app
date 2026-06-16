import axios from 'axios';
import { API_BASE_URL, USE_MOCK } from '../../environments';
import { getToken, clearSession } from './auth';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// Modo mock: substitui o adapter HTTP por um handler local que devolve dados
// fake (ver `src/service/mock/mockAdapter.ts`). Ativado por `USE_MOCK` em
// `environments.tsx`. Útil para testar todo o fluxo do app sem backend.
if (USE_MOCK) {
  // Import dinâmico evita carregar o mock quando ele está desligado.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { mockAdapter } = require('./mock/mockAdapter');
  api.defaults.adapter = mockAdapter;
  // eslint-disable-next-line no-console
  console.log('[api] USE_MOCK=true — respostas servidas pelo mock local.');
}

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
