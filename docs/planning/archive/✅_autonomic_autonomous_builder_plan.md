# Implementation Plan: `/autonomic` Master Autonomous Product Orchestrator

This plan creates the **`/autonomic`** master orchestration skill and triggers, enabling a single prompt (*"autonomic, build an app that does X, Y, Z"*) to autonomously execute the complete product builder pipeline—from discovery and specifications through `/harness` TDD or `/team-cheap` swarms to a verified PR.

---

## User Review Required

> [!IMPORTANT]
> **How `/autonomic` Operates**
> 
> ```text
> User Prompt: "autonomic, build an app/feature that does X, Y, Z"
>                              │
>                              ▼
> ┌─────────────────────────────────────────────────────────────────────────────┐
> │                         /autonomic PIPELINE RUNNER                          │
> │                                                                             │
> │  Step 1: Product Discovery    ➔ /product-function (y = f(x) Scope Stripping)│
> │  Step 2: Architecture Design  ➔ /ia (Sitemap/Flows) + /ooux (Object Model) │
> │  Step 3: Formal Specification ➔ /to-spec + 🟢 /unslop Specs                 │
> │  Step 4: Ticket Decomposition ➔ /to-tickets (Atomic Tasks in tasks.md)      │
> │                                                                             │
> │  Step 5: Autonomous Decision Routing:                                       │
> │          ├── Single Module / Linear  ➔ Dispatches /harness (TDD Worktree)   │
> │          └── Multi-Module / Decoupled ➔ Dispatches /team-cheap (Swarm)      │
> │                                                                             │
> │  Step 6: Verification Gate    ➔ ./init.sh + .gga Pre-Commit + /code-review  │
> │  Step 7: Delivery Gate        ➔ 🟢 /unslop PR + Open GitHub Pull Request    │
> └─────────────────────────────────────────────────────────────────────────────┘
> ```

---

## Open Questions

> [!NOTE]
> None. Directly addresses your single-command autonomous execution requirement.

---

## Proposed Changes

### Component 1: Dedicated `/autonomic` Skill

#### [NEW] [`.agents/skills/autonomic/SKILL.md`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/autonomic/SKILL.md)
- Skill name: `autonomic`
- Triggers on: `/autonomic`, `"autonomic, ..."`, `"build this autonomously"`, `"autonomous app builder"`.
- Contains the sequential state machine that runs the 7-step pipeline autonomously, intelligently picking between `/harness` and `/team-cheap` based on module complexity.

---

### Component 2: Global Agent Instructions & Documentation

#### [MODIFY] [AGENTS.md](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/AGENTS.md)
- Add `/autonomic` as the primary top-level command in Section 2 and Section 7.
- Define routing heuristics for when `/autonomic` selects `/harness` vs `/team-cheap`.

#### [MODIFY] [README.md](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/README.md)
- Add `/autonomic` to the hero section, the One-Prompt Autonomous Creation guide, and the Slash Commands table.

---

## Verification Plan

### Automated Verification
1. **Harness Benchmark Check**:
   ```bash
   node .agents/skills/harness-creator/scripts/validate-harness.mjs --target .
   ```
   *Expectation: 100/100 score maintained.*

2. **Skill Registry Verification**:
   - Verify that `/autonomic` is discoverable and executable across agent environments.

### Manual Verification
- Test invoking `/autonomic` with a sample prompt to observe autonomous step-by-step transition.
