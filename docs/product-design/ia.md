# Information Architecture: E-Ink Ebook Reader

## 1. Global Sitemap & Route Hierarchy

```text
src/app/
├── _layout.tsx                     # Universal Tab & Theme Provider
├── index.tsx                       # Library Screen (Bookshelf)
├── explore.tsx                     # E-Ink Philosophy & Architecture Notes
├── reader/
│   └── [id].tsx                    # Immersive E-Ink Reader View
└── (modals)/
    └── settings.tsx                # Typography & Display Preferences Modal
```

---

## 2. Screen & Flow Specifications

### 2.1 Library View (`/index`)
- **Header**: Quiet title `"Library"` with total books count and current reading progress summary.
- **Hero / Continue Reading Card**: Large minimalist chapter progress card for the active book with percentage bar.
- **Book Grid / List**: Editorial book items showing Title, Author, Chapter Count, and Progress Badge.
- **Top Actions**: Display mode toggle (Paper Light / Charcoal Dark / Monochrome Contrast).

### 2.2 Reader View (`/reader/[id]`)
- **Canvas**: Immersive distraction-free page layout.
- **Header (Overlay)**: Tap header region to toggle navigation bar (Back to Library, Table of Contents icon, Typography icon).
- **Body**: Fluid paged viewport with calibrated margins and typography.
- **Footer (Always Visible / Quiet)**: Subtle tertiary ink footer showing `Chapter X of Y • Page A / B • Z%`.
- **Navigation Controls**:
  - Tap Left 25% or Swipe Right ➔ Previous Page.
  - Tap Right 75% or Swipe Left ➔ Next Page.
  - Tap Center ➔ Toggle Overlays.

### 2.3 Reader Controls Drawer / Bottom Sheet
- **Font Face**: Serif / Sans / Monospace.
- **Font Size**: `-` / `+` step controls (14px to 24px).
- **Line Height**: Compact / Normal / Relaxed.
- **E-Ink Refresh Mode**: Enabled (Simulated e-ink waveform flash) vs Instant.
