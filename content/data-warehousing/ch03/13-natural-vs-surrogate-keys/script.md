# Script — Natural vs. Surrogate Keys

## Segment 1 (title)

We've talked about surrogate keys on their own. Now let's put natural keys and surrogate keys side by side, and settle exactly where each one belongs.

## Segment 2 (steps: natural vs surrogate)

A natural key is meaningful — it comes straight from the source system, like an EmployeeID or a ProductCode. A surrogate key is meaningless on purpose — warehouse-generated, and always the primary key. A well-designed dimension table keeps both: the natural key for traceability and for the ETL process to detect changes, and the surrogate key as the actual key everything else joins against.

## Segment 3 (steps: the date exception)

There's exactly one accepted exception to "surrogate keys are meaningless": the date dimension. Its surrogate key is conventionally stored as an integer in YYYYMMDD format — readable, and it sorts correctly with zero extra logic. Every other dimension in your warehouse should keep its surrogate key meaningless.

## Segment 4 (outro)

So far every dimension we've discussed has assumed you'd build a full dimension table for it. Next lesson, we look at a case where you deliberately don't.
