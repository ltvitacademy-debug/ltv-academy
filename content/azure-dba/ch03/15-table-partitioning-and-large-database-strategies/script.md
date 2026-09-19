# Script — Table Partitioning & Large Database Strategies

## Segment 1 (title)

This is not the PARTITION BY from T-SQL Development's window functions lesson. Table partitioning is a physical storage decision -- splitting one table's data across pieces based on a column's value, almost always a date.

## Segment 2 (code: partition function, scheme, and table)

A partition function defines where the boundaries fall. A partition scheme maps each of those ranges onto a filegroup. The table is built on the scheme, naming the column that decides which partition each row lands in.

## Segment 3 (code: rebuild one partition)

Instead of rebuilding every index on a five-hundred-million-row table, you rebuild only the partition that fragmented -- usually the newest one. Old, cold partitions stay completely untouched.

## Segment 4 (steps: the two real payoffs)

Maintenance is the main driver -- targeting one partition instead of the whole table. Query performance is a bonus: if a query filters on the partitioning column, the optimizer can eliminate partitions it knows can't match.

## Segment 5 (outro)

One giant table becomes named, independently maintainable pieces. Next up: data compression and storage optimization -- trading CPU for I/O on those same large tables.
