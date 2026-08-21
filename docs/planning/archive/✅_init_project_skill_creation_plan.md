# Implementation Plan: Create `.agents/skills/init-project/SKILL.md`

Create the official onboarding skill definition for `/init-project` to guide AI agents through complete repository initialization.

---

## 1. Concrete Proposed File

#### [NEW] `.agents/skills/init-project/SKILL.md`
```yaml
---
name: init-project
description: Initialize a new project created from the agent-boilerplate template. Runs domain scoping interview, bootstraps tech stack dynamically, configures quad files, and opens initial setup PR.
triggers:
  - "/init-project"
  - "initialize project"
  - "run onboarding"
  - "setup project template"
---

# Init Project (`/init-project`)

Guide any AI agent through the end-to-end setup of a newly cloned repository.

## Execution Sequence

1. **Check Placeholder State**:
   Inspect `CONTEXT.md`. If `[Your Project Name]` exists, proceed with initialization.

2. **Run Helper Script**:
   Execute `bash scripts/setup-project.sh` to install base skills and scan workspace manifests.

3. **Domain & Scoping Interview ($y = f(x)$)**:
   - Ask developer: What is the core problem and primary transformation $y = f(x)$?
   - Determine dynamic tech stack (e.g. Next.js, FastAPI, Go CLI) based on requirements.

4. **Populate Project Quad Files**:
   - `CONTEXT.md`: Set project name, description, tech stack, and directory layout.
   - `AGENTS.md`: Add any domain-specific architectural constraints.
   - `MEMORY.md`: Record initial architectural decision records (ADR-001).
   - `README.md`: Update title and overview.

5. **Initialize SDD**:
   - Run `/sdd-init` to generate `openspec/` config and `.atl/skill-registry.md`.

6. **Git Lifecycle**:
   - Create branch `chore/CCH/initial-setup-project-context`.
   - Commit with Conventional Commit: `chore(setup): initialize project context and stack`.
   - Push and open PR with label `chore`.
```

---

## 2. Execution Steps

1. Create `.agents/skills/init-project/SKILL.md`.
2. Re-index `.atl/skill-registry.md` using `/sdd-init reload the skills` (total skills: 42).
3. Create branch `chore/CCH/initial-setup-add-init-project-skill`.
4. Commit, push, create PR, and merge into `main`.

---

## 3. Verification Plan

- Verify `init-project` appears in `.atl/skill-registry.md` and `skills-lock.json`.
- Test running `gga config` to ensure everything passes review.
