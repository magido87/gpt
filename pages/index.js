import React, { useEffect, useRef } from 'react';
import useChatStore from '../stores/chatStore';
import useSettingsStore from '../stores/settingsStore';
import MessageItem from '../components/MessageItem';
import ChatInput from '../components/ChatInput';
import ThemeSelector from '../components/ThemeSelector';

export default function Home() {
  // ----- global state -----
  const { messages, clear, loading } = useChatStore((s) => ({
    messages: s.messages,
    clear: s.clear,
    loading: s.loading,
  }));

  const { apiKey, setSetting } = useSettingsStore((s) => ({
    apiKey: s.apiKey,
    setSetting: s.setSetting,
  }));

  // ----- auto-scroll -----
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ----- UI -----
  return (
    <main className="container mx-auto p-4 flex flex-col gap-4 h-screen">
      {/* header */}
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">ChatGPT Next</h1>
        <ThemeSelector />
      </header>

      {/* API-key alert */}
      {!apiKey && (
        <div className="alert alert-warning flex items-center gap-2">
          <span className="font-medium">Enter your OpenAI API key:</span>
          <input
            type="password"
            className="input input-bordered flex-1"
            placeholder="sk-..."
            onChange={(e) => setSetting('apiKey', e.target.value)}
          />
        </div>
      )}

      {/* message list */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((m, idx) => (
          <MessageItem key={idx} msg={m} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* footer */}
      <footer className="mt-4 flex items-center gap-2">
        <button className="btn btn-outline" onClick={clear} disabled={loading}>
          Clear
        </button>
        <ChatInput />
      </footer>
    </main>
  );
}