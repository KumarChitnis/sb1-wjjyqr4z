import React from 'react';
import { AccessControlForm } from './access/AccessControlForm';

export function AccessControl() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Access Control</h2>
        <p className="mt-1 text-gray-600">
          Configure access roles and permissions
        </p>
      </div>
      <AccessControlForm />
    </div>
  );
}