/**
 * Axios adapter que responde localmente (sem rede) todas as rotas do backend
 * BICO. Ativado por `USE_MOCK` em `environments.tsx`.
 *
 * Suporta:
 *   POST   /auth/login
 *   POST   /auth/registrar
 *   POST   /auth/email-existente
 *   POST   /usuario                       (legado — cria cliente)
 *   GET    /usuario/listar
 *   GET    /usuario/:id
 *   PUT    /usuario/atualizar/:id
 *   PUT    /usuario/atualizar-senha/:id
 *   DELETE /usuario/deletar/:id
 *   POST   /solicitacao/solicitar
 *   GET    /solicitacao/prestador/:id
 *   GET    /solicitacao/cliente/:id
 *   GET    /solicitacao/:id               (legado = prestador)
 *   PATCH  /solicitacao/:id/{aceitar|recusar|concluir|cancelar}
 */

import type {
  AxiosAdapter,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { AxiosHeaders } from 'axios';

import { ServicoDoUsuarioDTO, StatusSolicitacao } from '../../dtos/ServicoDoUsuarioDTO';
import { SolicitacaoDTO } from '../../dtos/SolicitacaoDTO';
import { UsuarioAtualizarDTO } from '../../dtos/UsuarioAtualizarDTO';
import { UsuarioByIdDTO } from '../../dtos/UsuarioByIdDTO';
import { UsuarioCriarDTO } from '../../dtos/UsuarioCriarDTO';
import { UsuarioEmailDTO } from '../../dtos/UsuarioEmailDTO';
import { UsuarioEmailSenhaDTO } from '../../dtos/UsuarioEmailSenhaDTO';

import { ensureLoaded, fakeToken, getDb, MockUsuario, mutateDb, uuid } from './mockData';

const MOCK_LATENCY_MS = 250;

function delay<T>(value: T, ms = MOCK_LATENCY_MS): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

function ok<T>(config: InternalAxiosRequestConfig, data: T, status = 200): AxiosResponse<T> {
  return {
    data,
    status,
    statusText: 'OK',
    headers: {},
    config,
    request: { __mock: true },
  };
}

function fail(
  config: InternalAxiosRequestConfig,
  status: number,
  message: string,
): AxiosResponse {
  return {
    data: { message, error: message },
    status,
    statusText: message,
    headers: {},
    config,
    request: { __mock: true },
  };
}

function pathOf(config: InternalAxiosRequestConfig): string {
  // axios passa `url` já potencialmente concatenado com baseURL — normalizamos.
  let url = config.url ?? '';
  if (config.baseURL && url.startsWith(config.baseURL)) {
    url = url.slice(config.baseURL.length);
  }
  // Remove query string.
  const q = url.indexOf('?');
  if (q >= 0) url = url.slice(0, q);
  return url;
}

function methodOf(config: InternalAxiosRequestConfig): string {
  return (config.method ?? 'get').toUpperCase();
}

function parseBody<T = unknown>(config: InternalAxiosRequestConfig): T {
  const raw = config.data;
  if (raw == null) return {} as T;
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw) as T;
    } catch {
      return raw as unknown as T;
    }
  }
  return raw as T;
}

// -----------------------------------------------------------------------------
// Conversores
// -----------------------------------------------------------------------------

function toUsuarioDTO(u: MockUsuario) {
  // Mesmo shape que o backend devolve em login/registro.
  const { senha: _omit, ...rest } = u;
  return rest;
}

function toUsuarioByIdDTO(u: MockUsuario): UsuarioByIdDTO {
  return {
    id: u.id,
    nome: u.nome,
    email: u.email,
    verificatedAt: u.verificatedAt,
  };
}

// -----------------------------------------------------------------------------
// Roteamento
// -----------------------------------------------------------------------------

async function route(config: InternalAxiosRequestConfig): Promise<AxiosResponse> {
  await ensureLoaded();
  const db = getDb();
  const method = methodOf(config);
  const url = pathOf(config);

  // ------------------- AUTH -------------------
  if (method === 'POST' && url === '/auth/login') {
    const body = parseBody<UsuarioEmailSenhaDTO>(config);
    const user = db.usuarios.find(u => u.email === body.email && u.senha === body.senha);
    if (!user) return fail(config, 401, 'Credenciais inválidas');
    return ok(config, { token: fakeToken(user.id), usuario: toUsuarioDTO(user) });
  }

  if (method === 'POST' && url === '/auth/registrar') {
    const body = parseBody<UsuarioCriarDTO>(config);
    const exists = db.usuarios.some(u => u.email === String(body.email));
    if (exists) return fail(config, 409, 'E-mail já cadastrado');
    const novo: MockUsuario = {
      id: uuid(),
      nome: String(body.nome),
      email: String(body.email),
      senha: String(body.senha),
      telefone: String(body.telefone),
      servicos: [],
      latitude: '',
      longitude: '',
      endereco: '',
      verificatedAt: new Date().toISOString(),
    };
    await mutateDb(d => {
      d.usuarios.push(novo);
    });
    return ok(config, { token: fakeToken(novo.id), usuario: toUsuarioDTO(novo) });
  }

  if (method === 'POST' && url === '/auth/email-existente') {
    const body = parseBody<UsuarioEmailDTO>(config);
    const existe = db.usuarios.some(u => u.email === String(body.email));
    return ok(config, existe);
  }

  // ------------------- USUÁRIO -------------------
  if (method === 'POST' && url === '/usuario') {
    // Endpoint legado de criação — mesmo comportamento do /auth/registrar, mas
    // devolve só o UUID (sem token).
    const body = parseBody<UsuarioCriarDTO>(config);
    if (db.usuarios.some(u => u.email === String(body.email))) {
      return fail(config, 409, 'E-mail já cadastrado');
    }
    const novo: MockUsuario = {
      id: uuid(),
      nome: String(body.nome),
      email: String(body.email),
      senha: String(body.senha),
      telefone: String(body.telefone),
      servicos: [],
      latitude: '',
      longitude: '',
      endereco: '',
      verificatedAt: new Date().toISOString(),
    };
    await mutateDb(d => {
      d.usuarios.push(novo);
    });
    return ok(config, novo.id);
  }

  if (method === 'GET' && url === '/usuario/listar') {
    return ok(config, db.usuarios.map(toUsuarioDTO));
  }

  const matchUsuarioById = url.match(/^\/usuario\/([^/]+)$/);
  if (method === 'GET' && matchUsuarioById) {
    const id = matchUsuarioById[1];
    const user = db.usuarios.find(u => u.id === id);
    if (!user) return fail(config, 404, 'Usuário não encontrado');
    return ok(config, toUsuarioByIdDTO(user));
  }

  const matchUsuarioAtualizar = url.match(/^\/usuario\/atualizar\/([^/]+)$/);
  if (method === 'PUT' && matchUsuarioAtualizar) {
    const id = matchUsuarioAtualizar[1];
    const body = parseBody<UsuarioAtualizarDTO>(config);
    let updated: MockUsuario | null = null;
    await mutateDb(d => {
      const u = d.usuarios.find(x => x.id === id);
      if (!u) return;
      u.latitude = body.latitude ?? u.latitude;
      u.longitude = body.longitude ?? u.longitude;
      u.endereco = body.endereco ?? u.endereco;
      u.servicos = body.profissoes ?? u.servicos;
      updated = u;
    });
    if (!updated) return fail(config, 404, 'Usuário não encontrado');
    return ok(config, body);
  }

  const matchUsuarioSenha = url.match(/^\/usuario\/atualizar-senha\/([^/]+)$/);
  if (method === 'PUT' && matchUsuarioSenha) {
    const id = matchUsuarioSenha[1];
    const body = parseBody<{ senhaAtual?: string; senhaNova?: string; novaSenha?: string }>(config);
    const novaSenha = body.senhaNova ?? body.novaSenha;
    let updated = false;
    await mutateDb(d => {
      const u = d.usuarios.find(x => x.id === id);
      if (!u) return;
      if (body.senhaAtual && u.senha !== body.senhaAtual) return;
      if (novaSenha) {
        u.senha = novaSenha;
        updated = true;
      }
    });
    if (!updated) return fail(config, 400, 'Não foi possível atualizar a senha');
    return ok(config, 'Senha atualizada');
  }

  const matchUsuarioDeletar = url.match(/^\/usuario\/deletar\/([^/]+)$/);
  if (method === 'DELETE' && matchUsuarioDeletar) {
    const id = matchUsuarioDeletar[1];
    let removed = false;
    await mutateDb(d => {
      const idx = d.usuarios.findIndex(u => u.id === id);
      if (idx >= 0) {
        d.usuarios.splice(idx, 1);
        removed = true;
      }
    });
    if (!removed) return fail(config, 404, 'Usuário não encontrado');
    return ok(config, 'Usuário removido');
  }

  // ------------------- SOLICITAÇÃO -------------------
  if (method === 'POST' && url === '/solicitacao/solicitar') {
    const body = parseBody<SolicitacaoDTO>(config);
    const solicitante = db.usuarios.find(u => u.id === body.usuarioSolicitante);
    // Escolhe um prestador qualquer que ofereça o serviço; se ninguém oferece,
    // pega o primeiro prestador da base (apenas para que apareça em listagens).
    const prestador =
      db.usuarios.find(u => u.servicos?.includes(body.servico)) ??
      db.usuarios.find(u => (u.servicos?.length ?? 0) > 0) ??
      null;

    const nova: ServicoDoUsuarioDTO = {
      id: uuid(),
      usuarioSolicitante: solicitante?.nome ?? body.usuarioSolicitante,
      usuarioPrestador: prestador?.nome ?? null,
      servico: body.servico,
      diaSelecionado: body.diaSelecionado,
      horarioSolicitado: body.horarioSolicitado,
      observacao: body.observacao,
      endereco: body.endereco,
      status: 'PENDENTE',
    };
    await mutateDb(d => {
      d.solicitacoes.unshift(nova);
    });
    return ok(config, 'Solicitado');
  }

  const matchSolicitacoesPrestador = url.match(/^\/solicitacao\/prestador\/([^/]+)$/);
  if (method === 'GET' && matchSolicitacoesPrestador) {
    const id = matchSolicitacoesPrestador[1];
    const user = db.usuarios.find(u => u.id === id);
    const nome = user?.nome ?? id;
    const lista = db.solicitacoes.filter(s => s.usuarioPrestador === nome);
    return ok(config, lista);
  }

  const matchSolicitacoesCliente = url.match(/^\/solicitacao\/cliente\/([^/]+)$/);
  if (method === 'GET' && matchSolicitacoesCliente) {
    const id = matchSolicitacoesCliente[1];
    const user = db.usuarios.find(u => u.id === id);
    const nome = user?.nome ?? id;
    const lista = db.solicitacoes.filter(s => s.usuarioSolicitante === nome);
    return ok(config, lista);
  }

  const matchSolicitacaoLegada = url.match(/^\/solicitacao\/([^/]+)$/);
  if (method === 'GET' && matchSolicitacaoLegada) {
    // O endpoint legado (`/solicitacao/{usuarioId}`) é usado pelo prestador.
    const id = matchSolicitacaoLegada[1];
    const user = db.usuarios.find(u => u.id === id);
    const nome = user?.nome ?? id;
    const lista = db.solicitacoes.filter(s => s.usuarioPrestador === nome);
    return ok(config, lista);
  }

  const matchTransicao = url.match(/^\/solicitacao\/([^/]+)\/(aceitar|recusar|concluir|cancelar)$/);
  if (method === 'PATCH' && matchTransicao) {
    const [, id, acao] = matchTransicao;
    const proximo: Record<string, StatusSolicitacao> = {
      aceitar: 'ACEITA',
      recusar: 'RECUSADA',
      concluir: 'CONCLUIDA',
      cancelar: 'CANCELADA',
    };
    let updated: ServicoDoUsuarioDTO | null = null;
    await mutateDb(d => {
      const s = d.solicitacoes.find(x => x.id === id);
      if (!s) return;
      s.status = proximo[acao];
      updated = s;
    });
    if (!updated) return fail(config, 404, 'Solicitação não encontrada');
    return ok(config, updated);
  }

  // ------------------- 404 padrão -------------------
  console.warn(`[mock] rota não tratada: ${method} ${url}`);
  return fail(config, 404, `Mock não implementa ${method} ${url}`);
}

export const mockAdapter: AxiosAdapter = async config => {
  // Garante que o objeto headers seja uma instância (axios espera AxiosHeaders).
  if (config.headers && !(config.headers instanceof AxiosHeaders)) {
    config.headers = new AxiosHeaders(config.headers as Record<string, string>);
  }
  const response = await route(config);
  // Pequena latência para sentir o "loading" das telas.
  return delay(response);
};
