# Script — Importing Data into Neo4j (CSV, LOAD CSV)

## Segment 1 (title)

With Browser and Desktop set up, this lesson covers actually getting data in. Neo4j has two real, distinct paths for bulk-loading CSV — which one you use comes down to whether this is an incremental load into a running database, or a one-time initial load of a very large dataset.

## Segment 2 (code: LOAD CSV basics)

LOAD CSV is a Cypher clause that reads a file row by row. WITH HEADERS lets you reference columns by name, and using MERGE instead of CREATE means the import only creates a node if a matching one doesn't already exist by that key — which makes it safely re-runnable instead of duplicating data.

## Segment 3 (code: batching large loads)

For genuinely large files, wrap the work in CALL block IN TRANSACTIONS, which batches it into smaller transactions instead of one enormous one that can exhaust memory. This is the standard pattern for any LOAD CSV import beyond a small file.

## Segment 4 (code: neo4j-admin import)

For an initial load of millions of rows before the database is live, neo4j-admin database import is the right tool instead — a separate command-line utility that builds store files directly rather than running transactional writes, dramatically faster for a first load, but strictly a one-time, offline tool, not for incremental updates.

## Segment 5 (outro)

Now that data can actually get in, the real question is how it should be shaped once it's there. Next up: graph data modeling fundamentals.
