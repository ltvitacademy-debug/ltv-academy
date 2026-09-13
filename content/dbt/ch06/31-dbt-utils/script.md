# Script — dbt_utils: The Macros You'll Actually Reuse

## Segment 1 (title)

dbt-labs slash dbt_utils is the one package nearly every dbt project installs. These are the specific macros you'll actually reuse, by name, starting with a replacement for the HASH function you used by hand in Snowflake.

## Segment 2 (code: generate_surrogate_key)

generate_surrogate_key does the same job as Snowflake's HASH, but compiles to whatever hashing function the target warehouse actually supports — the same model works unchanged on Snowflake, BigQuery, or Postgres, and it handles nulls consistently across columns.

## Segment 3 (code: date_spine)

Reporting almost always needs a row per day even for days with zero orders — you can't group by your way to a row that doesn't exist. date_spine generates that calendar directly, no source table required, in one macro call.

## Segment 4 (steps: worth knowing by name)

Star selects all columns except the ones you list. Pivot turns distinct row values into columns — the same shape as last lesson's manual for-loop, generalized into one call. Union_relations unions tables with overlapping but not identical columns, filling missing ones with null.

## Segment 5 (code: union_relations)

Common when the same source system ships one table per region or per year — union_relations combines them into one, filling in null for any table missing a given column.

## Segment 6 (outro)

Next lesson: Version-Controlling a dbt Project — Chapter 7 starts tying everything so far to real Git and CI/CD.
