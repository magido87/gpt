import { create } from 'zustand';

const persistedSettings = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('settings') || '{}') : {};

const useSettingsStore = create((set, get) => ({
  apiKey: persistedSettings.apiKey || '',
  model: persistedSettings.model || 'gpt-4o',
  temperature: persistedSettings.temperature ?? 0.7,
  top_p: persistedSettings.top_p ?? 1,
  frequency_penalty: persistedSettings.frequency_penalty ?? 0,
  presence_penalty: persistedSettings.presence_penalty ?? 0,
  max_tokens: persistedSettings.max_tokens ?? 1024,
  theme: persistedSettings.theme || 'light',
  setSetting: (key, value) => {
    const newSettings = { ...get(), [key]: value };
    localStorage.setItem('settings', JSON.stringify(newSettings));
    set({ [key]: value });
  }
}));

export { useSettingsStore };
