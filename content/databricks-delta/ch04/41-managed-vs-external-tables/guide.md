# Lesson 41 — Managed Tables vs. External Tables

**Chapter 4 · Unity Catalog · Lesson 41 of 57**

## What you'll learn

- Managed tables — Unity Catalog owns the storage location and the data's lifecycle
- External tables — you own the location, Unity Catalog only manages the metadata
- What `DROP TABLE` actually deletes, and why it differs between the two
- Which one this course's own bronze/silver/gold tables should actually be

## Managed tables — the default, and usually the right choice

```sql
CREATE TABLE nyc_taxi.bronze.trips (
    VendorID STRING,
    fare_amount DOUBLE
) USING DELTA;
-- no LOCATION specified -- Unity Catalog picks one,
-- under the catalog's MANAGED LOCATION from Lesson 40
```

A **managed table** has its storage location fully controlled by
Unity Catalog — you never specify it, and generally shouldn't try
to. In exchange, Unity Catalog can guarantee things about the
table's full lifecycle, including automatically cleaning up its
data (via `VACUUM`, Lesson 24) when the table is dropped.

## External tables — you own the location

```sql
CREATE TABLE nyc_taxi.bronze.trips_external (
    VendorID STRING,
    fare_amount DOUBLE
) USING DELTA
LOCATION 'abfss://raw@storageaccount.dfs.core.windows.net/nyc_taxi/trips/';
```

An **external table** points at a location you specify — often data
that already exists, or that other tools outside Databricks also
need to read directly. Unity Catalog manages the table's *metadata*
(its schema, its registration, its permissions) but not the
underlying files' lifecycle.

## What DROP TABLE actually does — the real, important difference

```sql
DROP TABLE nyc_taxi.bronze.trips;            -- MANAGED: deletes the data too
DROP TABLE nyc_taxi.bronze.trips_external;   -- EXTERNAL: only removes the registration
```

Dropping a **managed** table deletes both the metadata registration
*and* the underlying data files. Dropping an **external** table only
removes the registration — the actual Parquet/Delta files at that
`LOCATION` are completely untouched, since Unity Catalog never
claimed to own their lifecycle in the first place. Confusing these
two is a real, common way to either accidentally destroy data
(dropping a managed table thinking it's external) or leave orphaned
files behind indefinitely (the opposite mistake).

## What this course's tables should actually be

Every `bronze`/`silver`/`gold` table this course has built is a
genuinely good fit for **managed**: Unity Catalog fully owns their
lifecycle, from creation through `VACUUM` and eventual deletion, with
no external tool needing direct file access. External tables are the
right choice specifically when something *outside* Databricks
(another compute engine, a legacy system) genuinely needs to read
the same files directly.

## Key terms

| Term | Meaning |
|---|---|
| Managed table | Unity Catalog owns storage location and full lifecycle, including deletion |
| External table | You specify the location; Unity Catalog manages metadata only |
| `DROP TABLE` difference | Managed deletes data too; external only removes the registration |

## Check yourself

You're ready for Lesson 42 when you can explain, without looking: why
does dropping an external table leave its underlying files
untouched, while dropping a managed table doesn't?
