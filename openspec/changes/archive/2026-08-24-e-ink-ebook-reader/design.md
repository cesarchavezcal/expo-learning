# Design Architecture: E-Ink Ebook Reader

## 1. Architectural Architecture

```text
src/
├── app/
│   ├── index.tsx                   # Library Screen (Bookshelf)
│   ├── explore.tsx                 # Architecture & Typography Reference
│   ├── reader/
│   │   └── [id].tsx                # Immersive Reader View
│   └── (modals)/
│       └── settings.tsx            # Global Display & Typography Modal
├── components/
│   └── reader/
│       ├── book-card.tsx           # Library Book Card
│       ├── reader-canvas.tsx       # E-Ink Page Renderer
│       ├── reader-header.tsx       # Overlay Header with Back / TOC / Settings
│       ├── reader-footer.tsx       # Progress & Chapter Info Bar
│       ├── toc-sheet.tsx           # Table of Contents Drawer
│       ├── settings-sheet.tsx      # Typography & Theme Bottom Sheet
│       └── eink-flash.tsx          # Simulated Waveform Inversion Refresh
├── hooks/
│   ├── use-reader-settings.ts      # Typography, Theme, and Display Store
│   └── use-reading-progress.ts     # Chapter and Page Position Persistence
├── services/
│   └── book-repository.ts          # Curated Books & Chapter Content Provider
└── types/
    └── reader.ts                   # Domain Types (Book, Chapter, Progress, Settings)
```

## 2. Visual & Interaction Philosophy
- **High-Contrast Palette**: `#000000` text on `#FFFFFF` paper, `#121212` charcoal background with `#FFFFFF` ink.
- **Physical Spring Physics**: Interruptible spring transitions on drawer and modal overlays (`damping: 1.0`, `response: 0.3`).
- **Simulated E-Ink Flash**: Micro-inversion flash on page turns (100ms black/white invert) mimicking electronic ink microcapsule rearrangement.
