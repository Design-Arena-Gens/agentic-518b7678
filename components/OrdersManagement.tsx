'use client';

import { useState } from 'react';
import styles from './OrdersManagement.module.css';
import { UserRole, orders as initialOrders, restaurants, users, deliveryPartners, calculateDistance } from '@/lib/data';
import { Package, MapPin, User, Store, Truck, Key } from 'lucide-react';
import { format } from 'date-fns';

interface OrdersManagementProps {
  userRole: UserRole;
}

export default function OrdersManagement({ userRole }: OrdersManagementProps) {
  const [orders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Orders Management</h1>
          <p className={styles.subtitle}>Track and manage all orders</p>
        </div>
      </div>

      <div className={styles.ordersGrid}>
        {orders.map((order) => {
          const restaurant = restaurants.find(r => r.id === order.restaurantId);
          const user = users.find(u => u.id === order.userId);
          const partner = order.deliveryPartnerId ? deliveryPartners.find(d => d.id === order.deliveryPartnerId) : null;
          const isExpanded = selectedOrder === order.id;

          return (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <div className={styles.orderIdSection}>
                  <Package size={20} color="var(--primary)" aria-hidden="true" />
                  <span className={styles.orderId}>#{order.id.toUpperCase()}</span>
                </div>
                <span className={`${styles.statusBadge} ${styles[order.status]}`}>
                  {order.status.replace('_', ' ')}
                </span>
              </div>

              <div className={styles.orderDate}>
                {format(order.createdAt, 'MMM dd, yyyy • hh:mm a')}
              </div>

              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <Store size={16} aria-hidden="true" />
                  <span>Restaurant</span>
                </div>
                <p className={styles.sectionContent}>{restaurant?.name || 'Unknown'}</p>
              </div>

              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <User size={16} aria-hidden="true" />
                  <span>Customer</span>
                </div>
                <p className={styles.sectionContent}>{user?.username || 'Unknown'}</p>
              </div>

              {partner && (
                <div className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <Truck size={16} aria-hidden="true" />
                    <span>Delivery Partner</span>
                  </div>
                  <p className={styles.sectionContent}>{partner.name}</p>
                </div>
              )}

              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <MapPin size={16} aria-hidden="true" />
                  <span>Delivery Address</span>
                </div>
                <p className={styles.sectionContent}>{order.deliveryAddress}</p>
              </div>

              <div className={styles.distanceInfo}>
                <div className={styles.distanceItem}>
                  <span className={styles.label}>Distance:</span>
                  <span className={styles.value}>{order.distance.toFixed(1)} km</span>
                </div>
                <div className={styles.distanceItem}>
                  <span className={styles.label}>Delivery Fee:</span>
                  <span className={styles.value}>₹{order.deliveryFee}</span>
                </div>
              </div>

              {order.status === 'picked_up' && (
                <div className={styles.otpSection}>
                  <div className={styles.otpHeader}>
                    <Key size={18} color="var(--primary)" aria-hidden="true" />
                    <span>Delivery OTP</span>
                  </div>
                  <div className={styles.otpCode}>{order.otp}</div>
                  <p className={styles.otpDescription}>
                    Share this OTP with the delivery partner to complete the delivery
                  </p>
                </div>
              )}

              <div className={styles.orderTotal}>
                <span>Total Amount</span>
                <span className={styles.totalAmount}>₹{order.total}</span>
              </div>

              <button
                onClick={() => setSelectedOrder(isExpanded ? null : order.id)}
                className={styles.detailsButton}
              >
                {isExpanded ? 'Hide Items' : `View Items (${order.items.length})`}
              </button>

              {isExpanded && (
                <div className={styles.itemsList}>
                  {order.items.map((item, index) => {
                    const menuItem = restaurant?.menuItems.find(m => m.id === item.menuItemId);
                    return (
                      <div key={index} className={styles.orderItem}>
                        <div className={styles.itemDetails}>
                          <span className={styles.itemName}>{menuItem?.name || 'Unknown Item'}</span>
                          <span className={styles.itemQty}>x{item.quantity}</span>
                        </div>
                        <span className={styles.itemPrice}>₹{item.price * item.quantity}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {userRole === 'admin' && (
                <div className={styles.actions}>
                  <button className={styles.actionButton}>Update Status</button>
                  <button className={styles.actionButton}>Assign Partner</button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {orders.length === 0 && (
        <div className={styles.emptyState}>
          <Package size={48} color="var(--gray-300)" />
          <p>No orders found</p>
        </div>
      )}
    </div>
  );
}
