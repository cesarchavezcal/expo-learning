---
name: information-architecture-review
description: Designs, audits, and validates the information architecture of websites, apps, documentation, dashboards, schemas, and LLM context structures. Use when a user asks to organize, label, simplify, navigation, sitemap, menus, user flows, mind mapping, or context structure.
---

# Information Architecture Review

## Core Principle

The purpose of Information Architecture (IA) is **increasing agency by making systems legible.**

- **Agency** — an actor (human or machine) has the scope to decide and act independently.
- **System** — parts related in particular ways so the whole serves a purpose (e.g. website, app, spreadsheet, prompt context).
- **Legible** — the actor can tell what to do with the system to accomplish their goals.

Every recommendation this skill produces must trace back to a named actor making a named decision. Good IA is derived from how users think and what problems they solve — not from internal org charts, database schemas, or corporate jargon.

---

## Workflow

### Step 1 — Identify System and User Intent
State the system's parts, their relationships, and the purpose they serve. Name the actors and list the decisions they must make inside the system. If you cannot name an actor and a decision, stop — there is nothing to architect yet.

### Step 2 — Zoom Out (Saarinen's Rule)
Place the artifact in its next larger context: a screen in a product flow, a product in a business process, a business in its market setting. Verify that structure remains consistent across levels.

### Step 3 — Inventory and Audit Content
List all content sections (headings, text, media, documents, URLs). Eliminate redundancy and near-duplicated content. Target a shallow tree structure: users should reach significant content in ~2 clicks.

### Step 4 — Define Labelling & Taxonomy
Name all parts of the IA with user-centric headings, subheadings, and text labels.
- **Audience Language**: Strip internal jargon, code names, and department divisions.
- **Icon Pairing**: Pair every icon with a text label (icons are never standalone).
- **Search Metatag Synonyms**: For every label, compile variant phrasing and search synonyms to guarantee search findability.

### Step 5 — Select Hierarchy Design Pattern
Choose and justify the structural pattern:
- **Single Page Model**: Single purpose (e.g., landing page, app download, contact form).
- **Flat Structure**: Linear hierarchy where all pages sit at equal importance.
- **Index Pages Pattern**: Home page hub with equally important primary subpages.
- **Strict Hierarchy Pattern**: Deep branchy tree where subpages contain nested subpages (blogs, e-commerce, large media sites).
- **Co-existing Hierarchies Pattern**: Combines multiple hierarchy schemes when content overlaps across categories.

### Step 6 — Map Entity Relationships (Mind Mapping)
Perform mind mapping to visually model relationships between product entities, logical sequences, and user associations before sitemapping.

### Step 7 — Architect Navigation Flows & Search
Design navigation across the four primary structural types:
- **Hierarchical**: Tree menus and category drop-downs.
- **Global / Site-wide**: Persistent top bar, sticky menu, sidebar, or footer accessible from any page.
- **Local**: Section-specific sub-navigation lists or page-level table of contents.
- **Contextual**: In-line content links, related items, and embedded cross-references.

Implement search when item names have many synonyms, categories are ambiguous, or lists are long.

### Step 8 — Generate Diagrams & Documentation
Produce visual Mermaid diagrams for:
1. **User Flow & Navigation Flow**: Task flow paths through Hierarchical, Global, Local, and Contextual navigation nodes.
2. **IA Diagram & Site Map**: Tree structure displaying content hierarchy, sub-levels, depth, and labels.

### Step 9 — Apply Design Heuristics & Cut Noise
Evaluate against the Heuristics Checklist. Demote or delete elements that do not directly enable named decisions.

### Step 10 — Validate & Verify
Propose a validation method (Card Sorting, Tree Testing, First Click Testing, Usability Testing) to test the structure. Summarize how the proposed IA increases actor agency.

---

## Hierarchy Design Patterns

| Pattern | Structure | Best Used For |
|---|---|---|
| **Single Page Model** | Single scroll surface | Focused single-purpose actions (landing pages, app downloads, contact forms) |
| **Flat Structure** | Linear, shallow single-level pages | Small brochure websites, simple portfolios |
| **Index Pages Pattern** | Central hub -> equal primary subpages | Standard corporate websites, medium documentation sets |
| **Strict Hierarchy Pattern** | Deep branchy tree (parent -> child -> grandchild) | E-commerce, blogs, news portals, complex enterprise apps |
| **Co-existing Hierarchies** | Overlapping multi-taxonomy branches | Products where items belong to multiple categories simultaneously |

---

## Navigation Flow Types

| Type | Location & Behavior | Example |
|---|---|---|
| **Hierarchical** | Parent-to-child drilldown menus | Drop-down mega menus, nested category trees |
| **Global / Site-wide** | Persistent across all pages | Sticky top navbar, fixed app sidebar, footer navigation |
| **Local** | Area- or page-specific navigation | Section sidebar, tab bar, sub-category filter list |
| **Contextual** | Embedded directly within content | Inline hyperlinked text, "Related Articles", "Next Step" CTAs |

---

## Design Heuristics Checklist

- [ ] **Minimal sub-levels** — Aim for two clicks to reach primary content.
- [ ] **No jargon** — Labels use real user vocabulary.
- [ ] **Icons paired with text** — Never show standalone icons.
- [ ] **Visible location indicator** — Breadcrumbs, active tab highlights, or step indicators.
- [ ] **Progress indicators** — Multi-step flows display total steps, current step, and next step.
- [ ] **Contextual help** — Step-specific tooltips placed where questions naturally arise.
- [ ] **Visual hierarchy** — Type size, weight, and spacing clearly express structure.
- [ ] **Focused navigation** — Don't mix unrelated categories within a single menu.
- [ ] **Bounded choices** — Limit options to prevent choice paralysis.
- [ ] **Explicit call to action** — State exact outcome (e.g., "Confirm Order" vs "Next").

---

## Validation Methods

- **Open Card Sort**: Users group content freely to reveal natural mental models.
- **Closed Card Sort**: Users sort content into pre-defined categories to test classification.
- **Tree Testing**: Text-only hierarchy testing to measure findability without visual cues.
- **First Click Testing**: Measures if the user's initial click on a scenario task is intuitive and fast.
- **Usability Testing**: Scenario-based task completion testing on clickable or paper prototypes.

---

## Anti-Patterns

- **Chart Mirroring** — Structuring IA around internal org charts or database CMS schemas.
- **Deep Trees** — Creating excessively deep sub-level trees for rare edge cases.
- **Icon-Only Bars** — Navigation bars using standalone unlabelled icons.
- **Completeness Bloat** — Displaying every available option at once, drowning signal in noise.
- **Search Cop-Out** — Using search as an excuse to avoid fixing messy category structures.

---

## Output Format

Your information architecture review output must be saved directly inside the `docs/product-design/` directory (e.g. `docs/product-design/ia_review_<feature>.md`) as a clean Markdown document containing the following 7 required sections:

### 1. System Purpose & Actor-Decision Matrix
- Statement of system parts, relationships, and overall purpose.
- **Actor-Decision Table**: Table listing Actor, Goal, and Decisions Enabled.

### 2. Labelling & Synonym Taxonomy
- Comprehensive labelling scheme for all pages, sections, headings, and subheadings.
- Metatag search synonym table mapping primary labels to variant search queries.
- Icon-text pairing inventory.

### 3. Hierarchy Design Pattern & Mind Mapping
- Selected **Hierarchy Design Pattern** (Single Page, Flat, Index Pages, Strict Hierarchy, or Co-existing Hierarchies) with rationale.
- **Mind Map**: Textual/diagrammatic entity-relationship representation of product entities, logical sequences, and user mental model associations.

### 4. Site Map & Information Architecture Diagram
- **IA Diagram (Mermaid)**: Structural tree diagram displaying full content hierarchy, menu levels, parent-child nodes, and tree depth.
- Indented text tree fallback annotated with node depth.

### 5. User Flow & Navigation Flow Diagram
- **User Flow & Navigation Diagram (Mermaid)**: Flowchart mapping user task paths from entry points through **Hierarchical**, **Global**, **Local**, and **Contextual** navigation nodes to goal completion.

### 6. Legibility Defects & Cut List
- Audit of identified defects (jargon, deep sub-trees, redundant nodes).
- **Cut List**: Inventory of demoted, consolidated, or deleted elements.

### 7. Validation Plan & Verification
- Selected validation methodology (Card Sort, Tree Test, First Click, Usability Test).
- Per-actor summary confirming how the proposed IA increases legibility and agency.
