# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

---

# Global Agent Instructions (`AGENTS.md`)

This file defines the primary operational rules, pipeline lifecycle, and communication standards for all AI agents working in this repository.

---

## 0. Session-Start Onboarding & Dynamic Skill Discovery

Whenever an agent session starts:
1. **Inspect Context**: Check [`CONTEXT.md`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/CONTEXT.md) for placeholder strings (`[Your Project Name]`).
2. **Auto-Prompt**: If placeholders are present, inform the user that the repository is uninitialized and offer to execute the **`/init-project`** onboarding workflow.
3. **Pure Dynamic 4-Category Skill Discovery**: The template contains zero predefined stack skills. During setup or on-demand via **`/find-skills`**, the agent dynamically queries `npx skills find` across 4 pillars:
   - 🎨 **Design & UX**: UI components, design tokens, styling (`Step 2 & 5`)
   - 💻 **Coding & Architecture**: Framework best practices, ORM, schemas (`Step 3 & 5`)
   - 🧪 **Testing & Quality**: TDD, assertions, E2E runners (`Step 5 & 6`)
   - 🛠️ **Helpers & Infra**: Deployments, Docker, git hooks, CI/CD (`Step 6 & 7`)
   Installed skills are mapped into `.atl/skill-registry.md` and `openspec/config.yaml`.

---

## 1. Primary Operational Mode: `/i-have-adhd`

This repository operates under **ADHD communication guidelines by default**:

1. **Lead with the Next Action**: The first line of your response must be an immediate, actionable step (command, file edit path, or specific answer). No long prose introductions.
2. **Number Multi-Step Work**: Format step-by-step tasks as numbered lists (1..N) where each step is a single bounded action.
3. **Suppress Tangents**: Focus strictly on the task at hand. Do not drag unnecessary context or hypothetical options into view.
4. **Make Progress Visible**: Highlight completed milestones clearly (`✅ Task Complete`).
5. **Concrete End Action**: End every turn with ONE concrete, small next action (< 2 minutes).

---

## 2. Unified SDD & 7-Step Architecture Pipeline with `/unslop`

This repository unifies the specialized 7-step design skills with the official **Spec-Driven Development (SDD)** lifecycle, the **`/autonomic`** master orchestrator, dynamic 4-pillar skill discovery, and `/unslop` writing quality gates. Canonical SDD phase commands, specialized pipeline skills, and autonomous workflows are fully interoperable.

### Master Autonomous Trigger (`/autonomic`)
Prompting **`"autonomic, build an app that does X, Y, Z"`** or invoking **`/autonomic`** executes the entire 7-step pipeline autonomously from scoping and dynamic skill discovery through specifications to `/harness` TDD or `/team-cheap` swarms and verified Pull Request.

### Unified Pipeline Mapping Matrix

```text
┌───────────────────────────────┬───────────────────────────────────────────┬───────────────────────────────────────────┐
│ SDD Canonical Phase           │ Specialized Skill Triggers                │ Artifact Target Paths                     │
├───────────────────────────────┼───────────────────────────────────────────┼───────────────────────────────────────────┤
│ 0. Master Orchestrator        │ /autonomic, /find-skills                  │ Full End-to-End Autonomous Pipeline       │
│ 1. /sdd-explore, /sdd-propose │ /product-function, /grill                 │ docs/product-design/product_function.md   │
│                               │ /find-animation-opportunities             │ openspec/changes/<change>/proposal.md     │
│ 2. /sdd-spec, /sdd-design     │ /to-spec, /ia, /ooux, /pick-ui-library    │ openspec/specs/<feature>/spec.md          │
│                               │ /emil-design-eng, /apple-design           │ docs/product-design/ia.md, ooux.md        │
│                               │ 🟢 GATE 1: /unslop Specs                  │                                           │
│ 3. /sdd-tasks                 │ /to-tickets                               │ openspec/changes/<change>/tasks.md        │
│ 4. /sdd-apply                 │ /implement, /harness, /team-cheap         │ Working source code + unit/integration    │
│                               │ /animate-expo, /improve-animations        │                                           │
│ 5. /sdd-verify                │ /code-review, .gga review                 │ Review receipts + pre-commit audit        │
│                               │ 🟢 GATE 2: /unslop PR & Walk              │ GitHub Pull Request + walkthrough.md      │
│ 6. /sdd-archive               │ PR merge + /sdd-archive                   │ openspec/changes/archive/<date>-<change>/ │
└───────────────────────────────┴───────────────────────────────────────────┴───────────────────────────────────────────┘
```

### Execution Routing Policy for `/sdd-apply` / `/implement`
When executing implementation tasks:
1. **Default Route (Sequential / Single Ticket)**: `/sdd-apply` triggers `/implement`, which delegates to an isolated **`/harness`** subagent for strict Red ➔ Green ➔ Refactor TDD.
2. **Parallel Swarm Route (Multi-Module / `--team`)**: For large or decoupled modules across boundaries, `/sdd-apply --team` dispatches **`/team-cheap`**, fanning out parallel `/harness` subagents.

### Quality & Verification Gate for `/sdd-verify` / `/code-review`
1. **Two-Axis Audit (`/code-review`)**: Runs parallel subagents verifying (1) Spec Compliance and (2) Standards Compliance.
2. **AI Pre-Commit Guardrail ([`.gga`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.gga))**: Blocks non-compliant commits against Section 6 coding rules using the configured provider in `.gga`.
3. **Unslop Gate**: Applies `/unslop` to PR descriptions, eliminating AI tells and corporate filler.

---

## 3. Mandatory `/plan` Boundary Rule

Whenever the user invokes `/plan`:
1. **Plan Artifact Creation**: Create the implementation plan artifact (`request_feedback = true`).
2. **Mandatory Turn Boundary Pause**: STOP calling tools immediately after writing the artifact.
3. **Explicit Approval Gate**: DO NOT run modifying code edits or git commands until the user explicitly responds with approval.

---

## 4. Documentation & Storage Conventions

### Rule of Thumb for Document Creation
- **`docs/`**: If it explains *why* or outlines a high-level design, product architecture, user flows, or implementation plan (e.g. `docs/product-design/`, `docs/planning/`).
- **`openspec/`**: If it defines a testable contract, formal specification, change lifecycle, tasks, or executable verification criteria (e.g. `openspec/specs/`, `openspec/changes/`).

### Directory Structure & Lifecycle
- **Product Design & Schemas**: Saved in `docs/product-design/` (`product_function.md`, `ia.md`, `ooux.md`).
- **OpenSpec Specifications**: Living baseline specs in `openspec/specs/`, active changes in `openspec/changes/`, and archived records in `openspec/changes/archive/`.
- **Implementation Plans & Walkthroughs**: Active plans live in `docs/planning/`. When completed/fully implemented, prefix with `✅_` and move to `docs/planning/archive/` (e.g. `docs/planning/archive/✅_my_plan.md`).


---

## 5. Mandatory Git Workflow Lifecycle, Branch Naming & PR Conventions

### Git Workflow Lifecycle
All work MUST follow this 4-step sequence without exception:
```text
Create Branch ──> Make Changes & Commit ──> Push & Open PR ──> Merge into Base Branch
```

### Branch Naming Conventions
- **Initial Setup (`/init-project`)**: `chore/CCH/initial-setup-{summary}`
- **Standard Feature / Bug Work**: `{prefix}/CCH/{project-initials}-{ticket-number}-{ticket-summary}`

Where `{prefix}` is derived from issue/task type:
- **Bug** → `bugfix`
- **Story / Feature / Epic** → `feature`
- **Maintenance / Improvement** → `chore`

*If no ticket ID is in the prompt, defer branch creation until the ticket is fetched.*

### Commit Message Convention (Conventional Commits)
Format: `<prefix>(<scope>): <short summary>`
Examples:
- `feat(auth): add login form validation`
- `fix(api): handle timeout retry`
- `chore(setup): configure initial project onboarding and git rules`

### PR Instructions & Writing Principles
When writing or creating a Pull Request:
- **Describe WHAT, not HOW**: Explain what the PR delivers to reviewers, not line-by-line implementation details.
- **Keep it High-Level & Scannable**: 2–4 sentences is standard. Use bullet points only for distinct deliverables.
- **Surprise / Risk Callouts Only**: Only surface specific code details or file paths if complex logic, edge cases, security considerations, or architectural changes require careful review.
- **PR Labels**: Check `.github/workflows/` or `.github/*.yml` for required preview app PR labels. Always attach matching PR labels automatically when opening PRs (e.g. `gh pr create --label "chore"` or `--label "feature"`).

---

## 6. Core Coding Standards & Architectural Guidelines (GGA Review Rules)

These standards are strictly enforced by automated GGA code reviews and agent pairing workflows:

### Architectural Principles
1. **Clean / Modular Architecture**: Separate business logic (domain), orchestrators (application/use cases), and adapters (UI, DB, external APIs).
2. **Deep Modules & Clear Interfaces**: Keep module interfaces simple and signatures expressive while hiding complex implementation details inside.
3. **Container-Presentational Separation**: In UI layers, isolate side effects, state fetching, and data subscriptions from pure visual rendering components.

### Type Safety & Language Strictness
1. **Strict Types**: No untyped `any` or loose type overrides. Use exact interfaces and discriminated unions for polymorphic data structures.
2. **Safe Assertions**: Avoid blind `as` casting. Use runtime validators, type guards, or `@total-typescript/shoehorn` in test environments.
3. **Explicit Return Types & Exports**: All public-facing functions and exported modules must have clear type signatures.

### Error Handling & Resilience
1. **Explicit Error Paths**: Favor structured Result/Either types or domain-specific typed errors over silent failures or raw generic `throw Error()`.
2. **No Swallowed Exceptions**: Every `catch` block must either handle, enrich, or rethrow the error with meaningful contextual diagnostics.

### Testing & Verification (TDD First)
1. **Test-First Discipline**: Write failing unit or integration tests before implementing feature logic (Red -> Green -> Refactor).
2. **Deterministic Tests**: Mock network and non-deterministic state at clear boundaries; avoid flaky sleep timers or arbitrary timeouts.

### Code Hygiene & Style
1. **Self-Documenting Code**: Choose descriptive domain terminology over cryptic abbreviations.
2. **Dead Code Elimination**: Remove unused imports, dead branches, and obsolete comments before committing.
3. **Conventional Commits**: Ensure all changes conform to conventional commit format.

---

## 7. Coding Agent Harness Governance & Invariants

```text
┌────────────────────────────────────────────────────────────────┐
│                          THE HARNESS                           │
│                                                                │
│   ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐   │
│   │ Instructions │  │    State     │  │   Verification     │   │
│   │              │  │              │  │                    │   │
│   │ AGENTS.md    │  │ progress.md  │  │ tests + lint       │   │
│   │ CLAUDE.md    │  │ feature_list │  │ type-check         │   │
│   │ feature_list │  │ git log      │  │ smoke runs         │   │
│   │ docs/        │  │ session hand │  │ e2e pipeline       │   │
│   └──────────────┘  └──────────────┘  └────────────────────┘   │
│                                                                │
│   ┌──────────────┐  ┌──────────────────────────────────────┐   │
│   │    Scope     │  │         Session Lifecycle            │   │
│   │              │  │                                      │   │
│   │ one feature  │  │ init.sh at start                     │   │
│   │ at a time    │  │ clean-state checklist at end         │   │
│   │ definition   │  │ handoff note for next session        │   │
│   │ of done      │  │ commit only when safe to resume      │   │
│   └──────────────┘  └──────────────────────────────────────┘   │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

> **The MODEL decides what code to write.**  
> **The HARNESS governs when, where, and how it writes it.**  
> **The harness doesn't make the model smarter.**  
> **It makes the model's output reliable.**

To guarantee reliability across agent sessions, all coding agents must adhere to the following execution invariants:

### Startup Workflow
Before writing code or editing files in any session:
1. Run `./init.sh` to verify baseline project health and test status.
2. Inspect `progress.md` and active `openspec/` change or `feature_list.json` to load current feature state.
3. Select ONE unfinished feature or task before taking action.

### Scope Boundary
1. **One feature at a time**: Implement only the single active work unit. Never bundle unassigned tickets or speculative refactors.
2. **Stay in scope**: Modify only files directly required for the active feature. Do not touch unapproved files or dependencies.

### Definition of Done
A task or feature is done only when:
1. All automated tests pass via `./init.sh` with zero failures.
2. Static typechecks and linters pass cleanly.
3. Verification evidence (command and output summary) is recorded in `progress.md`.
4. Automated `.gga` pre-commit audit and `/code-review` checks pass.

### State Routing & Tracking
1. **Feature Tracker**: Maintain active feature state and dependencies in `feature_list.json` and `openspec/changes/`.
2. **Progress Log**: Document real-time state, completed tasks, and next steps in `progress.md`.
3. **Session Handoff**: Maintain restartable state in `session-handoff.md`.

### End of Session
Before ending any agent session:
1. Update `progress.md` with completed milestones and current objective.
2. Record any blockers, modified files, and recommended next steps in `session-handoff.md`.
3. Ensure the workspace is left in a clean, restartable state.
