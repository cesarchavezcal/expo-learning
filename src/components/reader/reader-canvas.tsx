import React, { useMemo } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Fonts, Spacing } from '@/constants/theme';
import { THEME_PALETTES } from '@/hooks/use-reader-settings';
import { sliceContentIntoPages } from '@/services/pagination';
import { ReaderSettings } from '@/types/reader';

type ReaderCanvasProps = {
  content: string;
  chapterTitle: string;
  currentPage: number;
  settings: ReaderSettings;
  onPrevPage: () => void;
  onNextPage: () => void;
  onToggleChrome: () => void;
};

export { sliceContentIntoPages };

export function ReaderCanvas({
  content,
  chapterTitle,
  currentPage,
  settings,
  onPrevPage,
  onNextPage,
  onToggleChrome,
}: ReaderCanvasProps) {
  const insets = useSafeAreaInsets();
  const palette = THEME_PALETTES[settings.themeMode];
  const screenWidth = Dimensions.get('window').width;

  const pages = useMemo(
    () => sliceContentIntoPages(content, settings.fontSize),
    [content, settings.fontSize]
  );

  const pageText = pages[currentPage] ?? pages[0] ?? '';

  const fontFamily = useMemo(() => {
    switch (settings.fontFamily) {
      case 'serif':
        return Fonts.serif;
      case 'mono':
        return Fonts.mono;
      case 'sans':
      default:
        return Fonts.sans;
    }
  }, [settings.fontFamily]);

  const handlePress = (e: { nativeEvent: { locationX: number } }) => {
    const x = e.nativeEvent.locationX;
    if (x < screenWidth * 0.25) {
      onPrevPage();
    } else if (x > screenWidth * 0.75) {
      onNextPage();
    } else {
      onToggleChrome();
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[
        styles.container,
        {
          backgroundColor: palette.background,
          paddingHorizontal: settings.marginHorizontal,
          paddingTop: Math.max(insets.top, Spacing.four) + Spacing.three,
        },
      ]}>
      {currentPage === 0 && (
        <View style={styles.chapterHeader}>
          <Text
            style={[
              styles.chapterTitle,
              {
                color: palette.text,
                fontFamily,
              },
            ]}>
            {chapterTitle}
          </Text>
          <View style={[styles.chapterDivider, { backgroundColor: palette.border }]} />
        </View>
      )}

      <Text
        style={[
          styles.bodyText,
          {
            color: palette.text,
            fontFamily,
            fontSize: settings.fontSize,
            lineHeight: Math.round(settings.fontSize * settings.lineHeight),
          },
        ]}>
        {pageText}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.four,
    justifyContent: 'flex-start',
  },
  chapterHeader: {
    marginBottom: Spacing.four,
    gap: Spacing.two,
  },
  chapterTitle: {
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 28,
  },
  chapterDivider: {
    height: StyleSheet.hairlineWidth,
    width: 48,
    marginTop: Spacing.one,
  },
  bodyText: {
    fontWeight: '400',
    letterSpacing: -0.1,
  },
});
