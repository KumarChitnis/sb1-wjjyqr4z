import React, { useState } from 'react';
import { Building, Mail, Link } from 'lucide-react';
import { Button } from '../../ui/Button';

interface Company {
  id: string;
  name: string;
  email: string;
  ssoUrl: string;
}

export function CompanyForm() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    ssoUrl: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCompany = {
      id: crypto.randomUUID(),
      ...formData
    };
    setCompanies([...companies, newCompany]);
    setFormData({ name: '', email: '', ssoUrl: '' });
  };

  const handleRemove = (id: string) => {
    setCompanies(companies.filter(company => company.id !== id));
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Building className="h-5 w-5 text-gray-400" />
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
          <label className="block text-sm font-medium text-gray-700">Company Email</label>
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
          <label className="block text-sm font-medium text-gray-700">SSO URL</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Link className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              required
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={formData.ssoUrl}
              onChange={(e) => setFormData({ ...formData, ssoUrl: e.target.value })}
            />
          </div>
        </div>

        <Button type="submit" className="w-full">
          Add Company
        </Button>
      </form>

      <div className="space-y-4">
        {companies.map(company => (
          <div key={company.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
            <div>
              <h3 className="font-medium">{company.name}</h3>
              <p className="text-sm text-gray-500">{company.email}</p>
              <p className="text-sm text-gray-500">{company.ssoUrl}</p>
            </div>
            <Button variant="danger" onClick={() => handleRemove(company.id)}>
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}