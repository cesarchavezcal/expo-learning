---
name: find-skills
description: Helps users discover and install agent skills when they ask questions like "how do I do X", "find a skill for X", "is there a skill that can...", or express interest in extending capabilities. This skill should be used when the user is looking for functionality that might exist as an installable skill.
---

# Find Skills

This skill helps you discover and install skills from the open agent skills ecosystem across 4 core pillars (**Design, Coding, Testing, and Helpers/Infra**) and link them directly to the SDD / Autonomic pipeline.

## When to Use This Skill

Use this skill:
- **During Project Setup (`/init-project`)**: To discover stack-tailored skills after defining product scope.
- **On-Demand Mid-Project**: When new dependencies (e.g. Stripe, WebSockets, Three.js, pgvector) are introduced.
- **During Exploration & Coding (`/sdd-explore`, `/sdd-apply`, `/autonomic`)**: Whenever specialized architectural knowledge or tooling is needed.

## The 4-Pillar Skill Discovery Matrix

When querying skills, structure your search across 4 pillars:

| Pillar | Example Queries | Pipeline Phase Link |
|---|---|---|
| **1. 🎨 Design & UX** | `ui`, `ux`, `tailwind`, `shadcn`, `design-system`, `accessibility` | Step 2 (Design) & Step 5 (UI Apply) |
| **2. 💻 Coding & Architecture** | `react`, `nextjs`, `fastapi`, `postgres`, `supabase`, `orm`, `patterns` | Step 3 (Specs) & Step 5 (TDD Code) |
| **3. 🧪 Testing & Quality** | `testing`, `vitest`, `playwright`, `tdd`, `shoehorn`, `jest` | Step 5 (Red Phase) & Step 6 (Verify) |
| **4. 🛠️ Helpers & Infra** | `deploy`, `docker`, `ci-cd`, `pre-commit`, `git-hooks`, `optimize` | Step 6 (Audit/CI) & Step 7 (Ship/PR) |

---

## How to Search and Recommend Skills

### Step 1: Execute Ecosystem Search
Run the find command with specific stack or domain keywords:

```bash
npx skills find [query] [--owner <owner>]
```

For example:
- `npx skills find react performance`
- `npx skills find supabase postgres`
- `npx skills find playwright e2e`
- `npx skills find tailwind ui`

### Step 2: Verify Quality & Reputation
1. **Install count** — Prefer skills with high installs (> 1K).
2. **Source reputation** — Official authors (`vercel-labs`, `anthropics`, `cesarchavezcal`, `mattpocock`).
3. **GitHub stars** — Check source repository vitality.

### Step 3: Present Discovered Matches Grouped by Pillar
Present the matches clearly with installation commands and their pipeline mapping:

```markdown
### Discovered Skills for Your Stack

#### 🎨 Design & UX (Mapped to Step 2 & 5)
- `shadcn` (UI components) ➔ `npx skills add vercel-labs/agent-skills@shadcn`

#### 💻 Coding & Architecture (Mapped to Step 3 & 5)
- `react-best-practices` ➔ `npx skills add vercel-labs/agent-skills@react-best-practices`

#### 🧪 Testing & Quality (Mapped to Step 5 & 6)
- `tdd` (Red-Green-Refactor) ➔ `npx skills add cesarchavezcal/personal-skills@tdd`

#### 🛠️ Helpers & Infra (Mapped to Step 6 & 7)
- `deploy-to-vercel` ➔ `npx skills add cesarchavezcal/personal-skills@deploy-to-vercel`
```

### Step 4: Install Selected Skills
Install confirmed skills:
```bash
npx skills add <owner/repo@skill> -y
```

### Step 5: Register in SDD Pipeline
Update `openspec/config.yaml` and `.atl/skill-registry.md` so the newly installed skills are recognized by `/autonomic` and `/sdd-*` phases.
