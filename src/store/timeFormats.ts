import { STORAGE_KEYS } from '../constants/localStorage';

export type TimeFormat = '12h' | '24h';

export function getTimeFormatSetting(): TimeFormat {
  const stored = localStorage.getItem(STORAGE_KEYS.TIME_FORMAT);
  if (stored === '12h' || stored === '24h') {
    return stored;
  }
  return '24h';
}

export function setTimeFormatSetting(format: TimeFormat): void {
  localStorage.setItem(STORAGE_KEYS.TIME_FORMAT, format);
}