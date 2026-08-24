import { SymbolView } from 'expo-symbols';
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';
import { THEME_PALETTES } from '@/hooks/use-reader-settings';
import { ReaderSettings, ReaderThemeMode } from '@/types/reader';

type SettingsSheetProps = {
  visible: boolean;
  settings: ReaderSettings;
  onUpdate: (partial: Partial<ReaderSettings>) => void;
  onClose: () => void;
};

export function SettingsSheet({ visible, settings, onUpdate, onClose }: SettingsSheetProps) {
  const insets = useSafeAreaInsets();
  const palette = THEME_PALETTES[settings.themeMode];

  const themes: { id: ReaderThemeMode; label: string }[] = [
    { id: 'paper', label: 'Paper' },
    { id: 'warm', label: 'Warm' },
    { id: 'charcoal', label: 'Charcoal' },
    { id: 'contrast', label: 'OLED' },
  ];

  const fonts: { id: 'serif' | 'sans' | 'mono'; label: string }[] = [
    { id: 'serif', label: 'Serif' },
    { id: 'sans', label: 'Sans' },
    { id: 'mono', label: 'Mono' },
  ];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
          style={[
            styles.sheet,
            {
              backgroundColor: palette.background,
              borderColor: palette.border,
              paddingBottom: Math.max(insets.bottom, Spacing.four),
            },
          ]}
          onPress={(e) => e.stopPropagation()}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: palette.text }]}>Display & Typography</Text>
            <Pressable onPress={onClose} hitSlop={8}>
              <SymbolView
                name={{ ios: 'xmark', android: 'close', web: 'close' }}
                size={16}
                tintColor={palette.textSecondary}
              />
            </Pressable>
          </View>

          {/* Theme Palette Selection */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: palette.textSecondary }]}>Appearance</Text>
            <View style={styles.segmentedRow}>
              {themes.map((t) => (
                <Pressable
                  key={t.id}
                  onPress={() => onUpdate({ themeMode: t.id })}
                  style={[
                    styles.segmentButton,
                    {
                      borderColor: palette.border,
                      backgroundColor:
                        settings.themeMode === t.id ? palette.surface : 'transparent',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.segmentText,
                      {
                        color: settings.themeMode === t.id ? palette.text : palette.textSecondary,
                        fontWeight: settings.themeMode === t.id ? '600' : '400',
                      },
                    ]}>
                    {t.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Font Family Selection */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: palette.textSecondary }]}>Typeface</Text>
            <View style={styles.segmentedRow}>
              {fonts.map((f) => (
                <Pressable
                  key={f.id}
                  onPress={() => onUpdate({ fontFamily: f.id })}
                  style={[
                    styles.segmentButton,
                    {
                      borderColor: palette.border,
                      backgroundColor:
                        settings.fontFamily === f.id ? palette.surface : 'transparent',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.segmentText,
                      {
                        color: settings.fontFamily === f.id ? palette.text : palette.textSecondary,
                        fontWeight: settings.fontFamily === f.id ? '600' : '400',
                      },
                    ]}>
                    {f.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Font Size Step Slider */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: palette.textSecondary }]}>Size ({settings.fontSize}px)</Text>
            <View style={styles.stepperRow}>
              <Pressable
                onPress={() => onUpdate({ fontSize: Math.max(14, settings.fontSize - 1) })}
                style={[styles.stepperButton, { borderColor: palette.border }]}>
                <Text style={[styles.stepperText, { color: palette.text }]}>A-</Text>
              </Pressable>

              <View style={styles.sizeIndicator}>
                <Text style={[styles.indicatorText, { color: palette.text }]}>
                  {settings.fontSize}
                </Text>
              </View>

              <Pressable
                onPress={() => onUpdate({ fontSize: Math.min(24, settings.fontSize + 1) })}
                style={[styles.stepperButton, { borderColor: palette.border }]}>
                <Text style={[styles.stepperText, { color: palette.text }]}>A+</Text>
              </Pressable>
            </View>
          </View>

          {/* E-Ink Waveform Flash Simulation Toggle */}
          <View style={[styles.section, styles.toggleRow]}>
            <View>
              <Text style={[styles.toggleTitle, { color: palette.text }]}>E-Ink Refresh Flash</Text>
              <Text style={[styles.toggleSubtitle, { color: palette.textSecondary }]}>
                Simulate electronic ink waveform refresh
              </Text>
            </View>
            <Pressable
              onPress={() =>
                onUpdate({ einkRefreshSimulation: !settings.einkRefreshSimulation })
              }
              style={[
                styles.togglePill,
                {
                  backgroundColor: settings.einkRefreshSimulation
                    ? palette.text
                    : palette.surface,
                  borderColor: palette.border,
                },
              ]}>
              <Text
                style={[
                  styles.togglePillText,
                  {
                    color: settings.einkRefreshSimulation
                      ? palette.background
                      : palette.textSecondary,
                  },
                ]}>
                {settings.einkRefreshSimulation ? 'ON' : 'OFF'}
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.40)',
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: Spacing.four,
    borderTopRightRadius: Spacing.four,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    gap: Spacing.four,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: Spacing.two,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    gap: Spacing.two,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  segmentedRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Spacing.two,
    borderWidth: StyleSheet.hairlineWidth,
  },
  segmentText: {
    fontSize: 13,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  stepperButton: {
    flex: 1,
    paddingVertical: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Spacing.two,
    borderWidth: StyleSheet.hairlineWidth,
  },
  stepperText: {
    fontSize: 14,
    fontWeight: '600',
  },
  sizeIndicator: {
    width: 48,
    alignItems: 'center',
  },
  indicatorText: {
    fontSize: 16,
    fontVariant: ['tabular-nums'],
    fontWeight: '600',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.two,
  },
  toggleTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  toggleSubtitle: {
    fontSize: 12,
    marginTop: Spacing.half,
  },
  togglePill: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: Spacing.two,
    borderWidth: StyleSheet.hairlineWidth,
  },
  togglePillText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
