# Agent Skills Catalog (`SKILLS.md`)

This repository integrates 42 workspace-installed skills (`mattpocock/skills`, `cesarchavezcal/personal-skills`, and built-in template tools) alongside global SDD/Gentle-AI orchestration capabilities and dynamic `npx skills` auto-discovery.

For the full indexed registry of all 42 workspace skills and 25 global system skills across 6 categories, see [`.atl/skill-registry.md`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.atl/skill-registry.md).

---

## 1. Core Pipeline & Onboarding Skills

| Skill | Trigger / Command | Purpose | Source |
|---|---|---|---|
| **`init-project`** | `/init-project` | Auto-detect stack, interview domain, populate quad & discover skills | `agent-boilerplate` |
| **`product-function`** | `/product-function` | Scope feature as $y = f(x)$ with 10x Scope-Stripping | `personal-skills` |
| **`grill-with-docs`** | `/grill-with-docs`, `/grill` | Stress-test feature scope & stack choices against docs | `personal-skills` |
| **`information-architecture-review`** | `/information-architecture` | Generate Sitemap, User Sequence Diagrams & Taxonomy | `personal-skills` |
| **`ooux`** | `/ooux` | Extract Objects, Content vs Metadata, ERD & Forced Ranking | `personal-skills` |
| **`i-have-adhd`** | `/i-have-adhd` | Action-first, numbered, ADHD-optimised output style | `ayghri/i-have-adhd` |
| **`mattpocock/skills`** | `npx skills@latest add mattpocock/skills` | Full TypeScript, React, and software engine skill suite | `mattpocock/skills` |

---

## 2. Autonomous Execution & Verification Skills

| Skill | Trigger / Command | Purpose | Source |
|---|---|---|---|
| **`harness`** | `/harness` | Single-ticket autonomous code-to-production pipeline | `personal-skills` |
| **`team-cheap`** | `/team-cheap` | Subagent fan-out orchestrator above `/harness` | `personal-skills` |
| **`code-review`** | `/code-review` | Parallel Standards & Spec code review pass | `personal-skills` |
| **`diagnosing-bugs`** | `/diagnosing-bugs` | Structured bug diagnosis & log extraction loop | `personal-skills` |
| **`find-skills`** | `/find-skills` | Discover stack & design skills via `npx skills find` | Open Ecosystem |

---

## 3. Dynamic Stack Skill Discovery & Context Reloading

When initializing or updating a project stack (e.g., React, Next.js, Vue, Python, Supabase, Tailwind, UI design), execute:

```bash
bash scripts/setup-project.sh [stack-keyword]
```

Or run `npx skills find [stack-keyword]`.

### Interactive Confirmation & Installation
1. Agent presents a ranked list of matching skills in chat.
2. User confirms which skills to install.
3. Install selected skills globally:
   ```bash
   npx skills add <owner/repo@skill-name> -g -y
   ```
4. **Skill Context Reload**: Agents automatically reload active skill definitions immediately after installation.
