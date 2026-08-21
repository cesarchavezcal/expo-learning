# Implementation Plan: Pure Dynamic Skill Discovery Protocol (Design, Coding, Testing, Helpers)

This plan ensures that **`agent-boilerplate` remains 100% skill-neutral and stack-neutral with ZERO hardcoded skills**. Instead, the agent executes a **pure dynamic discovery protocol** during the onboarding setup phase (`/init-project`), post-setup, or during coding, searching the open ecosystem via `npx skills find` and linking discovered skills to the pipeline.

---

## User Review Required

> [!IMPORTANT]
> **Pure Dynamic Discovery Workflow (Zero Hardcoded Skills)**
> 
> ```text
> 1. Developer Scopes Product & Tech Stack in /init-project
>    (e.g., "FastAPI + React + PostgreSQL + Docker" OR "Next.js + Supabase + Playwright")
>                                   │
>                                   ▼
> 2. Agent Dynamically Queries Ecosystem Across 4 Categories:
>    ├── 🎨 Design:  npx skills find "<frontend-or-ui-keyword>"
>    ├── 💻 Coding:  npx skills find "<backend-or-db-keyword>"
>    ├── 🧪 Testing: npx skills find "<test-framework-or-tdd-keyword>"
>    └── 🛠️ Helpers: npx skills find "<infra-deployment-tooling-keyword>"
>                                   │
>                                   ▼
> 3. Agent Presents Discovered Matches to User for Selection & Installs Them:
>    ➔ npx skills add <chosen-skills>
>                                   │
>                                   ▼
> 4. Agent Dynamically Links Discovered Skills to Pipeline Phases in .atl/skill-registry.md:
>    ├── Discovered Design Skills   ➔ Linked to Step 2 (Design) & Step 5 (UI Apply)
>    ├── Discovered Coding Skills   ➔ Linked to Step 3 (Specs) & Step 5 (TDD Implementation)
>    ├── Discovered Testing Skills  ➔ Linked to Step 5 (Red Phase) & Step 6 (Verification)
>    └── Discovered Helper Skills   ➔ Linked to Step 6 (Audit/CI) & Step 7 (Deploy/PR)
> ```

---

## Open Questions

> [!NOTE]
> None. Fully aligns with your requirement that skills are discovered dynamically based on the project stack rather than predefined in the boilerplate.

---

## Proposed Changes

### Component 1: Setup Discovery Protocol (`init-project/SKILL.md`)

#### [MODIFY] [`.agents/skills/init-project/SKILL.md`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/init-project/SKILL.md)
- In Step 3 (Stack Manifest & Dynamic 4-Category Discovery):
  - Formulate the exact discovery loop:
    1. Extract keywords from the user's chosen tech stack (e.g. `[framework]`, `[database]`, `[testing]`, `[infra]`).
    2. Run dynamic searches:
       - `npx skills find "<ui-keyword>"` (Design)
       - `npx skills find "<framework-keyword>"` (Coding)
       - `npx skills find "<test-runner-keyword>"` (Testing)
       - `npx skills find "<infra-keyword>"` (Helpers / Tooling)
    3. Display interactive selection menu with discovered packages.
    4. Install user-selected skills with `npx skills add <package>`.
    5. Dynamically generate `.atl/skill-registry.md` mapping each installed skill to its respective SDD/Autonomic pipeline phase.

---

### Component 2: Universal On-Demand Discovery (`find-skills/SKILL.md` & `autonomic/SKILL.md`)

#### [MODIFY] [`.agents/skills/find-skills/SKILL.md`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/find-skills/SKILL.md)
- Standardize the 4-category search protocol (Design, Coding, Testing, Helpers) for on-demand use:
  - Can be invoked anytime (`/find-skills "topic"` or `"find skills for <domain>"`).
  - Automatically recommends where the discovered skill fits into the pipeline.

#### [MODIFY] [`.agents/skills/autonomic/SKILL.md`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/autonomic/SKILL.md)
- Add a proactive discovery step: When `/autonomic` encounters an unfamiliar domain or dependency during task execution, it suggests triggering `/find-skills` to dynamically fetch ecosystem expertise.

---

### Component 3: Global Instructions & Documentation (`AGENTS.md` & `README.md`)

#### [MODIFY] [AGENTS.md](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/AGENTS.md)
- In Section 0 (Onboarding) and Section 2 (Pipeline): Document the 4-category dynamic discovery loop and phase-mapping rules.

#### [MODIFY] [README.md](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/README.md)
- Update Key Features to describe the dynamic ecosystem discovery across Design, Coding, Testing, and Helpers.

---

## Verification Plan

### Automated Verification
1. **Harness Benchmark**:
   ```bash
   node .agents/skills/harness-creator/scripts/validate-harness.mjs --target .
   ```
   *Expectation: 100/100 score maintained.*

2. **Protocol Validation**:
   - Verify that instructions in `init-project/SKILL.md`, `find-skills/SKILL.md`, and `autonomic/SKILL.md` contain concrete, executable CLI discovery commands without hardcoded assumptions.

### Manual Verification
- Review generated documentation and phase-linking flow in `AGENTS.md` and `README.md`.
