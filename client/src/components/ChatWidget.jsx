import ChatWindow from './ChatWindow';
import styles from './ChatWidget.module.css';

function ChatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ChatWidget({ isOpen, onOpen, onClose, messages, isLoading, onSendMessage, onDismissBooking, onDismissSoftLead, onClearChat }) {
  return (
    <div className={styles.container}>
      <div className={`${styles.panel} ${isOpen ? styles.panelOpen : styles.panelClosed}`}>
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          onSendMessage={onSendMessage}
          onDismissBooking={onDismissBooking}
          onDismissSoftLead={onDismissSoftLead}
          onClearChat={onClearChat}
        />
      </div>
      <button
        className={styles.launcher}
        onClick={isOpen ? onClose : onOpen}
        aria-label={isOpen ? 'Close chat' : 'Open AI assistant'}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </button>
    </div>
  );
}
