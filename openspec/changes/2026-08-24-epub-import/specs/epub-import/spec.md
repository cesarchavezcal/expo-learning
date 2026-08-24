# Specification: EPUB File Import

## Requirements

### Requirement 1: Native Document Picker
The library interface MUST provide an "Import Book" button that launches the native OS file picker filtering for `application/epub+zip` / `.epub` files.

#### Acceptance Criteria
1. When the user taps "Import EPUB", `getDocumentAsync` opens with `.epub` MIME types.
2. If the user cancels the picker, no error is thrown and the library state remains unchanged.

### Requirement 2: EPUB Content Unpacking & Sanitization
The system MUST unpack the `.epub` archive, locate the OPF package document, and extract chapters with formatted plain text.

#### Acceptance Criteria
1. The parser extracts the book title and author, falling back to the filename if metadata is missing.
2. The parser strips HTML tags while preserving paragraph spacing (`\n\n`) and chapter headings.
3. The parsed book is stored in persistent storage and becomes immediately available in the library list.
