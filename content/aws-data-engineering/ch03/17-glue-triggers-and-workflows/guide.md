# Glue Triggers & Workflows

Lesson 11 called out that crawlers, the Catalog, and jobs are independent components that
have to be composed. **Triggers** and **workflows** are what actually compose them — the
piece that says "run this crawler, then run that job" without a human clicking buttons in
sequence. This closes out the chapter by tying the whole picture together.

## What you'll learn

- The three trigger types: scheduled, on-demand, and event-based
- How a trigger connects to what it starts (a job or a crawler)
- What a Glue workflow is, and why it exists on top of triggers
- A realistic end-to-end sequence: crawler, then job, then a second crawler

## Trigger types

A Glue **trigger** starts a job or a crawler run, and comes in three flavors:

- **Scheduled** — a cron-like expression, the same style used for crawler scheduling in
  Lesson 12 (e.g., run nightly at 2 AM).
- **On-demand** — started manually or by an external caller (an API call, another AWS
  service, a CLI command) rather than on a fixed clock.
- **Event-based / conditional** — starts when another job or crawler in the same workflow
  reaches a specific state, most commonly "succeeded." This is what lets you chain steps
  together without external orchestration.

A single trigger targets one or more jobs/crawlers to start, and a conditional trigger can
require multiple upstream steps to succeed before it fires.

## Workflows: triggers, wired together

A **workflow** is a container that groups a set of crawlers, jobs, and the triggers
connecting them into one visual, monitorable unit. Without a workflow, you can still chain
individual triggers — a job that fires "on crawler success" — but a workflow gives you a
single place to see the whole chain's status, restart it, and reason about it as one
pipeline rather than a scattered set of independently configured triggers.

## A realistic chained sequence

A common real pattern: a scheduled trigger starts an initial **crawler** against a raw S3
landing zone. On that crawler's success, a conditional trigger starts an ETL **job** that
reads the newly cataloged raw table, transforms it, and writes cleaned output to a staging
S3 location. On that job's success, a second conditional trigger starts a **crawler**
against the staging output, so the transformed data becomes queryable in the Catalog
without anyone manually registering it. Three separate components — crawler, job, crawler
— composed into one workflow that runs unattended end to end.

This is also where Chapter 3's pieces click together as a whole: the crawler (Lesson 12)
populates the Catalog (Lesson 13), the job (Lesson 14, possibly authored via Glue Studio
from Lesson 15) reads and writes through it with bookmarks (Lesson 16) tracking what's
already processed, and triggers/workflows are the glue — no pun intended — holding the
sequence together on a schedule.

## Key terms

| Term | Meaning |
|---|---|
| Trigger | A configured rule that starts a job or crawler: scheduled, on-demand, or event-based |
| Scheduled trigger | Fires on a cron-like expression |
| Conditional trigger | Fires when an upstream job/crawler reaches a specified state (usually success) |
| Workflow | A container grouping crawlers, jobs, and their triggers into one monitorable pipeline |

## Check yourself

You want a staging table to become queryable automatically right after a transform job
finishes writing to it — with no manual step. Which two Chapter 3 components, connected by
what kind of trigger, make that happen?
