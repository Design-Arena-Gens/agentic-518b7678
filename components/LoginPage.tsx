'use client';

import { useState } from 'react';
import styles from './LoginPage.module.css';

interface LoginPageProps {
  onLogin: (role: 'admin' | 'user' | 'restaurant' | 'delivery') => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'user' | 'restaurant' | 'delivery'>('admin');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter username and password');
      return;
    }

    // Mock authentication - in production, this would validate against backend
    if (password === 'demo123') {
      onLogin(role);
    } else {
      setError('Invalid credentials. Use password: demo123');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.header}>
          <h1 className={styles.title}>PN'S</h1>
          <p className={styles.subtitle}>Food Delivery Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              placeholder="Enter username"
              aria-label="Username"
              aria-required="true"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Enter password"
              aria-label="Password"
              aria-required="true"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="role" className={styles.label}>
              Login As
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className={styles.select}
              aria-label="User role"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="restaurant">Restaurant Owner</option>
              <option value="delivery">Delivery Partner</option>
            </select>
          </div>

          {error && (
            <div className={styles.error} role="alert" aria-live="polite">
              {error}
            </div>
          )}

          <button type="submit" className={styles.submitButton}>
            Sign In
          </button>

          <div className={styles.hint}>
            <p>Demo credentials: any username with password <strong>demo123</strong></p>
          </div>
        </form>
      </div>
    </div>
  );
}
