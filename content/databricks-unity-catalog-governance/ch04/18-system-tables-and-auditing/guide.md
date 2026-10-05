# Lesson 18 — System Tables and Auditing

**Chapter 4 · Discovery, Lineage and Auditing · Lesson 18 of 25**

## What you'll learn

- What the `system` catalog is, and where it lives in every Unity Catalog metastore
- How to grant access to it, since it's governed exactly like any other catalog
- The breadth of what's actually in there — far more than just audit logs
- A real cross-cutting query against billing data
- A few operational gotchas worth knowing before you build anything on top of it

## The `system` catalog

Every Unity Catalog metastore includes a built-in catalog named `system`, containing Azure Databricks' own hosted analytical store of your account's operational data — security events, billing, compute history, job runs, lineage, and more. You already met two of its tables in Lesson 17 (`system.access.table_lineage`, `system.access.column_lineage`) and one in Lesson 15 (`system.data_classification.results`). This lesson covers the catalog itself.

System tables are **read-only** and **free to query** — you're only billed for the compute used to run the query, not for the data itself. Most tables retain 365 days of history by default (configurable up to 3,650 days as a Beta feature), with a few exceptions like `system.lakebase.*` (7 days).

## Granting access

Because `system` is governed by Unity Catalog like any other catalog, access isn't automatic — account and metastore admins have it by default, but every other user needs an explicit grant:

```sql
GRANT USE CATALOG ON CATALOG system TO `data-governance-team`;
GRANT USE SCHEMA ON SCHEMA system.access TO `data-governance-team`;
GRANT SELECT ON SCHEMA system.access TO `data-governance-team`;
```

This is the same `USE CATALOG` / `USE SCHEMA` / `SELECT` pattern from Chapter 2 — system tables don't get a different privilege model, just a different source of data.

## What's actually in there

The `system` catalog spans far more than access and audit data. A few schemas worth knowing by name:

| Schema | Holds | Example table |
|---|---|---|
| `system.access` | Audit events, lineage, network access | `system.access.audit` |
| `system.billing` | Usage records, SKU pricing history | `system.billing.usage` |
| `system.compute` | Cluster, warehouse, and node configuration history | `system.compute.warehouses` |
| `system.lakeflow` | Jobs, job runs, and pipeline metadata | `system.lakeflow.job_run_timeline` |
| `system.data_classification` | Classification detections (Lesson 15) | `system.data_classification.results` |
| `system.query` | SQL warehouse and serverless query history | `system.query.history` |

You can see the full, current list for your account with `SHOW SCHEMAS IN system;` — new tables get added over time, so this list is a starting point, not the complete catalog.

## A real cross-cutting query

Because every system table is ordinary SQL, you can combine governance questions with operational ones. Here's a 30-day cost breakdown by product — a question a governance team asks as often as a finance team does:

```sql
SELECT billing_origin_product,
       SUM(usage_quantity) AS total_dbus
FROM system.billing.usage
WHERE usage_date >= DATE_SUB(CURRENT_DATE(), 30)
GROUP BY billing_origin_product
ORDER BY total_dbus DESC;
```

`billing_origin_product` values include things like `DATA_CLASSIFICATION` and `JOBS` — so this one query answers "how much is each governance feature actually costing us," directly from the same catalog that holds the audit trail.

## A few things to know before you build on this

- **Schemas evolve.** New columns can be added to any system table at any time without notice; a job with a hardcoded schema should enable schema evolution rather than assume stability.
- **Queries need selectivity.** An unfiltered query against a large system table returns `System Table query returned too much data` — always filter on a date column (most tables partition logically by `*_date` fields).
- **Not everything is global.** Audit logs are regional for workspace-level events and global only for account-level events (`workspace_id = 0`); billing and pricing data is global.

## Key terms

| Term | Meaning |
|---|---|
| `system` catalog | The built-in Unity Catalog catalog holding an account's operational data, free to query |
| `system.access` | The schema holding audit, lineage, and network-access tables |
| Schema evolution | System tables can gain new columns at any time; downstream jobs should tolerate it |

## Lab

Write the `GRANT` statements needed to let a `finops` group read `system.billing.usage` and `system.billing.list_prices`, but nothing else in the `system` catalog. Then write the query you'd run to find the single most expensive day in the last 30.

## Check yourself

Without looking back: name three schemas inside the `system` catalog beyond `system.access`, and explain why an unfiltered `SELECT * FROM system.access.audit` is likely to fail outright rather than just run slowly.
