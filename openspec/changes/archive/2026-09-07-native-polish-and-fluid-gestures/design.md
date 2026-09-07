# Design: Native Polish & Fluid Gestures Architecture

## 1. Interaction & Physics Mechanics

### 1.1 1:1 Horizontal Pan Gesture
- Finger touch initiates `Gesture.Pan()`.
- Content translation tracks finger movement ($x_{drag}$).
- **Boundary Rubber-Banding**: When at page 0 and dragging right, or at the last page and dragging left, translation is compressed:
  $$\Delta x = \frac{x_{drag} \times 0.3}{1 + |x_{drag}| \times 0.005}$$
- **Release Momentum Projection & Spring Retargeting**:
  - If $|v_x| > 500$ px/s or $|x_{drag}| > 60$ px, commit page turn and fire `triggerLightImpact()`.
  - Spring snap settles with `damping: 18, stiffness: 220`.

### 1.2 Squircle Curves (`borderCurve: 'continuous'`)
- Apply continuous curvature across `NowCard`, `TaskItem`, `QuickCapture`, `BookCard`, and buttons.

### 1.3 Optical Typography
- Negative tracking on display headings (`-0.02em` / `-0.5px`) for tighter visual cohesion.
