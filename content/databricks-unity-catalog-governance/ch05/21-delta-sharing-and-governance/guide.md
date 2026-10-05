# Lesson 21 — Delta Sharing and Governance

**Chapter 5 · Lakehouse Governance · Lesson 21 of 25**

## What you'll learn

- What a Delta Share actually is inside Unity Catalog, and why it's a governed object rather than a file export
- The real SQL for creating a share, adding tables to it, and creating a recipient
- How `GRANT ... ON SHARE ... TO RECIPIENT` controls who can read a share
- How to audit and revoke sharing access after the fact

## A share is a Unity Catalog object, not a copy of data

Every earlier chapter in this course governed data that stays inside one metastore: catalogs, schemas, permissions, row filters, lineage. Delta Sharing is what happens when data needs to leave the metastore boundary — to another business unit's workspace, a partner company, or a tool that can't connect to Unity Catalog directly. The critical governance fact: a **share** is itself a securable object in Unity Catalog, owned, permissioned, and auditable exactly like a catalog or a table. Nothing about Delta Sharing bypasses the governance model built in Chapters 1–4 — it extends it across organizational boundaries.

Three objects work together:

- **SHARE** — a named collection of tables, views, volumes, or notebooks that a provider wants to expose
- **RECIPIENT** — an identity (another Databricks metastore, or an external token-based consumer) allowed to read shares
- **GRANT ... ON SHARE** — the privilege that actually connects a recipient to a share

## Creating a share and adding tables to it

```sql
CREATE SHARE IF NOT EXISTS customer_share
  COMMENT 'Curated customer summary for the logistics partner';

ALTER SHARE customer_share
  ADD TABLE sales.gold.customer_summary
    COMMENT 'Aggregated, PII-masked customer summary'
    WITH HISTORY;
```

`ADD TABLE` supports a `PARTITION` clause to share only a slice of a table (for example `PARTITION (region = 'EMEA')`), and `WITH HISTORY` enables the recipient to run time-travel queries and streaming reads against the shared table — both decisions a data owner makes deliberately, not by default.

## Creating a recipient

For Databricks-to-Databricks sharing, a recipient is identified by the other party's metastore ID (no token management required):

```sql
CREATE RECIPIENT IF NOT EXISTS logistics_partner
  USING ID 'aws:us-west-2:a1b2c3d4-5678-90ab-cdef-1234567890ab';
```

Leaving off `USING ID` creates a token-based recipient instead, for consumers who can't authenticate as a Databricks metastore — Databricks generates an activation link for them.

## Granting and auditing access

```sql
GRANT SELECT ON SHARE customer_share TO RECIPIENT logistics_partner;

SHOW GRANTS ON SHARE customer_share;

REVOKE SELECT ON SHARE customer_share FROM RECIPIENT logistics_partner;
```

`SHOW GRANTS` lists every recipient currently permitted to read a share — the first place to look when auditing "who can see this data outside our metastore." `REVOKE` takes effect immediately; there's no copy sitting on a partner's server that keeps working after access is pulled, because Delta Sharing reads live, governed data rather than handing over a static export.

## Governing what goes into a share

The same Chapter 2–3 tools still apply before data ever reaches a share: grant `SELECT` on a **view** that already applies a column mask or row filter, rather than sharing the raw table, and the recipient only ever sees the governed version. Share the minimum table or view that satisfies the business need — a share is a new perimeter, and the access-control habits from this entire course apply right up to that perimeter.

## Key terms

| Term | Meaning |
|---|---|
| Share | A named, owned, auditable Unity Catalog object listing the tables/views/volumes exposed to outside consumers |
| Recipient | An identity (Databricks metastore ID or token) authorized to read one or more shares |
| `GRANT ... ON SHARE ... TO RECIPIENT` | The privilege statement that connects a recipient to a share |
| `WITH HISTORY` | An `ADD TABLE` option enabling time travel and streaming reads on the shared table |

## Lab

Write the four SQL statements that would set up sharing a single table, `analytics.gold.monthly_summary`, with a partner Databricks metastore ID of your choosing: `CREATE SHARE`, `ALTER SHARE ... ADD TABLE`, `CREATE RECIPIENT ... USING ID`, and `GRANT SELECT ON SHARE ... TO RECIPIENT`. Then write the single statement you'd run six months later to cut off that partner's access entirely.

## Check yourself

Without looking back, can you name the three SQL objects that make Delta Sharing work, explain why a share is described as "a governed object, not a data export," and write the `GRANT` statement that connects a recipient to a share?
