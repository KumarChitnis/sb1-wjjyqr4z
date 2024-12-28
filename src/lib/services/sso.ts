import { db } from '../db';
import type { SSOProvider, UserSSOConnection } from '../db/types';

export async function configureSSOProvider(
  providerName: string,
  clientId: string,
  clientSecret: string
): Promise<SSOProvider> {
  return db.createSSOProvider({
    providerName,
    clientId,
    clientSecret
  });
}

export async function listSSOProviders(): Promise<SSOProvider[]> {
  return db.getSSOProviders();
}

export async function updateSSOProvider(
  id: string,
  updates: Partial<Omit<SSOProvider, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<SSOProvider> {
  return db.updateSSOProvider(id, updates);
}

export async function connectUserToSSO(
  userId: string,
  providerId: string,
  providerUserId: string
): Promise<UserSSOConnection> {
  return db.createUserSSOConnection({
    userId,
    providerId,
    providerUserId
  });
}

export async function getUserSSOConnections(userId: string): Promise<UserSSOConnection[]> {
  return db.getUserSSOConnections(userId);
}