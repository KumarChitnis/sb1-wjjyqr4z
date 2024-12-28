import React from 'react';

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  active: boolean;
  onClick: () => void;
}

export function DashboardCard({ 
  icon, 
  title, 
  description, 
  active,
  onClick 
}: DashboardCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-6 rounded-lg transition-all
        ${active 
          ? 'bg-blue-50 border-2 border-blue-500 shadow-md' 
          : 'bg-white border border-gray-200 shadow hover:shadow-md hover:border-blue-300'
        }`}
    >
      <div className="flex items-center space-x-4">
        <div className={`text-blue-600 ${active ? 'scale-110' : ''}`}>
          {icon}
        </div>
        <div>
          <h3 className={`text-lg font-medium ${active ? 'text-blue-700' : 'text-gray-900'}`}>
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}