import '../styles/globals.css';
import { useEffect } from 'react';
import { useSettingsStore } from '../stores/settingsStore';

export default function App({ Component, pageProps }) {
  const theme = useSettingsStore((s) => s.theme);
  useEffect(() => {
    if (theme) document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  return <Component {...pageProps} />;
}
