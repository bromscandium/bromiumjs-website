import { STORAGE_KEYS } from '../constants/localStorage';
import { UNITS, Units } from '../constants/units';

export function getUnitsSetting(): Units {
  const value = localStorage.getItem(STORAGE_KEYS.UNITS);
  return (value as Units) || UNITS.METRIC;
}

export function setUnitsSetting(units: Units): void {
  if (units !== UNITS.METRIC && units !== UNITS.IMPERIAL) return;
  localStorage.setItem(STORAGE_KEYS.UNITS, units);
}

export function getTemperatureUnitSymbol(units?: string): string {
  const currentUnits = units || getUnitsSetting();
  return currentUnits === UNITS.IMPERIAL ? '°F' : '°C';
}

export function formatTemperature(temp: number, units?: string): string {
  const symbol = getTemperatureUnitSymbol(units);
  return `${temp}${symbol}`;
}

export function getWindSpeedUnit(units?: string): string {
  const currentUnits = units || getUnitsSetting();
  return currentUnits === UNITS.IMPERIAL ? 'mph' : 'km/h';
}
