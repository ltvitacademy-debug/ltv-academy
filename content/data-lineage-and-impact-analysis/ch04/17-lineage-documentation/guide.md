# Lesson 17 — Lineage Documentation

**Chapter 4 · Documenting Lineage · Lesson 17 of 25**

## What you'll learn

- What belongs in lineage documentation, beyond "this connects to that"
- Why nodes, edges, and ownership are the three things worth recording for every dependency
- Where lineage documentation typically lives, and the trade-offs of each location
- Why structure and business-rule logic both need to be captured, not just one or the other

## What lineage documentation actually is

Every lesson in Chapter 3 assumed lineage was already traced and available to walk — upstream for root cause analysis, downstream for impact analysis. **Lineage documentation** is what makes that walk possible in the first place: the recorded, shareable version of the dependency graph, instead of something that lives only in one engineer's memory.

Good lineage documentation answers three questions for every dependency in the graph: what are the two things connected (the **nodes**), what direction and relationship connects them (the **edge**), and who is responsible for each side (the **ownership**).

## The three things worth recording

- **Nodes** — the datasets, fields, reports, and systems themselves. Each one needs a stable name and ideally a short description (the kind covered back in Metadata Management's business glossary and data dictionary chapters).
- **Edges** — the dependency itself: which node feeds which, and critically, the transformation and business rule (Lesson 13) that happens at that hop, not just the fact that a connection exists.
- **Ownership** — who maintains each node, so that when impact analysis or root cause analysis finds a consumer, there's a person to contact rather than a dead end.

Documentation that only captures nodes and edges, without ownership, tells you *what* is affected by a change but not *who* to tell — which defeats half the point of Lesson 15's change impact assessment process.

## Where lineage documentation lives

| Location | Strength | Weakness |
|---|---|---|
| A wiki page or shared doc | Easy to write, flexible format | Goes stale fast; nobody updates it on every pipeline change |
| A metadata repository / data catalog | Centralized, searchable, ties to the glossary and dictionary | Only as good as what's entered into it |
| A dedicated lineage tool | Can auto-generate and stay current (Lesson 19) | Requires tooling investment; may not capture undocumented manual steps |

Most organizations use more than one of these at once: a dedicated tool or catalog for the structural graph, and written documentation (a wiki page, a diagram per Lesson 18) for the business-rule context a tool can't infer on its own.

## Structure and rules both need to be captured

Lesson 13 made the case that an arrow alone — "StagingView feeds FactTable" — is only half the picture. Lineage documentation has to capture both halves: the structural graph (which this lesson focuses on) and the transformation logic behind each edge (which a diagram, Lesson 18, or a linked description usually carries). Documentation that only has one or the other is incomplete in a way that becomes obvious the first time someone actually needs to use it.

## Key terms

| Term | Meaning |
|---|---|
| Node | A dataset, field, report, or system represented in the lineage graph |
| Edge | The documented dependency and transformation between two nodes |
| Lineage documentation | The recorded, shareable version of a dependency graph — nodes, edges, and ownership |

## Lab

Pick the dependency chain you worked with in Lesson 12's lab. Write a short lineage documentation entry for it: list each node with a one-line description, each edge with its transformation (if you know it), and an owner for each node (a real name, a role, or "unknown — needs research" if you genuinely don't know).

## Check yourself

Can you name the three things lineage documentation should capture for every dependency? Can you explain why documentation missing ownership undermines a change impact assessment even if the nodes and edges are perfectly documented?
