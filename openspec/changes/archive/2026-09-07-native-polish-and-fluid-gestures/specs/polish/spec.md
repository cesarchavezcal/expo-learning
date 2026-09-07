# Specification: Native Polish & Fluid Gestures

## Requirements

### Requirement 1: Squircle Curvature
All cards, buttons, badges, and containers MUST declare `{ borderCurve: 'continuous' }` for native Apple squircle curvature.

### Requirement 2: Multimodal Tactile Feedback
The app MUST provide light or medium haptic impacts on:
1. Micro-step checkbox toggle.
2. Parent task completion ("Mark Complete").
3. Quick capture thought submission.
4. Reading page turns.

### Requirement 3: 1:1 Page Drag & Rubberbanding
The reader canvas MUST support horizontal swiping with finger tracking, soft boundary resistance, and gesture velocity handoff.
