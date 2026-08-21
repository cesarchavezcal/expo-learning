---
name: product-function
description: Evaluates and scopes product features by modeling them as functions (y = f(x)) based on Ryan Singer's methodology. Defines the input situation (x), output situation (y), and minimal function transformation f(x) -> y to eliminate scope creep before information-architecture-review and OOUX.
---

# Product as a Function (`y = f(x)`)

## Core Principle

A product or feature is easier to scope, design, and validate when framed as a **mathematical function**:

$$\text{Output Situation } (y) = f\left(\text{Input Situation } (x)\right)$$

- **Input Situation ($x$)** — The empirical circumstance, pain point, or status quo struggle *before* using the feature.
- **Output Situation ($y$)** — The desired outcome, relief, or transformed state the user wants to achieve *after* using the feature.
- **The Function ($f()$)** — The minimal product mechanism designed to transform $x \to y$.

$x$ and $y$ are empirical requirements. Designers do not invent $x$ or dictate $y$; they discover them. The designer's job is to solve for $f()$ in the simplest, tightest, and lowest-code way possible.

`/product-function` runs as Step 1 of the `/to-spec` pipeline (before `/information-architecture-review` and `/ooux`) to eliminate scope creep and ground feature requirements in causality.

---

## Workflow

### Step 1 — Discover Input Situation ($x$)
Identify the user's status quo before using the feature:
- **Trigger Event**: What happens in the user's world that creates the struggle?
- **Current Workaround**: What tool, manual process, or hack is the user currently using?
- **Friction Points**: Why does the current workaround break down or fail under load?

### Step 2 — Discover Output Situation ($y$)
Define the desired outcome and transformed state:
- **Target Outcome**: What specific result does the user expect when the task is complete?
- **Value Metric**: How will the user determine that $y$ was achieved successfully?
- **Fitness Bar**: What is the minimum acceptable transformation compared to the status quo ($x$)?

### Step 3 — Scope Minimal Function ($f(x) \to y$)
Design the functional mechanism $f()$ that transforms $x \to y$:
- **Core Mechanism**: What is the most direct, frictionless interaction model to accomplish $y$?
- **Scope-Stripping (10x Reduction)**: Remove all "ideal" features that are not strictly necessary to transform $x \to y$ (e.g. replacing a full drag-and-drop calendar with a simple Dot Grid).

### Step 4 — Generate Function Deliverables
Deliver the Function Specification Document saved inside `docs/product-design/product_function_<feature>.md`.

---

## Output Format

Your product function review output must be saved directly inside the `docs/product-design/` directory (e.g. `docs/product-design/product_function_<feature>.md`) as a clean Markdown document containing the following 5 required sections:

### 1. Function Overview ($y = f(x)$)
- Executive summary of the feature framed as a functional transformation equation.

### 2. Input Situation Matrix ($x$)
- **Trigger Event**: Circumstance that forces the user to seek a solution.
- **Status Quo Baseline**: Current workaround tool or manual steps.
- **Failure Condition**: Why the status quo breaks down.

### 3. Output Situation Matrix ($y$)
- **Target Transformed State**: What success looks like from the user's perspective.
- **Fitness Criteria**: Measurable bounds defining when $y$ is satisfied.

### 4. Minimal Function Scope ($f(x) \to y$)
- **Core Functional Mechanism**: Minimal interaction model to transform $x \to y$.
- **10x Scope-Stripping Audit**: List of discarded secondary features or bloated controls removed during scope definition.

### 5. Pipeline Handoff Contracts
- Clear inputs passed downstream to `/information-architecture-review` (Sitemap, Navigation Flows) and `/ooux` (Domain Objects, Attribute Cards, ERD).
