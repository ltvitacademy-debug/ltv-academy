# Lesson 15 — Git Integration and Deployment Pipelines

**Chapter 1 · Microsoft Fabric · Lesson 15 of 70**

## What you'll learn

- Connecting a workspace to a real Git repository
- What actually gets version-controlled — item definitions, not raw data
- Deployment pipelines — dev/test/prod, the same idea named early in this course
- The genuine gap: this isn't the same as Databricks & Delta Lake's notebook-level Git story

## Connecting a workspace to Git

1. In workspace settings, select **Git integration**.
2. Connect to a real Azure DevOps or GitHub repository.
3. Fabric syncs each item's **definition** — a notebook's cells, a
   pipeline's activity graph, a semantic model's relationships and
   measures — as real files in that repository, committed and
   diffable like any other code.

## What actually gets version-controlled

```
/nyc_taxi_lakehouse.Lakehouse/    -- metadata only, not the actual data
/monthly_ingest.DataPipeline/     -- the pipeline's activity graph, as JSON
/nyc_taxi_model.SemanticModel/    -- relationships, measures, as text
```

This is a genuinely important distinction: Git tracks an item's
**definition**, never the underlying OneLake data itself — the same
distinction Databricks & Delta Lake's entire Chapter 2 drew between
a table's schema/logic and its actual Parquet files. Version
control here means tracking how a pipeline or model is built, not
backing up the trip data sitting inside it.

## Deployment pipelines — dev/test/prod, named early

Recall this course's own Lesson 11 comparison, and Databricks &
Delta Lake Lesson 47's catalog-per-environment best practice: a
**Fabric deployment pipeline** promotes a workspace's items through
real **dev → test → production** stages, each stage its own
workspace, connected to the same capacity model (Lesson 14) but
kept genuinely separate. This is the exact same environment-
separation instinct, just implemented as Fabric's own UI feature
instead of a naming convention across catalogs.

## The genuine gap from Databricks & Delta Lake

Databricks & Delta Lake's own material didn't cover notebook-level
Git integration in this much depth — Fabric's workspace-wide Git
sync, covering every item type at once (not just notebooks), is a
genuinely broader mechanism than anything that course's Lakeflow
chapter demonstrated directly. This chapter's Lesson 45 (CI/CD),
much later in this course, returns to this idea with the full
production-practice treatment it deserves.

## Key terms

| Term | Meaning |
|---|---|
| Git integration | Syncs an item's definition (not its data) to a real repository |
| Item definition | Notebook cells, pipeline graphs, model relationships — as diffable text/JSON |
| Deployment pipeline | Promotes items through dev/test/production workspaces |

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: why
does Git integration track a pipeline's definition, but never the
actual trip data sitting in a lakehouse?
