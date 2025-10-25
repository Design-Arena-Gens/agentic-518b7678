'use client';

import { useState } from 'react';
import styles from './AdminDashboard.module.css';
import Sidebar from './Sidebar';
import DashboardHome from './DashboardHome';
import UsersManagement from './UsersManagement';
import RestaurantsManagement from './RestaurantsManagement';
import DeliveryPartnersManagement from './DeliveryPartnersManagement';
import WalletManagement from './WalletManagement';
import OrdersManagement from './OrdersManagement';
import PublicChat from './PublicChat';
import SettingsPanel from './SettingsPanel';
import { UserRole } from '@/lib/data';

interface AdminDashboardProps {
  userRole: UserRole;
  onLogout: () => void;
}

export type ViewType = 'dashboard' | 'users' | 'restaurants' | 'delivery' | 'wallet' | 'orders' | 'chat' | 'settings';

export default function AdminDashboard({ userRole, onLogout }: AdminDashboardProps) {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');

  return (
    <div className={styles.container}>
      <Sidebar
        userRole={userRole}
        activeView={activeView}
        onViewChange={setActiveView}
        onLogout={onLogout}
      />

      <main className={styles.main}>
        {activeView === 'dashboard' && <DashboardHome userRole={userRole} />}
        {activeView === 'users' && <UsersManagement userRole={userRole} />}
        {activeView === 'restaurants' && <RestaurantsManagement userRole={userRole} />}
        {activeView === 'delivery' && <DeliveryPartnersManagement userRole={userRole} />}
        {activeView === 'wallet' && <WalletManagement userRole={userRole} />}
        {activeView === 'orders' && <OrdersManagement userRole={userRole} />}
        {activeView === 'chat' && <PublicChat userRole={userRole} />}
        {activeView === 'settings' && <SettingsPanel userRole={userRole} />}
      </main>
    </div>
  );
}
