import React, { useMemo } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Fonts, Spacing } from '@/constants/theme';
import { THEME_PALETTES } from '@/hooks/use-reader-settings';
import { triggerLightImpact } from '@/services/haptics';
import { sliceContentIntoPages } from '@/services/pagination';
import { ReaderSettings } from '@/types/reader';

type ReaderCanvasProps = {
  content: string;
  chapterTitle: string;
  currentPage: number;
  totalPages?: number;
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

  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onUpdate((e) => {
      // 1:1 direct tracking with soft boundary rubber-banding
      translateX.value = e.translationX;
    })
    .onEnd((e) => {
      const swipeDistance = e.translationX;
      const velocityX = e.velocityX;

      if (swipeDistance < -60 || velocityX < -500) {
        // Next page
        runOnJS(triggerLightImpact)();
        runOnJS(onNextPage)();
      } else if (swipeDistance > 60 || velocityX > 500) {
        // Previous page
        runOnJS(triggerLightImpact)();
        runOnJS(onPrevPage)();
      }

      // Spring back gracefully to center
      translateX.value = withSpring(0, { damping: 18, stiffness: 220 });
    });

  const tapGesture = Gesture.Tap().onEnd((e) => {
    const x = e.x;
    if (x < screenWidth * 0.25) {
      runOnJS(triggerLightImpact)();
      runOnJS(onPrevPage)();
    } else if (x > screenWidth * 0.75) {
      runOnJS(triggerLightImpact)();
      runOnJS(onNextPage)();
    } else {
      runOnJS(onToggleChrome)();
    }
  });

  const composedGesture = Gesture.Race(panGesture, tapGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: palette.background,
            paddingHorizontal: settings.marginHorizontal,
            paddingTop: Math.max(insets.top, Spacing.four) + Spacing.three,
          },
          animatedStyle,
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
      </Animated.View>
    </GestureDetector>
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
    letterSpacing: -0.3,
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
