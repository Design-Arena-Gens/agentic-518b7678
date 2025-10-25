'use client';

import styles from './DashboardHome.module.css';
import { UserRole, users, restaurants, deliveryPartners, orders, appSettings } from '@/lib/data';
import { Users, Store, Truck, ShoppingCart, TrendingUp, Clock } from 'lucide-react';

interface DashboardHomeProps {
  userRole: UserRole;
}

export default function DashboardHome({ userRole }: DashboardHomeProps) {
  const stats = [
    {
      label: 'Total Users',
      value: users.length,
      icon: Users,
      color: 'var(--primary)',
      trend: '+12%',
    },
    {
      label: 'Restaurants',
      value: restaurants.length,
      icon: Store,
      color: 'var(--secondary)',
      trend: '+3%',
    },
    {
      label: 'Delivery Partners',
      value: deliveryPartners.length,
      icon: Truck,
      color: 'var(--info)',
      trend: '+8%',
    },
    {
      label: 'Total Orders',
      value: orders.length,
      icon: ShoppingCart,
      color: 'var(--success)',
      trend: '+25%',
    },
  ];

  const activeRestaurants = restaurants.filter(r => r.isActive).length;
  const availablePartners = deliveryPartners.filter(d => d.isAvailable).length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Dashboard</h1>
          <p className={styles.subtitle}>Welcome to PN'S Admin Panel</p>
        </div>
      </div>

      {userRole === 'admin' && (
        <>
          <div className={styles.modesCard}>
            <h2>Service Modes</h2>
            <div className={styles.modesGrid}>
              <div className={`${styles.modeToggle} ${appSettings.foodModeEnabled ? styles.enabled : ''}`}>
                <div className={styles.modeInfo}>
                  <span className={styles.modeLabel}>Food Delivery</span>
                  <span className={styles.modeStatus}>
                    {appSettings.foodModeEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div className={`${styles.toggle} ${appSettings.foodModeEnabled ? styles.on : ''}`}
                     role="switch"
                     aria-checked={appSettings.foodModeEnabled}
                     aria-label="Food delivery mode">
                  <div className={styles.toggleKnob}></div>
                </div>
              </div>

              <div className={`${styles.modeToggle} ${appSettings.groceryModeEnabled ? styles.enabled : ''}`}>
                <div className={styles.modeInfo}>
                  <span className={styles.modeLabel}>Grocery Delivery</span>
                  <span className={styles.modeStatus}>
                    {appSettings.groceryModeEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div className={`${styles.toggle} ${appSettings.groceryModeEnabled ? styles.on : ''}`}
                     role="switch"
                     aria-checked={appSettings.groceryModeEnabled}
                     aria-label="Grocery delivery mode">
                  <div className={styles.toggleKnob}></div>
                </div>
              </div>

              <div className={`${styles.modeToggle} ${appSettings.deliveryModeEnabled ? styles.enabled : ''}`}>
                <div className={styles.modeInfo}>
                  <span className={styles.modeLabel}>Delivery Only</span>
                  <span className={styles.modeStatus}>
                    {appSettings.deliveryModeEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div className={`${styles.toggle} ${appSettings.deliveryModeEnabled ? styles.on : ''}`}
                     role="switch"
                     aria-checked={appSettings.deliveryModeEnabled}
                     aria-label="Delivery only mode">
                  <div className={styles.toggleKnob}></div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.statsGrid}>
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className={styles.statCard}>
                  <div className={styles.statIcon} style={{ background: `${stat.color}15`, color: stat.color }}>
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <div className={styles.statContent}>
                    <p className={styles.statLabel}>{stat.label}</p>
                    <div className={styles.statRow}>
                      <h3 className={styles.statValue}>{stat.value}</h3>
                      <span className={styles.statTrend} style={{ color: 'var(--success)' }}>
                        <TrendingUp size={16} aria-hidden="true" />
                        {stat.trend}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.cardsGrid}>
            <div className={styles.card}>
              <h2>Active Restaurants</h2>
              <div className={styles.bigNumber}>
                {activeRestaurants} <span className={styles.outOf}>/ {restaurants.length}</span>
              </div>
              <p className={styles.cardDescription}>Restaurants currently accepting orders</p>
            </div>

            <div className={styles.card}>
              <h2>Available Partners</h2>
              <div className={styles.bigNumber}>
                {availablePartners} <span className={styles.outOf}>/ {deliveryPartners.length}</span>
              </div>
              <p className={styles.cardDescription}>Delivery partners ready for orders</p>
            </div>

            <div className={styles.card}>
              <h2>Delivery Rate</h2>
              <div className={styles.bigNumber}>
                ₹{appSettings.perKmRate} <span className={styles.outOf}>/ km</span>
              </div>
              <p className={styles.cardDescription}>Base rate: ₹{appSettings.baseDeliveryFee}</p>
            </div>
          </div>

          <div className={styles.recentOrders}>
            <div className={styles.cardHeader}>
              <h2>Recent Orders</h2>
              <Clock size={20} color="var(--gray-600)" aria-hidden="true" />
            </div>
            <div className={styles.ordersList}>
              {orders.slice(0, 5).map((order) => {
                const restaurant = restaurants.find(r => r.id === order.restaurantId);
                return (
                  <div key={order.id} className={styles.orderItem}>
                    <div className={styles.orderInfo}>
                      <span className={styles.orderId}>#{order.id.toUpperCase()}</span>
                      <span className={styles.restaurantName}>{restaurant?.name}</span>
                    </div>
                    <div className={styles.orderMeta}>
                      <span className={`${styles.statusBadge} ${styles[order.status]}`}>
                        {order.status.replace('_', ' ')}
                      </span>
                      <span className={styles.orderAmount}>₹{order.total}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {userRole === 'user' && (
        <div className={styles.userDashboard}>
          <div className={styles.card}>
            <h2>Your Wallet Balance</h2>
            <div className={styles.bigNumber}>₹{users[0].walletBalance}</div>
            <button className={styles.primaryButton}>Add Money</button>
          </div>
          <div className={styles.card}>
            <h2>Your Orders</h2>
            <div className={styles.bigNumber}>{orders.filter(o => o.userId === 'u1').length}</div>
            <p className={styles.cardDescription}>Total orders placed</p>
          </div>
        </div>
      )}

      {userRole === 'restaurant' && (
        <div className={styles.restaurantDashboard}>
          <div className={styles.card}>
            <h2>Today's Orders</h2>
            <div className={styles.bigNumber}>0</div>
            <p className={styles.cardDescription}>Orders received today</p>
          </div>
          <div className={styles.card}>
            <h2>Restaurant Status</h2>
            <div className={styles.statusIndicator}>
              <span className={styles.statusDot} style={{ background: 'var(--success)' }}></span>
              Active
            </div>
            <button className={styles.secondaryButton}>Manage Menu</button>
          </div>
        </div>
      )}

      {userRole === 'delivery' && (
        <div className={styles.deliveryDashboard}>
          <div className={styles.card}>
            <h2>Today's Deliveries</h2>
            <div className={styles.bigNumber}>0</div>
            <p className={styles.cardDescription}>Completed today</p>
          </div>
          <div className={styles.card}>
            <h2>Your Earnings</h2>
            <div className={styles.bigNumber}>₹0</div>
            <p className={styles.cardDescription}>Today's earnings</p>
          </div>
          <div className={styles.card}>
            <h2>Availability</h2>
            <div className={styles.statusIndicator}>
              <span className={styles.statusDot} style={{ background: 'var(--success)' }}></span>
              Available
            </div>
            <button className={styles.secondaryButton}>Go Offline</button>
          </div>
        </div>
      )}
    </div>
  );
}
