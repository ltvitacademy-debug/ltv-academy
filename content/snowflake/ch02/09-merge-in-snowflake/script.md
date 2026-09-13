# Script — MERGE in Snowflake

## Segment 1 (title)

If you know T-SQL MERGE, Snowflake's version reads almost the same: MERGE INTO, USING, ON, WHEN MATCHED THEN UPDATE or DELETE, WHEN NOT MATCHED THEN INSERT. Snowflake also supports multiple WHEN MATCHED clauses with extra AND conditions, evaluated in order, exactly like T-SQL.

## Segment 2 (code: no OUTPUT clause)

The first real difference: T-SQL lets you capture affected rows inline with an OUTPUT clause. Snowflake's MERGE has no OUTPUT clause at all — for an audit trail, you query the target table's Time Travel history separately instead.

## Segment 3 (code: no WHEN NOT MATCHED BY SOURCE)

The second real difference: T-SQL supports WHEN NOT MATCHED BY SOURCE, deleting target rows that disappeared from the source, all inside one MERGE. Snowflake's WHEN NOT MATCHED only means in-source-not-in-target — deleting the other direction needs a separate DELETE statement.

## Segment 4 (steps: why it matters)

This matters because Chapter 5 builds ELT patterns almost entirely around MERGE. Knowing up front that OUTPUT and WHEN NOT MATCHED BY SOURCE aren't available means you won't go looking for them mid-pipeline later.

## Segment 5 (outro)

Next lesson: stored procedures and user-defined functions — Snowflake Scripting's SQL-based procs compared to T-SQL, plus a quick look at where JavaScript and Python UDFs fit in.
