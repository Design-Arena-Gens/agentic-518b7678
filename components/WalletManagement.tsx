'use client';

import { useState } from 'react';
import styles from './WalletManagement.module.css';
import { UserRole, users, walletTransactions, appSettings } from '@/lib/data';
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';

interface WalletManagementProps {
  userRole: UserRole;
}

export default function WalletManagement({ userRole }: WalletManagementProps) {
  const [selectedUser] = useState(users[0]);
  const [rechargeAmount, setRechargeAmount] = useState('');

  const userTransactions = walletTransactions.filter(t => t.userId === selectedUser.id);

  const handleWhatsAppRecharge = () => {
    if (!rechargeAmount || parseFloat(rechargeAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const message = `Hi, I would like to add ₹${rechargeAmount} to my wallet. Username: ${selectedUser.username}`;
    const whatsappUrl = `https://wa.me/${appSettings.adminContact.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Wallet Management</h1>
          <p className={styles.subtitle}>Manage wallet balance and transactions</p>
        </div>
      </div>

      <div className={styles.walletCard}>
        <div className={styles.balanceSection}>
          <div className={styles.balanceIcon}>
            <Wallet size={32} color="var(--white)" aria-hidden="true" />
          </div>
          <div>
            <p className={styles.balanceLabel}>Current Balance</p>
            <h2 className={styles.balanceAmount}>₹{selectedUser.walletBalance}</h2>
          </div>
        </div>

        <div className={styles.rechargeSection}>
          <h3>Add Money via WhatsApp</h3>
          <p className={styles.rechargeDescription}>
            Enter the amount you want to add. You'll be redirected to WhatsApp to complete the transaction with our admin.
          </p>
          <div className={styles.rechargeForm}>
            <div className={styles.inputGroup}>
              <span className={styles.currencySymbol}>₹</span>
              <input
                type="number"
                placeholder="Enter amount"
                value={rechargeAmount}
                onChange={(e) => setRechargeAmount(e.target.value)}
                className={styles.amountInput}
                min="1"
                aria-label="Recharge amount"
              />
            </div>
            <button onClick={handleWhatsAppRecharge} className={styles.rechargeButton}>
              <Plus size={20} />
              Add Money
            </button>
          </div>
          <div className={styles.quickAmounts}>
            <button onClick={() => setRechargeAmount('100')} className={styles.quickButton}>₹100</button>
            <button onClick={() => setRechargeAmount('500')} className={styles.quickButton}>₹500</button>
            <button onClick={() => setRechargeAmount('1000')} className={styles.quickButton}>₹1000</button>
            <button onClick={() => setRechargeAmount('2000')} className={styles.quickButton}>₹2000</button>
          </div>
        </div>
      </div>

      <div className={styles.transactionsCard}>
        <div className={styles.transactionsHeader}>
          <h3>Transaction History</h3>
          <Clock size={20} color="var(--gray-600)" aria-hidden="true" />
        </div>

        <div className={styles.transactionsList}>
          {userTransactions.map((transaction) => (
            <div key={transaction.id} className={styles.transactionItem}>
              <div className={`${styles.transactionIcon} ${transaction.type === 'credit' ? styles.credit : styles.debit}`}>
                {transaction.type === 'credit' ? (
                  <ArrowDownLeft size={20} aria-hidden="true" />
                ) : (
                  <ArrowUpRight size={20} aria-hidden="true" />
                )}
              </div>

              <div className={styles.transactionDetails}>
                <p className={styles.transactionDescription}>{transaction.description}</p>
                <p className={styles.transactionDate}>{format(transaction.timestamp, 'MMM dd, yyyy • hh:mm a')}</p>
              </div>

              <div className={styles.transactionRight}>
                <p className={`${styles.transactionAmount} ${transaction.type === 'credit' ? styles.credit : styles.debit}`}>
                  {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                </p>
                <span className={`${styles.transactionStatus} ${styles[transaction.status]}`}>
                  {transaction.status === 'completed' && <CheckCircle size={14} />}
                  {transaction.status === 'pending' && <Clock size={14} />}
                  {transaction.status === 'failed' && <XCircle size={14} />}
                  {transaction.status}
                </span>
              </div>
            </div>
          ))}

          {userTransactions.length === 0 && (
            <div className={styles.emptyState}>
              <Wallet size={48} color="var(--gray-300)" />
              <p>No transactions yet</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.infoCard}>
        <h3>How Wallet Recharge Works</h3>
        <ol className={styles.stepsList}>
          <li>Enter the amount you want to add to your wallet</li>
          <li>Click "Add Money" to open WhatsApp with a pre-filled message</li>
          <li>Send the message to our admin at {appSettings.adminContact}</li>
          <li>Complete the payment as instructed by the admin</li>
          <li>Your wallet will be credited once payment is verified</li>
        </ol>
      </div>
    </div>
  );
}
