# Implementation Plan: Autonomous Product Builder & Harness Architecture Alignment

This plan fully aligns [`README.md`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/README.md) and [`AGENTS.md`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/AGENTS.md) with the **5-Subsystem Harness Architecture**, the **Autonomous Product Building Loop**, and the **Two `/unslop` Quality Checkpoints**.

---

## User Review Required

> [!IMPORTANT]
> **1. The 5-Subsystem Harness Blueprint**
> ```text
> ┌────────────────────────────────────────────────────────────────┐
> │                          THE HARNESS                           │
> │                                                                │
> │   ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐   │
> │   │ Instructions │  │    State     │  │   Verification     │   │
> │   │              │  │              │  │                    │   │
> │   │ AGENTS.md    │  │ progress.md  │  │ tests + lint       │   │
> │   │ CLAUDE.md    │  │ feature_list │  │ type-check         │   │
> │   │ feature_list │  │ git log      │  │ smoke runs         │   │
> │   │ docs/        │  │ session hand │  │ e2e pipeline       │   │
> │   └──────────────┘  └──────────────┘  └────────────────────┘   │
> │                                                                │
> │   ┌──────────────┐  ┌──────────────────────────────────────┐   │
> │   │    Scope     │  │         Session Lifecycle            │   │
> │   │              │  │                                      │   │
> │   │ one feature  │  │ init.sh at start                     │   │
> │   │ at a time    │  │ clean-state checklist at end         │   │
> │   │ definition   │  │ handoff note for next session        │   │
> │   │ of done      │  │ commit only when safe to resume      │   │
> │   └──────────────┘  └──────────────────────────────────────┘   │
> │                                                                │
> └────────────────────────────────────────────────────────────────┘
> 
> The MODEL decides what code to write.
> The HARNESS governs when, where, and how it writes it.
> The harness doesn't make the model smarter.
> It makes the model's output reliable.
> ```

> [!IMPORTANT]
> **2. The Autonomous Product Building Lifecycle with `/unslop` Checkpoints**
> ```text
> ┌─────────────────────────────────────────────────────────────────────────────┐
> │                  AUTONOMOUS PRODUCT BUILDER LIFECYCLE                       │
> │                                                                             │
> │  1. Discovery & Scoping   ➔ /product-function, /grilling                   │
> │  2. Spec & Design         ➔ /to-spec, /ia, /ooux, /sdd-design               │
> │                               ▲ 🟢 CHECKPOINT 1: /unslop Specs & Design    │
> │  3. Task Breakdown        ➔ /to-tickets, /sdd-tasks                         │
> │  4. Autonomous Execution  ➔ /sdd-apply (/harness or /team-cheap)           │
> │  5. Verification & Review ➔ /sdd-verify, .gga pre-commit, /code-review     │
> │                               ▲ 🟢 CHECKPOINT 2: /unslop PR & Walkthrough  │
> │  6. Archive & Sync        ➔ /sdd-archive                                   │
> └─────────────────────────────────────────────────────────────────────────────┘
> ```

---

## Open Questions

> [!NOTE]
> None. Plan unifies all previously discussed components into a single coherent delivery.

---

## Proposed Changes

### Component 1: Root Documentation (`README.md`)

#### [MODIFY] [README.md](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/README.md)
- Feature the ASCII Harness architecture diagram and core philosophy statement prominently in the overview and Section 3.
- Update the **Unified SDD & 7-Step Architecture Pipeline** table to include the two `/unslop` checkpoints (Spec Checkpoint & PR Checkpoint).
- Document the single-prompt autonomous command:
  > *"Build feature X autonomously: Scope with `/product-function`, spec with `/to-spec`, unslop with `/unslop`, break down with `/to-tickets`, and implement via `/harness` until `./init.sh` is green."*

---

### Component 2: Global Agent Instructions (`AGENTS.md`)

#### [MODIFY] [AGENTS.md](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/AGENTS.md)
- In **Section 2 (Unified SDD Pipeline)**: Add the `/unslop` checkpoints in the mapping matrix.
- In **Section 5 (PR Conventions)**: Mandate `/unslop` on PR descriptions for concise 2–4 sentence deliverables.
- In **Section 7 (Coding Agent Harness Governance & Invariants)**:
  - Add the ASCII Harness diagram and the philosophy statement.
  - Formulate the autonomous execution loop standard for subagents (`/harness` and `/team-cheap`).

---

## Verification Plan

### Automated Verification
1. **Harness Benchmark**:
   ```bash
   node .agents/skills/harness-creator/scripts/validate-harness.mjs --target .
   ```
   *Expectation: 100/100 score on all 5 subsystems.*

2. **Pre-Commit Audit**:
   ```bash
   gga run --staged
   ```

### Manual Verification
- Review markdown rendering and link integrity in [`README.md`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/README.md) and [`AGENTS.md`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/AGENTS.md).
