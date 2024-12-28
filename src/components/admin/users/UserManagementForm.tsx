import React, { useState } from 'react';
import { User, Shield, Mail } from 'lucide-react';
import { Button } from '../../ui/Button';

type UserRole = 'super_admin' | 'admin' | 'viewer';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export function UserManagementForm() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'viewer' as UserRole
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = {
      id: crypto.randomUUID(),
      ...formData
    };
    setUsers([...users, newUser]);
    setFormData({ name: '', email: '', role: 'viewer' });
  };

  const handleRemove = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'super_admin':
        return 'bg-purple-100 text-purple-800';
      case 'admin':
        return 'bg-blue-100 text-blue-800';
      case 'viewer':
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              required
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              required
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>
        </div>

        <Button type="submit" className="w-full">
          Add User
        </Button>
      </form>

      <div className="space-y-4">
        {users.map(user => (
          <div key={user.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
            <div>
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                {user.role.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <Button variant="danger" onClick={() => handleRemove(user.id)}>
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}