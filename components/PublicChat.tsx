'use client';

import { useState } from 'react';
import styles from './PublicChat.module.css';
import { UserRole, chatMessages as initialMessages } from '@/lib/data';
import { MessageSquare, Send, Trash2, Ban } from 'lucide-react';
import { format } from 'date-fns';

interface PublicChatProps {
  userRole: UserRole;
}

export default function PublicChat({ userRole }: PublicChatProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: `c${messages.length + 1}`,
      userId: 'u1',
      username: 'john_doe',
      message: newMessage,
      timestamp: new Date(),
      isDeleted: false,
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.map(msg =>
      msg.id === messageId ? { ...msg, isDeleted: true } : msg
    ));
  };

  const visibleMessages = messages.filter(msg => !msg.isDeleted);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Public Chat</h1>
          <p className={styles.subtitle}>Community chat for all users</p>
        </div>
      </div>

      <div className={styles.chatContainer}>
        <div className={styles.chatHeader}>
          <MessageSquare size={24} color="var(--primary)" aria-hidden="true" />
          <h2>Live Chat</h2>
          <span className={styles.onlineCount}>{visibleMessages.length} messages</span>
        </div>

        <div className={styles.messagesContainer} role="log" aria-live="polite" aria-label="Chat messages">
          {visibleMessages.map((message) => (
            <div key={message.id} className={styles.messageItem}>
              <div className={styles.messageHeader}>
                <div className={styles.userInfo}>
                  <div className={styles.avatar}>
                    {message.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className={styles.username}>{message.username}</span>
                    <span className={styles.timestamp}>
                      {format(message.timestamp, 'MMM dd, hh:mm a')}
                    </span>
                  </div>
                </div>
                {userRole === 'admin' && (
                  <button
                    onClick={() => handleDeleteMessage(message.id)}
                    className={styles.deleteButton}
                    aria-label="Delete message"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
              <div className={styles.messageContent}>
                {message.message}
              </div>
            </div>
          ))}

          {visibleMessages.length === 0 && (
            <div className={styles.emptyState}>
              <MessageSquare size={48} color="var(--gray-300)" />
              <p>No messages yet. Start the conversation!</p>
            </div>
          )}
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className={styles.messageInput}
            aria-label="Message input"
          />
          <button
            onClick={handleSendMessage}
            className={styles.sendButton}
            aria-label="Send message"
            disabled={!newMessage.trim()}
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      {userRole === 'admin' && (
        <div className={styles.moderationCard}>
          <div className={styles.moderationHeader}>
            <Ban size={20} color="var(--error)" aria-hidden="true" />
            <h3>Moderation Tools</h3>
          </div>
          <p className={styles.moderationDescription}>
            As an admin, you can delete inappropriate messages and moderate user behavior.
            Click the trash icon next to any message to remove it from the chat.
          </p>
          <div className={styles.moderationStats}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Total Messages:</span>
              <span className={styles.statValue}>{messages.length}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Deleted Messages:</span>
              <span className={styles.statValue}>{messages.filter(m => m.isDeleted).length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
