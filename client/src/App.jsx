import { useState, useCallback, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';

const STORAGE_KEY = 'mtm_chat_history';
const SESSION_KEY = 'mtm_session_id';

function generateId(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}`;
}

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Welcome to MTM Gym Berlin! I'm here to answer your questions about our personal training programs, locations, pricing, and team. How can I help you today?\n\n*(Sie können mich auch auf Deutsch fragen — Willkommen!)*",
};

function loadHistory() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return { messages: parsed, isReturn: true };
    }
  } catch {}
  return { messages: [WELCOME_MESSAGE], isReturn: false };
}

export default function App() {
  const initial = loadHistory();
  const [messages, setMessages] = useState(initial.messages);
  const [isLoading, setIsLoading] = useState(false);
  const [isReturnVisitor] = useState(initial.isReturn);
  const [firstQuestion, setFirstQuestion] = useState(() => {
    const firstUser = initial.messages.find((m) => m.role === 'user');
    return firstUser ? firstUser.content : '';
  });
  const [sessionId] = useState(() => {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = generateId('sess');
      localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  });
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-100)));
  }, [messages]);

  const sendMessage = useCallback(
    async (userText) => {
      const userMessage = { id: Date.now(), role: 'user', content: userText };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setIsLoading(true);

      const currentFirstQuestion = firstQuestion || userText;
      if (!firstQuestion) setFirstQuestion(userText);

      const messageCount = updatedMessages.filter((m) => m.role === 'user').length;

      try {
        const apiMessages = updatedMessages
          .filter((m) => m.id !== 'welcome')
          .map((m) => ({ role: m.role, content: m.content }));

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: apiMessages,
            messageCount,
            firstQuestion: currentFirstQuestion,
            isReturnVisitor,
            sessionId,
          }),
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
    [messages, firstQuestion, isReturnVisitor, sessionId]
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
