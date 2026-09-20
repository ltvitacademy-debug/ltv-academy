# Script — Reading MySQL EXPLAIN Plans

## Segment 1 (title)

EXPLAIN is MySQL's window into what the optimizer actually plans to do with a query — the tool that turns 'this query is slow' into a specific diagnosis. MySQL's EXPLAIN output looks different from a SQL Server execution plan, and its real columns are what make it useful.

## Segment 2 (code: running EXPLAIN)

EXPLAIN prefixes a SELECT and returns a table describing the execution plan instead of running the query, one row per table involved, showing how MySQL's optimizer intends to access each one.

## Segment 3 (code: the columns that matter)

The type column ranges from const or eq_ref at best down to ALL, a full table scan, at worst. The key column shows which index was actually used, or NULL if none was — often the single most informative column. Rows is the optimizer's estimated row count for that table.

## Segment 4 (steps: reading Extra)

Using filesort means MySQL needs an extra pass to sort results because no index covered the ORDER BY. Using temporary means a temporary table is needed, often for GROUP BY or DISTINCT. Using index is a good sign — the query is satisfied entirely from the index itself.

## Segment 5 (outro)

Reading type, key, rows, and Extra together turns a vague 'it's slow' into a specific fix. Next up: indexing strategies in MySQL, starting with InnoDB's distinctive clustered primary key and composite index column order.
