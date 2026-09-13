# Script — SCD Type 2 in Snowflake

## Segment 1 (title)

SCD Type 2 keeps every version of a dimension row instead of overwriting it. When an attribute changes, the old row is closed out with an expiry date, and a brand-new row is inserted with its own effective date. Facts recorded before the change still join to the old version.

## Segment 2 (code: table shape with effective/expiry/is_current)

The natural key can now appear in multiple rows, one per historical version, while the surrogate key is unique per version, not per customer. That's why a plain HASH of the natural key alone isn't enough here — it would collide across every version of the same customer.

## Segment 3 (steps: why one MERGE can't do it)

SCD1's MERGE worked in one statement because update-in-place-or-insert is exactly what MERGE is built for. SCD2 needs a third behavior — closing out an old row while also inserting a new one for the same source row — so real Snowflake ELT code splits this into two statements.

## Segment 4 (code: step 1, UPDATE to close out changed rows)

Step one: an UPDATE that closes out rows whose tracked attributes changed, setting the expiry date and flipping is_current to false. This has to run before anything else touches the dimension this run.

## Segment 5 (code: step 2, INSERT new versions)

Step two: an INSERT for brand-new customers, and for customers whose current row step one just closed out — the anti-join here only works correctly because is_current was already updated.

## Segment 6 (outro)

Next lesson: staging, warehouse, and reporting layers — the three-schema convention that ties this whole chapter and the last one together.
