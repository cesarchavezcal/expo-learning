import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

type EinkFlashProps = {
  triggerKey: number | string;
  enabled: boolean;
};

export function EinkFlash({ triggerKey, enabled }: EinkFlashProps) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (!enabled) return;
    // Emulates e-ink electrophoretic microcapsule clear flash (black -> white -> transparent)
    opacity.value = withSequence(
      withTiming(0.85, { duration: 40 }),
      withTiming(0.2, { duration: 30 }),
      withTiming(0, { duration: 50 })
    );
  }, [triggerKey, enabled, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (!enabled) return null;

  return (
    <Animated.View
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, styles.flash, animatedStyle]}
    />
  );
}

const styles = StyleSheet.create({
  flash: {
    backgroundColor: '#000000',
    zIndex: 999,
  },
});
