import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { EinkFlash } from '@/components/reader/eink-flash';
import { ReaderCanvas, sliceContentIntoPages } from '@/components/reader/reader-canvas';
import { ReaderFooter } from '@/components/reader/reader-footer';
import { ReaderHeader } from '@/components/reader/reader-header';
import { SettingsSheet } from '@/components/reader/settings-sheet';
import { TocSheet } from '@/components/reader/toc-sheet';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useReaderSettings } from '@/hooks/use-reader-settings';
import { useReadingProgress } from '@/hooks/use-reading-progress';
import { getBookById } from '@/services/book-repository';

export default function ReaderScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const book = getBookById(id ?? '');

  const { settings, palette, updateSettings } = useReaderSettings();
  const { progress, isLoaded, saveProgress } = useReadingProgress(id ?? '');

  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [showChrome, setShowChrome] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showToc, setShowToc] = useState(false);
  const [flashKey, setFlashKey] = useState(0);

  useEffect(() => {
    if (isLoaded && progress) {
      setCurrentChapterIndex(progress.currentChapterIndex || 0);
      setCurrentPageIndex(progress.currentPageIndex || 0);
    }
  }, [isLoaded, progress]);

  if (!book) {
    return (
      <ThemedView style={styles.errorContainer}>
        <ThemedText>Book not found.</ThemedText>
      </ThemedView>
    );
  }

  const currentChapter = book.chapters[currentChapterIndex] ?? book.chapters[0];
  const pages = sliceContentIntoPages(currentChapter.content, settings.fontSize);
  const totalPages = pages.length;

  const triggerEinkFlash = () => {
    if (settings.einkRefreshSimulation) {
      setFlashKey((k) => k + 1);
    }
  };

  const handleNextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      const nextP = currentPageIndex + 1;
      setCurrentPageIndex(nextP);
      saveProgress(currentChapterIndex, nextP, book.totalChapters);
      triggerEinkFlash();
    } else if (currentChapterIndex < book.chapters.length - 1) {
      // Advance to next chapter
      const nextCh = currentChapterIndex + 1;
      setCurrentChapterIndex(nextCh);
      setCurrentPageIndex(0);
      saveProgress(nextCh, 0, book.totalChapters);
      triggerEinkFlash();
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      const prevP = currentPageIndex - 1;
      setCurrentPageIndex(prevP);
      saveProgress(currentChapterIndex, prevP, book.totalChapters);
      triggerEinkFlash();
    } else if (currentChapterIndex > 0) {
      // Go to previous chapter last page
      const prevCh = currentChapterIndex - 1;
      const prevPages = sliceContentIntoPages(
        book.chapters[prevCh].content,
        settings.fontSize
      );
      const lastP = Math.max(0, prevPages.length - 1);
      setCurrentChapterIndex(prevCh);
      setCurrentPageIndex(lastP);
      saveProgress(prevCh, lastP, book.totalChapters);
      triggerEinkFlash();
    }
  };

  const handleSelectChapter = (chIdx: number) => {
    setCurrentChapterIndex(chIdx);
    setCurrentPageIndex(0);
    saveProgress(chIdx, 0, book.totalChapters);
    triggerEinkFlash();
  };

  const currentPercentage = Math.min(
    100,
    Math.round(((currentChapterIndex + 1) / Math.max(1, book.totalChapters)) * 100)
  );

  return (
    <View style={[styles.container, { backgroundColor: palette.background }]}>
      <EinkFlash triggerKey={flashKey} enabled={settings.einkRefreshSimulation} />

      {showChrome && (
        <ReaderHeader
          title={book.title}
          themeMode={settings.themeMode}
          onBack={() => router.back()}
          onOpenToc={() => setShowToc(true)}
          onOpenSettings={() => setShowSettings(true)}
        />
      )}

      <ReaderCanvas
        content={currentChapter.content}
        chapterTitle={currentChapter.title}
        currentPage={currentPageIndex}
        settings={settings}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        onToggleChrome={() => setShowChrome((v) => !v)}
      />

      <ReaderFooter
        chapterNumber={currentChapterIndex + 1}
        totalChapters={book.totalChapters}
        pageNumber={currentPageIndex + 1}
        totalPages={totalPages}
        percentage={currentPercentage}
        themeMode={settings.themeMode}
      />

      <SettingsSheet
        visible={showSettings}
        settings={settings}
        onUpdate={updateSettings}
        onClose={() => setShowSettings(false)}
      />

      <TocSheet
        visible={showToc}
        chapters={book.chapters}
        currentChapterIndex={currentChapterIndex}
        themeMode={settings.themeMode}
        onSelectChapter={handleSelectChapter}
        onClose={() => setShowToc(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
