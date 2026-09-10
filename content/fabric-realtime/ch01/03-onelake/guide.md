# Lesson 3 — OneLake — One Lake for the Whole Organization

**Chapter 1 · Microsoft Fabric · Lesson 3 of 70**

## What you'll learn

- OneLake, properly: automatic, not something you provision
- The real path shape — every Fabric item's data has one, whether you look at it or not
- Shortcuts, previewed — referencing data without copying it (Lesson 7 covers this in full)
- Why "one copy of the data" is OneLake's actual pitch

## Automatic, not provisioned

Recall Databricks & Delta Lake Lesson 40: creating a catalog meant
choosing a `MANAGED LOCATION` — a real ADLS Gen2 path you had to
think about. **OneLake** skips that decision entirely: every Fabric
tenant gets exactly one OneLake automatically, the moment the
tenant exists. You never provision it, never pick a storage
account, never configure a location — it's simply there, the way
every workspace already has somewhere for its items' data to live.

## The real path shape

```
https://onelake.dfs.fabric.microsoft.com/<workspace>/<item>.<type>/<path>
```

Every Lakehouse, Warehouse, and (Chapter 2) Eventhouse gets a real
path under this same OneLake root, whether or not you ever look at
it directly. This mirrors Databricks & Delta Lake Lesson 45's
`/Volumes/<catalog>/<schema>/<volume>/` shape — a real, structured
path, just with Fabric's own naming instead of Unity Catalog's.

## Shortcuts, previewed

```
Lakehouse A: /Tables/dim_products   (the real data)
Lakehouse B: /Tables/dim_products   (a SHORTCUT -- same bytes, no copy)
```

A **shortcut** lets a second item reference the first item's data
directly, through OneLake, with nothing actually duplicated. Lesson
7 covers the mechanics properly; for now, the concept to hold onto
is that this is possible specifically *because* everything already
lives in one shared OneLake — there's no cross-storage-account copy
to avoid, because there's only ever been one storage location to
begin with.

## "One copy of the data" — OneLake's actual pitch

Recall Foundations Lesson 8: choosing between CSV, JSON, and
Parquet was partly about avoiding redundant copies of the same
data in different formats. OneLake's pitch operates one level up
from that: instead of a Lakehouse team and a Warehouse team each
maintaining their own copy of the same underlying trip data, both
read the same OneLake-backed Delta table, through the specific
engine they each prefer. One copy, many consumers — not many
copies, kept painfully in sync by hand.

## Key terms

| Term | Meaning |
|---|---|
| OneLake | The one, automatic, tenant-wide data lake underneath every Fabric item |
| Real path shape | Every item's data has a structured OneLake path, seen or not |
| Shortcut | A reference to another item's data, through OneLake, with nothing copied |

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: why
don't you ever need to choose a storage account or location when
creating a new Fabric item, the way Databricks & Delta Lake's
`MANAGED LOCATION` required?
