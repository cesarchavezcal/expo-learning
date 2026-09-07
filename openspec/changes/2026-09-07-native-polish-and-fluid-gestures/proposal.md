# Proposal: Native Polish & Fluid Gestures (Workflows 2 & 3)

## Problem Statement
The reader and task interfaces functioned well logically, but relied on circular corners, static tap-only page progression, and lacked multimodal tactile haptic feedback and optical typographic tracking recommended by Apple HIG and WWDC *Designing Fluid Interfaces*.

## Proposed Solution
Incorporate continuous squircle curvature (`borderCurve: 'continuous'`), optical letter-spacing, sub-frame haptic feedback (`expo-haptics`), and interactive 1:1 pan gestures with rubberbanding on page turns.
