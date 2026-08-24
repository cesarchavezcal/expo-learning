---
name: team-cheap
version: 1.4.0
description: "Cost-optimized workspace-isolated subagent fan-out above /harness — a thin orchestrator dispatches one isolated, fire-and-collect subagent per repo/mandate (Gemini Flash for the bulk, Gemini Pro reserved for hard mandates and reviews) under standing governance. Each subagent runs /harness for its mandate and returns a result. Triggers on '/team-cheap', 'spin up a team', 'swarm agents on this', 'multi-repo team', 'run a team on'."
scope: global
user-invocable: true
dependencies: [harness, atlassian, wiki]
allowed-tools:
  - define_subagent
  - invoke_subagent
  - send_message
  - run_command
  - view_file
  - write_to_file
---

# Team Cheap

A thin orchestration layer **above** `/harness` designed for Antigravity agents. A thin orchestrator dispatches isolated, mostly-stateless subagents — one bounded mandate each, in its own workspace (via `Workspace: 'share'`), **Gemini Flash for the bulk and Gemini Pro reserved for hard mandates and reviews** — and collects their results under the user's standing governance. 

Per-mandate execution is delegated to `/harness` — do **not** reimplement sync, ticket, CI, review, or finalize here; those are `/harness`'s job.

**The lead does ZERO implementation work** — no code edits, no deep reads. It *does* maintain its own externalized progress tracking at `.scratch/team-cheap/<session>/handoff.md` and `.scratch/team-cheap/<session>/tasks.md`. Otherwise it's pure dispatch, decision, and governance.

**Seam with `/harness`:** `/harness` is model-blind — a vertical depth engine for one work item that never picks models or cost tiers. This layer owns the orthogonal axes: breadth (many mandates), **model/cost-tier assignment**, and cross-run governance.

---

## The lead's charter

You (the user) invoke the lead. Gemini Pro is the lead model, which routing decisions and decomposition depend upon. Gemini Flash is the default executor model:

- **Emit judgment, not volume.** The lead's output is decomposition, mandate specs, routing decisions, and verdicts on returns. A code block longer than an interface signature is a spec that hasn't been dispatched yet — stop and dispatch it.
- **Delegate exploration, keep conclusions.** Broad codebase searches, log-grepping, and repo archaeology go to a cheap read-only subagent (e.g. `research` subagent, `flash`) that returns conclusions only.
- **Reason once, then hand off.** Do the hard thinking in one pass, capture it in the mandate spec and the anchor, and let the executors carry it from there.
- **Hold the project.** Keep `handoff.md` (request shape + progress) and `tasks.md` current.
- **Plan the split.** Decompose the goal into independent mandates. One mandate per repo unless told otherwise.

---

## Inputs

Gather (ask only for what's missing):
- **Goal** — what the team is accomplishing.
- **Repos** — which repo(s) are in play. One mandate per repo unless told otherwise.
- **Tickets** — existing ticket per repo (if any).
- **Autonomy** — confirm the scoped-autonomy posture (default below).

---

## Phase 1 — Setup

1. **Mint a unique `<session>` id** so concurrent or prior runs never collide: `<kebab-goal>-<UTC YYYYMMDD-HHMMSS>`. Use it for every `.scratch/team-cheap/<session>/` path this run, and record it at the top of the anchor.
2. **Write the session anchor** at `.scratch/team-cheap/<session>/handoff.md` (original goal, mandates, constraints, done criteria).
3. **Write the task board** at `.scratch/team-cheap/<session>/tasks.md` to track each mandate's state, JIRA key, PR link, and current pipeline stage.
4. For each repo in play, **sync its base to latest** before any workspace checkout: `git -C "<repo>" fetch origin`.

---

## Phase 2 — Dispatch (one subagent per mandate)

**Mechanism — isolated subagent fan-out:**
- The orchestrator spawns independent background subagents using the `invoke_subagent` tool with **`Workspace: 'share'`**. This automatically provisions a shared git worktree workspace for isolation so subagents do not collide.
- **Model routing — route by it:**

| Role | Model (Antigravity equivalent) |
|---|---|
| Executors — routine / bounded / well-specified work | **flash** or **inherit** |
| Complex / hard / long-horizon mandates | **pro** |
| Final deep review · silent-failure gate · stuck-agent escalation | **pro** |

- **Independent deep peer review is mandatory before any work reaches ready-for-review.** A fresh, isolated subagent with NO shared session context with the executor (never the same conversation/subagent ID). Run the reviewer on **pro** — reviews are where the stronger model earns its place.
- **Escalation is trigger-based.** The lead re-dispatches the stuck work on **pro** when: a mandate is unsolved after **2 Flash iterations**, the user signals frustration, or two executors return contradictory findings.
- **Mandatory gate on every executor diff in a silent-failure class:** data writes, auth/error paths, stubbing/mocking, logging payloads. Spawn the gate on **pro**.
- **Every executor prompt carries a STOP clause:** constraint-vs-compiler conflicts halt and report, never self-resolve.
- **Resume before re-dispatch.** An executor that returns incomplete is resumed using `send_message` targeting its conversation ID with pointed finish instructions.

---

## Governance

**Scoped autonomy — the balance:**
- One mandate = **one ticket + one branch + one PR**. Full autonomy *inside* it — no asking.
- **No second branch/PR without a new mandate** from the user.
- **Out-of-scope discovery → capture, don't branch.** Append to `.scratch/team-cheap/<session>/FINDINGS.md`.
- **Never ship without the user's explicit personal consent:** No merge, squash, release, promote, or deploy. Stop at **ready-for-review**.
- Add the **"Do Not Review" label when you open your PR** so humans aren't pulled in while agents iterate.

---

## Compaction discipline

- **Do NOT clear the orchestrator conversation mid-run.** Use `/compact` if context threshold is met to summarize and keep the lead's identity + thread.
- **Pre-bias every compaction** to preserve the anchor path and progress.
- **After any compaction, the lead's first action is to re-read `.scratch/team-cheap/<session>/handoff.md`** to rehydrate the request shape.

---

## The mandate spec contract — every dispatch prompt carries all six parts

Subagents share none of the lead's conversation context. Include this verbatim:

1. **Objective** — what to build or change, one paragraph.
2. **Repo + files** — target paths.
3. **Interfaces/contracts** — signatures, types, API shapes.
4. **Constraints** — the governance block (paste `references/guardrails.md`).
5. **Verification** — the command(s) or evidence that prove it works.
6. **Return format** — status tokens: `TICKET-123:repo#456:STATUS` and `GATED_FINALIZE=true`.

For each mandate, call `invoke_subagent` with the spec, setting `Workspace: 'share'` and the correct `Model`.

---

## Orchestrator loop

- Collect subagent returns via incoming messages.
- Update `.scratch/team-cheap/<session>/tasks.md` and the user.
- Batch user decisions; do not re-spam idle notifications.
- A BLOCKED return = answer the question and resume the subagent via `send_message` (if live) or re-dispatch a fresh one.
- Before nudging an idle subagent, check for output artifacts (`.scratch/harness/<session>/`, PR, or `FINDINGS.md`).

---

## Finish

- All mandates land at **ready-for-review** with reviewers requested.
- Offer `/retro` on each mandate to bake corrections into durable context.
- Terminate subagents when completed. Offer worktree cleanup.

---

## Help Cheatsheet

```
/team-cheap                 Orchestrate a multi-repo agent swarm above /harness
/team-cheap help            Show this reference

MODEL ROUTING (Gemini equivalents)
  Executors / routine bulk    flash or inherit
  Complex / hard mandates     pro
  Deep review / gate / SME    pro

DISPATCH SHAPES
  Subagent executor   default — one mandate, Workspace: 'share' for isolated worktree
  Subagent reviewer   fresh independent session for the mandatory peer review
  Advisor consult     read-only pro verdict BEFORE architectural commitments

SPEC CONTRACT (every dispatch prompt, all six)
  Objective · Repo+files · Interfaces/contracts · Constraints · Verification
  Return format (status token TICKET-123:repo#456:STATUS + GATED_FINALIZE=true)

GOVERNANCE
  One mandate = one ticket/branch/PR · never ship without your consent
  Capture-don't-branch tangents to FINDINGS · Workspace: 'share' handles isolation
  State the return channel (send_message) and recipient ID in the prompt
```
