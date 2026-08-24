import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

import { ReaderSettings } from '@/types/reader';

const SETTINGS_STORAGE_KEY = '@eink_reader_settings';

export const DEFAULT_READER_SETTINGS: ReaderSettings = {
  themeMode: 'paper',
  fontFamily: 'serif',
  fontSize: 18,
  lineHeight: 1.6,
  einkRefreshSimulation: true,
  marginHorizontal: 24,
};

export const THEME_PALETTES = {
  paper: {
    background: '#FFFFFF',
    text: '#111111',
    textSecondary: 'rgba(0, 0, 0, 0.60)',
    border: 'rgba(0, 0, 0, 0.10)',
    surface: 'rgba(0, 0, 0, 0.04)',
    accent: '#000000',
  },
  warm: {
    background: '#F6F3EB',
    text: '#22201D',
    textSecondary: 'rgba(34, 32, 29, 0.65)',
    border: 'rgba(34, 32, 29, 0.12)',
    surface: 'rgba(34, 32, 29, 0.05)',
    accent: '#22201D',
  },
  charcoal: {
    background: '#141414',
    text: '#E8E8E8',
    textSecondary: 'rgba(255, 255, 255, 0.55)',
    border: 'rgba(255, 255, 255, 0.10)',
    surface: 'rgba(255, 255, 255, 0.06)',
    accent: '#FFFFFF',
  },
  contrast: {
    background: '#000000',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.75)',
    border: 'rgba(255, 255, 255, 0.20)',
    surface: 'rgba(255, 255, 255, 0.10)',
    accent: '#FFFFFF',
  },
};

export function useReaderSettings() {
  const [settings, setSettings] = useState<ReaderSettings>(DEFAULT_READER_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(SETTINGS_STORAGE_KEY)
      .then((stored) => {
        if (stored) {
          try {
            setSettings({ ...DEFAULT_READER_SETTINGS, ...JSON.parse(stored) });
          } catch {
            // Ignore parse errors, fallback to default
          }
        }
      })
      .finally(() => setIsLoaded(true));
  }, []);

  const updateSettings = (partial: Partial<ReaderSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(next)).catch(() => {});
      return next;
    });
  };

  const palette = THEME_PALETTES[settings.themeMode] ?? THEME_PALETTES.paper;

  return {
    settings,
    palette,
    isLoaded,
    updateSettings,
  };
}
