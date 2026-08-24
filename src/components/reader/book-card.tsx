import { SymbolView } from 'expo-symbols';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Book } from '@/types/reader';

type BookCardProps = {
  book: Book;
  percentage?: number;
  onPress: () => void;
};

export function BookCard({ book, percentage = 0, onPress }: BookCardProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          borderColor: theme.border,
          backgroundColor: pressed ? theme.backgroundElement : 'transparent',
        },
      ]}>
      {/* Book spine / miniature cover preview */}
      <View style={[styles.cover, { backgroundColor: book.coverColor }]}>
        <Text numberOfLines={2} style={styles.coverTitle}>
          {book.title}
        </Text>
      </View>

      {/* Book Metadata */}
      <View style={styles.metadata}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, { color: theme.text }]}>{book.title}</Text>
          <SymbolView
            name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
            size={14}
            tintColor={theme.textSecondary}
          />
        </View>

        <Text style={[styles.author, { color: theme.textSecondary }]}>{book.author}</Text>

        <Text numberOfLines={2} style={[styles.description, { color: theme.textTertiary }]}>
          {book.description}
        </Text>

        <View style={styles.footerRow}>
          <Text style={[styles.readTime, { color: theme.textSecondary }]}>
            {book.totalChapters} chapters • {book.estimatedReadTime}
          </Text>

          {percentage > 0 && (
            <View style={[styles.badge, { borderColor: theme.border }]}>
              <Text style={[styles.badgeText, { color: theme.text }]}>{percentage}% read</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: Spacing.two,
    borderWidth: StyleSheet.hairlineWidth,
    padding: Spacing.three,
    gap: Spacing.three,
    alignItems: 'center',
  },
  cover: {
    width: 60,
    height: 84,
    borderRadius: Spacing.one,
    padding: Spacing.one,
    justifyContent: 'flex-end',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  coverTitle: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '600',
    lineHeight: 11,
  },
  metadata: {
    flex: 1,
    gap: Spacing.half,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
  author: {
    fontSize: 13,
    fontWeight: '400',
  },
  description: {
    fontSize: 12,
    lineHeight: 16,
    marginTop: Spacing.half,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.one,
  },
  readTime: {
    fontSize: 11,
    fontVariant: ['tabular-nums'],
  },
  badge: {
    borderRadius: Spacing.one,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: Spacing.one,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
});
