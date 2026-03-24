import { useEffect, useRef, useState } from 'react';
import Message from './Message';
import TypingIndicator from './TypingIndicator';
import styles from './ChatWindow.module.css';

export default function ChatWindow({ messages, isLoading, onSendMessage, onDismissBooking }) {
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    setInput('');
    onSendMessage(text);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <span className={styles.logoText}>MTM</span>
          <span className={styles.logoDot}>·</span>
          <span className={styles.logoSub}>GYM</span>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.statusDot} />
          <span className={styles.statusLabel}>AI Assistant</span>
        </div>
      </header>

      <div className={styles.messagesArea}>
        {messages.map((msg) => (
          <Message
            key={msg.id}
            message={msg}
            onDismissBooking={onDismissBooking}
          />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      <form className={styles.inputArea} onSubmit={handleSubmit}>
        <textarea
          ref={inputRef}
          className={styles.textarea}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about pricing, trainers, locations..."
          rows={1}
          disabled={isLoading}
        />
        <button
          type="submit"
          className={styles.sendBtn}
          disabled={!input.trim() || isLoading}
          aria-label="Send message"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </form>
    </div>
  );
}
