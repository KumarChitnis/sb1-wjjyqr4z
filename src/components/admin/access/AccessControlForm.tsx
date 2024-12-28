import React, { useState } from 'react';
import { Shield, Terminal, Globe } from 'lucide-react';
import { Button } from '../../ui/Button';

type AccessRole = 'developer' | 'global_admin' | 'super_admin';

interface AccessControl {
  id: string;
  role: AccessRole;
  description: string;
  enabled: boolean;
}

export function AccessControlForm() {
  const [accessControls, setAccessControls] = useState<AccessControl[]>([]);
  const [selectedRole, setSelectedRole] = useState<AccessRole>('developer');

  const roleDetails: Record<AccessRole, { icon: React.ReactNode; description: string }> = {
    developer: {
      icon: <Terminal className="h-5 w-5" />,
      description: 'Access to development tools and APIs'
    },
    global_admin: {
      icon: <Globe className="h-5 w-5" />,
      description: 'Full system access across all organizations'
    },
    super_admin: {
      icon: <Shield className="h-5 w-5" />,
      description: 'Highest level of access with system configuration capabilities'
    }
  };

  const handleAdd = () => {
    const newControl = {
      id: crypto.randomUUID(),
      role: selectedRole,
      description: roleDetails[selectedRole].description,
      enabled: true
    };
    setAccessControls([...accessControls, newControl]);
  };

  const handleRemove = (id: string) => {
    setAccessControls(accessControls.filter(control => control.id !== id));
  };

  const handleToggle = (id: string) => {
    setAccessControls(accessControls.map(control =>
      control.id === id ? { ...control, enabled: !control.enabled } : control
    ));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Access Role</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as AccessRole)}
          >
            <option value="developer">Developer Mode</option>
            <option value="global_admin">Global Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>
        </div>

        <Button onClick={handleAdd} className="w-full">
          Add Access Control
        </Button>
      </div>

      <div className="space-y-4">
        {accessControls.map(control => (
          <div key={control.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
            <div className="flex items-center space-x-4">
              <div className={`${control.enabled ? 'text-blue-500' : 'text-gray-400'}`}>
                {roleDetails[control.role].icon}
              </div>
              <div>
                <h3 className="font-medium">{control.role.replace('_', ' ').toUpperCase()}</h3>
                <p className="text-sm text-gray-500">{control.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={control.enabled ? 'primary' : 'secondary'}
                onClick={() => handleToggle(control.id)}
              >
                {control.enabled ? 'Enabled' : 'Disabled'}
              </Button>
              <Button variant="danger" onClick={() => handleRemove(control.id)}>
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}