import React, { useState, useContext, createContext, useEffect, useCallback } from 'react';
import { UsuarioDTO } from '../dtos/UsuarioDTO';
import { login } from '../service/loginService/LoginService';
import { saveSession, clearSession, getStoredUser, getToken } from '../service/auth';
import { setOnUnauthorized } from '../service/api';

interface UserContextData {
  user: UsuarioDTO | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<UsuarioDTO | null>>;
  LoginUser: (email: string, password: string) => Promise<UsuarioDTO | null>;
  LogoutUser: () => Promise<void>;
}

const UserContext = createContext<UserContextData>({
  user: null,
  loading: true,
  setUser: () => { },
  LoginUser: async () => null,
  LogoutUser: async () => { },
});

interface UserProviderProps {
  children?: React.ReactNode;
}

export const useUser = (): UserContextData => useContext(UserContext);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UsuarioDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Restaura a sessão persistida apenas uma vez na montagem.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const storedUser = await getStoredUser();
        const token = await getToken();
        if (!cancelled && storedUser && token) {
          setUser(storedUser);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Limpa estado quando o axios receber 401.
  useEffect(() => {
    setOnUnauthorized(() => setUser(null));
    return () => setOnUnauthorized(null);
  }, []);

  const LoginUser = useCallback(async (email: string, senha: string) => {
    const response = await login(email, senha);
    if (!response) return null;
    await saveSession(response.usuario, response.token);
    setUser(response.usuario);
    return response.usuario;
  }, []);

  const LogoutUser = useCallback(async () => {
    await clearSession();
    setUser(null);
  }, []);

  const value = { user, loading, setUser, LoginUser, LogoutUser };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};