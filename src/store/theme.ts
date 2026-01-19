import { STORAGE_KEYS } from '../constants/localStorage';
import { THEMES, Theme } from '../constants/themes';

export function getThemeSetting(): Theme {
  const stored = localStorage.getItem(STORAGE_KEYS.THEME);
  if (stored === THEMES.LIGHT || stored === THEMES.DARK) {
    return stored;
  }
  return THEMES.LIGHT;
}

export function setThemeSetting(theme: Theme): void {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
  applyTheme(theme);
}

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
}

export function initializeTheme(): void {
  const theme = getThemeSetting();
  applyTheme(theme);
}
