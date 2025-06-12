import { useSettingsStore } from '../stores/settingsStore';
import { useState } from 'react';

export default function SettingsModal({ open, onClose }) {
  const setSetting = useSettingsStore((s) => s.setSetting);
  const settings = useSettingsStore();
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-base-100 p-6 rounded-box w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Settings</h2>
        {[
          { key: 'temperature', min: 0, max: 2, step: 0.1 },
          { key: 'top_p', min: 0, max: 1, step: 0.01 },
          { key: 'frequency_penalty', min: -2, max: 2, step: 0.1 },
          { key: 'presence_penalty', min: -2, max: 2, step: 0.1 }
        ].map(({ key, min, max, step }) => (
          <div key={key} className="mb-4">
            <label className="label">
              <span className="label-text">{key.replace('_', ' ')}</span>
              <span className="badge badge-outline">{settings[key]}</span>
            </label>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={settings[key]}
              onChange={(e) => setSetting(key, parseFloat(e.target.value))}
              className="range range-xs"
            />
          </div>
        ))}
                <div className="mb-4">
          <label className="label">
            <span className="label-text">OpenAI API Key</span>
          </label>
          <input
            type="password"
            className="input input-bordered w-full"
            value={settings.apiKey}
            onChange={(e) => setSetting('apiKey', e.target.value)}
            placeholder="sk-..."
          />
        </div>
<div className="mb-4">
          <label className="label">
            <span className="label-text">max_tokens</span>
            <span className="badge badge-outline">{settings.max_tokens}</span>
          </label>
          <input
            type="number"
            className="input input-bordered w-full"
            value={settings.max_tokens}
            onChange={(e) => setSetting('max_tokens', parseInt(e.target.value || '0', 10))}
          />
        </div>
        <button className="btn btn-primary w-full" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
