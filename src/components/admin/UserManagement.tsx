import React from 'react';
import { UserManagementForm } from './users/UserManagementForm';

export function UserManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">User Management</h2>
        <p className="mt-1 text-gray-600">
          Manage users and their roles
        </p>
      </div>
      <UserManagementForm />
    </div>
  );
}