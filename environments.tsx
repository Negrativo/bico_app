/**
 * Configuração local do app BICO.
 * ⚠️  Este arquivo é ignorado pelo git (.gitignore) — não commite chaves reais.
 * Use `environments.example.tsx` como base.
 */

// URL do backend Spring Boot rodando localmente.
//   Android emulator (AVD): http://10.0.2.2:8070
//   Dispositivo físico   : http://<IP-DA-SUA-MAQUINA>:8070
//   iOS simulator        : http://localhost:8070
export const API_BASE_URL = 'http://10.0.2.2:8070';

// Ativa o modo MOCK: todas as chamadas axios são interceptadas e respondidas
// localmente (ver `src/service/mock/mockAdapter.ts`). Use para testar fluxo
// completo do app (login, cadastro, solicitações, transições de status) sem
// precisar do backend rodando. Coloque `false` para voltar a chamar o backend.
export const USE_MOCK = true;

// Cole sua chave de API do Google (Maps + Geocoding) abaixo.
// Para gerar: https://console.cloud.google.com/apis/credentials
export const GOOGLE_API_KEY = 'AIzaSyAE1sO-1PTk6n2U0khYHeN5lvwivMA6Kh0';
