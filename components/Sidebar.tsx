'use client';

import styles from './Sidebar.module.css';
import { ViewType } from './AdminDashboard';
import { UserRole } from '@/lib/data';
import {
  LayoutDashboard,
  Users,
  Store,
  Truck,
  Wallet,
  ShoppingCart,
  MessageSquare,
  Settings,
  LogOut,
} from 'lucide-react';

interface SidebarProps {
  userRole: UserRole;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  onLogout: () => void;
}

export default function Sidebar({ userRole, activeView, onViewChange, onLogout }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard' as ViewType, label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'user', 'restaurant', 'delivery'] },
    { id: 'users' as ViewType, label: 'Users', icon: Users, roles: ['admin'] },
    { id: 'restaurants' as ViewType, label: 'Restaurants', icon: Store, roles: ['admin', 'restaurant'] },
    { id: 'delivery' as ViewType, label: 'Delivery Partners', icon: Truck, roles: ['admin', 'delivery'] },
    { id: 'wallet' as ViewType, label: 'Wallet', icon: Wallet, roles: ['admin', 'user'] },
    { id: 'orders' as ViewType, label: 'Orders', icon: ShoppingCart, roles: ['admin', 'user', 'restaurant', 'delivery'] },
    { id: 'chat' as ViewType, label: 'Public Chat', icon: MessageSquare, roles: ['admin', 'user'] },
    { id: 'settings' as ViewType, label: 'Settings', icon: Settings, roles: ['admin'] },
  ];

  const visibleMenuItems = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h1 className={styles.logo}>PN'S</h1>
        <p className={styles.roleTag}>{userRole.charAt(0).toUpperCase() + userRole.slice(1)}</p>
      </div>

      <nav className={styles.nav} role="navigation" aria-label="Main navigation">
        <ul className={styles.menuList}>
          {visibleMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`${styles.menuItem} ${activeView === item.id ? styles.active : ''}`}
                  aria-current={activeView === item.id ? 'page' : undefined}
                >
                  <Icon className={styles.icon} size={20} aria-hidden="true" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={styles.footer}>
        <button onClick={onLogout} className={styles.logoutButton} aria-label="Sign out">
          <LogOut className={styles.icon} size={20} aria-hidden="true" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
