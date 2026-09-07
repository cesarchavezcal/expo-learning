# Information Architecture: ADHD Focus To-Do

## 1. Global Sitemap & Route Hierarchy

```text
src/app/
├── _layout.tsx                     # Universal Stack & Theme Provider
├── index.tsx                       # Library Screen (Bookshelf)
├── tasks.tsx                       # ADHD Focus & Task Manager Screen
├── explore.tsx                     # Architecture & System Notes
├── reader/
│   └── [id].tsx                    # Immersive E-Ink Reader View
└── (modals)/
    └── settings.tsx                # Typography & Display Preferences Modal
```

---

## 2. Screen & Flow Specifications: `/tasks`

### 2.1 The "Now" Hero Zone (Single Task)
- Displays the active task prominently in large, clear Scandinavian typography.
- Shows sub-steps checklist if broken down.
- **Action Buttons**:
  - `Complete (Done)`: Triggers tactile spring checkmark and dopamine sound/haptic.
  - `Next Task`: Cycles to the next task in the queue.
  - `Add Micro-Step`: Quick inline add for a subtask (< 2 mins).

### 2.2 Quick Brain Dump (Top Bar)
- Minimalist 1-line input: `"Dump a thought or task..."`
- Pressing `Enter` adds to `Later` queue immediately with zero required form fields.

### 2.3 The "Later" Queue (Tucked Away)
- Expandable / collapsible quiet section showing pending tasks.
- 1-tap `Promote to Now` action for any task.

### 2.4 Momentum Log (Done Today)
- List of tasks checked off today with timestamps, reinforcing positive completion momentum.
