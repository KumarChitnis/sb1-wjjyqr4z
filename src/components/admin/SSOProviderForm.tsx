import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { configureSSOProvider } from '../../lib/services/sso';

export function SSOProviderForm() {
  const [formData, setFormData] = useState({
    providerName: '',
    clientId: '',
    clientSecret: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await configureSSOProvider(
        formData.providerName,
        formData.clientId,
        formData.clientSecret
      );
      setFormData({ providerName: '', clientId: '', clientSecret: '' });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Provider Name
        </label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.providerName}
          onChange={(e) => setFormData(prev => ({ ...prev, providerName: e.target.value }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Client ID
        </label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.clientId}
          onChange={(e) => setFormData(prev => ({ ...prev, clientId: e.target.value }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Client Secret
        </label>
        <input
          type="password"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.clientSecret}
          onChange={(e) => setFormData(prev => ({ ...prev, clientSecret: e.target.value }))}
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <Button
        type="submit"
        loading={loading}
        className="w-full"
      >
        Add SSO Provider
      </Button>
    </form>
  );
}