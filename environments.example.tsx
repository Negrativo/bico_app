/**
 * Configuração de ambiente do app BICO.
 *
 * Este arquivo NÃO deve conter segredos no repositório. Para isso:
 *  - Cópia versionada e segura: `environments.example.tsx`
 *  - Cópia local com suas chaves: `environments.tsx` (NÃO commitado, ignorado no .gitignore)
 *
 * Para mudar a URL do backend basta editar API_BASE_URL abaixo.
 */

// URL do backend Spring Boot. Para emulador Android, use o IP da máquina (10.0.2.2 = host local).
//   Android emulator (AVD): http://10.0.2.2:8070
//   Dispositivo físico   : http://<IP-DA-SUA-MAQUINA>:8070
//   iOS simulator        : http://localhost:8070
export const API_BASE_URL = 'http://10.0.2.2:8070';

// Chave Google Maps / Geocoding. Em produção, prefira restringir por pacote.
export const GOOGLE_API_KEY = '';

// Ativa o modo MOCK: todas as chamadas axios são respondidas localmente
// (ver `src/service/mock/mockAdapter.ts`). Útil para testar o fluxo do app
// (login, cadastro, solicitações) sem o backend rodando.
export const USE_MOCK = false;
