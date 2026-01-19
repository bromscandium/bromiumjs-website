import { useState } from 'bromium';
import { getThemeSetting, setThemeSetting } from '@/store/theme.ts';
import { getUnitsSetting, setUnitsSetting } from '@/store/units.ts';
import { getTimeFormatSetting, setTimeFormatSetting } from '@/store/timeFormats.ts';
import { getSaveLocationsSetting, setSaveLocationsSetting } from '@/store/locations.ts';
import { themeOptions } from '@/constants/themes.ts';
import { unitOptions } from '@/constants/units.ts';
import SettingRow from '../../components/rows/SettingRow.tsx';
import './style.css';

const timeFormatOptions = [
  { value: '12h', label: '12-hour' },
  { value: '24h', label: '24-hour' },
];

const saveLocationOptions = [
  { value: 'on', label: 'On' },
  { value: 'off', label: 'Off' },
];

export default function Settings() {
  const theme = useState(getThemeSetting());
  const units = useState(getUnitsSetting());
  const timeFormat = useState(getTimeFormatSetting());
  const saveLocations = useState(getSaveLocationsSetting() ? 'on' : 'off');

  function handleThemeChange(value: string) {
    theme.value = value as any;
    setThemeSetting(value as any);
  }

  function handleUnitsChange(value: string) {
    units.value = value as any;
    setUnitsSetting(value as any);
  }

  function handleTimeFormatChange(value: string) {
    timeFormat.value = value as any;
    setTimeFormatSetting(value as any);
  }

  function handleSaveLocationsChange(value: string) {
    saveLocations.value = value;
    setSaveLocationsSetting(value === 'on');
  }

  return (
    <div className="settings-container">
      <div className="settings-section">
        <h2 className="settings-section-title">General</h2>
        <SettingRow
          label="Theme"
          options={themeOptions}
          selectedValue={theme.value}
          onChange={handleThemeChange}
        />
      </div>

      <div className="settings-section">
        <h2 className="settings-section-title">Units</h2>
        <SettingRow
          label="Units"
          options={unitOptions}
          selectedValue={units.value}
          onChange={handleUnitsChange}
        />
        <SettingRow
          label="Time Format"
          options={timeFormatOptions}
          selectedValue={timeFormat.value}
          onChange={handleTimeFormatChange}
        />
      </div>

      <div className="settings-section">
        <h2 className="settings-section-title">Privacy</h2>
        <SettingRow
          label="Save Last Locations"
          options={saveLocationOptions}
          selectedValue={saveLocations.value}
          onChange={handleSaveLocationsChange}
        />
      </div>
    </div>
  );
}
