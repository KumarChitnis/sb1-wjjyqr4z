import type { User } from '../db/types';

const AUTH_KEY = 'auth_user';

export function saveUser(user: User): void {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

export function getStoredUser(): User | null {
  const data = localStorage.getItem(AUTH_KEY);
  return data ? JSON.parse(data) : null;
}

export function clearStoredUser(): void {
  localStorage.removeItem(AUTH_KEY);
}