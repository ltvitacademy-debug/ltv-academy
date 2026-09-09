# Lesson 45 — Unity Catalog Volumes

**Chapter 4 · Unity Catalog · Lesson 45 of 57**

## What you'll learn

- Volumes: DBFS root's real replacement, promised back in Lesson 8
- Creating one, and its real path shape — a fourth level, under a schema
- Managed vs. external volumes — the exact same distinction as Lesson 41's tables
- Reading a file from a volume, in practice

## The promise from Lesson 8, kept

Lesson 8 flagged it directly: DBFS root has no Unity Catalog
governance at all, and production data should move toward something
that does. A **volume** is that something — governed, addressable
file storage, living inside a schema, subject to the exact same
`GRANT`/`REVOKE` (Lesson 42) as any table.

## Creating a volume

```sql
CREATE VOLUME nyc_taxi.bronze.raw_files;
```

```
/Volumes/nyc_taxi/bronze/raw_files/yellow_tripdata_2024-01.csv
```

The path shape is `/Volumes/<catalog>/<schema>/<volume>/<file>` — a
genuine fourth level under Lesson 39's `catalog.schema` namespace,
specifically for files rather than tables. This is where
Autoloader's incoming CSVs (Lesson 32) belong now, instead of DBFS
root or an unmanaged mount.

## Managed vs. external volumes — the same idea as Lesson 41

```sql
CREATE VOLUME nyc_taxi.bronze.raw_files;                     -- managed

CREATE EXTERNAL VOLUME nyc_taxi.bronze.legacy_files
LOCATION 'abfss://legacy@storageaccount.dfs.core.windows.net/files/';  -- external
```

Exactly Lesson 41's managed/external distinction, now applied to
file storage instead of tables: a **managed volume**'s location is
chosen and owned by Unity Catalog; an **external volume** points at
a location you specify, for files that need to stay reachable
outside Databricks too.

## Reading a file from a volume

```python
df = spark.read.csv("/Volumes/nyc_taxi/bronze/raw_files/yellow_tripdata_2024-01.csv")

dbutils.fs.ls("/Volumes/nyc_taxi/bronze/raw_files/")
```

Both `spark.read` and `dbutils.fs` (Lesson 8) work on a volume path
exactly the way they worked on any other path — nothing about
reading files changes. What changes is governance: a volume's access
is controlled by `READ VOLUME`/`WRITE VOLUME` grants, the same
GRANT/REVOKE mechanism covering every table in this chapter.

## Key terms

| Term | Meaning |
|---|---|
| Volume | Governed file storage inside a schema — DBFS root's real replacement |
| `/Volumes/catalog/schema/volume/` | The real path shape — a 4th level under the 3-level table namespace |
| Managed vs. external volume | The same distinction as managed/external tables, applied to files |

## Check yourself

You're ready for Lesson 46 when you can explain, without looking: what
specifically does a volume give bronze's incoming files that DBFS
root never could?
