# Design Architecture: ADHD Focus Task Manager

## 1. Architectural Layout

```text
src/
├── app/
│   ├── index.tsx                   # Library Screen (with link to Focus Tasks)
│   ├── tasks.tsx                   # Main ADHD Focus Tasks Screen
│   ├── explore.tsx                 # Architecture & System Notes
│   └── reader/[id].tsx             # E-Ink Reader
├── components/
│   └── tasks/
│       ├── now-card.tsx            # Single-Task Focus Hero Card
│       ├── quick-capture.tsx       # 1-Line Quick Dump Input Bar
│       ├── task-item.tsx           # Tactile Checkbox Item with Reanimated Spring
│       └── micro-step-list.tsx     # Subtask Decomposition Checklist
├── hooks/
│   └── use-tasks.ts                # Task State, CRUD, and AsyncStorage Sync
├── services/
│   ├── task-service.ts             # Pure Task Domain Model & Filtering Logic
│   └── __tests__/
│       └── task-service.test.ts    # Unit Tests for Task Transitions
└── types/
    └── task.ts                     # Domain Definitions (Task, MicroStep, TaskStatus)
```

## 2. Interaction & Animation Tokens
- **Spring Checkbox**: `withSpring({ damping: 12, stiffness: 180 })` for tactile physical click feel.
- **Visual Volume**: High-contrast alpha black (`rgba(0, 0, 0, 0.64)` secondary, `rgba(0, 0, 0, 0.10)` borders).
