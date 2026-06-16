/**
 * Estado em memória usado pelo mock adapter (`mockAdapter.ts`).
 *
 * Persiste em AsyncStorage para sobreviver ao reload do Metro / hot reload.
 * Quando `USE_MOCK` estiver desligado em `environments.tsx`, este módulo
 * simplesmente não é importado.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

import { ServicoDoUsuarioDTO, StatusSolicitacao } from '../../dtos/ServicoDoUsuarioDTO';
import { UsuarioDTO } from '../../dtos/UsuarioDTO';

const STORAGE_KEY = 'MOCK_DB_V1';

export interface MockUsuario extends UsuarioDTO {
  // No mundo real a senha não viria no DTO, mas aqui precisamos validar login.
  senha: string;
}

export interface MockDb {
  usuarios: MockUsuario[];
  solicitacoes: ServicoDoUsuarioDTO[];
}

// -----------------------------------------------------------------------------
// Seed inicial — dois usuários (cliente e prestadora) + algumas solicitações.
// -----------------------------------------------------------------------------

const SEED_USUARIO_CLIENTE: MockUsuario = {
  id: '11111111-1111-1111-1111-111111111111',
  nome: 'Lucas Cliente',
  email: 'cliente@bico.com',
  senha: '123456',
  telefone: '11999990001',
  servicos: [],
  latitude: '-23.55052',
  longitude: '-46.633308',
  endereco: 'Av. Paulista, 1000 - São Paulo, SP',
  verificatedAt: new Date().toISOString(),
};

const SEED_USUARIO_PRESTADOR: MockUsuario = {
  id: '22222222-2222-2222-2222-222222222222',
  nome: 'Maria Prestadora',
  email: 'prestador@bico.com',
  senha: '123456',
  telefone: '11999990002',
  servicos: ['Pedreiro', 'Pintor', 'Eletricista'],
  latitude: '-23.561414',
  longitude: '-46.655881',
  endereco: 'R. da Consolação, 2000 - São Paulo, SP',
  verificatedAt: new Date().toISOString(),
};

function buildSeedSolicitacoes(): ServicoDoUsuarioDTO[] {
  const hoje = new Date();
  const amanha = new Date(hoje.getTime() + 24 * 60 * 60 * 1000);
  const ontem = new Date(hoje.getTime() - 24 * 60 * 60 * 1000);
  const iso = (d: Date) => d.toISOString().slice(0, 10);

  const make = (
    id: string,
    servico: string,
    diaSelecionado: string,
    horarioSolicitado: string,
    observacao: string,
    status: StatusSolicitacao,
  ): ServicoDoUsuarioDTO => ({
    id,
    usuarioSolicitante: SEED_USUARIO_CLIENTE.nome,
    usuarioPrestador: SEED_USUARIO_PRESTADOR.nome,
    servico,
    diaSelecionado,
    horarioSolicitado,
    observacao,
    endereco: SEED_USUARIO_CLIENTE.endereco,
    status,
  });

  return [
    make(
      'aaaaaaa1-0000-0000-0000-000000000001',
      'Pintor',
      iso(amanha),
      '09:00',
      'Pintar parede da sala (3x4m).',
      'PENDENTE',
    ),
    make(
      'aaaaaaa1-0000-0000-0000-000000000002',
      'Eletricista',
      iso(hoje),
      '14:30',
      'Trocar disjuntor do quarto.',
      'ACEITA',
    ),
    make(
      'aaaaaaa1-0000-0000-0000-000000000003',
      'Pedreiro',
      iso(ontem),
      '08:00',
      'Reparo no rejunte do banheiro.',
      'CONCLUIDA',
    ),
  ];
}

function buildSeedDb(): MockDb {
  return {
    usuarios: [SEED_USUARIO_CLIENTE, SEED_USUARIO_PRESTADOR],
    solicitacoes: buildSeedSolicitacoes(),
  };
}

// -----------------------------------------------------------------------------
// Estado mutável + persistência
// -----------------------------------------------------------------------------

let db: MockDb = buildSeedDb();
let hydrated = false;
let hydratePromise: Promise<void> | null = null;

export async function ensureLoaded(): Promise<void> {
  if (hydrated) return;
  if (hydratePromise) return hydratePromise;
  hydratePromise = (async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<MockDb>;
        if (parsed?.usuarios && parsed?.solicitacoes) {
          db = parsed as MockDb;
        }
      }
    } catch (e) {
      // Fica com o seed em memória.
      console.warn('[mock] falha ao hidratar storage, usando seed.', e);
    } finally {
      hydrated = true;
    }
  })();
  return hydratePromise;
}

async function persist(): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch (e) {
    console.warn('[mock] falha ao persistir storage.', e);
  }
}

export function getDb(): MockDb {
  return db;
}

export async function mutateDb(fn: (current: MockDb) => void): Promise<void> {
  fn(db);
  await persist();
}

export async function resetDb(): Promise<void> {
  db = buildSeedDb();
  await persist();
}

// -----------------------------------------------------------------------------
// Helpers usados pelo adapter
// -----------------------------------------------------------------------------

export function fakeToken(usuarioId: string): string {
  // Não é um JWT real — só algo opaco para o app armazenar e enviar no header.
  const payload = btoaSafe(JSON.stringify({ sub: usuarioId, iat: Date.now() }));
  const sig = Math.random().toString(36).slice(2, 10);
  return `mock.${payload}.${sig}`;
}

function btoaSafe(s: string): string {
  // React Native tem `global.btoa` em alguns ambientes; faz fallback simples.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const g: any = globalThis as any;
  if (typeof g.btoa === 'function') return g.btoa(s);
  // Fallback ingênuo (somente para tokens fake).
  return Array.from(s)
    .map(c => c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');
}

export function uuid(): string {
  // UUID v4 simplificado (suficiente para chave em memória).
  const hex = (n: number) =>
    Math.floor(Math.random() * Math.pow(16, n))
      .toString(16)
      .padStart(n, '0');
  return `${hex(8)}-${hex(4)}-4${hex(3)}-${(8 + Math.floor(Math.random() * 4)).toString(16)}${hex(3)}-${hex(12)}`;
}
