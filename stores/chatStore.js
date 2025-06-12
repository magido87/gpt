import { create } from 'zustand';
import { useSettingsStore } from './settingsStore';
import { estimateCost } from '../utils/cost';

const useChatStore = create((set, get) => ({
  messages: [],
  totalTokens: 0,
  totalCost: 0,
  loading: false,
  sendMessage: async (content) => {
    const settings = useSettingsStore.getState();
    const userMsg = { role: 'user', content };
    set((state) => ({ messages: [...state.messages, userMsg], loading: true }));
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...get().messages, userMsg].slice(-20), // limit context
          model: settings.model,
          temperature: settings.temperature,
          top_p: settings.top_p,
          frequency_penalty: settings.frequency_penalty,
          presence_penalty: settings.presence_penalty,
          max_tokens: settings.max_tokens,
          apiKey: settings.apiKey
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'API request failed');
      }
      const { message, usage } = data;
      const cost = estimateCost(settings.model, usage.prompt_tokens, usage.completion_tokens);
      const assistantMsg = {
        role: message.role,
        content: message.content,
        promptTokens: usage.prompt_tokens,
        completionTokens: usage.completion_tokens,
        cost
      };
      set((state) => ({
        messages: [...state.messages, assistantMsg],
        totalTokens: state.totalTokens + usage.total_tokens,
        totalCost: state.totalCost + cost,
        loading: false
      }));
    } catch (err) {
      console.error(err);
      alert('Error: ' + err.message);
      set({ loading: false });
    }
  },
  clear: () => set({ messages: [], totalTokens: 0, totalCost: 0 })
}));

export default useChatStore;
