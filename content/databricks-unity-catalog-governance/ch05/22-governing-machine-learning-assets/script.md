# Lesson 22 — Governing Machine Learning Assets · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Everything this course has governed so far — catalogs, schemas, tables —
lives under one namespace. Registered ML models get exactly the same
treatment, not a separate, ungoverned registry off to the side.

## S2 · STEPS CARD (same namespace)

A registered model's name is catalog-dot-schema-dot-model — the same
three-level namespace a table uses. Point MLflow at Unity Catalog with
set_registry_uri "databricks-uc", and a model inherits the same owners,
the same USE CATALOG and USE SCHEMA requirements, the same audit trail
as everything else in that schema.

## S3 · SCREENSHOT (register model dialog)

Registering is a dialog choice: Unity Catalog, not the legacy Workspace
Model Registry. The destination is a three-level name, exactly like
creating a table — here, searching for "iris model" resolves to
prod-dot-ml underscore team-dot-iris underscore model.

## S4 · SCREENSHOT (registered model page)

Once registered, the model gets its own Catalog Explorer page — version
history, owner, a Permissions tab. Same page shape as a table in the
same schema, not a different tool to learn.

## S5 · CODE CARD (aliases)

The legacy registry used fixed stages — Staging, Production, Archived.
Unity Catalog replaces that with aliases: a mutable pointer you name
yourself, like Champion for the current production version. Promoting a
new version is one call that moves the alias — serving code always asks
for at-Champion, nothing else changes.

## S6 · SCREENSHOT (lineage tab)

And because training code can log its input dataset, Unity Catalog draws
a real lineage line from a model version back to the table it was
trained on — the same lineage mechanism Chapter 4 covered for tables,
now showing up on the model's own Lineage tab.

## S7 · OUTRO CARD

A model is governed like a table because, inside Unity Catalog, it
basically is one: same namespace, same grants, same lineage. Next
lesson: migrating existing Hive metastore tables — and these same
models — into Unity Catalog in the first place.
