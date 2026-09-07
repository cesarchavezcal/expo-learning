---
name: product-description
version: 1.0.0
description: "Authors outside-in, behavioral product description suites for software systems. Maps user experience as a state chart with event-by-event interaction phases, 5-family interrupt checklists, verification matrices, and bug triage without implementation contamination."
scope: global
user-invocable: true
dependencies: [product-function, information-architecture-review, ooux, to-spec, spec-to-tests, unslop]
allowed-tools:
  - run_command
  - view_file
  - write_to_file
---

# Product Description (`/product-description`)

Authors an outside-in, behavioral product description project for a software surface. Describes what the user sees, what they can do, and exactly what happens across event phases, modifiers, interrupts, and cross-cutting systems.

## Core Principle: Outside-In Behavior

Describe the **user experience**, never the internal code structure.  
Code is implicit and scattered; the product description is the explicit state chart of the product from the user's perspective.

- **Experience First**: Write what the user perceives and triggers ("The cursor changes to a crosshair and a preview box tracks the pointer"), never internal classes or database queries.
- **Technical Note Isolation**: Technical mechanism details appear *only* in block quotes labeled `> Technical note:` when the mechanism alters expected behavior.

---

## Output Project Directory Structure

```
docs/product-description/
├── README.md                      # Index, purpose, conventions, method, and coverage table
├── goal.md                        # Standing drafting instructions and style rules
├── glossary.md                    # Canonical glossary of load-bearing product terms
├── bug-triage.md                  # Observed product defects, reproduction steps, and decisions
├── verification/
│   ├── README.md                  # How to execute manual/automated verification passes
│   └── {cluster}.md               # Observable test checklists (P1/P2/P3) per area
├── foundations/
│   └── {core-model}.md            # Core input model, coordinate system, or state container
├── {area}/
│   └── {feature}.md               # Feature documents following the 8-part skeleton
└── cross-cutting/
    └── {concern}.md               # Permissions, undo/history, offline, sync, preferences
```

---

## Sequence

### 1. Pilot & Grounding Setup
1. Identify the target surface (route, binary command, or production workspace) and record the exact **source repository commit** verified against.
2. Draft `glossary.md` defining 5–8 load-bearing terms.
3. Scaffold `README.md` with the Coverage table (all items set to `not started`).
4. Select a small, self-contained **Pilot Feature** to settle tone and depth.
- **Completion Criterion**: `README.md`, `glossary.md`, and `goal.md` written; source commit pinned.

### 2. Draft Foundations & Core Input Model
Draft `foundations/{name}.md` describing the foundation upon which features operate (e.g. gesture system, turn lifecycle, form model, coordinate space).
- **Completion Criterion**: Foundation document complete with inputs, event dispatching, and state bounds.

### 3. Draft Feature Documents (The 8-Part Skeleton)
Every feature document (`{area}/{feature}.md`) MUST execute all 8 sections in strict order:

1. **Summary**: One paragraph describing the user capability abstractly.
2. **The Simple Case**: The standard happy path in clean prose.
3. **The Interaction, Event by Event**: The 5 sequential phases of the product's interaction unit:
   - *Starting*: What initiates it and what initial state is captured.
   - *Instant End*: What happens if it terminates immediately without extension.
   - *Becoming Extended*: What is locked or decided the instant it extends.
   - *While Extended*: Live feedback, visual trackers, intermediate state updates.
   - *Finishing*: What commits to history/database upon release/completion.
   - *State Diagram*: Mermaid `stateDiagram-v2` visualizing all states and transitions.
4. **Modifiers**: Table listing all variant keys/flags/modes and their behavior at start vs changed *during* the interaction.
5. **Cancel and Interrupt (The 5 Families)**: Fixed mandatory checklist in exact order:
   - *Family 1: Explicit Abort* (Escape, Stop, Cancel button, Ctrl+C).
   - *Family 2: User Distraction / Mid-Way Action* (Switching tools, modes, tabs, navigating away).
   - *Family 3: Clean Complete Events* (Menu opening, undo/redo from elsewhere, external submit).
   - *Family 4: Environment & Network Failures* (Window blur, connection drop, timeout, session expiry).
   - *Family 5: Target Mutation & Channel Changes* (Underlying record deleted/locked by another user, secondary input device).
6. **Interactions with Other Systems**: Cross-cutting impacts evaluated in fixed order: permissions, undo/history, containers/parents, readonly/locked, offline/sync, notifications.
7. **Edge Cases**: Uncovered boundary behaviors, surprising quirks, or race conditions.
8. **Open Questions & Verification**: The source commit verified against and any unconfirmed behaviors.
- **Completion Criterion**: Feature document contains all 8 sections with zero skipped interrupt families.

### 4. Verification Checklists & Bug Triage
1. Write observable test checklists in `verification/{cluster}.md` with `Setup`, `Steps`, `Expected Result`, and `Priority` (P1/P2/P3).
2. Record suspected defects or surprising inconsistencies in `bug-triage.md` with reproduction steps, code references, and required product decisions.
3. Update the `README.md` coverage table (`not started` ➔ `drafted` ➔ `verified`).
- **Completion Criterion**: Every P1/P2 checklist item marked `pass`, `fail`, or `blocked`, with failures filed in `bug-triage.md`.
