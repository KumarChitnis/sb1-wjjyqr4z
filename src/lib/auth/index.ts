import { db } from '../db';
import { hashPassword, verifyPassword } from '../utils/crypto';
import type { User } from '../db/types';

export async function signUp(email: string, password: string, phone?: string): Promise<User> {
  const existingUser = await db.getUserByEmail(email);
  if (existingUser) {
    throw new Error('Email already registered');
  }

  const hashedPassword = await hashPassword(password);
  
  return db.createUser({
    email,
    password: hashedPassword,
    phone,
    emailVerified: false,
    phoneVerified: false
  });
}

export async function signIn(email: string, password: string): Promise<User | null> {
  const user = await db.getUserByEmail(email);
  if (!user) return null;

  const isValid = await verifyPassword(password, user.password);
  return isValid ? user : null;
}

export async function verifyEmail(userId: string): Promise<void> {
  await db.updateUser(userId, { emailVerified: true });
}

export async function verifyPhone(userId: string): Promise<void> {
  await db.updateUser(userId, { phoneVerified: true });
}