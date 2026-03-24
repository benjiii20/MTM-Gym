import { useState, useCallback } from 'react';
import ChatWindow from './components/ChatWindow';

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Welcome to MTM Gym Berlin! I'm here to answer your questions about our personal training programs, locations, pricing, and team. How can I help you today?\n\n*(Sie können mich auch auf Deutsch fragen — Willkommen!)*",
};

export default function App() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(
    async (userText) => {
      const userMessage = { id: Date.now(), role: 'user', content: userText };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setIsLoading(true);

      try {
        const apiMessages = updatedMessages
          .filter((m) => m.id !== 'welcome')
          .map((m) => ({ role: m.role, content: m.content }));

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: apiMessages }),
        });

        const data = await res.json();

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            role: 'assistant',
            content: data.reply || 'Sorry, something went wrong. Please try again.',
            showBookingForm: data.showBookingForm || false,
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            role: 'assistant',
            content: 'Connection error. Please check your internet and try again.',
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  const dismissBooking = useCallback((msgId) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, showBookingForm: false } : m))
    );
  }, []);

  return (
    <ChatWindow
      messages={messages}
      isLoading={isLoading}
      onSendMessage={sendMessage}
      onDismissBooking={dismissBooking}
    />
  );
}
