'use client';

import { useState } from 'react';
import styles from './UsersManagement.module.css';
import { UserRole, users as initialUsers } from '@/lib/data';
import { Search, Filter, MoreVertical, Wallet, Ban, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

interface UsersManagementProps {
  userRole: UserRole;
}

export default function UsersManagement({ userRole }: UsersManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'suspended'>('all');
  const [users] = useState(initialUsers);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.phone.includes(searchQuery);
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (userRole !== 'admin') {
    return (
      <div className={styles.container}>
        <div className={styles.accessDenied}>
          <Ban size={48} color="var(--error)" />
          <h2>Access Denied</h2>
          <p>You don't have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>User Management</h1>
          <p className={styles.subtitle}>Manage all registered users</p>
        </div>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={20} color="var(--gray-400)" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search users by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
            aria-label="Search users"
          />
        </div>

        <div className={styles.filters}>
          <Filter size={20} color="var(--gray-600)" aria-hidden="true" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className={styles.filterSelect}
            aria-label="Filter by status"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table} role="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Contact</th>
              <th>Role</th>
              <th>Wallet Balance</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className={styles.userCell}>
                    <div className={styles.avatar}>
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className={styles.username}>{user.username}</div>
                      <div className={styles.email}>{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>{user.phone}</td>
                <td>
                  <span className={styles.roleBadge}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <div className={styles.walletCell}>
                    <Wallet size={16} color="var(--primary)" aria-hidden="true" />
                    ₹{user.walletBalance}
                  </div>
                </td>
                <td>
                  <span className={`${styles.statusBadge} ${styles[user.status]}`}>
                    {user.status === 'active' && <CheckCircle size={14} aria-hidden="true" />}
                    {user.status === 'suspended' && <Ban size={14} aria-hidden="true" />}
                    {user.status}
                  </span>
                </td>
                <td>{format(user.createdAt, 'MMM dd, yyyy')}</td>
                <td>
                  <button className={styles.actionButton} aria-label="More actions">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className={styles.emptyState}>
            <p>No users found matching your criteria</p>
          </div>
        )}
      </div>

      <div className={styles.pagination}>
        <p className={styles.resultsCount}>
          Showing {filteredUsers.length} of {users.length} users
        </p>
      </div>
    </div>
  );
}
