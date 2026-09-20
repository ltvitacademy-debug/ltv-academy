# Script — Remote Queries

## Segment 1 (title)

Lesson 45 set up the linked server itself. This lesson covers the two ways to actually query through it — four-part naming and OPENQUERY — and, more importantly, when each one is the right choice.

## Segment 2 (code: four-part naming)

A four-part name — server, database, schema, object — lets T-SQL reference a remote table almost like a local one. It's the more natural syntax, and it lets the local query optimizer reason about the remote object through the linked server's metadata.

## Segment 3 (code: OPENQUERY)

OPENQUERY instead sends a literal query string to be executed entirely on the remote server, using the remote server's own optimizer, indexes, and statistics. Only the resulting rows come back across the network.

## Segment 4 (steps: the real tradeoff)

A four-part name join doesn't always push filtering down efficiently, and can pull more rows across the network than necessary. OPENQUERY pushes the whole query remotely, so for heavy filtering or aggregation on a large remote table, it's very often the faster, lower-traffic choice.

## Segment 5 (outro)

Next up: connectivity troubleshooting — what to check when a client can't connect to SQL Server at all.
