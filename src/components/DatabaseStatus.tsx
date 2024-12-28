import React, { useEffect, useState } from 'react';
import { AlertCircle, Database } from 'lucide-react';
import { db } from '../lib/db';

export function DatabaseStatus() {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  useEffect(() => {
    const checkConnection = async () => {
      try {
        await db.connect();
        setStatus('connected');
      } catch (error) {
        console.error('Database connection error:', error);
        setStatus('error');
      }
    };
    
    checkConnection();
  }, []);

  if (status === 'connected') {
    return null;
  }

  const messages = {
    checking: 'Checking database connection...',
    error: 'Unable to connect to MySQL database. Please check your database configuration.'
  };

  return (
    <div className="fixed bottom-4 right-4 max-w-md bg-yellow-50 p-4 rounded-lg shadow-lg border border-yellow-200">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {status === 'checking' ? (
            <Database className="h-5 w-5 text-yellow-600 animate-pulse" />
          ) : (
            <AlertCircle className="h-5 w-5 text-yellow-600" />
          )}
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">Database Status</h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>{messages[status]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}