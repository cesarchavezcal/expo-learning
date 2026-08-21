# Implementation Plan: `/init-project` Skill Resolution

Explanation of why `/init-project` was referenced in documentation and proposed resolution options.

---

## 1. Analysis: Why `/init-project` Was in the Docs

### What Happened
- During early repository setup, `/init-project` was written into [`AGENTS.md`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/AGENTS.md) and [`README.md`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/README.md) as the onboarding command triggered when `CONTEXT.md` contains `[Your Project Name]`.
- [`scripts/setup-project.sh`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/scripts/setup-project.sh) was created to assist with stack detection and skill discovery.
- However, a formal `.agents/skills/init-project/SKILL.md` file was never created or installed into the repository. The canonical SDD initialization command is actually **`/sdd-init`**.

---

## 2. Proposed Options

### Option A: Create `.agents/skills/init-project/SKILL.md` (Recommended)
Build an official, self-contained `init-project` skill in the repository that:
1. Detects uninitialized placeholders in `CONTEXT.md`.
2. Interviews the developer about their product idea ($y = f(x)$ scoping).
3. Recommends and provisions the tech stack and test runner.
4. Invokes `/sdd-init` to generate `openspec/` and `.atl/skill-registry.md`.
5. Updates `CONTEXT.md`, `AGENTS.md`, and creates the initial setup branch and PR.

### Option B: Replace `/init-project` with Canonical `/sdd-init`
Update `AGENTS.md`, `README.md`, and `openspec/context/project.md` to remove references to `/init-project` and standardize exclusively on the built-in **`/sdd-init`** command.

---

## 3. Recommended Approach (Option A Details)

If approved, we will create:
#### [NEW] `.agents/skills/init-project/SKILL.md`
- Defines the step-by-step onboarding protocol for any AI agent opening a cloned template.
- Links execution with `scripts/setup-project.sh` and `/sdd-init`.
- Synchronizes with `.atl/skill-registry.md` (making 42 total skills).

---

## 4. Verification Plan

1. Verify `.agents/skills/init-project/SKILL.md` exists and passes GGA review.
2. Run `/sdd-init reload the skills` to index it in `.atl/skill-registry.md`.
3. Test triggering `/init-project` in a mock setup scenario.
