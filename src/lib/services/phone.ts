import { createVerificationCode, verifyCode } from './verification';

export async function sendPhoneOTP(userId: string, phone: string): Promise<string> {
  const code = await createVerificationCode(userId, 'phone');
  
  // In production, integrate with a real SMS service
  console.log(`OTP sent to ${phone} with code: ${code}`);
  
  return code;
}

export async function verifyPhoneOTP(userId: string, code: string): Promise<boolean> {
  return verifyCode(userId, code, 'phone');
}