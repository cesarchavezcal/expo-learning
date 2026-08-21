---
name: harness
version: 1.9.0
description: >
  Autonomous code-to-production pipeline — takes an idea or ticket through implementation,
  CI, review, and finalization with zero to full interaction.
scope: global
user-invocable: true
allowed-tools:
  - define_subagent
  - invoke_subagent
  - send_message
  - run_command
  - view_file
  - write_to_file
dependencies: [qa, playwright, atlassian, ci, code, review, retro, worktree, wiki, ace-trace, ticket, architect]
---

# Harness

Autonomous execution engine adapted for Antigravity agents. Takes an idea or ticket through the full pipeline: assess, branch, implement, gated review → comment-drain → CI, fix loop, final review, finalize.

## Hard Blocks (never override)

1. **Never merge a PR.** Merging requires `/ci release`.
2. **Never push to main/master.** All work on feature branches via worktrees (using `Workspace: 'share'`).
3. **Never commit without passing build + lint + tests.**

---

## Pipeline Checklist (ticket-locked)

When running in ticket-locked mode, the executor subagent tracks these 11 states in a task list inside `.scratch/harness/<session>/tasks.md` and updates the PR body checklist as the durable copy:

| # | State | Gate |
|---|---|---|
| 1 | ASSESS | complexity + readiness labels set |
| 2 | BRANCH | Workspace: 'share' + draft PR + Do Not Review label + ticket In Progress |
| 3 | IMPLEMENT | code written; saved only via `/ci push` (`[skip ci]`) |
| 4 | LOCAL-GREEN | lint + type-check + unit + local build + happy-path pass |
| 5 | DEEP-REVIEW | `/review --deep` run; findings resolved |
| 6 | COMMENT-DRAIN | zero unresolved bot/peer threads |
| 7 | CI | rebase onto base (`/ci sync`), then initial `/ci run` |
| 8 | FIX-LOOP | iterate on CI failures/findings until green |
| 9 | CONFIRM | `/review --deep` confirms fixes, no regressions |
| 10 | READY | `/ci ready` (or `/ci ready --keep-gate` on gated finalize) |
| 11 | FINALIZE | grade + JIRA label/comment + demo + report |

---

## Phase 0: Setup & Resolution

### Step 1: Detect Mode & Resolve Work Item
- Identify if the task is an Initiative, Epic, or Ticket. Defer to `/ticket` for assessment if required.
- If the ticket has labels `AI-READY` and a complexity label, execute directly. Otherwise, run `/ticket assess`.

### Step 2: Resolve Workspace (Worktree)
- Antigravity handles workspace isolation natively. When fanning out or starting execution, invoke the executor subagent with **`Workspace: 'share'`**.
- This automatically provisions a shared git worktree workspace. The executor subagent runs all execution inside this workspace.

### Step 3: Dispatch Executor
- Spawn the `harness-executor` subagent using the `invoke_subagent` tool with the contract payload in the prompt.
- Set `Workspace: 'share'` and model `pro` (or `flash` for routine/easy tasks).

---

## Token Efficiency & Reporting

Keep status updates clean and concise. Store deep logs, test results, and reviews in `.scratch/harness/<session>/` files:
- `.scratch/harness/<session>/report.md` (Final summary)
- `.scratch/harness/<session>/concerns.md` (Scope/risk flags)
- `.scratch/harness/<session>/session-log.md` (Fix loop learning patterns)

---

## Help Cheatsheet

```
Harness — autonomous code-to-production pipeline.

USAGE
  /harness "description"              Idea → /ticket → assess → execute
  /harness TICKET-123                 Existing ticket → assess if needed → execute
  /harness epic PA-114                Epic → /architect → ticket tree → batch execute
  /harness --localhost                Kill tracked server + restart fullstack
  /harness --localhost stop           Stop the tracked dev server, remove PID file
  /harness status                     Print current state + remaining gates
  /harness help                       This cheatsheet

MODES
  (default)         Autonomous — zero interaction, Workspace: 'share' for worktree
  --interactive     Pause at checkpoints for approval (ASSESS, IMPLEMENT, CI, REVIEW)
```
