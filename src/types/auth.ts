export interface AuthFormData {
  email: string;
  password: string;
  phone: string;
}

export type AuthMode = 'signup' | 'signin';