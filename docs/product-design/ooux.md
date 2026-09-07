# Object-Oriented User Experience (OOUX): ADHD Focus Tasks

## 1. Domain Entities & Object Definitions

```text
┌─────────────────┐       1:N       ┌─────────────────┐
│      Task       ├────────────────►│    MicroStep    │
└─────────────────┘                 └─────────────────┘
```

### Entity 1: `Task`
- **Identity**: `id: string`
- **Core Attributes**:
  - `title: string`
  - `status: 'now' | 'later' | 'done'`
  - `createdAt: number`
  - `completedAt?: number`
  - `microSteps: MicroStep[]`
  - `estimatedMinutes?: number` (Default: 15)

### Entity 2: `MicroStep`
- **Identity**: `id: string`
- **Core Attributes**:
  - `taskId: string`
  - `title: string`
  - `isCompleted: boolean`
  - `order: number`
