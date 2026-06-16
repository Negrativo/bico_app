import storage from './storage';

const USER_KEY = 'USER';
const TOKEN_KEY = 'TOKEN';

export async function saveSession(user: any, token: string) {
  await storage.setItem(USER_KEY, JSON.stringify(user));
  await storage.setItem(TOKEN_KEY, token);
}

export async function getToken(): Promise<string | null> {
  const raw = await storage.getItem(TOKEN_KEY);
  if (!raw) return null;
  // storage.getItem aplica JSON.parse — para o token armazenado como string,
  // pode vir como string com aspas duplas residuais. Normaliza.
  return typeof raw === 'string' ? raw : String(raw);
}

export async function getStoredUser() {
  const user = await storage.getItem(USER_KEY);
  if (!user) return null;
  return typeof user === 'string' ? JSON.parse(user) : user;
}

export async function clearSession() {
  await storage.removeItem(USER_KEY);
  await storage.removeItem(TOKEN_KEY);
}

// ----------------------------------------------------------------------------
// Compatibilidade com chamadas antigas (serão removidas após migração das telas).
// ----------------------------------------------------------------------------

/** @deprecated use saveSession(user, token) */
export async function onSignIn(user: any) {
  await storage.setItem(USER_KEY, JSON.stringify(user));
}

/** @deprecated use clearSession() */
export async function onSignOut() {
  await clearSession();
  return true;
}

/** @deprecated use getStoredUser() */
export async function UserSignedIn() {
  return await getStoredUser();
}
