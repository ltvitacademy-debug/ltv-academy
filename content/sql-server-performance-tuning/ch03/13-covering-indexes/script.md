# Script — Covering Indexes

## Segment 1 (title)

Last lesson introduced the Key Lookup. This lesson names the fix: a covering index. We'll look at what makes an index covering, how to spot the difference in a plan, and the tradeoff it always makes.

## Segment 2 (code: covering vs. not)

An index covers a query when every column that query references — select list, where clause, joins, order by, all of it — is available directly from the index. Add TotalDue as an included column and the index that used to trigger a Key Lookup on every row now answers the whole query by itself.

## Segment 3 (code: signature in a plan)

The non-covering plan shows an Index Seek feeding a Key Lookup through a Nested Loops join — one lookup per matching row, which adds up fast on anything but a tiny result set. The covering version's plan is just a single Index Seek. Three operators collapsing into one is the visible signature of covering.

## Segment 4 (steps: the tradeoff)

Covering indexes aren't free. Every included column widens the index — more disk space, more write cost on every insert, update, and delete, slower maintenance. The right call is query-driven: cover the queries that run constantly and matter, not a report that runs once a month.

## Segment 5 (outro)

Covering eliminates the Key Lookup, but widening the key itself has costs too. Next up: included columns — how to widen an index without widening its key.
