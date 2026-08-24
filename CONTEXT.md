# Project Context (`CONTEXT.md`)

This file holds the project's domain definition, architecture overview, and technology stack.

---

## 1. Project Overview

- **Project Name**: `expo-learning`
- **Domain / Description**: Hands-on learning playground for React Native, Expo Router, and mobile architecture patterns.
- **Target Audience / Mental Model**: Mobile developers exploring modern Expo SDK, file-based routing, native capabilities, and clean mobile architecture.

---

## 2. Technology Stack

- **Mobile Framework**: Expo (React Native, Expo Router)
- **Language & Runtime**: TypeScript, Node.js
- **State & UI**: React 19 / React Native Core + Expo vector icons
- **Testing Framework**: Jest / React Native Testing Library
- **Tooling & Linter**: ESLint, Prettier, Gentleman Guardian Angel (`.gga`)

---

## 3. Key Architecture & File Layout

```text
.
├── app/                    # Expo Router file-based routes and layouts
├── components/             # Reusable UI presentation and container components
├── constants/              # App themes, colors, and static configuration
├── hooks/                  # Custom React hooks
├── .atl/                   # Skill registry index
├── .gga                    # GGA AI code review configuration
├── AGENTS.md               # Operational rules & coding standards
├── CONTEXT.md              # Project domain definition & tech stack
├── MEMORY.md               # Architectural decision records
├── openspec/               # Spec-Driven Development specs & changes
└── docs/                   # Planning and product design documents
```

---

## 4. Key Conventions & Design System

- **Navigation**: File-based routing via `app/` directory (Expo Router).
- **Architecture**: Container-Presentational separation for screens and complex UI.
- **Type Safety**: Strict TypeScript without loose `any` casts.
