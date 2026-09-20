# Script — Migrating Relational Data into Cosmos DB

## Segment 1 (title)

This lesson closes out the Cosmos DB section on its most important warning: migrating from SQL Server into Cosmos DB is not a lift-and-shift. The tools to move data work fine. The mistake that sinks these projects happens before any tool runs.

## Segment 2 (steps: real tools)

The Azure Cosmos DB Data Migration Tool is free and open-source, good for smaller or exploratory moves, supporting SQL Server, JSON, CSV, and MongoDB as sources. Azure Data Factory is the production-grade choice for large-scale or ongoing migrations, with native Cosmos DB connectors and real scheduling and monitoring. Change feed matters too, but for keeping things in sync after migration, not the initial load.

## Segment 3 (code: the lift-and-shift mistake)

Migrate Customers, Orders, and OrderItems into three containers unchanged, and a query that used to be one SQL JOIN now needs multiple round trips to Cosmos DB stitched together in application code. Cosmos DB has no server-side JOIN across containers, and each of those round trips costs its own RUs — a cheap relational query can become RU-expensive at scale.

## Segment 4 (steps: redesign first)

Answer these before migrating: what's actually read together, which is a real candidate for embedding; what the new partition key should be, not just the old primary key; and what still genuinely needs referencing, like a product catalog shared across many orders. A relational schema is a starting point for analysis, not the target shape.

## Segment 5 (outro)

That closes the Cosmos DB section of this course. Next up, Chapter Ten and a new platform entirely: why graph databases exist, and how nodes, relationships, and properties actually work in Neo4j.
