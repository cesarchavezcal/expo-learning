# Object-Oriented User Experience (OOUX): E-Ink Reader

## 1. Domain Entities & Object Definitions

```text
┌─────────────────┐       1:N       ┌─────────────────┐
│      Book       ├────────────────►│     Chapter     │
└────────┬────────┘                 └─────────────────┘
         │ 1:1
         ▼
┌─────────────────┐
│ ReadingProgress │
└─────────────────┘
```

### Entity 1: `Book`
- **Identity**: `id: string`
- **Core Attributes**:
  - `title: string`
  - `author: string`
  - `coverColor: string`
  - `description: string`
  - `publishedYear: number`
  - `chapters: Chapter[]`
- **Nested Objects**: `chapters`, `progress`

### Entity 2: `Chapter`
- **Identity**: `id: string`
- **Core Attributes**:
  - `bookId: string`
  - `order: number`
  - `title: string`
  - `content: string` (Markdown / plain text content)

### Entity 3: `ReadingProgress`
- **Identity**: `bookId: string`
- **Core Attributes**:
  - `currentChapterIndex: number`
  - `currentPageIndex: number`
  - `totalCalculatedPages: number`
  - `percentage: number`
  - `lastReadTimestamp: number`
  - `bookmarks: Bookmark[]`

### Entity 4: `ReaderSettings`
- **Core Attributes**:
  - `themeMode: 'paper' | 'warm' | 'charcoal' | 'contrast'`
  - `fontFamily: 'serif' | 'sans' | 'mono'`
  - `fontSize: number` (Default: 17)
  - `lineHeightMultiplier: number` (Default: 1.6)
  - `einkRefreshSimulation: boolean` (Default: true)
  - `marginHorizontal: number` (Default: 24)
