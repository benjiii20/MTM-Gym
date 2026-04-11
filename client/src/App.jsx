import { useState, useCallback, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import ChatWidget from './components/ChatWidget';

const STORAGE_KEY = 'mtm_chat_history';
const SESSION_KEY = 'mtm_session_id';

function generateId(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}`;
}

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hello! Would you like to chat in **English** or **German**?\n\nHallo! Möchten Sie auf **Englisch** oder **Deutsch** schreiben?",
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
  const [widgetOpen, setWidgetOpen] = useState(false);
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
            content: data.reply || (data.showSoftLeadForm ? 'Here you go!' : data.showBookingForm ? 'Great, here\'s the form!' : 'Sorry, something went wrong. Please try again.'),
            showBookingForm: data.showBookingForm || false,
            showSoftLeadForm: data.showSoftLeadForm || false,
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

  const dismissSoftLead = useCallback((msgId) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, showSoftLeadForm: false } : m))
    );
  }, []);

  const clearChat = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setMessages([WELCOME_MESSAGE]);
    setFirstQuestion('');
  }, []);

  return (
    <>
      <LandingPage onOpenChat={() => setWidgetOpen(true)} />
      <ChatWidget
        isOpen={widgetOpen}
        onOpen={() => setWidgetOpen(true)}
        onClose={() => setWidgetOpen(false)}
        messages={messages}
        isLoading={isLoading}
        onSendMessage={sendMessage}
        onDismissBooking={dismissBooking}
        onDismissSoftLead={dismissSoftLead}
        onClearChat={clearChat}
      />
    </>
  );
}
