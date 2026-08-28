import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { apiService } from '../services/api';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  login: (token: string, userProfile: UserProfile) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('zenemoo_auth_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await apiService.verifySession(token);
        if (response.success && response.data) {
          setUser(response.data);
        } else {
          // If token invalid, clear
          localStorage.removeItem('zenemoo_auth_token');
          setToken(null);
          setUser(null);
        }
      } catch {
        // Safe fallback
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [token]);

  const login = (authToken: string, userProfile: UserProfile) => {
    localStorage.setItem('zenemoo_auth_token', authToken);
    setToken(authToken);
    setUser(userProfile);
  };

  const logout = () => {
    localStorage.removeItem('zenemoo_auth_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
