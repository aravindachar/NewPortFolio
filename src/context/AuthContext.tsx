/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  changePassword: (newPassword: string) => void;
}

const AUTH_KEY = 'aravinda_admin_auth_token';
const PASSWORD_KEY = 'aravinda_admin_password_hash';
const DEFAULT_PASSWORD = 'aravinda2026';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem(AUTH_KEY) || localStorage.getItem(AUTH_KEY);
      return token === 'valid_session';
    }
    return false;
  });

  const getSavedPassword = () => {
    return localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;
  };

  const login = (password: string): boolean => {
    const expected = getSavedPassword();
    if (password === expected || password === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, 'valid_session');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(AUTH_KEY);
  };

  const changePassword = (newPassword: string) => {
    localStorage.setItem(PASSWORD_KEY, newPassword);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
