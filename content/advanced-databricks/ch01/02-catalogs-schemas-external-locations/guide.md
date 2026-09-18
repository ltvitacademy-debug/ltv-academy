# Lesson 2 — Catalogs, Schemas & External Locations

**Chapter 1 · Beyond the Basics: Unity Catalog Deep Dive · Lesson 2 of 34**

## What you'll learn

- A fast recap of `catalog.schema.table` and `MANAGED LOCATION` — already taught
- External locations: the one governed object Lesson 40 never touched
- Storage credentials — how Unity Catalog reaches cloud storage without handing out keys
- The real relationship: credential -> external location -> external table/volume

## The recap: catalogs, schemas, managed location

Databricks & Delta Lake Lessons 39-40 already covered this in full:
`catalog.schema.table` is the real three-part name of every object,
`USE CATALOG`/`USE SCHEMA` set session defaults, and `CREATE CATALOG
... MANAGED LOCATION '...'` tells Unity Catalog where *its own*
managed tables should live. That's the whole picture Lesson 40
needed. What it never covered is what happens when data *doesn't*
live under a catalog's managed location at all.

## External locations — a governed object of their own

![The relationship between a storage credential, an external location, and cloud storage — a credential authenticates, an external location binds a path and grants, and external tables or volumes reference the location.](/courses/advanced-databricks/ch01/02-catalogs-schemas-external-locations/external-locations-overview.png)

```sql
CREATE EXTERNAL LOCATION nyc_taxi_raw
URL 'abfss://raw@storageaccount.dfs.core.windows.net/nyc_taxi/'
WITH (STORAGE CREDENTIAL nyc_taxi_credential);

GRANT CREATE EXTERNAL TABLE, READ FILES
ON EXTERNAL LOCATION nyc_taxi_raw TO `data-engineers`;
```

An **external location** binds a specific cloud path to a specific
credential, and is itself a securable object — you `GRANT`/`REVOKE`
on it exactly like a table or catalog. Lesson 41's external tables
and Lesson 45's external volumes both have to point at a path that
already has an external location registered over it; there's no way
to create an external table over ungoverned, unregistered cloud
storage.

## Storage credentials — no keys handed to users

```sql
CREATE STORAGE CREDENTIAL nyc_taxi_credential
WITH (AZURE_MANAGED_IDENTITY 'resource-id=/subscriptions/.../userAssignedIdentities/uc-identity');
```

A **storage credential** wraps a real cloud identity — a managed
identity on Azure, a service principal, an instance profile on AWS —
so Unity Catalog can authenticate to a storage account without any
user ever seeing an access key or a SAS token. Users get `GRANT`s on
the *external location*, never the credential directly; the
credential is infrastructure, not something day-to-day analysts
should touch.

## The real relationship

```
storage credential (managed identity)
        |
        v
external location (URL + credential, its own GRANTs)
        |
        v
external table / external volume (points at a path under it)
```

This is the object Lesson 40's `MANAGED LOCATION` never needed,
because a catalog's managed location is entirely Databricks-owned.
External locations exist specifically for the opposite case: cloud
paths something *outside* Unity Catalog's automatic management still
needs to be governed.

## Key terms

| Term | Meaning |
|---|---|
| External location | A governed cloud path + credential pair; its own GRANT/REVOKE target |
| Storage credential | Wraps a real cloud identity so Unity Catalog can reach storage without exposing keys |
| `CREATE EXTERNAL TABLE`/`READ FILES` | The privileges granted on an external location, not on the credential |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: why
does an external table or volume reference an external location
instead of embedding a raw cloud path and key?
