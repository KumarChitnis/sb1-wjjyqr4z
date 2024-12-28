import { openDB } from 'idb';
import type { DbClient, User } from './types';
import { dbConfig } from '../config/database';

const { name: DB_NAME, version: DB_VERSION } = dbConfig;

export class IndexedDBClient implements DbClient {
  async connect(): Promise<void> {
    await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Create users store
        if (!db.objectStoreNames.contains('users')) {
          db.createObjectStore('users', { keyPath: 'id' });
        }
      }
    });
  }

  async disconnect(): Promise<void> {
    // IndexedDB doesn't require explicit disconnection
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const db = await openDB(DB_NAME, DB_VERSION);
    try {
      const now = new Date().toISOString();
      const user: User = {
        id: crypto.randomUUID(),
        ...userData,
        createdAt: now,
        updatedAt: now
      };
      
      await db.add('users', user);
      return user;
    } finally {
      db.close();
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const db = await openDB(DB_NAME, DB_VERSION);
    try {
      const users = await db.getAll('users');
      return users.find(user => user.email === email) || null;
    } finally {
      db.close();
    }
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const db = await openDB(DB_NAME, DB_VERSION);
    try {
      const tx = db.transaction('users', 'readwrite');
      const store = tx.objectStore('users');
      
      const existingUser = await store.get(id);
      if (!existingUser) {
        throw new Error('User not found');
      }

      const updatedUser = {
        ...existingUser,
        ...data,
        updatedAt: new Date().toISOString()
      };

      await store.put(updatedUser);
      await tx.done;
      
      return updatedUser;
    } finally {
      db.close();
    }
  }

  async getAllUsers(): Promise<User[]> {
    const db = await openDB(DB_NAME, DB_VERSION);
    try {
      return await db.getAll('users');
    } finally {
      db.close();
    }
  }
}