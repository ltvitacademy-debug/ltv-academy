# Lesson 40 — Creating a Catalog and Schema

**Chapter 4 · Unity Catalog · Lesson 40 of 57**

## What you'll learn

- `CREATE CATALOG` / `CREATE SCHEMA` — the real syntax, start to finish
- Storage locations — where a catalog's managed data actually lives
- Organizing this course's own bronze/silver/gold as real schemas, properly
- `SHOW CATALOGS` / `SHOW SCHEMAS` — seeing what already exists

## Creating a catalog

```sql
CREATE CATALOG IF NOT EXISTS nyc_taxi
MANAGED LOCATION 'abfss://unity-catalog@storageaccount.dfs.core.windows.net/nyc_taxi/';
```

The `MANAGED LOCATION` is where Unity Catalog stores data for any
**managed** table (Lesson 41) created inside this catalog, if the
table itself doesn't specify its own location. This is a real ADLS
Gen2 path — Foundations' Chapter 1 storage material, now the
literal home for everything Unity Catalog manages.

## Creating schemas — organizing bronze/silver/gold properly

```sql
USE CATALOG nyc_taxi;

CREATE SCHEMA IF NOT EXISTS bronze;
CREATE SCHEMA IF NOT EXISTS silver;
CREATE SCHEMA IF NOT EXISTS gold;
```

This is the real setup step behind everything Chapter 3 already
built — `bronze`, `silver`, and `gold` genuinely are schemas, each
one a real namespace within the `nyc_taxi` catalog, exactly matching
the medallion architecture naming convention this whole course has
used from Lesson 25 onward.

## Seeing what already exists

```sql
SHOW CATALOGS;
SHOW SCHEMAS IN nyc_taxi;
SHOW TABLES IN nyc_taxi.bronze;
```

These are genuinely useful for orientation in a real workspace with
many catalogs and schemas already created by other people — a quick
way to confirm what's actually there before assuming a name is
available or a table already exists.

## Putting it together

```sql
CREATE CATALOG IF NOT EXISTS nyc_taxi;
USE CATALOG nyc_taxi;
CREATE SCHEMA IF NOT EXISTS bronze;
CREATE SCHEMA IF NOT EXISTS silver;
CREATE SCHEMA IF NOT EXISTS gold;

CREATE TABLE IF NOT EXISTS bronze.trips (
    VendorID STRING,
    tpep_pickup_datetime TIMESTAMP,
    fare_amount DOUBLE
) USING DELTA;
```

This is the real, complete setup this course's entire Chapter 3
pipeline should have run against from the start — every `bronze.
trips` reference throughout that chapter now has a genuine home.

## Key terms

| Term | Meaning |
|---|---|
| `CREATE CATALOG` | Creates a new catalog, optionally with a managed storage location |
| `CREATE SCHEMA` | Creates a namespace within a catalog — bronze, silver, gold, in this course |
| `SHOW CATALOGS` / `SHOW SCHEMAS` | Lists what already exists, for orientation |

## Check yourself

You're ready for Lesson 41 when you can explain, without looking: what
does a catalog's `MANAGED LOCATION` actually control?
