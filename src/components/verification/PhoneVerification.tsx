import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { sendPhoneOTP, verifyPhoneOTP } from '../../lib/services/phone';
import { useAuthContext } from '../auth/AuthContext';

interface PhoneVerificationProps {
  phone: string;
  onVerified: () => void;
}

export function PhoneVerification({ phone, onVerified }: PhoneVerificationProps) {
  const { user } = useAuthContext();
  const [otp, setOTP] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOTP = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    try {
      await sendPhoneOTP(user.id, phone);
    } catch (err) {
      setError('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const isValid = await verifyPhoneOTP(user.id, otp);
      if (isValid) {
        onVerified();
      } else {
        setError('Invalid OTP');
      }
    } catch (err) {
      setError('Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Phone Verification</h3>
      <p className="text-sm text-gray-600">
        Please verify your phone number to continue
      </p>
      
      <div className="space-y-4">
        <Button
          onClick={handleSendOTP}
          loading={loading}
          className="w-full"
        >
          Send OTP
        </Button>

        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full px-4 py-2 border rounded-md"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <Button
          onClick={handleVerify}
          disabled={!otp}
          className="w-full"
        >
          Verify Phone
        </Button>
      </div>
    </div>
  );
}