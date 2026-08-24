---
name: autonomic
version: 1.0.0
description: "Master autonomous product orchestrator — takes an app or feature idea from prompt to shipped PR by chaining product discovery, architecture, formal specs, tickets, /harness TDD or /team-cheap swarms, and verification gates automatically."
scope: global
user-invocable: true
dependencies: [product-function, information-architecture-review, ooux, to-spec, unslop, to-tickets, harness, team-cheap, code-review, find-skills]
allowed-tools:
  - define_subagent
  - invoke_subagent
  - send_message
  - run_command
  - view_file
  - write_to_file
---

# Autonomic Product Builder

The master autonomous product orchestration engine for `agent-boilerplate`.

When invoked via `/autonomic <idea>` or `"autonomic, build an app that does X, Y, Z"`, this orchestrator executes the complete product-to-code pipeline sequentially without requiring manual phase triggers.

---

## The 7-Step Autonomous State Machine

```mermaid
flowchart TD
    A[User Prompt: 'autonomic, build X'] --> B[Step 1: /product-function & Skill Discovery]
    B --> C[Step 2: /ia & /ooux]
    C --> D[Step 3: /to-spec + Gate 1: /unslop]
    D --> E[Step 4: /to-tickets]
    E --> F{Module Topology Decision}
    F -- Single Module / Sequential --> G[Step 5a: /harness TDD Worktree]
    F -- Multi-Module / Swarm --> H[Step 5b: /team-cheap Subagent Swarm]
    G --> I[Step 6: ./init.sh + .gga Review]
    H --> I
    I --> J[Step 7: Gate 2: /unslop PR + Open GitHub PR]
```

---

## Execution Protocol

### Step 1: Product Discovery & Dynamic Skill Discovery (`/product-function` + `/find-skills`)
- Model the feature as a transformation function $y = f(x)$ based on Ryan Singer's methodology.
- Apply **10x Scope-Stripping** to eliminate speculative fluff.
- **Proactive 4-Pillar Skill Check**: If the scoped product requires specialized domain expertise (e.g. Stripe, Three.js, pgvector, WebSockets, specialized UI), query `npx skills find "<domain>"` to discover and install relevant skills before architecture design.
- Write the scoped model to `docs/product-design/product_function.md`.

### Step 2: Information Architecture & Domain Modeling (`/ia` & `/ooux`)
- Generate navigation hierarchy, user journeys, and sitemaps (`docs/product-design/ia.md`).
- Extract core entities, object cards, metadata, and ERD (`docs/product-design/ooux.md`).

### Step 3: Formal Specifications & Gate 1 (`/to-spec` + `/unslop`)
- Generate formal acceptance criteria and domain contracts in `openspec/specs/<feature>/spec.md`.
- **🟢 GATE 1: `/unslop`**: Run `/unslop` across the generated specs to ensure zero AI fluff or ambiguous metaphors.

### Step 4: Atomic Ticket Decomposition (`/to-tickets`)
- Break down the architecture into discrete, test-first tickets in `openspec/changes/<change>/tasks.md`.
- Maintain dependency order and strict single-task boundaries.

### Step 5: Autonomous Execution Routing (`/harness` vs `/team-cheap`)
Analyze the workload topology:
1. **Default Linear / Single-Module Route (`/harness`)**:
   - Spawns an isolated worktree subagent via `Workspace: 'share'`.
   - Executes Red ➔ Green ➔ Refactor TDD on each task unit in sequence.
2. **Parallel Swarm Route (`/team-cheap`)**:
   - If the tasks span decoupled boundaries (e.g. Frontend UI vs Database Schema vs API Services), dispatch `/team-cheap` to fan out parallel `/harness` subagents (Gemini Flash for bulk, Gemini Pro for hard reviews).

### Step 6: Verification & Quality Gate
- Execute `./init.sh` to confirm zero test or build failures (`set -e`).
- Audit staged diffs with `.gga` pre-commit AI code review and `/code-review` (Spec + Standards compliance).

### Step 7: Delivery & Gate 2 (`/unslop` PR)
- **🟢 GATE 2: `/unslop`**: Generate a crisp 2–4 sentence PR description without corporate filler.
- Create the topic branch (`{prefix}/CCH/{project-initials}-{ticket-number}-{ticket-summary}`), push, and open the Pull Request with automated labels.

---

## Usage

```text
/autonomic "Build a markdown task manager with SQLite persistence and tagging"
autonomic, build an invoice generator with PDF export and stripe webhook integration
```
