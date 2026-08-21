# Agent Boilerplate Template

A lightweight, stack-agnostic GitHub Repository Template pre-configured for autonomous AI agent-driven software development across any AI environment (Google Antigravity, Cursor, Claude Code, Windsurf, Aider, GitHub Copilot).

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

---

## 🌟 Key Features

- **Universal AI Agent Governance**: Standardized multi-agent configuration via [`AGENTS.md`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/AGENTS.md), [`.cursorrules`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.cursorrules), and [`CLAUDE.md`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/CLAUDE.md). Any agent automatically detects uninitialized placeholders and offers onboarding.
- **Coding Agent Harness Governance (100/100 Benchmark)**: Integrated 5-subsystem execution invariants and state tracking (`./init.sh`, `feature_list.json`, `progress.md`, `session-handoff.md`) ensuring strict "one feature at a time" scope boundaries, fail-fast verification, and zero multi-session amnesia.
- **Autonomous Product Builder Engine**: Turns product ideas into shipped features via discovery (`/product-function`), formal specs (`/to-spec`), design (`/ia`, `/ooux`), atomic tickets (`/to-tickets`), and autonomous TDD execution (`/harness`).
- **Two `/unslop` Quality Gates**: Integrated writing filters at the Spec/Design gate and PR/Walkthrough gate to eliminate AI clichés, corporate filler, and robotic tells.
- **AI Pre-Commit Guardrails ([`.gga`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.gga))**: Integrated Gentleman Guardian Angel evaluates staged git commits with Gemini / Antigravity (`agy`), enforcing clean architecture, strict typing, and test-first discipline before commits land.
- **Documentation vs. OpenSpec Separation & Planning Archive**: Explicit rule of thumb separating conceptual/design documentation (`docs/`) from formal testable contracts & change lifecycles (`openspec/`), with automatic archiving into `docs/planning/archive/`.
- **Dynamic Post-Brainstorming Stack Scaffolding**: Keep the template 100% stack-neutral. Tech stacks, test runners, and tooling are dynamically synthesized and provisioned after product discovery ($y = f(x)$).
- **Strict Git Lifecycle & PR Standards**: Enforced branch naming (`{prefix}/CCH/{project-initials}-{ticket-number}-{ticket-summary}`), Conventional Commits, and automated PR labeling.
- **`/i-have-adhd` Mode by Default**: Action-first, numbered, direct communication style that eliminates conversational fluff and keeps execution momentum high.

---

## 🚀 One-Prompt Creation & Autonomous Building

### 1. Initialize a New Repository
To start a new project from this template, prompt your AI agent:

> *"Create a new project named `my-awesome-app` using `cesarchavezcal/agent-boilerplate` and complete the setup."*

The AI agent will automatically:
1. Run `gh repo create my-awesome-app --template cesarchavezcal/agent-boilerplate --public --clone`
2. `cd my-awesome-app`
3. Execute `/init-project` to interview your product concept, dynamically provision your tech stack, populate context files, and open the initial setup PR.

### 2. Autonomous Product Feature Building
To build a feature completely autonomously through the harness, prompt:

> *"Build feature X autonomously: Scope with `/product-function`, spec with `/to-spec`, unslop with `/unslop`, decompose with `/to-tickets`, and implement via `/harness` until `./init.sh` is green."*

---

## 🏗️ Coding Agent Harness & Reliability (100/100)

This repository includes a battle-tested agent harness scored across 5 subsystems:

```text
┌─────────────────┬───────────────────────────────┬───────────────────────────────────────────┐
│ Subsystem       │ Artifact / Invariant          │ Operational Purpose                       │
├─────────────────┼───────────────────────────────┼───────────────────────────────────────────┤
│ 1. Instructions │ AGENTS.md (Section 7)         │ Startup workflow, scope rules, DOD        │
│ 2. State        │ feature_list.json, progress.md│ Active feature tracking & test evidence   │
│ 3. Verification │ init.sh (set -e)              │ Automated test/lint verification barrier  │
│ 4. Scope        │ "One feature at a time" rule  │ Prevents hallucinated refactors & drift   │
│ 5. Lifecycle    │ session-handoff.md            │ Clean restart state across agent sessions │
└─────────────────┴───────────────────────────────┴───────────────────────────────────────────┘
```

### Auditing Harness Reliability
To run the automated harness validator:
```bash
node .agents/skills/harness-creator/scripts/validate-harness.mjs --target .
```

---

## 🔄 Unified SDD & 7-Step Architecture Pipeline with `/unslop`

Every feature or bug follows the unified pipeline matrix:

```text
┌───────────────────────────────┬───────────────────────────────┬───────────────────────────────────────────┐
│ SDD Canonical Phase           │ Specialized Skill Triggers    │ Artifact Target Paths                     │
├───────────────────────────────┼───────────────────────────────┼───────────────────────────────────────────┤
│ 1. /sdd-explore, /sdd-propose │ /product-function, /grill     │ docs/product-design/product_function.md   │
│                               │                               │ openspec/changes/<change>/proposal.md     │
│ 2. /sdd-spec, /sdd-design     │ /to-spec, /ia, /ooux          │ openspec/specs/<feature>/spec.md          │
│                               │ 🟢 GATE 1: /unslop Specs      │ docs/product-design/ia.md, ooux.md        │
│ 3. /sdd-tasks                 │ /to-tickets                   │ openspec/changes/<change>/tasks.md        │
│ 4. /sdd-apply                 │ /implement, /harness, /team   │ Working source code + unit/integration    │
│ 5. /sdd-verify                │ /code-review, .gga review     │ Review receipts + pre-commit audit        │
│                               │ 🟢 GATE 2: /unslop PR & Walk  │ GitHub Pull Request + walkthrough.md      │
│ 6. /sdd-archive               │ PR merge + /sdd-archive       │ openspec/changes/archive/<date>-<change>/ │
└───────────────────────────────┴───────────────────────────────┴───────────────────────────────────────────┘
```

### Execution Routing Policy (`/sdd-apply`)
- **Single-Ticket / Sequential Tasks**: `/sdd-apply` triggers `/implement`, which delegates to an isolated [`/harness`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/harness/SKILL.md) subagent for strict Red ➔ Green ➔ Refactor TDD.
- **Parallel Swarm Tasks**: `/sdd-apply --team` dispatches [`/team-cheap`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/team-cheap/SKILL.md), fanning out parallel `/harness` subagents across decoupled modules.

---

## 📁 Documentation & Storage Conventions

- **Rule of Thumb for Document Creation**:
  - **`docs/`**: If it explains *why* or outlines high-level design, product architecture, user journeys, or implementation plans (e.g. `docs/product-design/`, `docs/planning/`).
  - **`openspec/`**: If it defines a testable contract, formal specification, change lifecycle, tasks, or executable verification criteria (e.g. `openspec/specs/`, `openspec/changes/`).
- **Planning Archive Convention**: Active implementation plans live in `docs/planning/`. Fully completed plans are prefixed with `✅_` and moved to `docs/planning/archive/`.

---

## 🛡️ Pre-Commit AI Code Review (GGA)

This repository includes [`.gga`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.gga) (Gentleman Guardian Angel) configured with the **Gemini / Antigravity (`agy`)** provider.

- **Automated Gatekeeper**: Runs on every `git commit` to audit staged code against Section 6 coding rules in [`AGENTS.md`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/AGENTS.md).
- **Manual PR Check**: Run `gga run --pr-mode` in your terminal to evaluate all PR changes against `main`.
- **Config Status**: Run `gga config` to inspect active provider and review patterns.

---

## 📋 Git Conventions & PR Workflow

All work follows the mandatory 4-step sequence:
```text
Create Branch ──> Make Changes & Commit ──> Push & Open PR ──> Merge into Base Branch
```

- **Branch Naming**:
  - Initial Setup: `chore/CCH/initial-setup-{summary}`
  - Features / Bugs: `{prefix}/CCH/{project-initials}-{ticket-number}-{ticket-summary}` (`feature`, `bugfix`, `chore`).
- **Commit Format**: Conventional Commits `<prefix>(<scope>): <summary>`.
- **PR Principles**: High-level 2–4 sentence summary of WHAT was delivered, un-slopped and clear. Automated labels attached via `gh pr create --label "<label>"`.

---

## ⚡ Slash Commands Quick Reference

| Command | Purpose |
|---|---|
| `/autonomic` | Master orchestrator: run full product lifecycle autonomously from prompt to PR |
| `/init-project` | Run onboarding interview, dynamically bootstrap stack, and populate quad files |
| `/harness-creator` | Audit and validate harness reliability across 5 subsystems (100/100 score) |
| `/unslop` | Remove AI tells, corporate fluff, and robotic patterns from docs and PRs |
| `/sdd-init` | Initialize or reload OpenSpec persistence and `.atl/skill-registry.md` |
| `/sdd-explore` | Deep codebase investigation and architectural mapping without modifying code |
| `/product-function` | Scope feature as $y = f(x)$ with 10x Scope-Stripping |
| `/grill-with-docs` | Stress-test feature scope and technical bounds against documentation |
| `/to-spec` / `/sdd-spec` | Generate formal acceptance criteria and domain contracts in `openspec/specs/` |
| `/ia` & `/ooux` | Generate Sitemap, User Flows, Object Cards, and ERD in `docs/product-design/` |
| `/to-tickets` / `/sdd-tasks` | Decompose design into atomic test-first tickets in `tasks.md` |
| `/sdd-apply` / `/implement` | Execute tasks autonomously via `/harness` (single) or `/team-cheap` (swarm) |
| `/sdd-verify` / `/code-review` | Two-axis audit (Spec + Standards compliance) and GGA pre-commit verification |
| `/sdd-archive` | Archive completed change into `openspec/changes/archive/` and sync living specs |
| `/find-skills` | Search open ecosystem skills via `npx skills find` with interactive selection |
| `/plan` | Generate implementation plan artifact with mandatory turn boundary pause |
