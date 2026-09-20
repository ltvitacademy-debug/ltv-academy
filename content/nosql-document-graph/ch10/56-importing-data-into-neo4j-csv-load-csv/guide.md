# Importing Data into Neo4j (CSV, LOAD CSV)

With Browser and Desktop set up, this lesson covers actually getting data in. Neo4j has two
real, distinct paths for bulk-loading CSV data, and choosing between them comes down to
one question: is this an incremental load into a database that's already running, or a
one-time initial load of a very large dataset before the database has meaningful traffic.

## What you'll learn

- The Cypher `LOAD CSV` command for importing CSV data into a running database
- The `neo4j-admin import` tool for very large initial bulk loads
- Why the two tools solve different problems and aren't interchangeable

## LOAD CSV: importing into a running database

`LOAD CSV` is a **Cypher clause**, run like any other query, that reads a CSV file row by
row and lets you use each row's values to create nodes and relationships:

```cypher
LOAD CSV WITH HEADERS FROM 'file:///customers.csv' AS row
MERGE (c:Customer {customerId: row.customerId})
SET c.name = row.name, c.email = row.email
```

`WITH HEADERS` makes each row accessible by column name (`row.customerId`) instead of
position. Using **`MERGE`** instead of `CREATE` is the standard practice for imports — it
creates the node only if a matching one doesn't already exist by the given key, making the
import safely re-runnable instead of duplicating data on a second run.

For genuinely large files, `LOAD CSV` should be combined with **`CALL { ... } IN
TRANSACTIONS`**, which batches the work into smaller transactions instead of one enormous
one that can exhaust memory:

```cypher
LOAD CSV WITH HEADERS FROM 'file:///orders.csv' AS row
CALL {
  WITH row
  MATCH (c:Customer {customerId: row.customerId})
  CREATE (o:Order {orderId: row.orderId, total: toFloat(row.total)})
  CREATE (c)-[:PLACED]->(o)
} IN TRANSACTIONS OF 1000 ROWS
```

CSV files referenced this way are read from Neo4j's configured `import` directory (or a
remote URL) — `file:///` paths resolve relative to that directory for security reasons, not
an arbitrary local path.

## neo4j-admin import: the bulk loader

For an **initial load of a very large dataset** — millions of rows, before the database is
live — `neo4j-admin database import` is the right tool instead. It's a separate
command-line utility, run while the target database is offline, that builds the store
files directly rather than executing transactional Cypher writes, making it dramatically
faster for a first load than running `LOAD CSV` row by row.

```bash
neo4j-admin database import full neo4j \
  --nodes=Customer=customers_header.csv,customers.csv \
  --relationships=PLACED=orders_header.csv,orders.csv
```

It requires the CSV files to already be pre-shaped into Neo4j's expected node/relationship
format (typically a small header file describing columns, paired with the data file), and
it's a **one-time initial load** tool — it doesn't support incremental updates into a
database that already has data and is already serving queries.

## Choosing between them

| Scenario | Tool |
|---|---|
| Database already running, ongoing or incremental loads | `LOAD CSV` (in Cypher, ideally with `IN TRANSACTIONS`) |
| One-time initial load of a very large dataset, database offline | `neo4j-admin database import` |
| Small to medium dataset, learning, or a course lab | `LOAD CSV` |

## Key terms

| Term | Meaning |
|---|---|
| LOAD CSV | Cypher clause that reads a CSV file row by row to create nodes/relationships in a running database |
| MERGE | Cypher operation that creates data only if it doesn't already exist by a given key, making imports safely re-runnable |
| CALL { ... } IN TRANSACTIONS | Batches a large LOAD CSV import into smaller transactions to avoid exhausting memory |
| neo4j-admin database import | Offline, high-throughput bulk import tool for a very large initial dataset load |

## Check yourself

A team needs to load 200 million rows into a brand-new, not-yet-live Neo4j database for the
first time. Which import tool should they use, and why is it a better fit than the
alternative?
