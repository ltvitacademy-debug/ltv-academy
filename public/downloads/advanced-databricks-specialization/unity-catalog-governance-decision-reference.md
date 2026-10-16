# Unity Catalog Governance Decision Reference

Compiled from Chapter 1 (Beyond the Basics: Unity Catalog Deep Dive). Keep this open while you're
designing a new catalog structure or arguing a managed-vs-external call in a design review — it's
the two decisions that recur on almost every real Unity Catalog project.

## 1. One metastore, not one per team

```
One metastore (region: eastus2)
├── workspace-finance-prod   -- catalog binding: finance, shared
├── workspace-finance-dev    -- catalog binding: finance, shared
├── workspace-marketing-prod -- catalog binding: marketing only
└── workspace-data-eng       -- catalog binding: ALL catalogs
```

Databricks recommends **one metastore per region**, organization-wide. Isolation between teams is
handled by binding a **catalog** to a subset of workspaces, not by standing up a separate metastore
per team. Splitting metastores per team recreates the per-workspace permission silos Unity Catalog
exists to eliminate — if you're reaching for "let's spin up a second metastore," stop and ask
whether a catalog binding actually solves the real problem first.

## 2. Managed vs. external — the real decision

```
Choose EXTERNAL when:
  - another team or tool needs to read the same files directly, without
    going through Databricks at all (a legacy pipeline, a data science
    team on raw Parquet with pandas/Polars)
  - a regulated data-residency requirement pins files to a specific
    container regardless of which catalog references them
  - you're onboarding data that already exists at a fixed path and
    re-copying it into a managed location isn't worth the cost yet

Choose MANAGED when:
  - Databricks is the only real owner of this table's lifecycle
  - you want automatic VACUUM, OPTIMIZE, and predictive optimization
    without separately managing the storage yourself
  - it's a bronze/silver/gold table nothing outside Databricks reads
```

Default to managed for anything inside your own medallion pipeline. Reach for external only when
something real outside Databricks genuinely needs direct file access — not as a fallback for when
nobody specified a location.

## 3. Migrating between them — never a metadata-only flip

There is no `ALTER TABLE ... SET MANAGED`. Converting external to managed is a real data copy:

```sql
-- External -> managed: copies every file into the catalog's managed location
CREATE TABLE nyc_taxi.silver.trips_managed
DEEP CLONE nyc_taxi.silver.trips_external;
-- Readers must be repointed to the new table name afterward. The old
-- external registration and its untouched files are cleaned up separately.
```

Use `DEEP CLONE`, never plain `CLONE` (which is shallow and still references the original files).
Going managed-to-external means exporting the managed table's files to a location you now own,
registering an external table over it, and accepting that Unity Catalog's automatic
`VACUUM`/lifecycle management no longer applies. Budget either direction like a real migration:
there's a consistency window while the clone or export runs, and writers either pause or you accept
some staleness.

## 4. Volumes — the file-access case tables don't cover

A **Volume** is Unity Catalog's governed object for non-tabular file access (arbitrary files a
pipeline needs to read or land, not rows and columns). Use a Volume whenever a batch process needs
a drop location for files before they're parsed into a table — it gets the same governance,
auditing, and access control as any catalog object, instead of an ungoverned path on cloud storage.

## 5. Catalog structure checklist

Before writing a line of ingestion code on a new project:

```
[ ] One catalog per major domain/project (e.g., retail_prod), not per table
[ ] bronze / silver / gold schemas inside it, matching the medallion pattern
[ ] A Volume declared for any raw batch file drop the project needs
[ ] Managed tables by default; external only where justified above
[ ] Catalog binding decided: which workspaces actually need to see this catalog
```

## Related course material

- Lesson 1 — Unity Catalog Architecture, Revisited
- Lesson 2 — Catalogs, Schemas & External Locations
- Lesson 3 — Managed vs. External Tables
- Lesson 4 — Unity Catalog Volumes
- Lesson 6 — Access Control at Scale
