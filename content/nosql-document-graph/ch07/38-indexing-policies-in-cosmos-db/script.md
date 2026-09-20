# Script — Indexing Policies in Cosmos DB

## Segment 1 (title)

In SQL Server, an index is something you deliberately create. Cosmos DB inverts that default — every property on every item is indexed automatically the moment you write it, unless you tell the engine not to.

## Segment 2 (code: automatic indexing, everything by default)

The default indexing policy includes a single wildcard path, "slash star" — every property, nested objects and arrays included, indexed with range indexes that support equality, range, and ORDER BY. There's no "this column has no index" table scan the way there is in a relational database.

## Segment 3 (code: customizing paths to control RU cost)

Automatic indexing isn't free — every indexed property adds request unit cost to every write. You can flip the policy: exclude everything, then include only the specific paths you actually query against. Cheaper writes, less storage, at the cost of any excluded path falling back to a full scan.

## Segment 4 (outro)

Composite indexes handle multi-property ORDER BY the same way a multi-column index would in SQL Server. Next up: connecting real applications to Cosmos DB with the official SDKs.
