# Implementation Plan: GGA Provider Setup & AGENTS.md Coding Standards

Configure Gentleman Guardian Angel (`.gga`) with the preferred AI provider, augment [`AGENTS.md`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/AGENTS.md) with comprehensive coding and architectural standards for automated review enforcement, and install the GGA git hooks.

---

## Proposed Changes

### 1. `.gga` Configuration
#### [MODIFY] [`.gga`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.gga)
- Update `PROVIDER` from `"claude"` to `"gemini"`.
- Ensure `RULES_FILE="AGENTS.md"` and review patterns remain properly targeted.

```diff
- PROVIDER="claude"
+ PROVIDER="gemini"
```

---

### 2. AGENTS.md Coding Standards
#### [MODIFY] [`AGENTS.md`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/AGENTS.md)
- Add a new section **`6. Core Coding Standards & Architectural Guidelines`** that GGA can directly evaluate during pre-commit reviews:
  - **Architecture & Modularity**: Clean/Hexagonal boundaries, deep modules, separation of concerns (Container/Presentational pattern).
  - **Type Safety & Strictness**: Explicit types, zero unhandled `any`, strict null checks, no loose `as` assertions without shoehorn/guards.
  - **Error Handling & Resilience**: Result/Either pattern or structured exceptions, no swallowed errors, contextual error messages.
  - **Testing Standards**: TDD / test-first verification, integration and unit testing coverage before committing.
  - **Clean Code & Formatting**: Conventional commits, minimal dead code, self-documenting naming.

---

### 3. GGA Installation
- Run `gga install` to set up git hooks and verify local integration with `.gga` configuration.

---

## Verification Plan

### Automated / Command Verification
1. Verify `.gga` contains `PROVIDER="gemini"`.
2. Verify [`AGENTS.md`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/AGENTS.md) contains structured coding standards.
3. Run `gga install` and verify hook configuration in `.git/hooks/`.
4. (Optional) Run `gga check` or dry-run review if supported by CLI.

### Manual Verification
- Review generated git hooks to ensure non-blocking/proper execution during local commits.
