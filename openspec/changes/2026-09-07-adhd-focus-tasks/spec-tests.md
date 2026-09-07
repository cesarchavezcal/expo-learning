# Spec Test Contracts: ADHD Focus Tasks

## SCEN-001: Automatic "Now" Promotion
- **Given**: An empty task list.
- **When**: The user adds task "Write meeting notes".
- **Then**: The task status is initialized as `"now"`, making it the active hero task.

## SCEN-002: Subsequent Tasks Go to "Later" Queue
- **Given**: A task list with 1 active `"now"` task.
- **When**: The user dumps task "Buy oat milk".
- **Then**: The new task is saved with status `"later"` and does not displace the current `"now"` task.

## SCEN-003: Completing "Now" Advances the Queue
- **Given**: Task A is `"now"` and Task B is `"later"`.
- **When**: The user marks Task A as completed.
- **Then**: Task A transitions to `"done"` with a `completedAt` timestamp, and Task B is promoted to `"now"`.

## SCEN-004: Micro-Step Progress
- **Given**: A `"now"` task with 2 micro-steps: "Step 1" (incomplete), "Step 2" (incomplete).
- **When**: The user checks "Step 1".
- **Then**: "Step 1" `isCompleted` becomes true while the parent task remains in `"now"`.
