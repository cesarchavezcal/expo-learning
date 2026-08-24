# Product Function: E-Ink Ebook Reader

## 1. Problem Framing ($y = f(x)$)

### Baseline Input Situation ($x$)
- Modern mobile reading apps are visually noisy, filled with glossy gradients, unnecessary animations, and distracting notifications that induce eye fatigue.
- Readers seeking distraction-free reading want the visual calmness and high-contrast typographic purity of physical E-Ink devices (Kindle/Kobo/Boox) on their mobile screen.

### Target Output Situation ($y$)
- A dedicated, high-contrast monochrome reader interface that emulates physical electronic paper.
- Calming layout with instant page transitions, optional e-ink waveform flash emulation, custom typography controls (serif/sans, margins, font sizing, line height), persistent chapter progress, and an editorial bookshelf.

### Minimal Transformation Function ($f(x) \rightarrow y$)
$$f(x) = \text{Clean E-Ink Typography Engine} + \text{Distraction-Free Pagination} + \text{Local Progress Persistence}$$

---

## 2. 10x Scope-Stripping

| Potential Fluff (Stripped) | Core Essential (Retained) | Why |
|---|---|---|
| Cloud sync / user accounts | Local in-memory & AsyncStorage books | Keeps reader immediate, offline-first, and private. |
| DRM / complex proprietary formats | Markdown / Plaintext / Curated sample classics | Guarantees instant parsing and deterministic layout across devices. |
| Complex social sharing / highlights feeds | Essential local bookmarks & reading progress | Reading is personal; social features distract from immersion. |
| Glossy page curl 3D animations | Instant flip + subtle e-ink waveform refresh flash | True e-ink screens do not curl; they render crisply with high contrast. |

---

## 3. Core Capabilities

1. **Bookshelf (Library)**:
   - Curated collection of distraction-free literature (e.g. *Meditations* by Marcus Aurelius, *The Art of War*, *Frankenstein*).
   - Reading progress indicators (% completed, time spent).
2. **E-Ink Reading Canvas**:
   - Pure black-and-white / warm e-ink paper rendering (`#FBF9F5` warm paper, `#FFFFFF` crisp paper, `#121212` charcoal dark mode).
   - High-legibility typography with optical sizing and customizable leading/margins.
   - Dual-tap / swipe page turning with optional e-ink screen refresh waveform flash.
3. **Typography & Display Controls (Quick Sheet)**:
   - Font family: Serif (Literary), Sans (Clean), Mono (Code/Minimal).
   - Sizing: Step slider (14px to 24px).
   - Contrast & E-Ink Refresh rate (Full refresh every 5 pages / On chapter transition).
4. **Table of Contents & Bookmarks**:
   - Clean chapter jumping and bookmarking.
