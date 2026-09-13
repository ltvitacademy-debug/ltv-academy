# Script — SCD Type 1 in Snowflake

## Segment 1 (title)

SCD Type 1 means when a source attribute changes, you overwrite the old value in place. No history is kept — the dimension row always reflects the current state only. The simplest SCD strategy, for when nobody needs to know what the value used to be.

## Segment 2 (code: MERGE for SCD1)

The mechanics are the same MERGE you already know from T-SQL — match on the natural key, update the row in place if it exists, insert it with a HASH-derived surrogate key if it doesn't.

## Segment 3 (steps: no OUTPUT clause note)

One syntax note: if you've used T-SQL's MERGE with an OUTPUT clause to capture what changed, Snowflake's MERGE has no OUTPUT clause. Snowsight shows rows-inserted and rows-updated counts after the statement runs, but there's no way to stream the changed rows out directly.

## Segment 4 (steps: why HASH keys fit SCD1)

HASH-based keys pair naturally with SCD1, because SCD1 never needs to preserve multiple versions of a row — the key only ever has to identify the customer, not the customer as of some particular version. SCD Type 2 is where that stops being enough.

## Segment 5 (outro)

Next lesson: SCD Type 2 in Snowflake — preserving history with effective and expiry dating.
