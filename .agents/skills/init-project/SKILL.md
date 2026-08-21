---
name: init-project
description: Bootstrap a new repository created from agent-boilerplate. Use when starting a new project, when CONTEXT.md contains uninitialized placeholders ([Your Project Name]), or when asked to initialize/setup the project.
---

# Initialize Project (`/init-project`)

End-to-end onboarding workflow to turn an uninitialized template clone into an active, stack-provisioned repository.

## Sequence

### 1. Inspect Placeholder State
Check [`CONTEXT.md`](../../CONTEXT.md) for placeholder string `[Your Project Name]`.
- **Criterion**: If already initialized (no placeholders), stop and report active project context. If placeholders exist, proceed.

### 2. Domain & Scoping Interview ($y = f(x)$)
Interview the human developer in chat using [`product-function`](../product-function/SKILL.md) principles:
- Identify input situation ($x$), desired outcome ($y$), and transformation function $f(x) \rightarrow y$.
- Determine runtime stack and test runner dynamically based strictly on the product requirements.
- **Criterion**: Developer explicitly confirms project name, one-sentence description, and selected tech stack.

### 3. Stack Manifest & Skill Discovery
Run the mechanical workspace helper:
```bash
bash scripts/setup-project.sh "<selected-stack-keywords>"
```
- Install any recommended stack-specific skills discovered via `npx skills find`.
- **Criterion**: Base skills and confirmed stack skills appear in `.agents/skills/` and `skills-lock.json`.

### 4. Populate Project Quad Files
Replace all placeholder brackets `[...]` in place:
1. `CONTEXT.md`: Write concrete Project Name, Purpose, Tech Stack table, and Architecture layout.
2. `AGENTS.md`: Add any stack-specific constraints or coding standards.
3. `MEMORY.md`: Record initial domain decisions under `ADR-001`.
4. `README.md`: Set project title, description, and quickstart commands.
- **Criterion**: Grep confirms zero instances of `[Your Project Name]` or `[...]` across root documentation files.

### 5. Initialize SDD Registry
Run `/sdd-init` to scan the new stack, configure `openspec/config.yaml`, and build [`.atl/skill-registry.md`](../../.atl/skill-registry.md).
- **Criterion**: `openspec/config.yaml` reflects the active project context and test runner.

### 6. Create Initial Setup Branch & Pull Request
Execute standard 4-step Git lifecycle:
```bash
git checkout -b chore/CCH/initial-setup-project-context
git add .
git commit -m "chore(setup): initialize project context, stack scaffolding, and skill registry"
git push -u origin chore/CCH/initial-setup-project-context
gh pr create --title "chore(setup): initialize project context and stack" --body "Initializes project quad files, provisions dynamic tech stack, and sets up SDD skill registry." --label "chore"
```
- **Criterion**: GitHub PR is open and linked in chat.
