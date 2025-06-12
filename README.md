
# chatgpt-next (Patched & Enhanced Version)

This is a custom-patched and enhanced version of a Next.js-based ChatGPT frontend. It allows users to interact with OpenAI's API by pasting their own API key directly into the UI. No `.env` file is required.

---

## 🚀 Features

- ✅ Enter OpenAI API key directly in UI (no env file required)
- ✅ API key and settings persist via `localStorage`
- ✅ Supports GPT-3.5, GPT-4o, GPT-o3
- ✅ DaisyUI theming with dark mode
- ✅ Token + cost tracking
- ✅ Markdown rendering with XSS protection
- ✅ Rate limiting on backend (60 req/15min per IP)

---

## 🛠️ Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

### 3. Open in browser

Go to [http://localhost:3000](http://localhost:3000)

---

## 🧪 Usage

1. Click the **Settings** button.
2. Paste your **OpenAI API key**.
3. Optionally tweak model, temperature, and token limits.
4. Start chatting!

---

## 🧠 Models Supported

- `gpt-3.5-turbo`
- `gpt-4o`
- `gpt-o3` (internally treated as GPT-3.5)

---

## ⚠️ Notes

- File uploads are limited to `.txt` and `.md` under 512 KB.
- All prompts and completions are capped at the last 20 messages.
- Bearer token protection (optional) can be enabled via `process.env.API_TOKEN`.

---

## 📦 Build for Production

```bash
npm run build
npm start
```

---

## 🧼 Author Enhancements

This version was audited and improved for:

- Runtime error protection
- `localStorage` persistence
- More robust error fallback
- Future-proof model cost estimation

