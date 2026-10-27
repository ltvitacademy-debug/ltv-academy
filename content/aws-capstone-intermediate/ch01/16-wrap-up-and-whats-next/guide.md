# Lesson 16 — Wrap-Up: What You Built, and What's Next

**Chapter 1 · Intermediate Capstone: A Repeatable Curated Dataset · Lesson 16 of 16**

## What you'll learn

- A real inventory of everything this project actually required, start to finish
- Why this project's skills are a genuine step up from the Beginner capstone
- How the two bug chapters are themselves a skill, not a detour from the "real" build
- What's different and harder about the path's Advanced capstone ahead

## What you actually built

Sixteen lessons ago, this started with Finance wanting more than Beginner's one-time Athena
query — a real, repeatable curated dataset. Here's the actual inventory of what that turned into:

- **A real Glue ETL job:** `northfield-orders-etl`, transforming raw CSVs into curated,
  partitioned Parquet with bookmarking enabled and three real fixes applied — a date cast, a
  region normalization, and a computed `order_total` (Lessons 2-3).
- **A real warehouse:** Redshift Serverless workgroup `northfield-analytics`, with an actual star
  schema — `analytics.fact_orders` plus three dimension tables, DISTKEY and SORTKEY chosen on
  purpose, not left at defaults (Lesson 4).
- **A repeatable load path:** the Lesson 5 COPY statement, loading from curated Parquet through
  a dedicated IAM role, validated with a real row-count/sum pair against source (Lessons 5-6).
- **A secondary query path:** Redshift Spectrum's `spectrum` external schema over the same Glue
  Catalog, for queries that don't need a warehouse load at all (Lesson 7).
- **A real schedule:** EventBridge rule `northfield-nightly-refresh` driving the Glue job, then a
  Glue trigger chaining into a Python Shell job that re-issues the COPY — an actual
  production-style refresh, not a manual re-run (Lesson 8).
- **Two reports for two audiences, two different query paths:** Finance's recurring
  revenue-by-region report against the Redshift warehouse, and Ops' lighter-weight shipped-volume
  report straight over the curated catalog via Athena (Lessons 9-10).
- **A full diagnose-and-fix arc on a real IAM permissions gap:** reproducing a load failure,
  reading `sys_load_error_detail`, finding a missing `s3:ListBucket` statement, and fixing and
  re-validating it (Lessons 11-13).
- **A full diagnose-and-fix arc on a silent data-quality bug:** a crawler misreading a mid-row
  schema change, confirmed with before/after comparisons and raw-file inspection, fixed with
  named-column selection and header-based crawling, then backfilled and re-validated (Lessons
  14-15).

## Why the two bug chapters matter as much as the build

It would have been easy to design this project with a clean ETL job, a clean warehouse, and two
correct reports, and call it done. That's not what real data engineering looks like day to day.
IAM roles get created with one permission missing. Upstream systems change their export format
without warning. "The numbers don't match" and "the load failed last night" are two of the most
common tickets a data engineer gets — and one of them, the schema-drift bug, didn't even throw an
error. Diagnosing that kind of problem calmly, with a reproduce-first discipline, *is* the skill.
It wasn't a detour from the real project. It was the second half of it.

## This was the Intermediate project — on purpose

The Beginner capstone was raw CSVs, a crawler, and ad hoc Athena queries — useful, but
single-use. This project added real breadth: a transforming ETL job instead of a pass-through
crawl, an actual warehouse with a modeled schema instead of querying raw files directly, a
schedule instead of a manual run, two stakeholders instead of one, and two realistic production
bugs instead of a problem-free demo. Each of those is a genuine step up in scope and
responsibility — not just more content, but a different kind of project with real operational
weight behind it.

## What's next: the path's Advanced capstone

The Advanced capstone (`aws-capstone`) takes this *exact same pipeline* — the same raw zone, the
same ETL job, the same Redshift warehouse, the same two reports — and goes further: Step
Functions orchestration replacing the simple EventBridge/Glue-trigger chain built here, CloudWatch
monitoring and alerting so a failure like Lesson 11's gets caught automatically instead of waiting
for Finance to notice, CI/CD for the Glue scripts, IAM hardening across the whole pipeline, and
disaster recovery. This isn't a new scenario to learn from scratch. It's the next, harder version
of the exact same problem — and everything in this project, staging, modeling, scheduling,
diagnosing a real permissions gap, diagnosing a real silent data bug, is exactly the foundation
that tier builds on.

## Key terms

| Term | Meaning |
|---|---|
| Diagnose-and-fix arc | Reproduce, isolate the cause, apply the fix, then re-validate — a repeatable discipline |
| Operational weight | The real-world responsibility a schedule, a warehouse, and live stakeholders add to a project |
| Pipeline continuity | Building the Advanced tier on the exact same resources, not a fresh scenario |

## Lab

Write a short, honest self-assessment: pick the single lesson in this chapter you found hardest,
and explain specifically why — not "IAM is hard" or "Spark is hard," but the actual concept that
took the most re-reading. That's useful information for deciding what to review before starting
the Advanced capstone.

## Where this leaves you

You've now built a complete, repeatable curated dataset: a real ETL job, a real warehouse, a real
schedule, two real reports, and two real bugs fully diagnosed and fixed end to end. That's most of
what a data engineer's actual day-to-day work looks like. The Advanced capstone is next — same
pipeline, same company, a harder and more production-grade version of the problem you already
know how to solve.
