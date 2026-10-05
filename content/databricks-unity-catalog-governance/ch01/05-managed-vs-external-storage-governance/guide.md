# Lesson 5 — Managed vs. External Storage Governance

**Chapter 1 · Unity Catalog Foundations · Lesson 5 of 25**

## What you'll learn

- The difference between a managed table and an external table
- Who controls the storage path for each, and what that means for governance
- What happens to the underlying files when each type is dropped
- How a managed storage location is set, and the real SQL for creating both table types

## Two ways a table's data can be stored

Every Unity Catalog table is one of two types, and the difference comes down to one question: **does Unity Catalog pick the storage path, or do you?**

- A **managed table** lets Unity Catalog choose and control the storage location (inside a managed storage location configured on the metastore, catalog, or schema). Databricks also manages the data layout and optimization for managed tables.
- An **external table** points at a storage path **you** specify — one already registered in Unity Catalog as an **external location**. Unity Catalog governs access to it, but doesn't manage its lifecycle or layout.

## Why this distinction is a governance question, not just a storage detail

This isn't just a performance or convenience choice — it changes who's accountable for the data and what happens when a table goes away.

- **Managed table, dropped:** both the table's metadata *and* its underlying data files are deleted. Unity Catalog owns the full lifecycle.
- **External table, dropped:** only the catalog metadata (the registration) is removed. The underlying files stay exactly where they were — because Unity Catalog never owned them, it only governed access to them.

That second point matters enormously for migration scenarios: registering an existing data lake's files as external tables lets you bring years of existing data under Unity Catalog governance without moving or duplicating a single byte.

## Managed storage locations

A **managed storage location** is the cloud storage path (an S3 bucket path, ADLS container, or GCS bucket) where managed table data actually gets written. It can be set at three levels — metastore, catalog, or schema — with the most specific level winning: a schema-level managed location overrides the catalog's, which overrides the metastore's default.

## Creating each table type in SQL

```sql
-- Managed table: Unity Catalog picks the storage path
CREATE TABLE finance.accounts_payable.invoices_managed (
  invoice_id BIGINT,
  amount_due DECIMAL(10,2)
);

-- External table: you specify a path already registered
-- as an external location in Unity Catalog
CREATE TABLE finance.accounts_payable.invoices_external (
  invoice_id BIGINT,
  amount_due DECIMAL(10,2)
)
LOCATION 's3://finance-data-lake/accounts_payable/invoices/';
```

The only syntactic difference is the `LOCATION` clause — but that one clause changes who owns the data's lifecycle.

## Key terms

| Term | Meaning |
|---|---|
| Managed table | A table whose storage path and lifecycle Unity Catalog fully controls; dropping it deletes the data |
| External table | A table pointing at a path you specify, registered as an external location; dropping it only removes the registration |
| External location | A Unity Catalog object registering a cloud storage path (and the credential to access it) for use by external tables/volumes |
| Managed storage location | The cloud storage path Unity Catalog writes managed table data to, settable at the metastore, catalog, or schema level |

## Lab

Write the `CREATE TABLE ... LOCATION` statement for an external table named `clickstream_raw` in `marketing.campaigns` pointing at `s3://marketing-raw/clickstream/`. Then explain, in one sentence, what would and would not be deleted if you ran `DROP TABLE marketing.campaigns.clickstream_raw;`.

## Check yourself

- What single question determines whether a table is managed or external?
- If you drop a managed table, what happens to its data files? What about an external table?
- Why is registering existing data-lake files as external tables a common first step when migrating to Unity Catalog?
