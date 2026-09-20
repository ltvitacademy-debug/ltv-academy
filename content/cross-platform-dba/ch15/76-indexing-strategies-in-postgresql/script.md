# Script — Indexing Strategies in PostgreSQL

## Segment 1 (title)

SQL Server's indexing world is mostly clustered and nonclustered B-trees. PostgreSQL's
default index is also a B-tree, but its index ecosystem is genuinely richer, with
purpose-built types for data a B-tree structurally can't search well.

## Segment 2 (steps: three index types to know)

B-tree remains the default and the right call for equality, range comparisons, and
sorting. GIN indexes the individual elements inside a value, for full-text search and
JSONB. GiST handles overlap and containment, for ranges and geometric types.

## Segment 3 (code: GIN and GiST in practice)

A GIN index makes full-text search and JSONB containment queries fast, neither of which a
plain B-tree can serve well. A GiST index on a range type gives native, indexed overlap
queries — does this interval overlap that one — with no extra columns needed.

## Segment 4 (outro)

That range-overlap capability is genuinely something SQL Server's index model doesn't offer
out of the box. Next up: VACUUM, autovacuum, and table bloat — a real PostgreSQL concept
with no direct SQL Server equivalent.
