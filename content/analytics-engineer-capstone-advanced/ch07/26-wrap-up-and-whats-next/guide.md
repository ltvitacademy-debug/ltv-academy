# Lesson 26 — Wrap-Up: What You Built, and What's Next

**Chapter 7 · The Power BI Layer, Incident, and Wrap-Up · Lesson 26 of 26**

## What you'll learn

- A full recap of all seven chapters, mapped back to Lesson 1's five
  original governance gaps
- Everything this capstone's platform actually contains, end to end
- How this Advanced tier relates to the Beginner and Intermediate
  tiers it builds on
- Realistic next steps for taking this further on a real job

## The five gaps, closed — a final recap

| Lesson 1's gap | Closed by |
|---|---|
| Anyone can query/break anything | Chapter 2 — `TRANSFORMER`/`ANALYST` roles, `RAW`/`DEV`/`PROD` schema separation |
| No tests, no safety net | Chapter 3-4 — staging/mart models, a snapshot, a shared macro library, a custom generic test, `dbt build` as a gate |
| No visibility into dependencies | Chapter 4 — generated docs and the lineage graph |
| Manual, unreliable ingestion | Chapter 5 — a logged, scheduled Python ingestion script |
| Bad changes ship unnoticed | Chapter 6 — CI/CD with a required status check; Chapter 7 proved it catching a real incident |

## Everything this platform actually contains

- A Snowflake account with two warehouses, two roles, and a
  `RAW`/`DEV`/`PROD` schema split
- A dbt project with a staging layer for every source, intermediate
  models, two governed marts, a snapshot, a shared macro library, and
  a custom generic test
- Generated documentation and a real lineage graph
- A Python ingestion script, logged and scheduled, for a source dbt
  can't reach on its own
- A GitHub Actions CI/CD pipeline with a required status check,
  proven against a real incident
- A Power BI layer connected only to verified, production marts

## How this tier fits the larger path

This Advanced tier assumed the Beginner and Intermediate tiers'
`stg_jaffle_shop__*` models and early marts already existed, and spent
its time on the layer most introductory material skips entirely: RBAC,
testing as governance, ingestion, CI/CD, and a real incident response.
Together, the three tiers tell one complete story — from a first
`SELECT` against `jaffle_shop` all the way to a governed,
production-grade analytics platform a real team could actually run.

## Realistic next steps

- **More custom tests**: this platform has one (`non_negative`) — a
  real team accumulates dozens, each tied to a specific business rule
  that's bitten them once already.
- **A deploy job, not just a CI job**: this chapter's CI pipeline
  tests every pull request; a real platform typically adds a second
  job that runs `dbt build --target prod` automatically on merge to
  `main`, the same two-job split this path's own Git/CI-CD course
  covers.
- **More sources through the Python ingestion pattern**: Chapter 5's
  script is a template — any future one-off source follows the same
  read-clean-load-log-schedule shape.
- **dbt Cloud or an orchestrator**: a real team eventually replaces a
  cron job or Task Scheduler entry with dbt Cloud's own scheduler or a
  tool like Airflow, once enough scheduled jobs accumulate to need
  centralized monitoring.

## Key terms

| Term | Meaning |
|---|---|
| Three-tier capstone | Beginner, Intermediate, and this Advanced tier — one continuous story across the whole path |
| Deploy job | A second CI/CD job, separate from the PR check, that runs on merge to build `prod` |

## Lab

1. Write your own one-paragraph summary of this entire capstone, using
   Lesson 1's five gaps as your structure.
2. Pick one of the four "realistic next steps" and describe, in two or
   three sentences, exactly what you'd build first and why.
3. Explain, in your own words, what this Advanced tier assumed the
   Beginner and Intermediate tiers already provided.

## Check yourself

You've completed this capstone when you can explain every layer of
this platform, point to the real incident this chapter walked through,
and describe at least one concrete way you'd extend it on a real job.
