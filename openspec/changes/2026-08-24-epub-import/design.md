# Design: EPUB Parsing & Local Book Storage Architecture

## 1. Flow Diagram

```text
User Taps "Import EPUB"
          │
          ▼
expo-document-picker (Selects .epub file)
          │
          ▼
Base64 / Binary File Read (expo-file-system / FileReader)
          │
          ▼
JSZip Unpacks EPUB Container
   ├── META-INF/container.xml ➔ Locates rootfile (.opf)
   ├── content.opf ➔ Extracts Title, Author, Spine, and Manifest items
   └── XHTML/HTML Chapters ➔ Cleans tags, converts to formatted plain text
          │
          ▼
Book Object Instantiation
          │
          ▼
AsyncStorage Persistence (`@eink_custom_books`)
          │
          ▼
Bookshelf Updates & Auto-Navigates to `/reader/[id]`
```

## 2. Parsing Architecture
- **ZIP Unpack**: `JSZip.loadAsync(binaryData)`.
- **Manifest Locator**: Parse `META-INF/container.xml` using regex/DOM to find the `full-path` to the package document.
- **Metadata Extraction**: Parse `<dc:title>` and `<dc:creator>`.
- **Spine & Manifest Order**: Follow `<spine>` itemrefs to read chapter XHTML files in correct reading order.
- **HTML to Text Cleanser**: Strip scripts, convert headings/paragraphs into clean markdown/newlines, and decode HTML entities.
