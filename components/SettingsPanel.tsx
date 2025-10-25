'use client';

import { useState } from 'react';
import styles from './SettingsPanel.module.css';
import { UserRole, appSettings as initialSettings } from '@/lib/data';
import { Settings, DollarSign, Phone, Save } from 'lucide-react';

interface SettingsPanelProps {
  userRole: UserRole;
}

export default function SettingsPanel({ userRole }: SettingsPanelProps) {
  const [settings, setSettings] = useState(initialSettings);

  const handleToggle = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleNumberChange = (key: keyof typeof settings, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setSettings({ ...settings, [key]: numValue });
    }
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  if (userRole !== 'admin') {
    return (
      <div className={styles.container}>
        <div className={styles.accessDenied}>
          <Settings size={48} color="var(--error)" />
          <h2>Access Denied</h2>
          <p>Only administrators can access settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Settings</h1>
          <p className={styles.subtitle}>Configure application settings</p>
        </div>
        <button onClick={handleSave} className={styles.saveButton}>
          <Save size={20} />
          Save Changes
        </button>
      </div>

      <div className={styles.settingsGrid}>
        <div className={styles.settingsCard}>
          <h2>Service Modes</h2>
          <p className={styles.cardDescription}>Enable or disable different service types</p>

          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h3>Food Delivery</h3>
                <p>Allow users to order food from restaurants</p>
              </div>
              <div
                className={`${styles.toggle} ${settings.foodModeEnabled ? styles.on : ''}`}
                onClick={() => handleToggle('foodModeEnabled')}
                role="switch"
                aria-checked={settings.foodModeEnabled}
                aria-label="Food delivery mode"
                tabIndex={0}
              >
                <div className={styles.toggleKnob}></div>
              </div>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h3>Grocery Delivery</h3>
                <p>Allow users to order groceries</p>
              </div>
              <div
                className={`${styles.toggle} ${settings.groceryModeEnabled ? styles.on : ''}`}
                onClick={() => handleToggle('groceryModeEnabled')}
                role="switch"
                aria-checked={settings.groceryModeEnabled}
                aria-label="Grocery delivery mode"
                tabIndex={0}
              >
                <div className={styles.toggleKnob}></div>
              </div>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h3>Delivery Only Mode</h3>
                <p>Allow users to send packages without ordering products</p>
              </div>
              <div
                className={`${styles.toggle} ${settings.deliveryModeEnabled ? styles.on : ''}`}
                onClick={() => handleToggle('deliveryModeEnabled')}
                role="switch"
                aria-checked={settings.deliveryModeEnabled}
                aria-label="Delivery only mode"
                tabIndex={0}
              >
                <div className={styles.toggleKnob}></div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.settingsCard}>
          <h2>Delivery Pricing</h2>
          <p className={styles.cardDescription}>Configure delivery charges and payment rates</p>

          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <div className={styles.settingHeader}>
                  <DollarSign size={20} color="var(--primary)" aria-hidden="true" />
                  <h3>Base Delivery Fee</h3>
                </div>
                <p>Minimum charge for any delivery</p>
              </div>
              <div className={styles.inputGroup}>
                <span className={styles.currency}>₹</span>
                <input
                  type="number"
                  value={settings.baseDeliveryFee}
                  onChange={(e) => handleNumberChange('baseDeliveryFee', e.target.value)}
                  className={styles.numberInput}
                  min="0"
                  step="5"
                  aria-label="Base delivery fee"
                />
              </div>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <div className={styles.settingHeader}>
                  <DollarSign size={20} color="var(--secondary)" aria-hidden="true" />
                  <h3>Per Kilometer Rate</h3>
                </div>
                <p>Additional charge for each kilometer</p>
              </div>
              <div className={styles.inputGroup}>
                <span className={styles.currency}>₹</span>
                <input
                  type="number"
                  value={settings.perKmRate}
                  onChange={(e) => handleNumberChange('perKmRate', e.target.value)}
                  className={styles.numberInput}
                  min="0"
                  step="1"
                  aria-label="Per kilometer rate"
                />
                <span className={styles.unit}>/km</span>
              </div>
            </div>
          </div>

          <div className={styles.calculationExample}>
            <h4>Delivery Fee Calculation</h4>
            <div className={styles.formula}>
              <span>Total Fee = Base Fee + (Distance × Per KM Rate)</span>
            </div>
            <div className={styles.example}>
              <span>Example (5 km):</span>
              <span className={styles.exampleCalc}>
                ₹{settings.baseDeliveryFee} + (5 × ₹{settings.perKmRate}) = ₹{settings.baseDeliveryFee + (5 * settings.perKmRate)}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.settingsCard}>
          <h2>Contact Information</h2>
          <p className={styles.cardDescription}>Admin contact for wallet recharge and support</p>

          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <div className={styles.settingHeader}>
                  <Phone size={20} color="var(--info)" aria-hidden="true" />
                  <h3>WhatsApp Contact</h3>
                </div>
                <p>Phone number for wallet recharge requests</p>
              </div>
              <input
                type="tel"
                value={settings.adminContact}
                readOnly
                className={styles.textInput}
                aria-label="Admin WhatsApp contact"
              />
            </div>
          </div>

          <div className={styles.infoBox}>
            <p>
              <strong>Note:</strong> Users will be redirected to this WhatsApp number when they want to add money to their wallet.
              Make sure this number is monitored regularly.
            </p>
          </div>
        </div>

        <div className={styles.settingsCard}>
          <h2>Distance Calculation</h2>
          <p className={styles.cardDescription}>Location tracking and distance measurement</p>

          <div className={styles.infoBox}>
            <h4>Implementation Details:</h4>
            <ul>
              <li>Using Haversine formula for distance calculation</li>
              <li>Coordinates stored as latitude/longitude pairs</li>
              <li>OpenStreetMap compatible coordinate system</li>
              <li>No external API dependency for distance calculation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
