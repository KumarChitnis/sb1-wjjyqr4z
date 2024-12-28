import React, { useEffect, useState } from 'react';
import { AlertCircle, Database } from 'lucide-react';
import { checkSupabaseConnection, hasSupabaseConfig } from '../utils/supabase-helpers';

export function SupabaseStatus() {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  useEffect(() => {
    if (!hasSupabaseConfig()) {
      setConnectionStatus('error');
      return;
    }

    const checkConnection = async () => {
      const isConnected = await checkSupabaseConnection();
      setConnectionStatus(isConnected ? 'connected' : 'error');
    };
    
    checkConnection();
  }, []);

  if (connectionStatus === 'connected') {
    return null;
  }

  const messages = {
    checking: 'Checking Supabase connection...',
    error: 'Please click the "Connect to Supabase" button in the top right corner to set up your database connection.'
  };

  return (
    <div className="fixed bottom-4 right-4 max-w-md bg-yellow-50 p-4 rounded-lg shadow-lg border border-yellow-200">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {connectionStatus === 'checking' ? (
            <Database className="h-5 w-5 text-yellow-600 animate-pulse" />
          ) : (
            <AlertCircle className="h-5 w-5 text-yellow-600" />
          )}
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">Database Connection Required</h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>{messages[connectionStatus]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}