import React, { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { Settings, Users, Key, Globe } from 'lucide-react';
import { SSOConfiguration } from './SSOConfiguration';
import { UserManagement } from './UserManagement';
import { AccessControl } from './AccessControl';
import { ApplicationManagement } from './ApplicationManagement';
import { Button } from '../ui/Button';
import { useAuthContext } from '../auth/AuthContext';
import { DashboardCard } from './DashboardCard';

export function SSOAdminDashboard() {
  const [activeTab, setActiveTab] = useState<'sso' | 'users' | 'access' | 'apps'>('sso');
  const navigate = useNavigate();
  const { logout } = useAuthContext();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleTabChange = (tab: 'sso' | 'users' | 'access' | 'apps') => {
    setActiveTab(tab);
    navigate(`/dashboard/${tab}`);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SSO Global Admin</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage SSO settings and user access across your organization
          </p>
        </div>
        <Button variant="danger" onClick={handleLogout}>
          Sign Out
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-4 mb-8">
        <DashboardCard
          icon={<Settings className="h-6 w-6" />}
          title="SSO Configuration"
          description="Configure SSO providers and settings"
          active={activeTab === 'sso'}
          onClick={() => handleTabChange('sso')}
        />
        <DashboardCard
          icon={<Users className="h-6 w-6" />}
          title="User Management"
          description="Manage user access and permissions"
          active={activeTab === 'users'}
          onClick={() => handleTabChange('users')}
        />
        <DashboardCard
          icon={<Key className="h-6 w-6" />}
          title="Access Control"
          description="Configure access policies and rules"
          active={activeTab === 'access'}
          onClick={() => handleTabChange('access')}
        />
        <DashboardCard
          icon={<Globe className="h-6 w-6" />}
          title="Applications"
          description="Manage websites and applications"
          active={activeTab === 'apps'}
          onClick={() => handleTabChange('apps')}
        />
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <Routes>
          <Route path="/" element={<SSOConfiguration />} />
          <Route path="/sso" element={<SSOConfiguration />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/access" element={<AccessControl />} />
          <Route path="/apps" element={<ApplicationManagement />} />
        </Routes>
      </div>
    </div>
  );
}