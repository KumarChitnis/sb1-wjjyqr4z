import { createClient } from '@libsql/client';
import type { DbClient, User } from './types';
import { generateId } from '../../utils/id';

export class SQLiteClient implements DbClient {
  private client;

  constructor() {
    this.client = createClient({
      url: 'file:local.db',
    });
  }

  async connect(): Promise<void> {
    await this.initializeDatabase();
  }

  async disconnect(): Promise<void> {
    // SQLite doesn't require explicit disconnection
  }

  private async initializeDatabase(): Promise<void> {
    await this.client.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        phone TEXT,
        email_verified INTEGER DEFAULT 0,
        phone_verified INTEGER DEFAULT 0,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `);
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const now = new Date().toISOString();
    const id = generateId();

    await this.client.execute({
      sql: `
        INSERT INTO users (id, email, password, phone, email_verified, phone_verified, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        id,
        userData.email,
        userData.password,
        userData.phone || null,
        userData.emailVerified ? 1 : 0,
        userData.phoneVerified ? 1 : 0,
        now,
        now
      ]
    });

    return {
      id,
      ...userData,
      createdAt: now,
      updatedAt: now
    };
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const result = await this.client.execute({
      sql: 'SELECT * FROM users WHERE email = ?',
      args: [email]
    });

    if (!result.rows.length) {
      return null;
    }

    const row = result.rows[0];
    return {
      id: row.id as string,
      email: row.email as string,
      password: row.password as string,
      phone: row.phone as string,
      emailVerified: Boolean(row.email_verified),
      phoneVerified: Boolean(row.phone_verified),
      createdAt: row.created_at as string,
      updatedAt: row.updated_at as string
    };
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const updates: string[] = [];
    const values: any[] = [];

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    });

    values.push(id);

    await this.client.execute({
      sql: `
        UPDATE users 
        SET ${updates.join(', ')}, updated_at = datetime('now')
        WHERE id = ?
      `,
      args: values
    });

    const updated = await this.client.execute({
      sql: 'SELECT * FROM users WHERE id = ?',
      args: [id]
    });

    const row = updated.rows[0];
    return {
      id: row.id as string,
      email: row.email as string,
      password: row.password as string,
      phone: row.phone as string,
      emailVerified: Boolean(row.email_verified),
      phoneVerified: Boolean(row.phone_verified),
      createdAt: row.created_at as string,
      updatedAt: row.updated_at as string
    };
  }
}