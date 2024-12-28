import React from 'react';
import { Mail, Phone, KeyRound } from 'lucide-react';
import { AuthFormData, AuthMode } from '../../types/auth';

interface AuthFormFieldsProps {
  mode: AuthMode;
  formData: AuthFormData;
  onChange: (field: keyof AuthFormData, value: string) => void;
}

export function AuthFormFields({ mode, formData, onChange }: AuthFormFieldsProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <div className="mt-1 relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="email"
            required
            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.email}
            onChange={(e) => onChange('email', e.target.value)}
          />
        </div>
      </div>

      {mode === 'signup' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <div className="mt-1 relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="tel"
              required
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={formData.phone}
              onChange={(e) => onChange('phone', e.target.value)}
            />
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <div className="mt-1 relative">
          <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="password"
            required
            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.password}
            onChange={(e) => onChange('password', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}