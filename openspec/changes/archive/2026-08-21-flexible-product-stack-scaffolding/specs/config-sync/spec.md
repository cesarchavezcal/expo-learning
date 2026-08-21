# Specification: Configuration Synchronization (`config-sync`)

## Purpose
Ensures that after a tech stack is bootstrapped or modified, all agent configuration files (`openspec/config.yaml`, `CONTEXT.md`, and `init.sh`) automatically synchronize with the active runner, strict TDD mode, and linter settings.

---

## Scenarios

### Scenario 1: Sync `openspec/config.yaml` Test Runner
- **Given** a new stack (e.g. `pytest` or `vitest`) is bootstrapped
- **When** configuration synchronization runs
- **Then** `openspec/config.yaml` is updated with `testing.runner: <runner>`, `testing.test_command: <cmd>`, and `testing.strict_tdd: true`.

### Scenario 2: Sync `CONTEXT.md` Tech Stack Summary
- **Given** a tech stack is confirmed
- **When** configuration synchronization runs
- **Then** Section 2 of `CONTEXT.md` reflects the accurate Frontend, Backend, Database, and Testing stack definitions.
