import React from 'react';
import { Shield, UserCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { useAuthContext } from './auth/AuthContext';

export function UserProfile() {
  const { user, loading, logout } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center space-x-4 mb-6">
        <UserCircle className="h-12 w-12 text-blue-600" />
        <div>
          <h2 className="text-xl font-semibold">{user.email}</h2>
          <p className="text-gray-500">User Profile</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-green-500" />
          <span className="text-sm text-gray-600">
            Email verified: {user.emailVerified ? 'Yes' : 'No'}
          </span>
        </div>

        <Button
          variant="danger"
          onClick={logout}
          className="w-full"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}