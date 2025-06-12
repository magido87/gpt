import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useChatStore } from '../stores/chatStore';
import { useSettingsStore } from '../stores/settingsStore';

export default function ChatInput() {
  const [input, setInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [fileError, setFileError] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage, loading, error, clearError } = useChatStore();
  const settings = useSettingsStore();

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    try {
      await sendMessage(input, settings);
      setInput('');
      clearError();
    } catch (err) {
      console.error('Failed to send message:', err);
      // Error is already handled in the store
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileError(null);

    if (file.size > 1024 * 1024) { // 1MB limit
      setFileError('File size must be less than 1MB');
      return;
    }

    setIsUploading(true);
    try {
      const text = await file.text();
      setInput(text);
    } catch (err) {
      console.error('Error reading file:', err);
      setFileError('Error reading file. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <p className="text-sm">{error}</p>
          <button
            onClick={clearError}
            className="mt-2 text-sm text-red-600 hover:text-red-800"
          >
            Dismiss
          </button>
        </div>
      )}
      {fileError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <p className="text-sm">{fileError}</p>
          <button
            onClick={() => setFileError(null)}
            className="mt-2 text-sm text-red-600 hover:text-red-800"
          >
            Dismiss
          </button>
        </div>
      )}
      <div className="flex gap-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFile}
          className="hidden"
          accept=".txt,.md,.json"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="btn btn-outline"
        >
          {isUploading ? 'Uploading...' : 'Upload File'}
        </button>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 textarea textarea-bordered"
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className="btn btn-primary"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}

ChatInput.propTypes = {
  // Add any necessary prop types here
};
