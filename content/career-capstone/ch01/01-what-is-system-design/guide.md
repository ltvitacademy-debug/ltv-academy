# Lesson 1 — What Is System Design, for Data Engineers?

**Chapter 1 · System Design for Data Engineers · Lesson 1 of 81**

## What you'll learn

- What "system design" means for data engineering, specifically
- Why this is a different skill than building any one pipeline
- How this chapter uses tools from all three prior courses as building blocks
- What this chapter and course actually cover

## A different kind of question

Every course in this track so far has answered "how do I build this
one thing correctly" — a Delta table (Databricks & Delta Lake), an
Eventstream (Fabric & Real-Time Analytics), a CI/CD pipeline
(Fabric's Chapter 3). **System design** asks a different question
entirely: given a business problem with no prescribed tools, how do
you choose *which* pieces to use, in what shape, and why — before
you've written a single line of code?

## Why this is a genuinely different skill

Knowing how to write `MERGE INTO` (Databricks & Delta Lake Lesson
22) doesn't tell you *when* a MERGE-based upsert is the right
choice versus a full table rewrite. Knowing how a tumbling window
works (Fabric Lesson 30) doesn't tell you whether a given business
problem even needs streaming at all, versus a much simpler nightly
batch job. System design is the layer of judgment sitting on top
of everything you already know how to build — deciding what's
actually needed, matched to real constraints like budget, team
size, latency requirements, and data volume.

## This chapter's building blocks, all borrowed

```
From DE Foundations:          Python, SQL, pipeline basics
From Databricks & Delta Lake: Delta Lake, medallion architecture,
                               Structured Streaming, Unity Catalog
From Fabric & Real-Time:      Eventstreams, KQL, Fabric Warehouse,
                               and all of Chapter 3's production practices
```

Nothing in this chapter introduces a brand-new tool. Every lesson
from here through Lesson 25 takes concepts you already know how to
execute and asks you to reason about *when* and *why* to reach for
each one — the actual skill tested in a real system design
interview, and the actual skill a senior data engineer uses daily
that a junior one hasn't developed yet.

## What this chapter covers

Requirements gathering, estimation, storage and processing model
choices, the Lambda and Kappa architectures, data modeling and
partitioning at scale, reliability concepts (idempotency, delivery
guarantees), and the shape of a full pipeline (ingestion →
transformation → serving) — building toward four full case studies
(Lessons 20–23) and a lesson on presenting a design out loud, the
way a real interview actually works.

## Key terms

| Term | Meaning |
|---|---|
| System design | Choosing which tools to use, and why, before writing code |
| Building block | A tool or pattern from courses 1-3, reused here at a higher level |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: why
doesn't knowing how to write a MERGE statement tell you when a MERGE
is actually the right choice?
