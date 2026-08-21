# Specification: Dynamic Stack Scaffolding (`stack-scaffold`)

## Purpose
Enables `agent-boilerplate` to dynamically provision and configure the agreed tech stack (Node.js, Next.js, Python, FastAPI, Go, Rust) immediately following product scoping without requiring rigid pre-bundled runtime files in the template.

---

## Scenarios

### Scenario 1: Automated Stack Recipe Execution
- **Given** a user confirms a selected tech stack during `/init-project` or `/product-function`
- **When** `scripts/setup-project.sh --stack <stack_name>` is executed
- **Then** the script bootstraps the project root with the appropriate runtime manifest, package manager, and directory layout without overwriting `.agents/` or existing agent governance files.

### Scenario 2: Zero Overwrite on Existing Manifests
- **Given** a repository already contains a `package.json`, `pyproject.toml`, or `Cargo.toml`
- **When** stack scaffolding is triggered
- **Then** existing manifest files are preserved, and only missing tooling or test runner dependencies are added.

### Scenario 3: Test Runner Provisioning
- **Given** a stack is selected
- **When** scaffolding completes
- **Then** the corresponding test runner and command (e.g. `vitest`, `pytest`, `cargo test`, `go test`) is configured and verified executable via `./init.sh`.
