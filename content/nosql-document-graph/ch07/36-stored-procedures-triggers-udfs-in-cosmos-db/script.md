# Script — Stored Procedures, Triggers & UDFs in Cosmos DB

## Segment 1 (title)

T-SQL stored procedures, triggers, and scalar functions are familiar territory. Cosmos DB has direct equivalents — but written in JavaScript and executed inside the database engine, with a real constraint that has no clean T-SQL analog: transactional scope confined to a single logical partition.

## Segment 2 (code: stored procedures)

A Cosmos DB stored procedure is a JavaScript function registered against a specific container. It can perform multiple reads and writes and have them succeed or fail together — but only within a single logical partition. There's no cross-partition transaction.

## Segment 3 (steps: triggers aren't automatic)

T-SQL triggers fire automatically on a matching DML statement. Cosmos DB triggers don't — a pre-trigger or post-trigger must be explicitly named on the request that invokes it. Nothing fires the way an AFTER INSERT trigger does in SQL Server.

## Segment 4 (code: UDFs)

A user-defined function extends the query language, called with a udf. prefix inside a SELECT — playing the same role as a T-SQL scalar function used in a SELECT list, computed per document.

## Segment 5 (outro)

Next up: Change Feed, an ordered, persistent log of every change to a container.
