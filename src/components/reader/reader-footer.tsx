import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';
import { THEME_PALETTES } from '@/hooks/use-reader-settings';
import { ReaderThemeMode } from '@/types/reader';

type ReaderFooterProps = {
  chapterNumber: number;
  totalChapters: number;
  pageNumber: number;
  totalPages: number;
  percentage: number;
  themeMode: ReaderThemeMode;
};

export function ReaderFooter({
  chapterNumber,
  totalChapters,
  pageNumber,
  totalPages,
  percentage,
  themeMode,
}: ReaderFooterProps) {
  const insets = useSafeAreaInsets();
  const palette = THEME_PALETTES[themeMode];

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: Math.max(insets.bottom, Spacing.three),
          backgroundColor: palette.background,
          borderTopColor: palette.border,
        },
      ]}>
      <Text style={[styles.text, { color: palette.textSecondary }]}>
        Ch. {chapterNumber} of {totalChapters}
      </Text>

      <Text style={[styles.text, { color: palette.textSecondary }]}>
        Page {pageNumber} of {totalPages}
      </Text>

      <Text style={[styles.text, { color: palette.textSecondary }]}>{percentage}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  text: {
    fontSize: 11,
    fontVariant: ['tabular-nums'],
    letterSpacing: 0.2,
  },
});
