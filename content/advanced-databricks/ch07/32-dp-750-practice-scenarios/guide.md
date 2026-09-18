# Lesson 32 — DP-750 Practice Scenarios

**Chapter 7 · DP-750 Prep & Capstone · Lesson 32 of 34**

## What you'll learn

- Scenario-based practice questions in the exact "given this
  situation, which of the following" style DP-750 actually uses
- One scenario from each of this course's six chapters: Unity
  Catalog governance, Auto Loader ingestion, Lakeflow pipelines, Jobs
  orchestration, performance tuning, and security
- How to reason through a scenario instead of pattern-matching a
  keyword

## Why scenarios, not definitions

Lesson 31 covered the domains. DP-750 doesn't ask "what is a catalog
binding" — it describes a situation and asks what you'd actually do.
That's a different skill than recall, and it's the one this lesson
drills.

## Scenario 1 — Unity Catalog governance (Chapter 1 & 6)

*A finance team's catalog is attached to a metastore shared with nine
other teams. Finance needs analysts to see aggregate revenue figures
but never individual transaction-level records with customer names.*

The wrong instinct is a second catalog just for masked data — that
duplicates storage and drifts out of sync. The real answer is a
**column mask** on the customer-name column, applied via Unity
Catalog's row filter and column mask features (Chapter 6), scoped to
a group that excludes general analysts. One table, one source of
truth, different views by role.

## Scenario 2 — Auto Loader ingestion (Chapter 2)

*A pipeline needs to ingest a folder that receives millions of new
JSON files per day across thousands of subdirectories. Directory
listing during each run is timing out.*

This is precisely what **file notification mode** (Chapter 2, Lesson
9) exists for — it subscribes to cloud storage events instead of
listing the directory tree on every run, which is what breaks down at
this file count. Directory listing mode works fine at low volume; it
doesn't scale to millions of files.

## Scenario 3 — Lakeflow pipelines (Chapter 3)

*A silver-layer table must reject any row where `order_total` is
negative, but the pipeline should keep running and just drop those
rows rather than failing the whole run.*

That's an **expectation** with a `DROP ROW` action (Chapter 3, Lesson
15) — `@dlt.expect_or_drop` in Lakeflow's declarative syntax, not a
`FAIL UPDATE` expectation, which would halt the pipeline instead of
just filtering.

## Scenario 4 — Jobs & orchestration (Chapter 4)

*A multi-task job has a bronze-to-silver task, then two independent
silver-to-gold tasks that both depend on it, then a final task that
needs both gold tasks done first.*

This is a **task dependency graph** (Chapter 4, Lesson 19), not a
linear sequence — the two silver-to-gold tasks run in parallel once
the first task finishes, and the final task's "depends on" list
includes both of them, not just one.

## Scenario 5 — Performance tuning (Chapter 5)

*A join between a 10 TB fact table and a 2 GB dimension table is
running slower than expected, with most partitions taking seconds but
a handful taking minutes.*

That handful-taking-minutes-longer pattern is **data skew** — a small
number of partitions holding disproportionately large amounts of
data. Adaptive Query Execution (Chapter 5, Lesson 23) can detect and
split skewed partitions automatically; the dimension table's small
size also makes it a broadcast-join candidate, which AQE can also
apply on its own.

## Scenario 6 — Security (Chapter 6)

*A pipeline needs to read a database password to connect to an
on-prem source, without ever hard-coding that password in a notebook
that other users can open.*

**Secrets management** (Chapter 6, Lesson 29) — store the credential
in a Databricks secret scope (or Azure Key Vault-backed scope) and
reference it with `dbutils.secrets.get()`, which resolves to the real
value at runtime but never displays it in notebook output or history.

## The pattern across all six

Every scenario above followed the same shape: a situation, a
constraint that rules out the obvious-sounding wrong answer, and one
feature from this course that fits precisely. That's the actual skill
DP-750 tests — not memorizing feature names, but recognizing which
feature's constraints match the scenario in front of you.

## Check yourself

You're ready for Lesson 33 when you can take any one of the six
scenarios above, cover the answer, and reconstruct the reasoning that
rules out the wrong-sounding options — not just recall which option
was correct.
