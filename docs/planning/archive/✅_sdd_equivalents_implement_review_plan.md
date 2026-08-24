# Implementation Plan: SDD Equivalents for `/implement` and `/code-review`

A technical comparison and integration mapping between your specialized execution/review skills and the canonical **SDD (Spec-Driven Development)** phases.

---

## 1. Direct Equivalents Comparison Matrix

| Specialized Skill | Canonical SDD Phase | Purpose & Responsibilities | How They Connect |
|---|---|---|---|
| **`/implement`** | **`/sdd-apply`** | Reads `tasks.md` and implements each work unit test-first (Red ➔ Green ➔ Refactor) until all checklist items pass. | `/sdd-apply` is the SDD lifecycle phase command. Under the hood, it triggers `/implement` (which invokes `/harness` for single tickets or `/team-cheap` for multi-repo agent swarms). |
| **`/code-review`** | **`/sdd-verify`** | Audits the code along two independent axes: (1) **Spec Compliance** (did we build what was asked?), and (2) **Standards Compliance** (clean architecture, types, tests). | `/sdd-verify` is the SDD review gate. Under the hood, it triggers `/code-review` alongside pre-commit `.gga` AI guardrails before archiving. |

---

## 2. Detailed Breakdown: `/implement` ➔ `/sdd-apply`

### What `/sdd-apply` does in SDD:
1. Reads `openspec/changes/<change>/tasks.md`.
2. Selects the next uncompleted task checkbox (`- [ ]`).
3. Writes failing unit/integration tests first.
4. Writes minimal implementation to turn tests green.
5. Marks the task checkbox as completed (`- [x]`).
6. Repeats until all tasks in `tasks.md` are finished.

### What `/implement` adds as an engine:
- Connects directly to **`/harness`** for isolated single-agent autonomy.
- Connects to **`/team-cheap`** when multiple modules/services need parallel worker swarms.
- Applies strict type safety rules and error-handling patterns from `AGENTS.md`.

---

## 3. Detailed Breakdown: `/code-review` ➔ `/sdd-verify`

### What `/sdd-verify` does in SDD:
1. Reads `openspec/specs/<feature>/spec.md` and `openspec/changes/<change>/design.md`.
2. Inspects git diffs of the active change branch.
3. Verifies that all acceptance criteria are met and tests pass.
4. Generates a verification receipt before allowing `/sdd-archive`.

### What `/code-review` + `.gga` add as an engine:
- **Two-Axis Parallel Review**: Spawns two concurrent subagents:
  1. *Spec Reviewer*: Validates requirements match.
  2. *Standards Reviewer*: Validates clean architecture, deep modules, and zero type bypasses.
- **Gentleman Guardian Angel (`.gga`)**: Real-time pre-commit hook that blocks commits failing Section 6 rules in `AGENTS.md`.

---

## 4. Proposed Updates in Repository

### 1. Update [`AGENTS.md`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/AGENTS.md)
#### [MODIFY] [`AGENTS.md`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/AGENTS.md)
- Explicitly annotate `/sdd-apply` alongside `/implement` and `/sdd-verify` alongside `/code-review` so both command styles work interchangeably.

---

## 5. Verification Plan

### Automated / Command Verification
1. Inspect [`AGENTS.md`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/AGENTS.md) to ensure both canonical SDD commands (`/sdd-apply`, `/sdd-verify`) and specialized commands (`/implement`, `/code-review`) are documented side-by-side.

### Manual Verification
- Verify developer ergonomics when invoking either `/sdd-apply` or `/implement`.
