# Implementation Plan: Architecture of `/init-project` vs `scripts/setup-project.sh`

Clarification of how the `/init-project` agent workflow and `scripts/setup-project.sh` work together.

---

## 1. Distinction: Agent Skill vs. Bash Script

```text
┌──────────────────────────────────────────────────────────────────────────┐
│                           /init-project                                  │
│                      (The AI Agent Workflow)                             │
├──────────────────────────────────────────────────────────────────────────┤
│ 1. Interviews human developer on product vision ($y = f(x)$)             │
│ 2. Calls `scripts/setup-project.sh` (mechanical CLI engine)               │
│ 3. Populates CONTEXT.md, AGENTS.md, MEMORY.md, README.md                 │
│ 4. Executes `/sdd-init` (generates openspec/ & .atl/skill-registry.md)   │
│ 5. Creates setup branch & opens GitHub PR                                │
└────────────────────────────────────┬─────────────────────────────────────┘
                                     │ calls
                                     ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                       scripts/setup-project.sh                           │
│                      (The Mechanical Bash Helper)                        │
├──────────────────────────────────────────────────────────────────────────┤
│ • Runs `npx skills add mattpocock/skills cesarchavezcal/personal-skills` │
│ • Inspects files (package.json, pyproject.toml, Cargo.toml, go.mod)      │
│ • Runs `npx skills find <stack>`                                         │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Key Differences

| Dimension | `/init-project` (Agent Skill) | `scripts/setup-project.sh` (Bash Script) |
|---|---|---|
| **Actor** | AI Agent + Human Conversation | Terminal Shell (`bash`) |
| **Scope** | Complete End-to-End Onboarding | Mechanical package & file checks |
| **Context Editing** | Rewrites `[Your Project Name]` in quad files | Does not edit Markdown files |
| **Git Operations** | Creates branch, commits, opens PR | Does not manage Git branches |
| **Discovery** | Guides user through $y = f(x)$ scoping | Prints raw CLI search output |

---

## 3. Implementation Plan

To make this seamless:
1. **Create [`.agents/skills/init-project/SKILL.md`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.agents/skills/init-project/SKILL.md)**:
   - Formally document the AI agent execution steps for `/init-project`.
   - Explicitly define the delegation call to `scripts/setup-project.sh`.
2. **Synchronize `.atl/skill-registry.md`**:
   - Register `/init-project` in the skill registry.
3. **Commit & PR**:
   - Follow standard Git lifecycle.
