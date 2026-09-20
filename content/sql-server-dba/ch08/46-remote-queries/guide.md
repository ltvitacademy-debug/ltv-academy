# Remote Queries

Lesson 45 set up the linked server itself. This lesson covers the two ways to actually
query through it — **four-part naming** and **`OPENQUERY`** — and, more importantly,
when each one is the right choice.

## What you'll learn

- Four-part naming syntax: `server.database.schema.object`
- `OPENQUERY` syntax and how it differs in execution
- The real performance tradeoff: where the query actually runs

## Four-part names

Once a linked server exists, T-SQL can reference a remote object almost like a local
one, just with the server name prefixed:

```sql
SELECT o.OrderID, o.OrderDate, c.CompanyName
FROM SQLSRV02.SalesDB.dbo.Orders AS o
JOIN SQLSRV02.SalesDB.dbo.Customers AS c
    ON c.CustomerID = o.CustomerID
WHERE o.OrderDate >= '2026-01-01';
```

The four parts are `server.database.schema.object` — mirroring the familiar
`database.schema.object` three-part local naming, just with the linked server name
added in front. Syntactically, this is the more natural, T-SQL-native way to reach a
remote table, and it lets the local query optimizer see and reason about the remote
object's structure through the linked server metadata.

## OPENQUERY

`OPENQUERY` instead sends a query as a literal string to be executed **entirely on the
remote server**, and only the result set comes back:

```sql
SELECT *
FROM OPENQUERY(SQLSRV02, 'SELECT OrderID, OrderDate, CustomerID
                          FROM SalesDB.dbo.Orders
                          WHERE OrderDate >= ''2026-01-01''');
```

The query text inside the string is passed through as-is and executed by the remote
server using its own optimizer, with the remote server's own understanding of its
indexes and statistics.

## The real performance tradeoff

With a four-part name, the local query optimizer decides how much work happens
remotely versus locally — and it doesn't always push predicates and joins down
efficiently. A four-part name join, especially with a `WHERE` clause that could have
filtered heavily on the remote side, can end up pulling far more rows across the
network than necessary before filtering locally.

`OPENQUERY` **pushes the whole query to the remote server** — the remote server's
optimizer plans and executes it using its own indexes and statistics, and only the
already-filtered, already-joined result set crosses the network. For a query that
needs significant filtering, aggregation, or joining that should happen on the remote
side, `OPENQUERY` is very often the faster, lower-network-traffic choice — at the cost
of losing some of the four-part name's syntactic convenience, since the inner query is
just a string SQL Server doesn't parse or validate against local metadata.

There's no universal winner: a simple lookup of a handful of rows by key is often fine,
and more readable, as a four-part name. A query doing real filtering or aggregation
against a large remote table is the case where `OPENQUERY`'s remote-side execution
usually pays off.

## Key terms

| Term | Meaning |
|---|---|
| Four-part name | `server.database.schema.object` — references a remote object almost like a local one |
| `OPENQUERY` | Sends a literal query string to execute entirely on the remote server |
| Predicate pushdown | Whether filtering happens on the remote side (efficient) or after data crosses the network (inefficient) |

## Check yourself

A report joins a local table against a large remote table, filtering the remote side
down to a handful of rows with a `WHERE` clause. Which approach — four-part naming or
`OPENQUERY` — is more likely to perform well, and why?
