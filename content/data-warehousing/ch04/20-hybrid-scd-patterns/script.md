# Script — Hybrid SCD Patterns

## Segment 1 (title)

Everything so far in this chapter has treated Type 0, 1, 2, and 3 as separate patterns. In practice, a single dimension table almost always mixes them — different SCD types for different columns, on the very same table.

## Segment 2 (steps: one dimension, several rules)

Think of a Customer dimension. A typo fix to an email address is a Type 1 overwrite — nobody needs the wrong value preserved. A change to the customer's segment is a Type 2 version — revenue-by-segment rollups need to reflect the segment as it was at the time of each order. And the customer's first purchase date is Type 0, frozen forever. Same table, three different rules, decided attribute by attribute.

## Segment 3 (steps: the decision per attribute)

The question that decides it: does any report need this value exactly as it was at the time a related fact occurred? If it's just a correction with no analytical impact, that's Type 1. If it materially drives historical rollups, that's Type 2. Microsoft's own guidance says this directly — a dimension can support both Type 1 and Type 2 changes at once.

## Segment 4 (outro)

That's the core toolkit for tracking change in a dimension. Chapter 5 moves on to the staging layer — where all this ETL logic actually gets built.
