import { createContext, useContext, useMemo, useState } from 'react';
import * as authService from '../services/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(authService.getCurrentUser);

  const value = useMemo(() => ({
    user,
    login: (payload) => setUser(authService.login(payload)),
    register: (payload) => setUser(authService.register(payload)),
    logout: () => { authService.logout(); setUser(null); },
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
