export function generateVerificationCode(): string {
  return Math.random().toString().slice(2, 8);
}

export function generateOTP(): string {
  return Math.random().toString().slice(2, 8);
}