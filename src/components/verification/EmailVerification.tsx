import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { sendVerificationEmail, verifyEmailCode } from '../../lib/services/email';
import { useAuthContext } from '../auth/AuthContext';

interface EmailVerificationProps {
  email: string;
  onVerified: () => void;
}

export function EmailVerification({ email, onVerified }: EmailVerificationProps) {
  const { user } = useAuthContext();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendCode = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    try {
      await sendVerificationEmail(user.id, email);
    } catch (err) {
      setError('Failed to send verification email');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const isValid = await verifyEmailCode(user.id, code);
      if (isValid) {
        onVerified();
      } else {
        setError('Invalid verification code');
      }
    } catch (err) {
      setError('Failed to verify code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Email Verification</h3>
      <p className="text-sm text-gray-600">
        Please verify your email address to continue
      </p>
      
      <div className="space-y-4">
        <Button
          onClick={handleSendCode}
          loading={loading}
          className="w-full"
        >
          Send Verification Code
        </Button>

        <div>
          <input
            type="text"
            placeholder="Enter verification code"
            className="w-full px-4 py-2 border rounded-md"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <Button
          onClick={handleVerify}
          disabled={!code}
          className="w-full"
        >
          Verify Email
        </Button>
      </div>
    </div>
  );
}