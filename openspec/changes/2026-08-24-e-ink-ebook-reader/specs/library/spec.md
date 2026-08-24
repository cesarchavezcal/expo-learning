# Specification: Library & Bookshelf

## Requirements

### Requirement 1: Bookshelf Catalog Display
The home screen MUST display a curated list of offline-available books with progress metadata.

#### Acceptance Criteria
1. The bookshelf lists all available books with title, author, total chapters, and estimated reading time.
2. If a book has active reading progress, the bookshelf renders a progress badge (e.g. `42% complete`).
3. Tapping any book navigates immediately to `/reader/[id]`.

### Requirement 2: Reading Position Persistence
The application MUST persist reading progress (active book, chapter index, and page index) locally using AsyncStorage.

#### Acceptance Criteria
1. When leaving a book and returning later, the reader must resume at the exact last read chapter and page.
2. The library header highlights the most recently read book for instant one-tap resume.
