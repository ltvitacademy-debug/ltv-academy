# Lesson 2 — Metastores

**Chapter 1 · Unity Catalog Foundations · Lesson 2 of 25**

## What you'll learn

- What a metastore is and why it sits above every catalog
- The one-metastore-per-region rule and what it means in practice
- How workspaces attach to a metastore
- What a metastore actually stores: metadata, not your table data
- The admin commands used to inspect a metastore

## The top-level container

A **metastore** is the top-level container for Unity Catalog metadata. Every catalog, every schema, every table — everything covered in this course — is registered against exactly one metastore. Metastores are created and managed by **account admins** in the Databricks **account console**, not inside an individual workspace, because a metastore's whole purpose is to span workspaces.

## One metastore per region

Databricks provisions **one Unity Catalog metastore per region** per account (not per workspace). All workspaces in the same cloud region typically attach to the same regional metastore — that's how they end up sharing the same catalogs, the same permissions, and the same audit trail. A workspace in a different region attaches to that region's own metastore instead; cross-region access to data then goes through mechanisms like Delta Sharing (Chapter 5), not a shared metastore.

## Workspaces attach to a metastore

A metastore by itself governs nothing until a workspace is **assigned** to it. Once assigned, every catalog on that metastore becomes visible (subject to permissions) inside that workspace's Catalog Explorer, notebooks, and SQL warehouses. A workspace can be assigned to exactly one metastore at a time; a metastore, by contrast, can have many workspaces assigned to it — this many-to-one relationship is the whole mechanism that makes "one governance layer, many workspaces" real rather than just a slogan from Lesson 1.

## What a metastore actually stores

It's worth being precise about this: a metastore stores **metadata** — catalog, schema, and table definitions, permissions, and (depending on configuration) a default **managed storage location** where Unity Catalog writes managed table data. It does not store your actual table rows itself. The data for managed tables lives in cloud object storage (S3, ADLS, or GCS) that you control; the metastore just tracks where it is and who's allowed to touch it. Lesson 5 covers managed vs. external storage in depth.

## Inspecting a metastore from SQL

Once connected to a workspace attached to a metastore, you can confirm which one you're on with a single statement:

```sql
SELECT CURRENT_METASTORE();
```

And see every catalog registered on it:

```sql
SHOW CATALOGS;
```

## Key terms

| Term | Meaning |
|---|---|
| Metastore | The top-level container for Unity Catalog metadata; created per region by an account admin |
| Account console | Where account admins create and manage metastores, separate from any one workspace |
| Managed storage location | The default cloud storage path a metastore (or catalog, or schema) uses for managed table data |
| Workspace assignment | Attaching a workspace to a metastore so its catalogs become visible in that workspace |

## Lab

Run `SELECT CURRENT_METASTORE();` in a Unity Catalog-enabled workspace (or in your head, from this lesson, if you don't have access yet) and note the result. Then run `SHOW CATALOGS;` and count how many catalogs are registered on that metastore.

## Check yourself

- Who creates a metastore, and where — inside a workspace, or somewhere else?
- Why does Databricks provision metastores per region rather than per workspace?
- What does a metastore actually store, and what does it explicitly not store?
