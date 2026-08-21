# Implementation Plan: Documentation Creation Rule of Thumb & Planning Archive Convention

This plan establishes two updates in [`AGENTS.md`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/AGENTS.md):
1. The **Rule of Thumb** separating conceptual/planning documentation (`docs/`) from formal specifications/change lifecycles (`openspec/`).
2. The **Planning Archive Convention** moving fully completed planning documents to `docs/planning/archive/`.

---

## User Review Required

> [!IMPORTANT]
> **Key Documentation Storage Updates**
> 1. **Rule of Thumb**:
>    - **`docs/`**: If it explains *why* or outlines high-level design, product architecture, discovery, user journeys, or implementation plans (e.g. `docs/product-design/`, `docs/planning/`, `docs/architecture/`).
>    - **`openspec/`**: If it defines a testable contract, formal specification, change lifecycle, tasks, or executable verification criteria (e.g. `openspec/specs/`, `openspec/changes/`).
> 2. **Completed Planning Files**:
>    - Active plans live in `docs/planning/`.
>    - When an implementation plan or walkthrough is fully implemented and complete, prefix its filename with `✅_` and move it to `docs/planning/archive/` (e.g. `docs/planning/archive/✅_my_plan.md`).

---

## Open Questions

> [!NOTE]
> None. Clean and aligned with the repo's archiving patterns.

---

## Proposed Changes

### Global Agent Instructions

#### [MODIFY] [AGENTS.md](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/AGENTS.md)
- Update **Section 4 (Documentation & Storage Conventions)**:
  ```markdown
  ## 4. Documentation & Storage Conventions

  ### Rule of Thumb for Document Creation
  - **`docs/`**: If it explains *why* or outlines a high-level design, user flows, architecture, or plan (e.g. `docs/product-design/`, `docs/planning/`).
  - **`openspec/`**: If it defines a testable contract, formal specification, change lifecycle, or implementation tasks (e.g. `openspec/specs/`, `openspec/changes/`).

  ### Directory Structure & Lifecycle
  - **Product Design & Schemas**: Saved in `docs/product-design/` (`product_function.md`, `ia.md`, `ooux.md`).
  - **OpenSpec Specifications**: Living baseline specs in `openspec/specs/`, active changes in `openspec/changes/`, and archived records in `openspec/changes/archive/`.
  - **Implementation Plans & Walkthroughs**: Active plans live in `docs/planning/`. When completed/fully implemented, prefix with `✅_` and move to `docs/planning/archive/` (e.g. `docs/planning/archive/✅_my_plan.md`).
  ```

---

## Verification Plan

### Automated Verification
- Verify markdown rendering and file links in [`AGENTS.md`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/AGENTS.md).
- Ensure directory `docs/planning/archive/` is created.

### Manual Verification
- Review updated [`AGENTS.md`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/AGENTS.md) Section 4.
