---
name: ooux
description: Designs object-oriented user experiences (OOUX) by extracting real-world objects, defining core content and metadata, nesting object relationships, and establishing forced ranking matrices. Use after information-architecture-review to structure system entities, object cards, component attributes, and contextual navigation.
---

# Object-Oriented UX (OOUX)

## Core Principle

Object-Oriented UX (OOUX) places **object design before procedural action design.**

- **Objects First** — Structure system entities around real-world objects matching the user's mental model (e.g. *Recipe*, *Chef*, *Account*, *Envelope*) rather than digital actions (e.g. *search*, *filter*, *checkout*).
- **Matching Backend Data Models** — Align front-end UX object definitions directly with backend data models, APIs, and database schemas.
- **Content is Navigation** — Enable contextual navigation ("getting to content through content") so users navigate naturally between connected objects without hitting dead ends or relying solely on persistent top navigation.

OOUX runs immediately after **Information Architecture Review** in the `/to-spec` pipeline to transform high-level sitemaps and mind maps into executable object matrices and component attribute contracts.

---

## Workflow

### Step 1 — Extract Objects from Goals & Briefs
Analyze the requirements brief, user stories, and IA mind map. Highlight all **nouns** to identify candidate objects.
- **Identify Core Nouns**: Retain tangible, high-frequency domain entities (e.g., *Account*, *Category*, *Transaction*, *Challenge*, *Solution*).
- **Filter Out Abstract Concepts**: Remove fluffy goals that emerge from the system rather than existing as discrete entities (e.g. *exposure*, *efficiency*).
- **Filter Out List Views & Containers**: Convert pseudo-objects like *catalog*, *calendar*, *library*, or *map* into list views or UI mechanisms of the core underlying object (*product*, *event*, *location*).
- **Infer Objects from Actions**: Convert action-verbs that generate persistent entities (e.g. "commenting" -> *Comment* object; "following up" -> *Feedback* object).
- **Identify Lifecycle States**: Note objects requiring distinct lifecycle states (e.g. *Draft*, *Open*, *Closed*, *Reconciled*).

### Step 2 — Define Core Content & Metadata Attributes
For each validated object, list every granular attribute and separate them into two distinct categories:
- **Core Content**: Body copy, titles, descriptions, images, media files, and display text.
- **Metadata**: Filterable, sortable, or state properties (e.g., *created_date*, *amount*, *status*, *popularity_score*).

### Step 3 — Nest Objects for Cross-Linking (Relationships)
Conduct thought experiments to determine how sibling objects nest inside each object. Define relationship cardinality:
- **1:1 (One-to-One)**: E.g., a *Transaction* belongs to exactly one *Account*.
- **1:N (One-to-Many)**: E.g., a *Category Group* nests multiple *Category Envelopes*.
- **N:N (Many-to-Many)**: E.g., a *Recipe* contains many *Ingredients*, and an *Ingredient* appears in many *Recipes*.

Nesting defines contextual cross-linking: users viewing an instance of Object A can pivot directly into related instances of Object B.

### Step 4 — Perform Forced Ranking
Re-order all core content, metadata, and nested objects within each object card from **highest to lowest priority**.
- **Forced Sequential Order**: Every attribute must have a unique priority rank (1..N). No ties permitted.
- **UI Translation**: Priority rank dictates visual emphasis, card layout hierarchies, and progressive disclosure boundaries (visible by default vs. collapsed/expandable).

### Step 5 — Generate OOUX Deliverables & Component Specifications
Deliver the complete Object Matrix, Mermaid Relationship Diagram, and Component Layout Contracts ready for `/to-tickets` breakdown.

---

## Object Classification Rules

| Candidate Noun | OOUX Classification | Action Required |
|---|---|---|
| **Core Entity** (e.g., *Transaction*, *Account*) | Valid Object | Create Object Card & define attributes |
| **Abstract Concept** (e.g., *Engagement*, *Financial Freedom*) | System Outcome | Exclude from Object List |
| **Container / View** (e.g., *Catalog*, *Calendar*, *Map*) | UI View Mechanism | Map as list view of underlying core object |
| **Action Result** (e.g., "User leaves a review") | Derived Object | Create object for *Review* / *Comment* |
| **Object State** (e.g., *Cleared*, *Overspent*) | Metadata Attribute | Attach as status property on parent object |

---

## Element Types Reference

| Element Type | Definition | Example | Card Representation |
|---|---|---|---|
| **Core Content** | Primary display text and media | Title, Description, Avatar image | Display element |
| **Metadata** | Sortable/filterable attributes & flags | Date, Amount, Status badge, ID | Badge, Filter, Tag |
| **Nested Object** | Reference to another sibling object | `account_id` in Transaction | Clickable cross-link CTA |

---

## Output Format

Your OOUX review document must be saved directly inside the `docs/product-design/` directory (e.g. `docs/product-design/ooux_review_<feature>.md`) as a clean Markdown document containing the following 6 required sections:

### 1. System Object Overview
- Summary of core system objects derived from user goals and IA review.
- High-level list of primary domain entities and their real-world mental model equivalents.

### 2. Noun Extraction & Filtering Matrix
- Table detailing Candidate Noun, Classification (Core Entity, Abstract, Container, Action Result), Decision, and Rationale.

### 3. Object Attribute Cards
For each core object, provide a structured attribute card:
- **Object Name** & **Lifecycle States**
- **Core Content Attributes**
- **Metadata Attributes** (with sort/filter notes)

### 4. Object Relationship & Cross-Linking Matrix
- **Mermaid ERD / Relationship Diagram**: Visual diagram depicting objects, nested references, and cardinality (1:1, 1:N, N:N).
- Contextual navigation pivot table detailing how users move between objects without returning to global navigation.

### 5. Forced Ranking Matrix
- Priority-ranked table (Rank 1..N) per object establishing exact display hierarchy, primary card elements, and progressive disclosure rules.

### 6. Component & Ticket Breakdown Contracts
- Structural spec mapping Object Cards to frontend components (e.g. Card, Table Row, Ledger View, Dialog).
- Handoff instructions for `/to-tickets` breakdown.
