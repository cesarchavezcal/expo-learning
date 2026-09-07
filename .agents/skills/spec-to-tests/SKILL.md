---
name: spec-to-tests
version: 1.0.0
description: "Extracts pure, implementation-free behavioral test contracts from spec.md before technical design or task decomposition. Eliminates tautological testing by locking Red-ready acceptance scenarios directly to specification contracts."
scope: global
user-invocable: true
dependencies: [to-spec, tdd, harness]
allowed-tools:
  - run_command
  - view_file
  - write_to_file
---

# Spec to Tests (`/spec-to-tests`)

Extracts un-contaminated behavioral test contracts directly from `spec.md` before technical architecture (`design.md`) and task breakdown (`tasks.md`) are created.

## Core Principle: Anti-Tautology

A test written against code verifies what the code happens to do.  
A test written against a spec verifies what the contract demands.

When tests are authored during or after implementation, they suffer from **tautological confirmation bias**: passing 100% green while encoding the developer's or AI's logic bugs. This skill locks the **Behavioral Test Contract** at the public spec seam *before* technical design contamination occurs, guaranteeing that `/harness` enters its TDD **Red Phase** with tests born purely from user requirements.

---

## Process

### 1. Ingest Pure Specification
Read `spec.md` (or `openspec/specs/<feature>/spec.md`). Do NOT read or generate technical implementation files.
- **Completion Criterion**: Full list of user stories, acceptance criteria, and domain boundary constraints loaded into working memory.

### 2. Derive Testable Scenarios (`SCEN-001`..N)
For every user story and boundary condition in the spec, generate an atomic scenario:
- **Given**: Initial system state or precondition.
- **When**: Specific actor action, payload, or event trigger.
- **Then**: Exact observable public outcome, return payload, or state transition.
- **Completion Criterion**: 100% of user stories map to at least one numbered Scenario ID (`SCEN-XXX`).

### 3. Identify Negative & Boundary Invariants
Extract all error paths and edge cases directly from the spec:
- Invalid inputs, unauthorized states, rate limits, timeouts, idempotency collisions.
- **Completion Criterion**: Every domain constraint in the spec has a corresponding negative Scenario ID.

### 4. Write the Behavioral Test Contract (`spec-tests.md`)
Write the artifact to `openspec/changes/<change>/spec-tests.md` (or `docs/product-design/spec_tests.md`):

```markdown
# Behavioral Test Contract: [Feature Name]

## Seam Definition
- **Target Seam**: [Public API Endpoint | Domain Service Interface | CLI Command]
- **Language/Runner**: [Vitest | Pytest | Go test | Playwright]

## Scenario Matrix

| Scenario ID | Story Ref | Type | Given / When | Expected Observable Outcome (Then) |
|---|---|---|---|---|
| `SCEN-001` | Story 1 | Happy Path | Valid auth token + valid payload | Returns 201 Created with resource ID |
| `SCEN-002` | Story 1 | Validation | Missing required field `email` | Returns 422 Unprocessable with field error |
| `SCEN-003` | Story 2 | Boundary | Expired session token | Returns 401 Unauthorized, zero mutation |

## Red-Ready Test Stubs
```typescript
// Executable assertions targeting ONLY public contracts, zero internal helper imports
describe('Feature: [Name] (Spec Contract)', () => {
  it('SCEN-001: handles valid payload on public seam', async () => {
    // RED: Initial run must fail before implementation
  });

  it('SCEN-002: rejects missing email with 422', async () => {
    // RED: Initial run must fail before implementation
  });
});
```
```

- **Completion Criterion**: `spec-tests.md` exists, contains the complete scenario matrix, and provides executable Red-ready stubs targeting only the public seam.

### 5. Bind Scenarios to Implementation Tasks
When `/to-tickets` subsequently breaks down `tasks.md`, each implementation ticket MUST bind to its target Scenario ID:
`- [ ] 1.1 Implement user creation (Satisfies SCEN-001, SCEN-002)`.
- **Completion Criterion**: Every Scenario ID is assigned to exactly one implementation ticket before `/harness` begins.
