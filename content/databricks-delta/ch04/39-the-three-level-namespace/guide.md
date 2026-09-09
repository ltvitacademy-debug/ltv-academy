# Lesson 39 — The Three-Level Namespace

**Chapter 4 · Unity Catalog · Lesson 39 of 57**

## What you'll learn

- `catalog.schema.table` — the real, full name of every table under Unity Catalog
- What this course's `bronze.trips` naming was actually missing
- `USE CATALOG` / `USE SCHEMA` — setting context so you don't repeat the full name
- Why the same table name can safely exist in two different catalogs

## The real full name

Every table this course has built so far — `bronze.trips`,
`silver.trips`, `gold.daily_revenue` — has actually been missing its
first part. Under Unity Catalog, the full name is
**`catalog.schema.table`**: something like
`nyc_taxi.bronze.trips`. The `schema.table` naming used throughout
Chapters 2–3 was real and valid Spark SQL, but it was implicitly
using whatever catalog was already the current default.

```sql
SELECT * FROM nyc_taxi.bronze.trips;
SELECT * FROM nyc_taxi.silver.trips;

CREATE TABLE nyc_taxi.gold.daily_revenue AS
SELECT VendorID, SUM(fare_amount) AS total_revenue
FROM nyc_taxi.silver.trips
GROUP BY VendorID;
```

## Setting context — USE CATALOG / USE SCHEMA

```sql
USE CATALOG nyc_taxi;
USE SCHEMA bronze;

SELECT * FROM trips;  -- resolves to nyc_taxi.bronze.trips
```

Typing the full three-part name every single time is correct but
tedious. `USE CATALOG`/`USE SCHEMA` set a session's current default,
letting shorter names like `spark.table("trips")` (Lesson 16)
resolve unambiguously — exactly the shorthand this course's earlier
lessons were implicitly relying on, made explicit here.

## Why the same table name can exist safely in two catalogs

```sql
-- Two genuinely different tables, same schema.table name:
dev.bronze.trips
prod.bronze.trips
```

A `dev` catalog and a `prod` catalog can each have their own
`bronze.trips` — they're completely separate tables, because the
catalog is part of the identity. This is a real, common pattern:
develop and test against `dev.bronze.trips` with the exact same code
that later runs against `prod.bronze.trips`, just by changing which
catalog is current.

## Key terms

| Term | Meaning |
|---|---|
| `catalog.schema.table` | The real, complete name of any table under Unity Catalog |
| `USE CATALOG` / `USE SCHEMA` | Sets session defaults so shorter names resolve unambiguously |
| Catalog as identity | The same schema.table name in two catalogs are genuinely different tables |

## Check yourself

You're ready for Lesson 40 when you can explain, without looking: why
can `dev.bronze.trips` and `prod.bronze.trips` safely coexist as
completely separate tables?
