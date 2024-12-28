import React from 'react';
import { CompanyForm } from './sso/CompanyForm';

export function SSOConfiguration() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">SSO Configuration</h2>
        <p className="mt-1 text-gray-600">
          Configure company details and SSO settings
        </p>
      </div>
      <CompanyForm />
    </div>
  );
}