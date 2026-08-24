import { SymbolView } from 'expo-symbols';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';
import { THEME_PALETTES } from '@/hooks/use-reader-settings';
import { ReaderThemeMode } from '@/types/reader';

type ReaderHeaderProps = {
  title: string;
  themeMode: ReaderThemeMode;
  onBack: () => void;
  onOpenToc: () => void;
  onOpenSettings: () => void;
};

export function ReaderHeader({
  title,
  themeMode,
  onBack,
  onOpenToc,
  onOpenSettings,
}: ReaderHeaderProps) {
  const insets = useSafeAreaInsets();
  const palette = THEME_PALETTES[themeMode];

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + Spacing.two,
          backgroundColor: palette.background,
          borderBottomColor: palette.border,
        },
      ]}>
      <Pressable onPress={onBack} hitSlop={12} style={styles.iconButton}>
        <SymbolView
          name={{ ios: 'chevron.left', android: 'chevron_left', web: 'chevron_left' }}
          size={18}
          tintColor={palette.text}
        />
      </Pressable>

      <Text numberOfLines={1} style={[styles.title, { color: palette.text }]}>
        {title}
      </Text>

      <View style={styles.rightActions}>
        <Pressable onPress={onOpenToc} hitSlop={12} style={styles.iconButton}>
          <SymbolView
            name={{ ios: 'list.bullet', android: 'format_list_bulleted', web: 'list' }}
            size={18}
            tintColor={palette.text}
          />
        </Pressable>

        <Pressable onPress={onOpenSettings} hitSlop={12} style={styles.iconButton}>
          <SymbolView
            name={{ ios: 'textformat.size', android: 'format_size', web: 'format_size' }}
            size={18}
            tintColor={palette.text}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: Spacing.two,
    opacity: 0.7,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  iconButton: {
    padding: Spacing.half,
  },
});
