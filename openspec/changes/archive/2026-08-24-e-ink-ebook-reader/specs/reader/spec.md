# Specification: E-Ink Reader Engine

## Requirements

### Requirement 1: Paged Content Rendering
The reader MUST slice and display book chapter text into clean, distraction-free vertical pages based on current viewport dimensions and font size settings.

#### Acceptance Criteria
1. Given a chapter of text, when rendered, it must display the current page cleanly without vertical text cutoff.
2. When the user taps the right region or swipes left, the reader must transition to the next page.
3. When the user reaches the end of a chapter and advances, the reader must automatically advance to the next chapter.

### Requirement 2: Simulated E-Ink Refresh Waveform
When enabled in settings, page turns must optionally trigger an e-ink micro-flash inversion simulating electrophoretic electronic paper refreshes.

#### Acceptance Criteria
1. When `einkRefreshSimulation` is enabled, turning a page triggers a 100ms high-contrast flash.
2. When disabled, page changes occur instantly with zero animation delay.

### Requirement 3: Typography & Appearance Customization
The reader MUST support dynamic configuration of font family, font size, line height, and color theme.

#### Acceptance Criteria
1. The user can switch between `serif`, `sans`, and `mono` font faces.
2. The user can scale font sizes from 14px to 24px in 1px/2px increments.
3. Settings changes must persist across application restarts.
