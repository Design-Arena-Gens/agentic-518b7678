'use client';

import { useState } from 'react';
import LoginPage from '@/components/LoginPage';
import AdminDashboard from '@/components/AdminDashboard';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'user' | 'restaurant' | 'delivery'>('admin');

  const handleLogin = (role: 'admin' | 'user' | 'restaurant' | 'delivery') => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('admin');
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <AdminDashboard userRole={userRole} onLogout={handleLogout} />;
}
