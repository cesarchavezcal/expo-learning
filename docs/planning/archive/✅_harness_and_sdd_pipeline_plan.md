# Implementation Plan: Harness 100/100 Invariants & SDD Pipeline Execution

This plan outlines the two-part execution sequence:
1. **Part 1: Harness Creator 100/100 Reliability Invariants**: Adding structured execution invariants (`Startup Workflow`, `Scope Boundary`, `Definition of Done`, `End of Session`, and state routing) to [`AGENTS.md`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/AGENTS.md) and verifying the 100/100 score.
2. **Part 2: SDD Pipeline Execution for `flexible-product-stack-scaffolding`**: Progressing the active change through `/sdd-spec` ➔ `/sdd-design` ➔ `/sdd-tasks` ➔ `/sdd-apply`.

---

## User Review Required

> [!IMPORTANT]
> **Sequential Execution Sequence**
> - **Phase 1 (Harness Update)**: Apply the 5 harness reliability sections to [`AGENTS.md`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/AGENTS.md), validate 100/100 score with `validate-harness.mjs`, and deliver via PR.
> - **Phase 2 (SDD Specs & Design)**: Generate `specs/` and `design.md` for `flexible-product-stack-scaffolding` defining dynamic stack scaffolding recipes (Node/Next, Python/FastAPI, Rust/CLI, Go).
> - **Phase 3 (SDD Tasks & Apply)**: Generate `tasks.md`, unblocking `/sdd-apply` to implement dynamic stack scaffolding and configuration sync in `scripts/setup-project.sh` and `openspec/config.yaml`.

---

## Open Questions

> [!NOTE]
> None. Scope and execution dependencies are clearly mapped.

---

## Proposed Changes

### Component 1: Harness Invariants (`AGENTS.md`)

#### [MODIFY] [AGENTS.md](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/AGENTS.md)
Add structured sections for:
- `## Startup Workflow`: Run `./init.sh`, check `progress.md` and active change or `feature_list.json` before writing code.
- `## Scope Boundary`: "One feature at a time", "Stay in scope", modify only files required for the active unit.
- `## Definition of Done`: Mandatory verification gate (tests pass, static checks pass, evidence recorded in `progress.md`, `.gga` pre-commit review pass).
- `## End of Session`: Update `progress.md` and `session-handoff.md` with accomplishments, blockers, and next steps.

---

### Component 2: SDD Pipeline (`openspec/changes/flexible-product-stack-scaffolding/`)

#### [NEW] `openspec/changes/flexible-product-stack-scaffolding/specs/stack-scaffold/spec.md`
- Specification covering dynamic stack scaffolding recipes, prompt confirmations, and error handling.

#### [NEW] `openspec/changes/flexible-product-stack-scaffolding/specs/config-sync/spec.md`
- Specification for automated sync of `openspec/config.yaml` test runners, strict TDD modes, and `CONTEXT.md` values.

#### [NEW] `openspec/changes/flexible-product-stack-scaffolding/design.md`
- Architectural design for dynamic recipe execution in `scripts/setup-project.sh`.

#### [NEW] `openspec/changes/flexible-product-stack-scaffolding/tasks.md`
- Decomposed implementation task backlog.

#### [MODIFY] `scripts/setup-project.sh` (Implemented via `/sdd-apply`)
- Add dynamic recipe bootstrap logic for Node/Next, Python, Rust, and Go stacks.

---

## Verification Plan

### Automated Tests
1. **Harness Benchmark**:
   ```bash
   node .agents/skills/harness-creator/scripts/validate-harness.mjs --target .
   ```
   *Expectation: 100/100 score with zero failing subsystem checks.*

2. **SDD Status Check**:
   ```bash
   gentle-ai sdd-status flexible-product-stack-scaffolding
   ```
   *Expectation: All phases transition to ready/done.*

3. **Script Verification**:
   ```bash
   bash scripts/setup-project.sh --help
   ```

### Manual Verification
- Review generated specifications and task backlog in `openspec/changes/flexible-product-stack-scaffolding/`.
