import { useState, useCallback } from 'react';

const STORAGE_KEY = 'nexus_usuario';

function getStored() {
  try {
    const d = localStorage.getItem(STORAGE_KEY);
    return d ? JSON.parse(d) : null;
  } catch { return null; }
}

export function useAuth() {
  const [usuario, setUsuario] = useState(() => getStored());

  const login = useCallback((dados) => {
    const u = { ...dados, logado: true };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    setUsuario(u);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUsuario(null);
  }, []);

  return { usuario, login, logout, estaLogado: !!usuario?.logado };
}
