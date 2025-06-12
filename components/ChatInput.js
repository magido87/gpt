import { useState, useRef } from 'react';
import { useChatStore } from '../stores/chatStore';

export default function ChatInput() {
  const [text, setText] = useState('');
  const sendMessage = useChatStore((s) => s.sendMessage);
  const loading = useChatStore((s) => s.loading);
  const fileRef = useRef();

  const handleSend = () => {
    if (!text.trim() || loading) return;
    sendMessage(text);
    setText('');
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 512 * 1024) {
      alert('File too large (512 KB max).');
      e.target.value = '';
      return;
    }
    const textContent = await file.text();
    setText(text + '\n' + textContent);
  };

  return (
    <div className="flex gap-2 mt-4">
      <input
        type="file"
        accept=".txt,.md"
        className="file-input file-input-bordered file-input-sm"
        ref={fileRef}
        onChange={handleFile}
      />
      <textarea
        className="textarea textarea-bordered flex-1"
        rows={2}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        placeholder="Type your message..."
      />
      <button className="btn btn-primary" onClick={handleSend} disabled={loading}>
        {loading ? <span className="loading loading-spinner loading-xs" /> : 'Send'}
      </button>
    </div>
  );
}
