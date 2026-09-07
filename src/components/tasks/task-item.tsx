import { SymbolView } from 'expo-symbols';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Task } from '@/types/task';

type TaskItemProps = {
  task: Task;
  onComplete?: () => void;
  onPromote?: () => void;
  onDelete?: () => void;
};

export function TaskItem({ task, onComplete, onPromote, onDelete }: TaskItemProps) {
  const theme = useTheme();
  const scale = useSharedValue(1);

  const isDone = task.status === 'done';

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 15, stiffness: 250 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 250 });
  };

  return (
    <Animated.View style={[styles.wrapper, animatedStyle]}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.container,
          {
            borderColor: theme.border,
            backgroundColor: isDone ? theme.backgroundElement : theme.background,
          },
        ]}>
        {/* Checkbox */}
        <Pressable
          hitSlop={12}
          onPress={onComplete}
          style={[
            styles.checkbox,
            {
              borderColor: isDone ? theme.textSecondary : theme.borderStrong,
              backgroundColor: isDone ? theme.text : 'transparent',
            },
          ]}>
          {isDone && (
            <SymbolView
              name={{ ios: 'checkmark', android: 'check', web: 'check' }}
              size={12}
              tintColor={theme.background}
            />
          )}
        </Pressable>

        {/* Title and metadata */}
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              {
                color: isDone ? theme.textTertiary : theme.text,
                textDecorationLine: isDone ? 'line-through' : 'none',
              },
            ]}>
            {task.title}
          </Text>

          {task.microSteps.length > 0 && (
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              {task.microSteps.filter((s) => s.isCompleted).length}/{task.microSteps.length} steps
            </Text>
          )}
        </View>

        {/* Promote to Now Button (if in later) */}
        {task.status === 'later' && onPromote && (
          <Pressable
            hitSlop={8}
            onPress={onPromote}
            style={[styles.promoteButton, { borderColor: theme.border }]}>
            <Text style={[styles.promoteText, { color: theme.text }]}>Focus Now</Text>
          </Pressable>
        )}

        {/* Delete */}
        {onDelete && (
          <Pressable hitSlop={8} onPress={onDelete} style={styles.deleteButton}>
            <SymbolView
              name={{ ios: 'trash', android: 'delete', web: 'delete' }}
              size={14}
              tintColor={theme.textTertiary}
            />
          </Pressable>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.two,
    borderWidth: StyleSheet.hairlineWidth,
    gap: Spacing.three,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 20,
  },
  subtitle: {
    fontSize: 12,
  },
  promoteButton: {
    paddingHorizontal: Spacing.two,
    paddingVertical: 4,
    borderRadius: Spacing.one,
    borderWidth: StyleSheet.hairlineWidth,
  },
  promoteText: {
    fontSize: 11,
    fontWeight: '500',
  },
  deleteButton: {
    padding: 4,
  },
});
