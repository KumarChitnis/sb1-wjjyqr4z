import React, { useEffect, useState } from 'react';
import { listSSOProviders } from '../../lib/services/sso';
import type { SSOProvider } from '../../lib/db/types';
import { Shield } from 'lucide-react';

export function SSOProviderList() {
  const [providers, setProviders] = useState<SSOProvider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listSSOProviders()
      .then(setProviders)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading providers...</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Configured SSO Providers</h3>
      
      {providers.length === 0 ? (
        <p className="text-gray-500">No SSO providers configured yet.</p>
      ) : (
        <div className="space-y-2">
          {providers.map(provider => (
            <div
              key={provider.id}
              className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow"
            >
              <Shield className="h-5 w-5 text-blue-500" />
              <div>
                <h4 className="font-medium">{provider.providerName}</h4>
                <p className="text-sm text-gray-500">Client ID: {provider.clientId}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}