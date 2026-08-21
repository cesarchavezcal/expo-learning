---
id: harness-epic-mode
type: runbook
title: Epic Mode — Workflow
tags: [harness]
links: []
confidence: medium
created: 2026-05-06
updated: 2026-06-04
---

# Epic Mode — Workflow

`/harness epic <EPIC-KEY>` orchestrates a full epic-to-PRs pipeline. The orchestrator chains existing leaf primitives — it does not duplicate their logic.

## Overview

| Step | What | How |
|------|------|-----|
| 1. Fetch | Pull epic + children from JIRA | `/ticket fetch <EPIC-KEY>` |
| 2. Council | Problem validation, architectural feasibility, risks, sequencing | `/architect <EPIC-KEY>` |
| 3. Plan pick | User selects a candidate plan | Interactive |
| 4. Ticket tree | Fan out one ticket per plan element | `/ticket draft → /ticket create → /ticket link` per element |
| 5. Assess | Classify each child for AI readiness | `/ticket assess <CHILD-KEY>` per child |
| 6. Execute | Batch-run AI-READY children | Existing harness Phase 1–6 with sliding window |

**Outputs land where each primitive owns them:** `/architect` writes to `.scratch/architect/<session-id>/`, `/ticket` writes to JIRA. `/harness epic` writes its own orchestration log to `.scratch/harness/<run-id>/epic-log.md` (which children were created, which were assessed, which executed, blockers).

---

## Steps

### 1. Fetch

Call `/ticket fetch <EPIC-KEY>` to pull the epic plus existing children, comments, and links. Identify target repos via `/ticket`'s `references/repo-routing.md`.

### 2. Architect Council

Hand off to `/architect <EPIC-KEY>` for the 6-mindset council (Pragmatist, Archaeologist, Constraint Enforcer, Risk Hunter, User Advocate, Devil's Advocate). The council produces:

- `problem-statement.md` (Phase 2)
- Codebase / system / topology research (Phase 3 intel pack)
- 1–3 candidate plans with execution-order metadata (Phase 5 synthesis)
- Concerns file with risk flags and follow-up spike candidates

Epic Mode reads these artifacts as input — it does not re-derive them.

### 3. Plan Pick

Present the council's candidate plans to the user. Wait for an explicit pick before fanning out tickets — fan-out is the point of no return for JIRA writes. (`--auto-approve-tree` may bypass this for unattended runs.)

### 4. Ticket Tree

For each element in the chosen plan, call the `/ticket` primitives:

```
/ticket draft <plan-element>     → returns a draft ticket (Gherkin AC, technical notes, peer review setup)
/ticket create <draft>           → files the draft to JIRA, returns the new key
/ticket link <child-key> <epic>  → sets the parent relationship
```

Each `/ticket draft` call inherits `/ticket`'s existing rules — one platform per ticket, Fibonacci 0.5–5 cap, template formatting. The orchestrator does not restate those rules.

**Ordering:** use the execution order from `/architect`'s synthesized plan. The plan already encodes dependencies; the orchestrator does not impose its own backend-first/frontend-second heuristic.

**Nice-to-haves** (CSV import UI, dashboard widgets, etc.): note in the orchestration log under "Nice-to-Have." Do not file as JIRA tickets unless the user opts in.

### 5. Assess

After all children exist in JIRA, run `/ticket assess <CHILD-KEY>` per child to apply `AI-EASY` / `AI-MEDIUM` / `AI-HARD` and `AI-READY` / `AI-BLOCKED` labels. This is the same primitive that powers `--triage`.

### 6. Execute

Batch-run AI-READY children through the standard harness pipeline (Phase 1–6, sliding window `--parallel N`). Children labeled `AI-BLOCKED` stay in JIRA for human follow-up.

---

## Flag Combinations

| Invocation | Behavior |
|------------|----------|
| `/harness epic <KEY>` | Full pipeline with checkpoints (default) |
| `/harness epic <KEY> --auto-approve-tree` | Skip Step 3 user pick — use the first plan, fan out verbatim |
| `/harness epic <KEY> --parallel 3` | Step 6 sliding window of 3 |
| `/harness epic <KEY> --deep` | Force `/review --deep` on each child's PR |
| `/harness epic <KEY> --ready` | Step 6 PRs land non-draft |
| `/harness --batch --epic <KEY>` | Bypass Steps 1–4; treat `--epic` as a JQL filter and run only Step 6 on existing AI-READY children |
| `/harness --triage --epic <KEY>` | Bypass Steps 1–4 and Step 6; run only Step 5 on existing children |
