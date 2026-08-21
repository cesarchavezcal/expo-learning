# Skill Registry

> Auto-generated skill registry mapping all available agent skills across local workspace and global system installations.
> Last updated: 2026-08-14

---

## Registry Overview

| Metric | Value |
|---|---|
| **Workspace Skills Registered** | 42 |
| **Global / System Skills Available** | 25 |
| **Total Ecosystem Skills** | 67 |
| **Workspace Sources** | `mattpocock/skills` (35), `cesarchavezcal/personal-skills` (6), `cesarchavezcal/agent-boilerplate` (1) |
| **Global Sources** | `gentleman-programming` (SDD suite, Gentle AI, Skill tooling) |
| **Storage Locations** | Workspace: `.agents/skills/` &bull; Global: `~/.agents/skills/` |
| **Lockfile** | [`skills-lock.json`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/skills-lock.json) |

---

## 1. Product Discovery & Specification (11 skills)

| Skill | Trigger / Command | Source | Description |
|---|---|---|---|
| [`product-function`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/product-function/SKILL.md) | `/product-function` | `cesarchavezcal/personal-skills` | Evaluates and scopes product features by modeling them as functions (y = f(x)) based on Ryan Singer's methodology. Defines the input situation (x), output situation (y), and minimal function transformation f(x) -> y to eliminate scope creep before information-architecture-review and OOUX. |
| [`grill-with-docs`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/grill-with-docs/SKILL.md) | `/grill-with-docs`, `/grill` | `mattpocock/skills` | A relentless interview to sharpen a plan or design, which also creates docs (ADR's and glossary) as we go. |
| [`grill-me`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/grill-me/SKILL.md) | `/grill-me` | `mattpocock/skills` | A relentless interview to sharpen a plan or design. |
| [`grilling`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/grilling/SKILL.md) | `/grilling` | `mattpocock/skills` | Grill the user relentlessly about a plan, decision, or idea. Use when the user wants to stress-test their thinking, or uses any 'grill' trigger phrases. |
| [`information-architecture-review`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/information-architecture-review/SKILL.md) | `/information-architecture` | `cesarchavezcal/personal-skills` | Designs, audits, and validates the information architecture of websites, apps, documentation, dashboards, schemas, and LLM context structures. Use when a user asks to organize, label, simplify, navigation, sitemap, menus, user flows, mind mapping, or context structure. |
| [`ooux`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/ooux/SKILL.md) | `/ooux` | `cesarchavezcal/personal-skills` | Designs object-oriented user experiences (OOUX) by extracting real-world objects, defining core content and metadata, nesting object relationships, and establishing forced ranking matrices. Use after information-architecture-review to structure system entities, object cards, component attributes, and contextual navigation. |
| [`to-spec`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/to-spec/SKILL.md) | `/to-spec` | `mattpocock/skills` | Turn the current conversation into a spec and publish it to the project issue tracker — no interview, just synthesis of what you've already discussed. |
| [`to-tickets`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/to-tickets/SKILL.md) | `/to-tickets` | `mattpocock/skills` | Break a plan, spec, or the current conversation into a set of tracer-bullet tickets, each declaring its blocking edges, published to the configured tracker — edges as text in one file per ticket locally, or native blocking links on a real tracker. |
| [`wayfinder`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/wayfinder/SKILL.md) | `/wayfinder` | `mattpocock/skills` | Plan a huge chunk of work — more than one agent session can hold — as a shared map of decision tickets on your issue tracker, and resolve them one at a time until the way to the destination is clear. |
| [`domain-modeling`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/domain-modeling/SKILL.md) | `/domain-modeling` | `mattpocock/skills` | Build and sharpen a project's domain model. Use when discussing codebase terminology, writing or editing a CONTEXT.md, or recording or editing an ADR. |
| [`codebase-design`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/codebase-design/SKILL.md) | `/codebase-design` | `mattpocock/skills` | Shared vocabulary for designing deep modules. Use when the user wants to design or improve a module's interface, find deepening opportunities, decide where a seam goes, make code more testable or AI-navigable, or when another skill needs the deep-module vocabulary. |

---

## 2. Engineering, TDD & Execution (10 skills)

| Skill | Trigger / Command | Source | Description |
|---|---|---|---|
| [`implement`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/implement/SKILL.md) | `/implement` | `mattpocock/skills` | Implement a piece of work based on a spec or set of tickets. |
| [`tdd`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/tdd/SKILL.md) | `/tdd` | `mattpocock/skills` | Test-driven development. Use when the user wants to build features or fix bugs test-first, mentions "red-green-refactor", or wants integration tests. |
| [`harness`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/harness/SKILL.md) | `/harness` | `cesarchavezcal/personal-skills` | Autonomous code-to-production pipeline — takes an idea or ticket through implementation, CI, review, and finalization with zero to full interaction. |
| [`team-cheap`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/team-cheap/SKILL.md) | `/team-cheap`, `swarm` | `cesarchavezcal/personal-skills` | Cost-optimized workspace-isolated subagent fan-out above /harness — a thin orchestrator dispatches one isolated, fire-and-collect subagent per repo/mandate (Gemini Flash for the bulk, Gemini Pro reserved for hard mandates and reviews) under standing governance. Each subagent runs /harness for its mandate and returns a result. Triggers on '/team-cheap', 'spin up a team', 'swarm agents on this', 'multi-repo team', 'run a team on'. |
| [`diagnosing-bugs`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/diagnosing-bugs/SKILL.md) | `/diagnosing-bugs` | `mattpocock/skills` | Diagnosis loop for hard bugs and performance regressions. Use when the user says "diagnose"/"debug this", or reports something broken/throwing/failing/slow. |
| [`code-review`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/code-review/SKILL.md) | `/code-review` | `mattpocock/skills` | Review the changes since a fixed point (commit, branch, tag, or merge-base) along two axes — Standards (does the code follow this repo's documented coding standards?) and Spec (does the code match what the originating issue/spec asked for?). Runs both reviews in parallel sub-agents and reports them side by side. Use when the user wants to review a branch, a PR, work-in-progress changes, or asks to "review since X". |
| [`improve-codebase-architecture`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/improve-codebase-architecture/SKILL.md) | `/improve-codebase-architecture` | `mattpocock/skills` | Scan a codebase for deepening opportunities, present them as a visual HTML report, then grill through whichever one you pick. |
| [`resolving-merge-conflicts`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/resolving-merge-conflicts/SKILL.md) | `/resolving-merge-conflicts` | `mattpocock/skills` | Use when you need to resolve an in-progress git merge/rebase conflict. |
| [`prototype`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/prototype/SKILL.md) | `/prototype` | `mattpocock/skills` | Build a throwaway prototype to answer a design question. Use when the user wants to sanity-check whether a state model or logic feels right, or explore what a UI should look like. |
| [`research`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/research/SKILL.md) | `/research` | `mattpocock/skills` | Investigate a question against high-trust primary sources and capture the findings as a Markdown file in the repo. Use when the user wants a topic researched, docs or API facts gathered, or reading legwork delegated to a background agent. |

---

## 3. Productivity, Workflow & Coordination (11 skills)

| Skill | Trigger / Command | Source | Description |
|---|---|---|---|
| [`init-project`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/init-project/SKILL.md) | `/init-project` | `cesarchavezcal/agent-boilerplate` | Bootstrap a new repository created from agent-boilerplate. Use when starting a new project, when CONTEXT.md contains uninitialized placeholders ([Your Project Name]), or when asked to initialize/setup the project. |
| [`ask-matt`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/ask-matt/SKILL.md) | `/ask-matt` | `mattpocock/skills` | Ask which skill or flow fits your situation. A router over the skills in this repo. |
| [`i-have-adhd`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/i-have-adhd/SKILL.md) | `/i-have-adhd` | `cesarchavezcal/personal-skills` | Shape output for a reader with ADHD: lead with the next action, number multi-step work, restate state across turns, suppress tangents, give specific time estimates, make wins visible. Invoke with /i-have-adhd; stays on until "stop adhd mode". |
| [`to-questionnaire`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/to-questionnaire/SKILL.md) | `/to-questionnaire` | `mattpocock/skills` | Turn a decision you can't fully answer into a questionnaire for someone else to fill in. |
| [`wizard`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/wizard/SKILL.md) | `/wizard` | `mattpocock/skills` | Generate an interactive bash wizard that walks a human through steps only they can perform. Use when provisioning infrastructure, setting up credentials or CI secrets, walking an unfamiliar third-party dashboard, or running a one-off migration or cutover. Don't invoke this for steps the agent can perform itself. |
| [`wait-what`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/wait-what/SKILL.md) | `/wait-what` | `mattpocock/skills` | Stop. That last message did not land — re-pitch it. |
| [`teach`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/teach/SKILL.md) | `/teach` | `mattpocock/skills` | Teach the user a new skill or concept, within this workspace. |
| [`triage`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/triage/SKILL.md) | `/triage` | `mattpocock/skills` | Move issues and external PRs through a state machine of triage roles — categorise, verify, grill if needed, and write agent-ready briefs. |
| [`handoff`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/handoff/SKILL.md) | `/handoff` | `mattpocock/skills` | Compact the current conversation into a handoff document for another agent to pick up. |
| [`claude-handoff`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/claude-handoff/SKILL.md) | `/claude-handoff` | `mattpocock/skills` | Hand the current conversation off to a fresh background agent that picks up the work immediately. |
| [`loop-me`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/loop-me/SKILL.md) | `/loop-me` | `mattpocock/skills` | Grill me about specs for the workflows I want to build, within this workspace. |

---

## 4. Tooling, Scaffolding & Setup (6 skills)

| Skill | Trigger / Command | Source | Description |
|---|---|---|---|
| [`setup-matt-pocock-skills`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/setup-matt-pocock-skills/SKILL.md) | `/setup-matt-pocock-skills` | `mattpocock/skills` | Configure this repo for the engineering skills — set up its issue tracker, triage label vocabulary, and domain doc layout. Run once before first use of the other engineering skills. |
| [`setup-pre-commit`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/setup-pre-commit/SKILL.md) | `/setup-pre-commit` | `mattpocock/skills` | Set up Husky pre-commit hooks with lint-staged (Prettier), type checking, and tests in the current repo. Use when user wants to add pre-commit hooks, set up Husky, configure lint-staged, or add commit-time formatting/typechecking/testing. |
| [`setup-ts-deep-modules`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/setup-ts-deep-modules/SKILL.md) | `/setup-ts-deep-modules` | `mattpocock/skills` | Wire dependency-cruiser into a TypeScript repo so each package is a deep module — implementation hidden in subfolders, reachable only through its entry-point files. User-invoked. |
| [`migrate-to-shoehorn`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/migrate-to-shoehorn/SKILL.md) | `/migrate-to-shoehorn` | `mattpocock/skills` | Migrate test files from `as` type assertions to @total-typescript/shoehorn. Use when user mentions shoehorn, wants to replace `as` in tests, or needs partial test data. |
| [`git-guardrails-claude-code`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/git-guardrails-claude-code/SKILL.md) | `/git-guardrails` | `mattpocock/skills` | Set up Claude Code hooks to block dangerous git commands (push, reset --hard, clean, branch -D, etc.) before they execute. Use when user wants to prevent destructive git operations, add git safety hooks, or block git push/reset in Claude Code. |
| [`scaffold-exercises`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/scaffold-exercises/SKILL.md) | `/scaffold-exercises` | `mattpocock/skills` | Create exercise directory structures with sections, problems, solutions, and explainers that pass linting. Use when user wants to scaffold exercises, create exercise stubs, or set up a new course section. |

---

## 5. Writing & Documentation (4 skills)

| Skill | Trigger / Command | Source | Description |
|---|---|---|---|
| [`writing-for-agents`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/writing-for-agents/SKILL.md) | `/writing-for-agents` | `mattpocock/skills` | Writing documents for agents. Use when creating or editing skills, or modifying AGENTS.md or CLAUDE.md. |
| [`writing-beats`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/writing-beats/SKILL.md) | `/writing-beats` | `mattpocock/skills` | Writing, exploit — assemble raw material into a journey of beats, grounding each term before a beat leans on it. |
| [`writing-fragments`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/writing-fragments/SKILL.md) | `/writing-fragments` | `mattpocock/skills` | Writing, explore — mine raw fragments, no structure yet. |
| [`writing-shape`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/writing-shape/SKILL.md) | `/writing-shape` | `mattpocock/skills` | Writing, exploit — shape raw material into an article, paragraph by paragraph. |

---

## 6. Global & System Skills (25 skills)

### 6.1 SDD Lifecycle Suite (10 skills)

| Skill | Trigger / Command | Source | Description |
|---|---|---|---|
| [`sdd-init`](file:///Users/cesaradalbertochavezcalderon/.agents/skills/sdd-init/SKILL.md) | `/sdd-init`, SDD orchestrator | `gentleman-programming / global` | Trigger: sdd init, iniciar sdd, openspec init. Initialize SDD context, testing capabilities, registry, and persistence. |
| [`sdd-explore`](file:///Users/cesaradalbertochavezcalderon/.agents/skills/sdd-explore/SKILL.md) | `/sdd-explore`, SDD orchestrator | `gentleman-programming / global` | Explore SDD ideas before committing to a change. Trigger: orchestrator launches exploration or requirement clarification. |
| [`sdd-propose`](file:///Users/cesaradalbertochavezcalderon/.agents/skills/sdd-propose/SKILL.md) | `/sdd-propose`, SDD orchestrator | `gentleman-programming / global` | Create an SDD change proposal with intent, scope, and approach. Trigger: orchestrator launches proposal work for a change. |
| [`sdd-spec`](file:///Users/cesaradalbertochavezcalderon/.agents/skills/sdd-spec/SKILL.md) | `/sdd-spec`, SDD orchestrator | `gentleman-programming / global` | Write SDD delta specs with requirements and scenarios. Trigger: orchestrator launches spec work for a change. |
| [`sdd-design`](file:///Users/cesaradalbertochavezcalderon/.agents/skills/sdd-design/SKILL.md) | `/sdd-design`, SDD orchestrator | `gentleman-programming / global` | Create the SDD technical design and architecture approach. Trigger: orchestrator launches design for a change. |
| [`sdd-tasks`](file:///Users/cesaradalbertochavezcalderon/.agents/skills/sdd-tasks/SKILL.md) | `/sdd-tasks`, SDD orchestrator | `gentleman-programming / global` | Break an SDD change into implementation tasks. Trigger: orchestrator launches task planning for a change. |
| [`sdd-apply`](file:///Users/cesaradalbertochavezcalderon/.agents/skills/sdd-apply/SKILL.md) | `/sdd-apply`, SDD orchestrator | `gentleman-programming / global` | Implement SDD tasks from specs and design. Trigger: orchestrator launches apply for one or more change tasks. |
| [`sdd-verify`](file:///Users/cesaradalbertochavezcalderon/.agents/skills/sdd-verify/SKILL.md) | `/sdd-verify`, SDD orchestrator | `gentleman-programming / global` | Trigger: SDD verification phase, verify change. Execute tests and prove implementation matches specs, design, and tasks. |
| [`sdd-archive`](file:///Users/cesaradalbertochavezcalderon/.agents/skills/sdd-archive/SKILL.md) | `/sdd-archive`, SDD orchestrator | `gentleman-programming / global` | Archive a completed SDD change by syncing delta specs. Trigger: orchestrator launches archive after implementation and verification. |
| [`sdd-onboard`](file:///Users/cesaradalbertochavezcalderon/.agents/skills/sdd-onboard/SKILL.md) | `/sdd-onboard`, SDD orchestrator | `gentleman-programming / global` | Walk users through the SDD workflow on the real codebase. Trigger: orchestrator launches onboarding for the full SDD cycle. |

### 6.2 Review, Git & Code Quality (10 skills)

| Skill | Trigger / Command | Source | Description |
|---|---|---|---|
| [`branch-pr`](file:///Users/cesaradalbertochavezcalderon/.agents/skills/branch-pr/SKILL.md) | `/branch-pr` | `gentleman-programming / global` | Create Gentle AI pull requests with issue-first checks. Trigger: creating, opening, or preparing PRs for review. |
| [`chained-pr`](file:///Users/cesaradalbertochavezcalderon/.agents/skills/chained-pr/SKILL.md) | `/chained-pr` | `gentleman-programming / global` | Trigger: PRs over 400 lines, stacked PRs, review slices. Split oversized changes into chained PRs that protect review focus. |
| [`work-unit-commits`](file:///Users/cesaradalbertochavezcalderon/.agents/skills/work-unit-commits/SKILL.md) | `/work-unit-commits` | `gentleman-programming / global` | Plan commits as reviewable work units. Trigger: implementation, commit splitting, chained PRs, or keeping tests and docs with code. |
| [`judgment-day`](file:///Users/cesaradalbertochavezcalderon/.agents/skills/judgment-day/SKILL.md) | `/judgment-day` | `gentleman-programming / global` | Trigger: judgment day, dual review, adversarial review, juzgar. Run explicit blind dual review with at most two scoped fix/re-judgment rounds. |
| [`rdd-defect-workflow`](file:///Users/cesaradalbertochavezcalderon/.agents/skills/rdd-defect-workflow/SKILL.md) | `/rdd-defect-workflow` | `gentleman-programming / global` | Trigger: RDD, receipt-driven development, review authority, receipt/lineage, correction/recovery, delivery gate/kill switch, bounded review defects. Guide work. |
| [`gentle-ai-bench`](file:///Users/cesaradalbertochavezcalderon/.agents/skills/gentle-ai-bench/SKILL.md) | `/gentle-ai-bench` | `gentleman-programming / global` | Trigger: bench, journey, journeys, driven mode, gentle-ai-bench, journey corpus, j-numbers, bench axis. Author and verify gentle-ai bench journeys; go test ./bench never proves driven execution. |
| [`comment-writer`](file:///Users/cesaradalbertochavezcalderon/.agents/skills/comment-writer/SKILL.md) | `/comment-writer` | `gentleman-programming / global` | Write warm, direct collaboration comments. Trigger: PR feedback, issue replies, reviews, Slack messages, or GitHub comments. |
| [`cognitive-doc-design`](file:///Users/cesaradalbertochavezcalderon/.agents/skills/cognitive-doc-design/SKILL.md) | `/cognitive-doc-design` | `gentleman-programming / global` | Design docs that reduce cognitive load. Trigger: writing guides, READMEs, RFCs, onboarding, architecture, or review-facing docs. |
| [`issue-creation`](file:///Users/cesaradalbertochavezcalderon/.agents/skills/issue-creation/SKILL.md) | `/issue-creation` | `gentleman-programming / global` | Create and triage GitHub issues from repository evidence. Trigger: issue creation, bug reports, feature requests, or issue approval. |
| [`systemic-issue-triage`](file:///Users/cesaradalbertochavezcalderon/.agents/skills/systemic-issue-triage/SKILL.md) | `/systemic-issue-triage` | `gentleman-programming / global` | Trigger: new issue, bug report, triage, backlog, issue flood, community report, root cause, dead-end, blocked user. Attack issues by root class, never one-by-one; fixes must shrink the system, not grow it. |

### 6.3 Skill Management & Capabilities (5 skills)

| Skill | Trigger / Command | Source | Description |
|---|---|---|---|
| [`find-skills`](file:///Users/cesaradalbertochavezcalderon/.agents/skills/find-skills/SKILL.md) | `/find-skills` | `gentleman-programming / global` | Helps users discover and install agent skills when they ask questions like "how do I do X", "find a skill for X", "is there a skill that can...", or express interest in extending capabilities. This skill should be used when the user is looking for functionality that might exist as an installable skill. |
| [`skill-creator`](file:///Users/cesaradalbertochavezcalderon/.agents/skills/skill-creator/SKILL.md) | `/skill-creator` | `gentleman-programming / global` | Trigger: new skills, agent instructions, documenting AI usage patterns. Create LLM-first skills with valid frontmatter. |
| [`skill-improver`](file:///Users/cesaradalbertochavezcalderon/.agents/skills/skill-improver/SKILL.md) | `/skill-improver` | `gentleman-programming / global` | Trigger: improve skills, audit skills, refactor skills, skill quality. Audit and upgrade existing LLM-first skills. |
| [`skill-registry`](file:///Users/cesaradalbertochavezcalderon/.agents/skills/skill-registry/SKILL.md) | `/skill-registry` | `gentleman-programming / global` | Trigger: update skills, skill registry, actualizar skills, after skill changes. Index available skills by trigger and path. |
| [`go-testing`](file:///Users/cesaradalbertochavezcalderon/.agents/skills/go-testing/SKILL.md) | `/go-testing` | `gentleman-programming / global` | Trigger: Go tests, go test coverage, Bubbletea teatest, golden files. Apply focused Go testing patterns. |
