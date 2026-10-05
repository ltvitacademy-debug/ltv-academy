# Lesson 23 — Migrating to Unity Catalog · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Every lesson so far assumed tables already live in Unity Catalog. Most
real organizations don't start there — they have years of tables sitting
in the legacy Hive metastore. This lesson covers how to actually move
them.

## S2 · STEPS CARD (four paths)

Databricks documents four real paths. The upgrade wizard plus SYNC is
the standard route for external tables. CLONE physically copies managed
Hive tables. CTAS is a manual rewrite when you also want to reshape the
table. And UCX automates all of this across an entire workspace instead
of one table at a time.

## S3 · SCREENSHOT (select database)

The wizard starts in Catalog Explorer: pick hive_metastore as the
catalog, then the schema you actually want to upgrade. From there you
select individual tables and set their new Unity Catalog destination.

## S4 · CODE CARD (SYNC)

SYNC is also a plain SQL command you can run directly, and it supports
DRY RUN — a full preview of what would happen with zero changes made.
Run it against a schema instead of one table, and you can assign an
owner in the same statement.

## S5 · SCREENSHOT (deprecation warning)

Once a table's been upgraded, Databricks actively flags old code still
pointing at the hive_metastore path — a strikethrough, a tooltip
explaining exactly what changed, and a Quick Fix that rewrites the query
automatically. It catches stale references before you run them, not
after.

## S6 · SCREENSHOT (UCX flow)

For a workspace with thousands of tables, UCX — a Databricks Labs
toolkit — sequences the whole migration as coordinated jobs: assessment
first, then group migration and table migration, spanning
account-admin, workspace-admin, and IAM-admin roles.

## S7 · OUTRO CARD

Four paths, one goal: get every table — and the models from last lesson
— under Unity Catalog's governance instead of scattered across Hive
metastores. Next lesson: a full case study pulling every chapter of
this course together.
