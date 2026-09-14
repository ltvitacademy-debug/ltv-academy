# Lesson 28 — Implementing and Managing an Analytics Solution

**Chapter 2 · DP-700 Certification Prep · Lesson 28 of 81**

## What you'll learn

- The Domain 1 checklist: everything DP-700 expects you to know cold
- How workspaces, OneLake, Lakehouses, and Warehouses fit together
- Where capacities, security, and Git integration show up on the exam
- The single most common Domain 1 trap and how to avoid it

## Domain 1's real checklist

Domain 1 — "Implement and manage an analytics solution" — is
everything that has to exist and be configured correctly *before*
any data moves. On the exam, that means:

```
- Fabric workspaces and their role assignments
- OneLake as the single storage layer under every workload
- Lakehouses (Fabric Lesson 4) and Warehouses (Fabric Lesson 10)
- Fabric capacities and SKUs (Fabric Lesson 14)
- Git integration and deployment pipelines (Fabric Lesson 15)
- Row/object-level security basics on Lakehouse and Warehouse
```

Every item on that list is drilled in Fabric & Real-Time Analytics
Chapter 1 — this lesson doesn't re-teach it, it re-frames it as
exam-answerable facts.

## Lakehouse vs. Warehouse, exam-style

The single highest-yield fact in Domain 1 is the choice between a
Lakehouse and a Warehouse, covered in Fabric Lesson 11. DP-700
loves scenario questions like: *"A team needs T-SQL-based reporting
over structured data with strict schema enforcement — which Fabric
item should they use?"* The answer is Warehouse, not Lakehouse,
precisely because a Warehouse enforces schema and speaks full T-SQL,
while a Lakehouse is schema-flexible and Spark-first.

```
Scenario cue words -> item to pick:
"T-SQL, strict schema, BI tool needs SQL endpoint" -> Warehouse
"Files, Spark, flexible schema, notebooks"         -> Lakehouse
"Referencing data without copying it"              -> Shortcut (Fabric L.7)
```

## OneLake: the fact behind the trap

OneLake (Fabric Lesson 3) is the single most exam-tested "gotcha"
concept in Domain 1: every Lakehouse and Warehouse in every
workspace in a tenant actually stores its data in the *same* OneLake
account, in Delta/Parquet format, automatically. Questions often test
whether you know that a Warehouse's data is *also* OneLake data
underneath — that's what makes cross-item Shortcuts (Fabric Lesson 7)
and Direct Lake Mode (Fabric Lesson 12) possible at all.

## Capacities and Git: the "management" half

The "and manage" half of this domain's title covers Fabric capacities
and SKUs (Fabric Lesson 14) — the compute/throughput unit a workspace
is assigned to, which determines cost and performance ceiling — and
Git integration with deployment pipelines (Fabric Lesson 15), which
lets a team promote a workspace's content from dev to test to prod
under version control, the same dev/test/prod discipline from
Fabric & Real-Time Analytics Chapter 3.

## Key terms

| Term | Meaning |
|---|---|
| Workspace | The container for Fabric items; where role assignments live |
| OneLake | The single underlying storage layer for every Fabric item, tenant-wide |
| Capacity / SKU | The compute unit a workspace is assigned to, controlling cost and performance |
| Deployment pipeline | Git-integrated promotion of workspace content across dev/test/prod |

## Check yourself

You're ready for Lesson 29 when you can answer, without looking: a
scenario asks for T-SQL reporting with enforced schema over
structured data — Lakehouse or Warehouse, and why?
