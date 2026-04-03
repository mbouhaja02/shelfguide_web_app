'use client';

import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { User, UserRole } from '@/types';
import { mockUsers } from '@/data/mock-data';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(mockUsers[0]); // Default to chef_rayon

  const login = useCallback(async (_email: string, _password: string): Promise<boolean> => {
    // Mock login — always succeeds. Replace with Supabase auth later.
    const found = mockUsers.find(u => u.email === _email) || mockUsers[0];
    setUser(found);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const switchRole = useCallback((role: UserRole) => {
    const userForRole = mockUsers.find(u => u.role === role);
    if (userForRole) setUser(userForRole);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
