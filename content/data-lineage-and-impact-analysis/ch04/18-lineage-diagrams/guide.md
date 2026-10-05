# Lesson 18 — Lineage Diagrams

**Chapter 4 · Documenting Lineage · Lesson 18 of 25**

## What you'll learn

- The visual conventions almost every lineage diagram follows, regardless of tool
- Why a diagram is a view into the documentation from Lesson 17, not a replacement for it
- How to match the level of detail in a diagram to its audience
- How to read (and sketch) the same chain used throughout this chapter as an actual diagram

## The conventions

Lineage diagrams vary in polish across tools, but almost all of them follow the same basic visual grammar:

- **Boxes represent datasets** — a source table, a staging view, a fact table, a report. Each box is one node from Lesson 17.
- **Arrows represent direction of flow**, always pointing from upstream to downstream — the arrowhead tells you which way data moves, which is the same convention this course has used in text form since Lesson 12.
- **Labels on arrows represent the transformation or rule** applied at that hop — when present, this is where Lesson 13's business-rule logic becomes visible instead of hidden.

A diagram is a *view* into the documentation covered in Lesson 17 — it's how a human reads the nodes-edges-ownership structure at a glance. The diagram isn't a separate source of truth; it's generated from, or at least kept consistent with, the same underlying graph.

## The same chain, as a diagram

This chapter has used one chain repeatedly in text form:

```
SourceTable -> StagingView -> FactTable -> Report
```

As an actual diagram, this is four boxes in a row, connected by three arrows, each arrow pointing right (downstream). If the `StagingView -> FactTable` hop applies a specific business rule — say, the Discount logic from Lesson 13 — that rule gets written as a short label directly on that arrow, not buried in a separate document someone has to go find.

## Matching detail to audience

Not every diagram should show everything. A diagram built for an executive sign-off meeting (Lesson 15's change impact assessment) needs far less detail than one built for the engineer actually making the change:

| Audience | What the diagram should show |
|---|---|
| Executive / stakeholder overview | A handful of major systems and reports; no column-level detail |
| Engineer doing the change | Every table, every column affected, every transformation label |
| New team member onboarding | The full picture, but with plain-language annotations, not just technical names |

Trying to make one diagram serve all three audiences usually produces a diagram too dense for the first audience and too shallow for the second. Most mature lineage practices maintain, or can generate, more than one view of the same underlying graph.

## Key terms

| Term | Meaning |
|---|---|
| Lineage diagram | A visual rendering of the dependency graph: boxes for datasets, arrows for direction |
| Arrow label | A short annotation on an edge describing the transformation or business rule applied there |
| Level of detail | How much of the underlying graph a given diagram exposes, matched to its audience |

## Lab

Sketch (on paper, in a drawing tool, or even in a text editor using boxes and arrows) a lineage diagram for a dependency chain from your own work or Lesson 12's lab. Include at least one arrow label describing a transformation. Then sketch a second, simplified version of the same diagram as if it were for an executive audience.

## Check yourself

Can you name the three basic visual conventions almost every lineage diagram follows? Can you explain why a single diagram usually can't serve both an executive audience and an engineer making a change?
