import { createVerificationCode, verifyCode } from './verification';

export async function sendVerificationEmail(userId: string, email: string): Promise<string> {
  const code = await createVerificationCode(userId, 'email');
  
  // In production, integrate with a real email service
  console.log(`Verification email sent to ${email} with code: ${code}`);
  
  return code;
}

export async function verifyEmailCode(userId: string, code: string): Promise<boolean> {
  return verifyCode(userId, code, 'email');
}