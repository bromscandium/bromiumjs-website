export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type Theme = (typeof THEMES)[keyof typeof THEMES];

export const themeOptions = [
  { value: THEMES.LIGHT, label: 'Light' },
  { value: THEMES.DARK, label: 'Dark' },
];
