'use client';

import { useState } from 'react';
import styles from './RestaurantsManagement.module.css';
import { UserRole, restaurants as initialRestaurants, Restaurant } from '@/lib/data';
import { Search, MapPin, Star, Clock, CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface RestaurantsManagementProps {
  userRole: UserRole;
}

export default function RestaurantsManagement({ userRole }: RestaurantsManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [restaurants] = useState(initialRestaurants);
  const [expandedRestaurant, setExpandedRestaurant] = useState<string | null>(null);

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
    restaurant.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpand = (id: string) => {
    setExpandedRestaurant(expandedRestaurant === id ? null : id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Restaurant Management</h1>
          <p className={styles.subtitle}>Manage restaurants and their menus</p>
        </div>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={20} color="var(--gray-400)" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search restaurants by name, cuisine, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
            aria-label="Search restaurants"
          />
        </div>
      </div>

      <div className={styles.restaurantGrid}>
        {filteredRestaurants.map((restaurant) => (
          <div key={restaurant.id} className={styles.restaurantCard}>
            <div
              className={styles.restaurantImage}
              style={{ backgroundImage: `url(${restaurant.image})` }}
              role="img"
              aria-label={`${restaurant.name} restaurant image`}
            >
              <div className={`${styles.statusBadge} ${restaurant.isActive ? styles.active : styles.inactive}`}>
                {restaurant.isActive ? (
                  <>
                    <CheckCircle size={14} aria-hidden="true" />
                    Active
                  </>
                ) : (
                  <>
                    <XCircle size={14} aria-hidden="true" />
                    Inactive
                  </>
                )}
              </div>
            </div>

            <div className={styles.restaurantContent}>
              <div className={styles.restaurantHeader}>
                <h3>{restaurant.name}</h3>
                <div className={styles.rating}>
                  <Star size={16} fill="var(--secondary)" color="var(--secondary)" aria-hidden="true" />
                  <span>{restaurant.rating}</span>
                </div>
              </div>

              <div className={styles.cuisineList}>
                {restaurant.cuisine.map((cuisine, index) => (
                  <span key={index} className={styles.cuisineTag}>
                    {cuisine}
                  </span>
                ))}
              </div>

              <div className={styles.restaurantInfo}>
                <div className={styles.infoItem}>
                  <MapPin size={16} color="var(--gray-500)" aria-hidden="true" />
                  <span>{restaurant.address}</span>
                </div>
                <div className={styles.infoItem}>
                  <Clock size={16} color="var(--gray-500)" aria-hidden="true" />
                  <span>{restaurant.openingHours}</span>
                </div>
              </div>

              <div className={styles.ownerInfo}>
                <p><strong>Owner:</strong> {restaurant.owner}</p>
                <p><strong>Contact:</strong> {restaurant.phone}</p>
                <p><strong>Email:</strong> {restaurant.email}</p>
              </div>

              <button
                onClick={() => toggleExpand(restaurant.id)}
                className={styles.expandButton}
                aria-expanded={expandedRestaurant === restaurant.id}
              >
                {expandedRestaurant === restaurant.id ? (
                  <>
                    Hide Menu <ChevronUp size={18} />
                  </>
                ) : (
                  <>
                    View Menu ({restaurant.menuItems.length} items) <ChevronDown size={18} />
                  </>
                )}
              </button>

              {expandedRestaurant === restaurant.id && (
                <div className={styles.menuSection}>
                  <h4>Menu Items</h4>
                  <div className={styles.menuGrid}>
                    {restaurant.menuItems.map((item) => (
                      <div key={item.id} className={styles.menuItem}>
                        <div
                          className={styles.menuItemImage}
                          style={{ backgroundImage: `url(${item.image})` }}
                          role="img"
                          aria-label={item.name}
                        />
                        <div className={styles.menuItemContent}>
                          <div className={styles.menuItemHeader}>
                            <h5>{item.name}</h5>
                            <span className={styles.price}>₹{item.price}</span>
                          </div>
                          <p className={styles.description}>{item.description}</p>
                          <div className={styles.menuItemFooter}>
                            <span className={styles.category}>{item.category}</span>
                            <span className={`${styles.availability} ${item.isAvailable ? styles.available : styles.unavailable}`}>
                              {item.isAvailable ? 'Available' : 'Unavailable'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.actions}>
                <button className={styles.editButton}>Edit Details</button>
                <button className={`${styles.toggleButton} ${restaurant.isActive ? styles.deactivate : styles.activate}`}>
                  {restaurant.isActive ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRestaurants.length === 0 && (
        <div className={styles.emptyState}>
          <p>No restaurants found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
