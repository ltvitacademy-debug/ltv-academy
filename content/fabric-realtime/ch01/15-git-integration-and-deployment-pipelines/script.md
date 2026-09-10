# Lesson 15 — Git Integration and Deployment Pipelines · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Let's put real version control around everything built so far —
Git integration and deployment pipelines.

## S2 · CODE CARD (connecting to Git)

Connect a workspace to a real Azure DevOps or GitHub repository,
and Fabric syncs each item's definition as real files — notebook
cells, pipeline activity graphs, semantic model relationships —
committed and diffable, like any other code.

## S3 · CODE CARD (what's tracked)

And that's an important distinction — Git tracks the definition,
never the actual OneLake data itself. The exact same
schema-versus-data split Databricks' entire second chapter drew
between a table's logic and its real Parquet files.

## S4 · CODE CARD (deployment pipelines)

A deployment pipeline promotes those items through real dev,
test, and production workspaces — the same environment-separation
instinct as Databricks Lesson 47's catalog-per-environment
practice, just built as an actual UI feature here.

## S5 · OUTRO CARD

Definitions tracked, data untouched, environments kept separate.
Next lesson: the monitoring hub, where every item's activity
actually shows up.
