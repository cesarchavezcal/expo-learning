export type Chapter = {
  id: string;
  bookId: string;
  order: number;
  title: string;
  content: string;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  coverColor: string;
  description: string;
  publishedYear: number;
  totalChapters: number;
  estimatedReadTime: string;
  chapters: Chapter[];
};

export type Bookmark = {
  id: string;
  chapterIndex: number;
  pageIndex: number;
  snippet: string;
  createdAt: number;
};

export type ReadingProgress = {
  bookId: string;
  currentChapterIndex: number;
  currentPageIndex: number;
  percentage: number;
  lastReadTimestamp: number;
  bookmarks: Bookmark[];
};

export type ReaderThemeMode = 'paper' | 'warm' | 'charcoal' | 'contrast';

export type ReaderSettings = {
  themeMode: ReaderThemeMode;
  fontFamily: 'serif' | 'sans' | 'mono';
  fontSize: number;
  lineHeight: number;
  einkRefreshSimulation: boolean;
  marginHorizontal: number;
};
