import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BookCard } from '@/components/reader/book-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { BOOKS_CATALOG } from '@/services/book-repository';

export default function LibraryScreen() {
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const [activeBookId, setActiveBookId] = useState('meditations');

  const activeBook = BOOKS_CATALOG.find((b) => b.id === activeBookId) ?? BOOKS_CATALOG[0];

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + Spacing.four,
            paddingBottom: insets.bottom + Spacing.six,
          },
        ]}>
        <View style={styles.contentWrapper}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View>
              <ThemedText type="title">Library</ThemedText>
              <ThemedText themeColor="textSecondary" style={styles.headerSubtitle}>
                Distraction-free e-ink reading
              </ThemedText>
            </View>

            <Pressable
              onPress={() => router.push('/explore')}
              style={[styles.systemLink, { borderColor: theme.border }]}>
              <ThemedText style={styles.systemLinkText}>Architecture</ThemedText>
            </Pressable>
          </View>

          {/* Continue Reading Hero Card */}
          {activeBook && (
            <View style={styles.section}>
              <View style={[styles.sectionHeader, { borderBottomColor: theme.border }]}>
                <ThemedText style={styles.sectionTitle}>Continue reading</ThemedText>
              </View>

              <Pressable
                onPress={() => router.push(`/reader/${activeBook.id}`)}
                style={({ pressed }) => [
                  styles.heroCard,
                  {
                    borderColor: theme.borderStrong,
                    backgroundColor: pressed ? theme.backgroundElement : theme.background,
                  },
                ]}>
                <View style={[styles.heroCover, { backgroundColor: activeBook.coverColor }]}>
                  <Text style={styles.heroCoverText}>{activeBook.title}</Text>
                </View>

                <View style={styles.heroInfo}>
                  <ThemedText style={styles.heroTitle}>{activeBook.title}</ThemedText>
                  <ThemedText themeColor="textSecondary" style={styles.heroAuthor}>
                    {activeBook.author}
                  </ThemedText>
                  <ThemedText numberOfLines={2} themeColor="textTertiary" style={styles.heroDesc}>
                    {activeBook.description}
                  </ThemedText>

                  <View style={styles.heroProgressRow}>
                    <View style={[styles.progressBarBg, { backgroundColor: theme.backgroundElement }]}>
                      <View
                        style={[
                          styles.progressBarFill,
                          { backgroundColor: theme.text, width: '25%' },
                        ]}
                      />
                    </View>
                    <ThemedText themeColor="textSecondary" style={styles.progressPercent}>
                      Book I • 25%
                    </ThemedText>
                  </View>
                </View>
              </Pressable>
            </View>
          )}

          {/* Catalog Section */}
          <View style={styles.section}>
            <View style={[styles.sectionHeader, { borderBottomColor: theme.border }]}>
              <ThemedText style={styles.sectionTitle}>All books</ThemedText>
            </View>

            <View style={styles.bookList}>
              {BOOKS_CATALOG.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  percentage={book.id === activeBookId ? 25 : 0}
                  onPress={() => {
                    setActiveBookId(book.id);
                    router.push(`/reader/${book.id}`);
                  }}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.four,
  },
  contentWrapper: {
    maxWidth: MaxContentWidth,
    width: '100%',
    alignSelf: 'center',
    gap: Spacing.five,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingBottom: Spacing.two,
  },
  headerSubtitle: {
    fontSize: 15,
    marginTop: Spacing.half,
  },
  systemLink: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: Spacing.two,
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: Spacing.one,
  },
  systemLinkText: {
    fontSize: 13,
    fontWeight: '500',
  },
  section: {
    gap: Spacing.three,
  },
  sectionHeader: {
    paddingBottom: Spacing.two,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.2,
    opacity: 0.64,
  },
  heroCard: {
    flexDirection: 'row',
    borderRadius: Spacing.three,
    borderWidth: 1,
    padding: Spacing.four,
    gap: Spacing.four,
    alignItems: 'center',
  },
  heroCover: {
    width: 72,
    height: 104,
    borderRadius: Spacing.two,
    padding: Spacing.two,
    justifyContent: 'flex-end',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  heroCoverText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 14,
  },
  heroInfo: {
    flex: 1,
    gap: Spacing.half,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  heroAuthor: {
    fontSize: 14,
  },
  heroDesc: {
    fontSize: 12,
    lineHeight: 16,
    marginTop: Spacing.half,
  },
  heroProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  progressBarBg: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
  },
  progressPercent: {
    fontSize: 11,
    fontVariant: ['tabular-nums'],
  },
  bookList: {
    gap: Spacing.three,
  },
});
