import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

import { ReadingProgress } from '@/types/reader';

const PROGRESS_STORAGE_PREFIX = '@eink_progress_';

export function useReadingProgress(bookId: string) {
  const [progress, setProgress] = useState<ReadingProgress>({
    bookId,
    currentChapterIndex: 0,
    currentPageIndex: 0,
    percentage: 0,
    lastReadTimestamp: Date.now(),
    bookmarks: [],
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(`${PROGRESS_STORAGE_PREFIX}${bookId}`)
      .then((stored) => {
        if (stored) {
          try {
            setProgress(JSON.parse(stored));
          } catch {
            // Ignore parse errors
          }
        }
      })
      .finally(() => setIsLoaded(true));
  }, [bookId]);

  const saveProgress = (chapterIndex: number, pageIndex: number, totalChapters: number) => {
    const calculatedPercent = Math.min(
      100,
      Math.round(((chapterIndex + 1) / Math.max(1, totalChapters)) * 100)
    );

    setProgress((prev) => {
      const updated: ReadingProgress = {
        ...prev,
        currentChapterIndex: chapterIndex,
        currentPageIndex: pageIndex,
        percentage: calculatedPercent,
        lastReadTimestamp: Date.now(),
      };
      AsyncStorage.setItem(`${PROGRESS_STORAGE_PREFIX}${bookId}`, JSON.stringify(updated)).catch(
        () => {}
      );
      return updated;
    });
  };

  const toggleBookmark = (chapterIndex: number, pageIndex: number, snippet: string) => {
    setProgress((prev) => {
      const exists = prev.bookmarks.some(
        (b) => b.chapterIndex === chapterIndex && b.pageIndex === pageIndex
      );
      const bookmarks = exists
        ? prev.bookmarks.filter(
            (b) => !(b.chapterIndex === chapterIndex && b.pageIndex === pageIndex)
          )
        : [
            ...prev.bookmarks,
            {
              id: `${chapterIndex}-${pageIndex}-${Date.now()}`,
              chapterIndex,
              pageIndex,
              snippet,
              createdAt: Date.now(),
            },
          ];

      const updated: ReadingProgress = {
        ...prev,
        bookmarks,
      };
      AsyncStorage.setItem(`${PROGRESS_STORAGE_PREFIX}${bookId}`, JSON.stringify(updated)).catch(
        () => {}
      );
      return updated;
    });
  };

  return {
    progress,
    isLoaded,
    saveProgress,
    toggleBookmark,
  };
}
