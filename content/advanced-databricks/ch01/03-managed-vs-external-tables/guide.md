# Lesson 3 — Managed vs. External Tables

**Chapter 1 · Beyond the Basics: Unity Catalog Deep Dive · Lesson 3 of 34**

## What you'll learn

- A fast recap: Lesson 41 already defined managed vs. external and `DROP TABLE`
- The real decision: when you'd deliberately choose each one, in production
- The real migration cost of converting one into the other
- Why "just change a property" is not how that conversion actually works

## The recap

Databricks & Delta Lake Lesson 41 already covered this fully:
managed tables have their storage location and full lifecycle owned
by Unity Catalog; external tables point at a location you specify,
with Unity Catalog managing only the metadata. Dropping a managed
table deletes the data; dropping an external table only removes the
registration. That's the definition. This lesson is the decision.

## The real decision, not the definition

```
Choose EXTERNAL when:
  - another team or tool needs to read the same files directly,
    without going through Databricks at all (a legacy Synapse
    pipeline, a data science team on raw Parquet with pandas/Polars)
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

Lesson 41 already recommended managed for this course's own
bronze/silver/gold tables — that's still correct. The genuinely new
material here is the *external* half: external isn't a fallback for
when you forgot to specify a location, it's the deliberate choice
when something real outside Databricks needs direct file access.

## The real migration cost

There is no `ALTER TABLE ... SET MANAGED`. Converting one into the
other means physically moving or re-registering data, and it's worth
being honest about what that costs:

```sql
-- External -> managed: a real data copy, not a metadata flip
CREATE TABLE nyc_taxi.silver.trips_managed
DEEP CLONE nyc_taxi.silver.trips_external;
-- copies every file into the catalog's managed location.
-- Readers must be repointed to the new table name; the old
-- external registration and its untouched files are cleaned up
-- separately, on your own schedule.
```

`DEEP CLONE` (not `CLONE`, which is shallow and still references the
original files) is the real path from external to managed — it
copies bytes, not just metadata. Going the other direction (managed
to external) means exporting the managed table's files to a location
you now own, registering an external table over that new location,
and accepting that Unity Catalog's automatic `VACUUM`/lifecycle
management no longer applies. Either direction has a real
consistency window: writers need to pause, or you accept some window
of staleness, while the clone or export runs. This is never a
same-transaction, zero-cost operation — budget for it like any other
data migration.

## Key terms

| Term | Meaning |
|---|---|
| The real decision | External for genuine outside-Databricks file access; managed for everything else |
| `DEEP CLONE` | The real external -> managed path — copies files, not just metadata |
| Migration cost | A real data copy with a consistency window, never a same-transaction flip |

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: why
is there no `ALTER TABLE ... SET MANAGED`, and what does `DEEP CLONE`
actually have to do that a metadata-only change couldn't?
