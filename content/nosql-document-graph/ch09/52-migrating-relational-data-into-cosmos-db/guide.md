# Migrating Relational Data into Cosmos DB

This lesson closes out the Cosmos DB section of this course, and it closes it on the most
important warning in the whole chapter sequence: migrating from SQL Server into Cosmos DB
is not a lift-and-shift. The tools to move the data exist and work well. The mistake that
actually sinks these projects happens before any tool runs — it's moving a normalized
relational schema into Cosmos DB unchanged and expecting it to perform and cost the same.

## What you'll learn

- The real tools available for moving data from SQL Server into Cosmos DB
- Why a straight lift-and-shift of a normalized schema is the single most common migration
  mistake
- The redesign questions that need answers before migration, not after

## The tools

- **Azure Cosmos DB Data Migration Tool** — a free, open-source utility (available as a
  desktop app and a command-line tool) purpose-built for moving data into and out of Cosmos
  DB, with SQL Server, JSON files, CSV, MongoDB, and Cosmos DB itself among its supported
  sources and sinks. It's the right tool for smaller, one-time, or exploratory migrations.
- **Azure Data Factory** — for production-grade, ongoing, or large-scale migrations, ADF has
  native Cosmos DB connectors (both the Core/SQL API and the MongoDB API) as sink and source,
  and supports the mapping data flows, scheduling, and monitoring a real migration pipeline
  needs. This is the tool of choice when the migration involves transformation logic, needs
  to run repeatedly during a phased cutover, or has to be auditable.
- **Change feed** (from earlier in this chapter) plays a role too, but for the opposite
  direction — keeping a Cosmos DB container in sync with downstream systems *after*
  migration, not for the initial load.

Both tools can move rows into documents mechanically. Neither tool decides *how* those
documents should be shaped — that decision has to be made before the tool runs.

## The mistake: migrating the schema, not the access pattern

A normalized SQL Server schema is optimized for write consistency and storage efficiency —
`Customers`, `Orders`, and `OrderItems` as separate tables joined at query time. The
tempting shortcut is to migrate each table into its own Cosmos DB container, one row per
document, preserving the same shape. This is the mistake this lesson exists to name
directly: **it usually produces a database that is worse than the one it replaced.**

What goes wrong concretely:

- Every query that used to be a single SQL `JOIN` now requires the application to make
  **multiple round trips** to Cosmos DB and stitch the results together in code — Cosmos DB
  has no server-side JOIN across containers
- Each of those round trips **costs its own RUs**, so a query pattern that was cheap
  relationally can become RU-expensive at scale
- The **partition key** chosen (often defaulting to each table's old primary key) may not
  match how the data is actually queried, reintroducing the fan-out and hot-partition
  problems from earlier lessons

## Redesigning before migrating

The right sequence, consistent with the access-pattern-first philosophy from Chapter 1, is
to answer these questions *before* any data moves:

1. **What will actually be read together, and how often?** If an order is almost always
   read with its line items, that's a real candidate for **embedding** — nesting order
   items as an array inside the order document — rather than three separate containers.
2. **What's the partition key for the new shape?** Not the old primary key by default —
   the value that matches the dominant access pattern, per the well-architected checklist
   from the previous lesson.
3. **Where does referencing still make sense?** Data that's large, independently updated,
   or shared across many parent documents (e.g., a product catalog referenced by many
   orders) is a real case for **referencing** instead of embedding, even though it means
   giving up a single-document read.
4. **What consistency does each access pattern actually need?** Not every container in the
   new design has to use the same consistency level.

A relational schema is a *starting point for analysis*, not a target shape. The real work
of a Cosmos DB migration is the redesign that happens on a whiteboard before the Data
Migration Tool or Azure Data Factory ever runs.

## Key terms

| Term | Meaning |
|---|---|
| Azure Cosmos DB Data Migration Tool | Free, open-source tool for smaller or exploratory data migrations into/out of Cosmos DB |
| Azure Data Factory | Production-grade data integration service with native Cosmos DB connectors, used for large-scale or ongoing migrations |
| Lift-and-shift | Migrating a schema's structure unchanged into a new platform, without redesigning for that platform's actual model |
| Embedding vs. referencing | The core Cosmos DB modeling decision — nest related data in one document, or keep it in a separate document linked by reference |

## Check yourself

A team migrates their normalized `Customers`, `Orders`, and `OrderItems` SQL Server tables
into three separate Cosmos DB containers, one row per document, keeping each table's old
primary key as the partition key. What's likely to go wrong, and what should they have done
differently?
