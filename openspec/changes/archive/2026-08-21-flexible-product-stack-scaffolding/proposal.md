# Proposal: Flexible Product Stack Scaffolding

## Intent
Transform `agent-boilerplate` into a dynamic, stack-agnostic project scaffolding framework where concrete technology stacks (e.g., Next.js, FastAPI, Go, Rust CLI) are dynamically selected, configured, and bootstrapped based on product requirements defined during discovery (`/product-function`).

## Scope

### In Scope
- **Post-Brainstorming Stack Synthesis**: Dynamic stack evaluation and recommendation immediately following product discovery (`/product-function` and `/grill-with-docs`).
- **Dynamic Stack Scaffolding**: Automated CLI bootstrapping of the agreed runtime, framework, and test runner tailored to the specific product requirements.
- **Automated Config Sync**: Updating `openspec/config.yaml`, `CONTEXT.md`, test runner commands, and strict TDD settings upon stack confirmation.
- **Enhanced Setup CLI**: Upgrading `scripts/setup-project.sh` to initialize any user-confirmed stack non-destructively.

### Out of Scope
- Hardcoded rigid templates prior to product discovery.
- Pre-bundling monolithic runtime dependencies into the template root.

## Capabilities

| Capability | Status | Description |
| :--- | :--- | :--- |
| `stack-scaffold` | New | Dynamic bootstrap of stack files and project structure tailored to brainstormed product specs. |
| `config-sync` | New | Automated synchronization of `openspec/config.yaml`, testing capabilities, and `CONTEXT.md`. |
| `project-setup` | Modified | Extended setup workflow supporting dynamic, brainstorm-driven stack initialization. |

## Approach
1. **Brainstorming & Scoping**: Run `/product-function` ($y = f(x)$) and `/grill-with-docs` to define the product requirements and constraints.
2. **Stack Proposal & Confirmation**: Agent proposes the optimal tech stack, test runner, and linters based on the brainstormed architecture; human confirms.
3. **Scaffold & Sync Execution**: Execute stack provisioning via `setup-project.sh`, auto-configuring `openspec/config.yaml` (runner, strict_tdd, linter) and `CONTEXT.md`.

## Affected Areas
- `scripts/setup-project.sh`
- `openspec/config.yaml`
- `CONTEXT.md`
- `AGENTS.md`
- `README.md`

## Risks & Mitigations
- **Risk**: Inconsistent test runner configurations across unfamiliar stacks.  
  **Mitigation**: Standardized recipe schema validating test and lint commands before writing `openspec/config.yaml`.
- **Risk**: Scaffolding cluttering existing skills.  
  **Mitigation**: Keep stack scaffolding strictly inside application root without modifying `.agents/`.

## Rollback Plan
Revert changes to `scripts/setup-project.sh`, `openspec/config.yaml`, and documentation via git checkout.

## Dependencies
- Language runtimes on host (Node.js/pnpm, Python/uv, Go, Rust) as needed per chosen stack.

## Success Criteria
- [ ] Root template remains stack-neutral with zero hardcoded application frameworks.
- [ ] Running setup with a chosen stack bootstraps app code and synchronizes `openspec/config.yaml` test/linter settings.
- [ ] `/product-function` discovery seamlessly transitions to stack provisioning.
