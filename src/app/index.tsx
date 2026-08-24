import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BookCard } from '@/components/reader/book-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import {
  getAllBooks,
  loadCustomBooks,
  saveCustomBook,
} from '@/services/book-repository';
import { parseEpub } from '@/services/epub-parser';
import { Book } from '@/types/reader';

export default function LibraryScreen() {
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const [books, setBooks] = useState<Book[]>(getAllBooks());
  const [activeBookId, setActiveBookId] = useState('meditations');
  const [isImporting, setIsImporting] = useState(false);

  useEffect(() => {
    loadCustomBooks().then((loaded) => {
      setBooks(getAllBooks());
    });
  }, []);

  const handleImportEpub = async () => {
    try {
      setIsImporting(true);
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/epub+zip', 'application/octet-stream', '*/*'],
        copyToCacheDirectory: true,
      });

      if (result.canceled || !result.assets || !result.assets[0]) {
        setIsImporting(false);
        return;
      }

      const file = result.assets[0];
      const fallbackTitle = file.name ? file.name.replace(/\.epub$/i, '') : 'Imported Book';

      let parsedBook: Book;

      if (Platform.OS === 'web' && file.file) {
        const arrayBuffer = await file.file.arrayBuffer();
        parsedBook = await parseEpub(arrayBuffer, fallbackTitle);
      } else {
        const base64Data = await FileSystem.readAsStringAsync(file.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        parsedBook = await parseEpub(base64Data, fallbackTitle);
      }

      await saveCustomBook(parsedBook);
      setBooks(getAllBooks());
      setActiveBookId(parsedBook.id);
      setIsImporting(false);

      router.push(`/reader/${parsedBook.id}`);
    } catch (err: any) {
      setIsImporting(false);
      Alert.alert(
        'Import Failed',
        err?.message || 'Could not parse the selected EPUB file. Please ensure it is a valid DRM-free EPUB.'
      );
    }
  };

  const activeBook = books.find((b) => b.id === activeBookId) ?? books[0];

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
                {books.length} {books.length === 1 ? 'book' : 'books'} available offline
              </ThemedText>
            </View>

            <View style={styles.headerActions}>
              <Pressable
                onPress={handleImportEpub}
                disabled={isImporting}
                style={({ pressed }) => [
                  styles.actionButton,
                  {
                    borderColor: theme.text,
                    backgroundColor: pressed ? theme.backgroundElement : theme.background,
                  },
                ]}>
                {isImporting ? (
                  <ActivityIndicator size="small" color={theme.text} />
                ) : (
                  <>
                    <SymbolView
                      name={{ ios: 'plus', android: 'add', web: 'add' }}
                      size={14}
                      tintColor={theme.text}
                    />
                    <ThemedText style={styles.actionButtonText}>Import EPUB</ThemedText>
                  </>
                )}
              </Pressable>

              <Pressable
                onPress={() => router.push('/explore')}
                style={[styles.systemLink, { borderColor: theme.border }]}>
                <ThemedText style={styles.systemLinkText}>Architecture</ThemedText>
              </Pressable>
            </View>
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
                          { backgroundColor: theme.text, width: '20%' },
                        ]}
                      />
                    </View>
                    <ThemedText themeColor="textSecondary" style={styles.progressPercent}>
                      {activeBook.totalChapters} chapters • {activeBook.estimatedReadTime}
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
              {books.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  percentage={book.id === activeBookId ? 20 : 0}
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
    fontSize: 14,
    marginTop: Spacing.half,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.half,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: Spacing.two,
    borderWidth: 1,
    height: 34,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  systemLink: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: Spacing.two,
    borderWidth: StyleSheet.hairlineWidth,
    height: 34,
    justifyContent: 'center',
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
