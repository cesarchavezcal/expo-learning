import { SymbolView } from 'expo-symbols';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { MicroStepList } from './micro-step-list';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Task } from '@/types/task';

type NowCardProps = {
  task?: Task;
  onComplete: () => void;
  onToggleMicroStep: (stepId: string) => void;
  onAddMicroStep: (title: string) => void;
  onSkip?: () => void;
};

export function NowCard({
  task,
  onComplete,
  onToggleMicroStep,
  onAddMicroStep,
  onSkip,
}: NowCardProps) {
  const theme = useTheme();
  const buttonScale = useSharedValue(1);

  const [timerSeconds, setTimerSeconds] = useState(15 * 60);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let interval: any;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds((s) => s - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handlePressIn = () => {
    buttonScale.value = withSpring(0.95, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    buttonScale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  if (!task) {
    return (
      <View style={[styles.emptyContainer, { borderColor: theme.border, backgroundColor: theme.backgroundElement }]}>
        <SymbolView
          name={{ ios: 'sparkles', android: 'auto_awesome', web: 'auto_awesome' }}
          size={28}
          tintColor={theme.textSecondary}
        />
        <Text style={[styles.emptyTitle, { color: theme.text }]}>Mind is clear</Text>
        <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
          No active tasks right now. Dump a thought above to start.
        </Text>
      </View>
    );
  }

  const formatTimer = () => {
    const mins = Math.floor(timerSeconds / 60);
    const secs = timerSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <View style={[styles.container, { borderColor: theme.borderStrong, backgroundColor: theme.background }]}>
      {/* Top Meta Bar */}
      <View style={styles.topRow}>
        <View style={[styles.badge, { backgroundColor: theme.text }]}>
          <Text style={[styles.badgeText, { color: theme.background }]}>FOCUS NOW</Text>
        </View>

        {/* 15m Momentum Timer Toggle */}
        <Pressable
          hitSlop={8}
          onPress={() => setTimerActive((a) => !a)}
          style={[
            styles.timerBadge,
            {
              borderColor: theme.border,
              backgroundColor: timerActive ? theme.backgroundElement : 'transparent',
            },
          ]}>
          <SymbolView
            name={{ ios: 'timer', android: 'timer', web: 'timer' }}
            size={12}
            tintColor={timerActive ? theme.text : theme.textSecondary}
          />
          <Text
            style={[
              styles.timerText,
              {
                color: timerActive ? theme.text : theme.textSecondary,
                fontWeight: timerActive ? '600' : '400',
              },
            ]}>
            {formatTimer()}
          </Text>
        </Pressable>
      </View>

      {/* The Single Big Task Title */}
      <Text style={[styles.title, { color: theme.text }]}>{task.title}</Text>

      {/* Micro-steps Breakdown */}
      <MicroStepList
        steps={task.microSteps}
        onToggle={onToggleMicroStep}
        onAddStep={onAddMicroStep}
      />

      {/* Big Tactile Complete Action */}
      <View style={styles.actionRow}>
        <Animated.View style={[{ flex: 1 }, buttonAnimatedStyle]}>
          <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={onComplete}
            style={[styles.doneButton, { backgroundColor: theme.text }]}>
            <SymbolView
              name={{ ios: 'checkmark.circle.fill', android: 'check_circle', web: 'check_circle' }}
              size={18}
              tintColor={theme.background}
            />
            <Text style={[styles.doneText, { color: theme.background }]}>Mark Complete</Text>
          </Pressable>
        </Animated.View>

        {onSkip && (
          <Pressable hitSlop={8} onPress={onSkip} style={[styles.skipButton, { borderColor: theme.border }]}>
            <Text style={[styles.skipText, { color: theme.textSecondary }]}>Later</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Spacing.three,
    borderWidth: 1.5,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    paddingHorizontal: Spacing.two,
    paddingVertical: 3,
    borderRadius: Spacing.one,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.two,
    paddingVertical: 3,
    borderRadius: Spacing.one,
    borderWidth: StyleSheet.hairlineWidth,
  },
  timerText: {
    fontSize: 12,
    fontVariant: ['tabular-nums'],
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: -0.3,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  doneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    gap: Spacing.two,
  },
  doneText: {
    fontSize: 15,
    fontWeight: '600',
  },
  skipButton: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipText: {
    fontSize: 13,
    fontWeight: '500',
  },
  emptyContainer: {
    borderRadius: Spacing.three,
    borderWidth: StyleSheet.hairlineWidth,
    padding: Spacing.six,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: Spacing.one,
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: 'center',
    maxWidth: 240,
    lineHeight: 18,
  },
});
