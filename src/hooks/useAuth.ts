import { useState, useEffect, useCallback } from 'react';
import type { User } from '../lib/db/types';
import { getStoredUser, saveUser, clearStoredUser } from '../lib/auth/storage';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getStoredUser());
    setLoading(false);
  }, []);

  const login = useCallback(async (userData: User) => {
    saveUser(userData);
    setUser(userData);
  }, []);

  const logout = useCallback(async () => {
    clearStoredUser();
    setUser(null);
  }, []);

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };
}