# Lesson 69 — Project 1: Wrap-Up and Retrospective

**Chapter 4 · Added Projects — Capstones · Lesson 69 of 81**

## What you'll learn

- Recapping Project 1 as a whole, tool by tool, with real lesson citations
- An honest retrospective: what would break first at 10x scale
- Practicing Lesson 24's whiteboard-style explanation on your own project
- The transition into Project 2

## What got built, and what it drew on

Project 1 is a real-time retail analytics platform, built across five
lessons, and every layer drew on a named technique from a specific prior
course:

```
Kickoff (64):        Lesson 4's storage choice, Lesson 5's processing
                      model, Lesson 6's Lambda architecture shape
Ingestion (65):       Fabric Eventstream (Lesson 19) + Event Hub
                      (Lesson 20) for streaming, Databricks Autoloader
                      (Lesson 32) for batch, idempotent MERGE (Lesson 11,
                      Databricks Lesson 22) for delivery
Transformation (66):  Medallion bronze/silver/gold (Databricks Lesson
                      25-28), Lesson 8's star schema, SCD Type 2 on
                      DimStore (Databricks Lesson 22's MERGE pattern)
Serving (67):         Lakehouse SQL endpoint vs. warehouse (Fabric
                      Lesson 11), Direct Lake mode (Fabric Lesson 12),
                      semantic model (Fabric Lesson 13)
Hardening (68):       Production-readiness checklist (Fabric Lesson 43),
                      observability (Fabric Lesson 52), SLA/SLO and
                      alerting (Fabric Lessons 53, 56)
```

That's every course in this track — Databricks & Delta Lake, Microsoft
Fabric & Real-Time Analytics, and this course's own Chapter 1 — showing up
in one build, not as separate exercises but as one coherent system.

## The honest retrospective

Lesson 24 practiced explaining a system design out loud, under
interview-style pressure. The same discipline applies to your own finished
project: can you say plainly what you'd change?

```
What worked:
  - Hybrid ingestion matched the real source constraints (nightly
    POS exports really are batch; online orders really are streaming)
  - Idempotent MERGE made hardening's "just retry it" strategy
    actually safe, instead of a hand-wave

What would break first at 10x scale:
  - A single Eventstream may not keep up with 10x online-order
    volume — Fabric Lesson 20's event source scaling and Databricks
    Lesson 23's OPTIMIZE/ZORDER BY on FactSales both become
    necessary, not optional, at that volume
  - The nightly batch window itself gets tighter as POS export
    file sizes grow — Lesson 10's sharding becomes worth
    revisiting for pos_sales specifically
```

Naming what breaks first, specifically, is more valuable than claiming the
design scales indefinitely. No design does — the useful skill is knowing
*where* yours would need to change next.

## Why this matters for Project 2

Project 2 is a warehouse migration, not a real-time system — a different
problem shape. But the retrospective habit carries forward directly:
Lesson 70's kickoff will apply the same Chapter 1 system-design process to
a completely different set of constraints, and Lesson 74's wrap-up will ask
the same honest question this lesson just asked.

## Key terms

| Term | Meaning |
|---|---|
| Retrospective | An honest accounting of what was built, what it drew on, and what breaks first at scale |
| "Breaks first" | The specific bottleneck a design hits before any other part fails |
| Portfolio explanation | Describing the finished build the way Lesson 24 rehearsed — under interview pressure |

## Check yourself

You're ready for Lesson 70 when you can explain, without looking: name one
specific part of Project 1 that would need to change first at 10x scale,
and which prior lesson's technique would fix it.
