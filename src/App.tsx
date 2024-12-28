import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthForm } from './components/AuthForm';
import { SSOAdminDashboard } from './components/admin/SSOAdminDashboard';
import { DatabaseStatus } from './components/DatabaseStatus';
import { AuthProvider } from './components/auth/AuthContext';
import { Lock } from 'lucide-react';
import { useAuthContext } from './components/auth/AuthContext';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
}

function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2">
          <Lock className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">SSO Web Tool</h1>
        </div>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<AuthForm />} />
              <Route 
                path="/dashboard/*" 
                element={
                  <PrivateRoute>
                    <SSOAdminDashboard />
                  </PrivateRoute>
                } 
              />
            </Routes>
          </main>
          <DatabaseStatus />
        </div>
      </AuthProvider>
    </Router>
  );
}