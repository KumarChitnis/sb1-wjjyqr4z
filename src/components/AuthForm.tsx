import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthFormFields } from './auth/AuthFormFields';
import { Button } from './ui/Button';
import { EmailVerification } from './verification/EmailVerification';
import { PhoneVerification } from './verification/PhoneVerification';
import { useAuthContext } from './auth/AuthContext';
import { signIn, signUp } from '../lib/auth';
import { AuthFormData, AuthMode } from '../types/auth';

export function AuthForm() {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const [mode, setMode] = useState<AuthMode>('signin');
  const [step, setStep] = useState<'form' | 'email' | 'phone'>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    phone: '',
  });

  const handleChange = (field: keyof AuthFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'signup') {
        const user = await signUp(formData.email, formData.password, formData.phone);
        setStep('email');
      } else {
        const user = await signIn(formData.email, formData.password);
        if (!user) {
          throw new Error('Invalid email or password');
        }
        await login(user);
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailVerified = () => {
    setStep('phone');
  };

  const handlePhoneVerified = () => {
    navigate('/dashboard');
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">
        {mode === 'signup' ? 'Create Account' : 'Sign In'}
      </h2>

      {step === 'form' && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <AuthFormFields
            mode={mode}
            formData={formData}
            onChange={handleChange}
          />

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <Button
            type="submit"
            loading={loading}
            className="w-full"
          >
            {mode === 'signup' ? 'Sign Up' : 'Sign In'}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'signup' ? 'signin' : 'signup');
                setError(null);
              }}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              {mode === 'signup' ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </form>
      )}

      {step === 'email' && (
        <EmailVerification
          email={formData.email}
          onVerified={handleEmailVerified}
        />
      )}

      {step === 'phone' && (
        <PhoneVerification
          phone={formData.phone}
          onVerified={handlePhoneVerified}
        />
      )}
    </div>
  );
}