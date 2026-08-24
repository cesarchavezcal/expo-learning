# Walkthrough: Unified SDD & 7-Step Architecture Pipeline Integration

Codified the unified Spec-Driven Development (SDD) and specialized 7-step skill pipeline within [`AGENTS.md`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/AGENTS.md) and [`openspec/config.yaml`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/openspec/config.yaml).

---

## Changes Applied

### 1. Updated [`AGENTS.md`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/AGENTS.md)
- Formalized Section 2 with the **Unified SDD Mapping Matrix** connecting each canonical SDD command with its specialized skill engine.
- Codified execution routing rules:
  - Default route: `/sdd-apply` ➔ `/implement` (delegating to `/harness` for test-first single-ticket execution).
  - Swarm route: `/sdd-apply --team` ➔ `/team-cheap` (fanning out `/harness` workers across decoupled modules).
- Codified verification gate rules:
  - `/sdd-verify` ➔ `/code-review` (2-axis audit) + `.gga` pre-commit evaluation against Section 6 coding rules.

### 2. Updated [`openspec/config.yaml`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/openspec/config.yaml)
- Bound each SDD lifecycle phase (`explore`, `spec`, `design`, `tasks`, `apply`, `verify`, `archive`) to its respective specialized skill command and subagent executor.
