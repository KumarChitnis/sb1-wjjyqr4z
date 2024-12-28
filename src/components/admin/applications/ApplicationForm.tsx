import React, { useState } from 'react';
import { Globe, Link as LinkIcon, Server } from 'lucide-react';
import { Button } from '../../ui/Button';

type AppType = 'website' | 'web_app';

interface Application {
  id: string;
  name: string;
  url: string;
  type: AppType;
}

export function ApplicationForm() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    type: 'website' as AppType
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newApp = {
      id: crypto.randomUUID(),
      ...formData
    };
    setApplications([...applications, newApp]);
    setFormData({ name: '', url: '', type: 'website' });
  };

  const handleRemove = (id: string) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  const getAppIcon = (type: AppType) => {
    switch (type) {
      case 'website':
        return <Globe className="h-5 w-5" />;
      case 'web_app':
        return <Server className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700">Application Name</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              {formData.type === 'website' ? <Globe className="h-5 w-5 text-gray-400" /> : <Server className="h-5 w-5 text-gray-400" />}
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
          <label className="block text-sm font-medium text-gray-700">URL</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <LinkIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              required
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as AppType })}
          >
            <option value="website">Website</option>
            <option value="web_app">Web Application</option>
          </select>
        </div>

        <Button type="submit" className="w-full">
          Add Application
        </Button>
      </form>

      <div className="space-y-4">
        {applications.map(app => (
          <div key={app.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
            <div className="flex items-center space-x-4">
              <div className="text-blue-500">
                {getAppIcon(app.type)}
              </div>
              <div>
                <h3 className="font-medium">{app.name}</h3>
                <p className="text-sm text-gray-500">{app.url}</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {app.type === 'website' ? 'Website' : 'Web Application'}
                </span>
              </div>
            </div>
            <Button variant="danger" onClick={() => handleRemove(app.id)}>
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}