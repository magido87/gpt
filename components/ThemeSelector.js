import { useSettingsStore } from '../stores/settingsStore';

const themes = ['light', 'dark', 'pastel', 'synthwave', 'retro'];

export default function ThemeSelector() {
  const theme = useSettingsStore((s) => s.theme);
  const setSetting = useSettingsStore((s) => s.setSetting);
  return (
    <select
      className="select select-bordered select-sm"
      value={theme}
      onChange={(e) => setSetting('theme', e.target.value)}
    >
      {themes.map((t) => (
        <option key={t} value={t}>
          {t}
        </option>
      ))}
    </select>
  );
}
