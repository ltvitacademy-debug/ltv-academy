# Script — SCD Type 2 in dbt

## Segment 1 (title)

Lesson 24 already covered how a snapshot captures history. This lesson is about using that history correctly — starting with the mistake that ruins it.

## Segment 2 (code: the wrong join)

Join a fact table straight to a snapshot on customer_id alone, with no effective-dating condition, and every order fans out to match every historical version of that customer. Three captured versions means every order gets tripled.

## Segment 3 (code: the as-of join)

The fix adds the effective-dating condition — match the version whose valid window actually contains the order's date. Now an order from March, before a June region change, still reports against the March region — the value that was actually true when the sale happened.

## Segment 4 (code: current-only view)

Most models don't need history at all — they need today's value, same as any ordinary dimension. Build one small model filtering to dbt_valid_to is null, and every other model joins to that instead of repeating the filter everywhere.

## Segment 5 (outro)

Next lesson: Data Quality Patterns in dbt — pulling Chapter 4's testing concepts into a real strategy.
