export const UNITS = {
  METRIC: 'metric',
  IMPERIAL: 'imperial',
} as const;

export type Units = (typeof UNITS)[keyof typeof UNITS];

export const unitOptions = [
  { value: UNITS.METRIC, label: 'Metric (°C)' },
  { value: UNITS.IMPERIAL, label: 'Imperial (°F)' },
];
