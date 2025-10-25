'use client';

import { useState } from 'react';
import styles from './DeliveryPartnersManagement.module.css';
import { UserRole, deliveryPartners as initialPartners } from '@/lib/data';
import { Search, Bike, Star, MapPin, CheckCircle, XCircle, DollarSign, Package } from 'lucide-react';

interface DeliveryPartnersManagementProps {
  userRole: UserRole;
}

export default function DeliveryPartnersManagement({ userRole }: DeliveryPartnersManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [partners] = useState(initialPartners);

  const filteredPartners = partners.filter(partner =>
    partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    partner.phone.includes(searchQuery) ||
    partner.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getVehicleIcon = (type: string) => {
    return <Bike size={20} />;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Delivery Partner Management</h1>
          <p className={styles.subtitle}>Manage delivery partners and track performance</p>
        </div>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={20} color="var(--gray-400)" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search partners by name, phone, or vehicle number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
            aria-label="Search delivery partners"
          />
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(76, 175, 80, 0.1)', color: 'var(--primary)' }}>
            <CheckCircle size={24} />
          </div>
          <div>
            <p className={styles.statLabel}>Available Now</p>
            <p className={styles.statValue}>{partners.filter(p => p.isAvailable).length}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(255, 152, 0, 0.1)', color: 'var(--secondary)' }}>
            <Package size={24} />
          </div>
          <div>
            <p className={styles.statLabel}>Total Deliveries</p>
            <p className={styles.statValue}>{partners.reduce((sum, p) => sum + p.totalDeliveries, 0)}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(33, 150, 243, 0.1)', color: 'var(--info)' }}>
            <DollarSign size={24} />
          </div>
          <div>
            <p className={styles.statLabel}>Total Earnings</p>
            <p className={styles.statValue}>₹{partners.reduce((sum, p) => sum + p.earnings, 0).toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className={styles.partnersGrid}>
        {filteredPartners.map((partner) => (
          <div key={partner.id} className={styles.partnerCard}>
            <div className={styles.partnerHeader}>
              <div className={styles.partnerAvatar}>
                {partner.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className={styles.partnerBasic}>
                <h3>{partner.name}</h3>
                <div className={styles.rating}>
                  <Star size={16} fill="var(--secondary)" color="var(--secondary)" aria-hidden="true" />
                  <span>{partner.rating}</span>
                </div>
              </div>
              <div className={`${styles.availabilityBadge} ${partner.isAvailable ? styles.available : styles.unavailable}`}>
                {partner.isAvailable ? (
                  <>
                    <CheckCircle size={14} />
                    Available
                  </>
                ) : (
                  <>
                    <XCircle size={14} />
                    Offline
                  </>
                )}
              </div>
            </div>

            <div className={styles.contactInfo}>
              <div className={styles.infoRow}>
                <span className={styles.label}>Phone:</span>
                <span className={styles.value}>{partner.phone}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Email:</span>
                <span className={styles.value}>{partner.email}</span>
              </div>
            </div>

            <div className={styles.vehicleInfo}>
              <div className={styles.vehicleHeader}>
                {getVehicleIcon(partner.vehicleType)}
                <span className={styles.vehicleType}>{partner.vehicleType.toUpperCase()}</span>
              </div>
              <span className={styles.vehicleNumber}>{partner.vehicleNumber}</span>
            </div>

            <div className={styles.metricsGrid}>
              <div className={styles.metric}>
                <Package size={18} color="var(--primary)" aria-hidden="true" />
                <div>
                  <p className={styles.metricValue}>{partner.totalDeliveries}</p>
                  <p className={styles.metricLabel}>Deliveries</p>
                </div>
              </div>
              <div className={styles.metric}>
                <DollarSign size={18} color="var(--success)" aria-hidden="true" />
                <div>
                  <p className={styles.metricValue}>₹{partner.earnings.toLocaleString()}</p>
                  <p className={styles.metricLabel}>Earnings</p>
                </div>
              </div>
            </div>

            <div className={styles.location}>
              <MapPin size={16} color="var(--gray-500)" aria-hidden="true" />
              <span>Location: {partner.latitude.toFixed(4)}, {partner.longitude.toFixed(4)}</span>
            </div>

            <div className={styles.statusBadgeContainer}>
              <span className={`${styles.statusBadge} ${styles[partner.status]}`}>
                {partner.status}
              </span>
            </div>

            <div className={styles.actions}>
              <button className={styles.viewButton}>View History</button>
              <button className={styles.paymentButton}>Payment Details</button>
            </div>
          </div>
        ))}
      </div>

      {filteredPartners.length === 0 && (
        <div className={styles.emptyState}>
          <p>No delivery partners found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
