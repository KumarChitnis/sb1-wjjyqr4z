import React from 'react';
import { ApplicationForm } from './applications/ApplicationForm';

export function ApplicationManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Application Management</h2>
        <p className="mt-1 text-gray-600">
          Manage websites and online applications
        </p>
      </div>
      <ApplicationForm />
    </div>
  );
}