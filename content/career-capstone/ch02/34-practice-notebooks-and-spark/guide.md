# Lesson 34 — Practice Questions: Notebooks and Spark

**Chapter 2 · DP-700 Certification Prep · Lesson 34 of 81**

## What you'll learn

- Worked DP-700 scenarios covering Fabric Notebooks and the Spark/
  Delta mechanics underneath them
- How exam scenarios distinguish "which compute" questions from
  "which storage" questions
- Where Databricks-course Spark concepts reappear inside Fabric-
  specific wording

## How to use this lesson

Same drill format as Lessons 31–33 — work each scenario before
reading the reasoning. Notebook/Spark questions on DP-700 often test
whether you can tell a Fabric-specific feature (like a Fabric
Notebook's default Spark session) apart from a general Spark/Delta
concept that would apply in Databricks too.

## Worked question 1

*A data engineer opens a Fabric Notebook and writes PySpark code
that reads a Lakehouse table, filters it, and writes the result back
as a new Delta table — no cluster configuration screen appears
anywhere in the process. Why not?*

Fabric Notebooks (Fabric Lesson 6) attach to a **Spark session
backed by the workspace's capacity**, not a Databricks-style cluster
you configure yourself. The compute is still Spark under the hood,
but Fabric abstracts cluster sizing behind the capacity/SKU system
(Fabric Lesson 14) — a scenario that says "no cluster management
required" is describing this Fabric-specific abstraction.

## Worked question 2

*A notebook's write operation into a Delta table fails partway
through, after some files were already written. What happens to the
table's queryable state?*

Nothing changes — the table's queryable state reflects only fully
committed transactions, because Delta Lake's transaction log
(Databricks Lesson 17) makes writes atomic. A partially-written,
failed operation never becomes visible; readers only ever see the
last successful commit. This ACID guarantee (Databricks Lesson 18)
holds identically whether the notebook runs in Fabric or Databricks.

## Worked question 3

*A team wants their PySpark transformation logic covered by
automated tests before it runs in production. What testing approach
applies, and where was it taught?*

Unit testing PySpark transformations by testing the transformation
functions directly against small, in-memory DataFrames — the
approach from Fabric & Real-Time Analytics Lesson 49 — applies
whether the notebook runs in Fabric or Databricks, because the
underlying transformation logic is portable Spark code either way.

## Key terms

| Term | Meaning |
|---|---|
| Fabric Notebook Spark session | Spark compute backed by workspace capacity, not a manually configured cluster |
| Delta transaction log | Makes writes atomic — a failed write never becomes partially visible |
| Portable transformation logic | PySpark transformation functions that test and run the same in Fabric or Databricks |

## Check yourself

Take the quiz below — the last of this chapter's four practice
lessons before the full chapter continues into security, governance,
and the full-length practice exams later in Chapter 2.
