# Specification: ADHD Focus Tasks

## Requirements

### Requirement 1: Single-Task "Now" Isolation
The system MUST isolate and display exactly one active task in the "Now" hero card to prevent executive dysfunction.

#### Acceptance Criteria
1. If tasks exist, the first uncompleted task is designated as "Now" unless explicitly changed.
2. The user can promote any pending "Later" task to "Now" with 1 tap.
3. Completing the "Now" task automatically promotes the next task in the queue to "Now".

### Requirement 2: Quick Capture Brain Dump
The top bar MUST accept immediate text input and save a task upon pressing Submit or Enter with zero required forms or dates.

#### Acceptance Criteria
1. Submitting a non-empty string creates a new task in the `later` queue (or `now` if queue is empty).
2. The input clears immediately upon submission, ready for the next thought.

### Requirement 3: Micro-Step Chunking
Users MUST be able to break down any task into sub-steps.

#### Acceptance Criteria
1. The user can add micro-steps (< 2 min actions) to the active task.
2. Checking off all micro-steps prompts completion of the parent task.

### Requirement 4: Offline Persistence
All task states (`now`, `later`, `done`) and micro-steps MUST persist locally using AsyncStorage.
