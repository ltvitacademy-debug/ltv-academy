# Script — The Cosmos DB SQL Query Language

## Segment 1 (title)

Chapter Six covered how data lands in a container. This lesson covers how you get it back out. The Core SQL API's query language looks immediately familiar — SELECT, FROM, WHERE, ORDER BY — but underneath, the engine is walking JSON documents, not scanning fixed-width rows.

## Segment 2 (code: familiar syntax, different target)

There's no table named c — it's a conventional alias for every item in the container. You reach into nested structure with dot paths, like c.address.city, instead of joining to a separate table. SELECT VALUE returns bare values instead of wrapping each result in a JSON object.

## Segment 3 (code: optional properties & array unwinding)

Because documents aren't validated against a schema, IS_DEFINED checks whether a property exists before you rely on it. JOIN here isn't a relational join — it's an intra-document join, unwinding an array property inside a single document into multiple result rows.

## Segment 4 (steps: what a query costs)

A query that filters on the partition key gets routed to one physical partition — cheap and targeted. A query with no partition key filter is a cross-partition query: fanned out across every physical partition, gathered, and merged, costing more RUs as the container grows.

## Segment 5 (outro)

Cosmos DB's server-side programming model goes further than querying. Next up: stored procedures, triggers, and user-defined functions — written in JavaScript, executed inside the database engine itself.
