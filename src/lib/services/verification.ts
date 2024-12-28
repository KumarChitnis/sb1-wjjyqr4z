import { generateVerificationCode } from '../utils/verification';
import { db } from '../db';

export async function createVerificationCode(
  userId: string,
  type: 'email' | 'phone'
): Promise<string> {
  const code = generateVerificationCode();
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 10);

  await db.createVerificationCode(userId, code, type, expiresAt);
  return code;
}

export async function verifyCode(
  userId: string,
  code: string,
  type: 'email' | 'phone'
): Promise<boolean> {
  const verificationCode = await db.getVerificationCode(userId, code, type);
  
  if (!verificationCode) {
    return false;
  }

  await db.deleteVerificationCode(verificationCode.id);
  return true;
}