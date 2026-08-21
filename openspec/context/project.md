# Project Context: agent-boilerplate

## Executive Overview
`agent-boilerplate` is a lightweight, stack-agnostic GitHub repository template designed for AI agent-driven software development across environments (Google Antigravity, Cursor, Claude Code, Windsurf, Aider, GitHub Copilot).

## Repository Architecture & Structure
```text
.
├── .agents/skills/         # 41 installed agent skills (mattpocock/skills & cesarchavezcal/personal-skills)
├── .atl/
│   └── skill-registry.md   # Unified registry of all available agent skills
├── .gga                    # Gentleman Guardian Angel (AI-assisted code review guardrails)
├── .github/                # PR templates and GitHub labels configuration
├── openspec/
│   ├── config.yaml         # SDD configuration, test capabilities & conventions
│   ├── context/            # Project context documentation
│   └── specs/              # SDD feature specifications & design docs
├── docs/
│   ├── planning/           # Engineering plans & walkthroughs
│   └── product-design/     # Output artifacts for /product-function, /ia, and /ooux
├── scripts/
│   ├── init-skills.sh      # Skills initialization helper
│   └── setup-project.sh    # Dynamic project setup & stack auto-detection helper
├── AGENTS.md               # Primary operational instructions & 7-step pipeline sequence
├── CLAUDE.md               # Claude Code specific rules & onboarding pointer
├── CONTEXT.md              # Project domain definition & tech stack quad file
├── MEMORY.md               # Durable memory & architectural decision records
├── README.md               # Template documentation and usage guide
├── SKILLS.md               # Human-facing skill catalog & discovery reference
└── skills-lock.json        # Deterministic lockfile for installed skills
```

## Conventions
- **Git Branching**: `{prefix}/CCH/{project-initials}-{ticket-number}-{ticket-summary}` where `{prefix}` is `feature`, `bugfix`, or `chore`.
- **Commits**: Conventional Commits `<prefix>(<scope>): <summary>`.
- **Review**: Auto-reviewed via `.gga` using configured provider.
- **7-Step SDD Pipeline**:
  1. `/product-function` — Function scoping ($y = f(x)$)
  2. `/grill-with-docs` — Stress-test scope against docs
  3. `/to-spec` — Generate specification
  4. `/information-architecture` — Sitemap, sequence flows, taxonomy
  5. `/ooux` — Entities, core vs metadata, ERD, forced ranking
  6. `/to-tickets` — Tracer-bullet tickets with blocking edges
  7. `/implement` — Test-driven implementation via autonomous harnesses
