# Lesson 5 — CI Relationships & Relationship Types

**Chapter 2 · Relationships & the Dependency View · Lesson 5 of 26**

## What you'll learn

- Where a CI relationship actually lives on the platform: the `cmdb_rel_ci` table
- Why every relationship points to a `cmdb_rel_type` record, not a free-text label
- The directional-pair structure — "Depends on::Used by," "Runs on::Runs" — and why both halves matter
- How to read a relationship from either CI's point of view
- Why this one mechanism underlies the Dependency View, Service Mapping, and impact analysis later in this chapter

## A relationship is a real record, not a mental note

Chapter 1 modeled individual CIs — a server, an application, a database — each a row on a table under `cmdb_ci`. On their own, those rows describe *what exists*. They say nothing about how those things connect to each other. That connection is captured by a separate, equally real table: **`cmdb_rel_ci`**. Every row on `cmdb_rel_ci` is one relationship between exactly two CIs: a parent, a child, and a relationship **type**. If an application genuinely runs on a server, that fact exists on the platform only if someone (or Discovery, covered in Chapter 4) created a `cmdb_rel_ci` record connecting them. An administrator who only ever fills in CI fields and never touches `cmdb_rel_ci` has built a CMDB that's accurate about individual assets and blind to how they fit together.

## The type isn't a label — it's a directional pair

Every `cmdb_rel_ci` record references a `cmdb_rel_type` record, and this is the detail that trips people up: a relationship type isn't a single word like "depends on." It's a **directional pair**, describing the same relationship from each side. Real, out-of-box examples include:

- **Depends on :: Used by** — the parent CI depends on the child CI; from the child's side, the child is used by the parent
- **Runs on :: Runs** — the parent runs on the child (e.g., an application runs on a server); from the child's side, the server runs the parent
- **Hosted on :: Hosts** — the parent is hosted on the child (e.g., a VM hosted on a hypervisor host); from the child's side, the host hosts the VM

Each half of the pair is a real, stored string on the `cmdb_rel_type` record — not something the platform generates on the fly. Pick the wrong type, or build a relationship backward, and every downstream feature that reads it (the Dependency View, impact analysis, Discovery's own relationship-building logic) will describe the connection incorrectly.

```
cmdb_rel_ci record:
  parent: [Web Application]
  child:  [App Server 01]
  type:   Runs on :: Runs

Read from the parent's side:  "Web Application RUNS ON App Server 01"
Read from the child's side:   "App Server 01 RUNS Web Application"
```

## Why direction has to be right

Direction is not cosmetic. "Depends on" and "Used by" describe the same two CIs, but they encode opposite dependency arrows — which CI breaks the other if it goes down. A database server doesn't "run on" an application; the application runs on servers and **depends on** the database. Get that backward in the CMDB, and a later query asking "what breaks if this database goes offline" will either miss the application entirely or point the arrow the wrong way. This isn't a theoretical concern — it's the exact mechanism Lesson 7 builds on for real impact analysis, and the exact mechanism that, two courses from now, feeds Change Risk Assessment's judgment about whether a planned change is actually dangerous.

## Choosing a type that already exists

ServiceNow ships with a substantial set of out-of-box relationship types precisely so that admins and Discovery don't invent new ones for every situation. Before creating a custom relationship type, the real-world practice is to check whether an existing pair already fits: "Runs on :: Runs" for application-to-server, "Hosted on :: Hosts" for VM-to-hypervisor or CI-to-cloud-infrastructure, "Depends on :: Used by" for the general case where one CI's availability depends on another's without a more specific pair applying. Reusing the standard set keeps relationship data consistent enough that reports, the Dependency View, and any script that walks `cmdb_rel_ci` can rely on a small, known vocabulary of types instead of dozens of near-duplicate custom ones.

## Key terms

| Term | Meaning |
|---|---|
| `cmdb_rel_ci` | The real table where every CI-to-CI relationship is stored as a parent, a child, and a type |
| `cmdb_rel_type` | The table of relationship types; each record stores a directional pair of labels, one for each side |
| Directional pair | The two-sided description of a relationship type (e.g., "Depends on :: Used by") — one label read from the parent, one from the child |
| Parent / child CI | The two ends of a `cmdb_rel_ci` record; which CI is parent vs. child determines which label of the pair applies |

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: for a relationship typed "Depends on :: Used by" between an application (parent) and a database server (child), what does the relationship say from the application's side, and what does it say from the database server's side?
