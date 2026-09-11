# Lesson 17 — SCD Type 1

**Chapter 4 · Slowly Changing Dimensions · Lesson 17 of 39**

## What you'll learn

- What SCD Type 1 does: overwrite the existing row, keep no history
- The exact update mechanics, straight from a real Microsoft
  dimensional modeling diagram
- When Type 1 is the right call — and the real consequence it has
  on historical rollups when it isn't
- Why Type 1 should be your default for most changing attributes

## The overwrite pattern

**SCD Type 1** is the simplest of the Slowly Changing Dimension
patterns: when an attribute changes in the source system, you
overwrite the existing dimension row in place. No new row is
inserted, no old value is preserved anywhere, and the surrogate key
doesn't change. As far as the warehouse is concerned, the member's
value has simply always been the new one.

![Diagram showing a salesperson dimension row before and after a Type 1 update, with the phone number changed from 555-1234 to 555-6789 in place.](/courses/data-warehousing/ch04/17-scd-type-1/slowly-changing-dimension-type-1.svg)
*One row is overwritten in place — the old phone number leaves no trace.*

In this real Microsoft-authored example, salesperson Rachel Valdez
(surrogate key `295`) has her phone number corrected from `555-1234`
to `555-6789`. The row's key doesn't change, no new row appears, and
the old number is gone the instant the update runs — that's Type 1,
completely.

## The update, in SQL

```sql
UPDATE d_Salesperson
SET    Phone = '555-6789'
WHERE  Salesperson_SK = 295;
```

That's the entire pattern. One `UPDATE` statement, targeting the
existing surrogate key, touching only the column(s) that changed.
Compare that to Lesson 18's Type 2 pattern, which needs an `UPDATE`
*and* an `INSERT` working together — Type 1's simplicity is exactly
why it should be your default choice unless an attribute specifically
needs history preserved.

## When Type 1 is the right choice

- **Corrections.** A misspelled last name, a mistyped email address,
  a data-entry error — none of these represent a real business event
  worth tracking. Overwriting them is correct, not lossy.
- **Attributes where history genuinely doesn't matter for
  analysis.** A customer's current phone number is useful for
  contacting them today; nobody analyzes "revenue by phone number
  as of the order date."
- **The default for most changing attributes.** Microsoft's own
  guidance is direct: Type 1 "should be used for most changing
  attributes." Reach for Type 2 or Type 3 deliberately, for
  attributes that specifically need it — don't reach for them by
  default.

## The real consequence: retroactive rollups

Type 1's simplicity has a real cost, and it's worth being precise
about it. Because the old value is gone, **every historical fact
that joins to this dimension member now reports using the new
value** — even facts that happened before the change.

Microsoft's own example makes this concrete: if a salesperson is
reassigned from one sales region to another using a Type 1 update,
a rollup of "historical sales by region" will now show *all* of that
salesperson's past sales under the *new* region — as if they'd always
been assigned there. For a phone number, that retroactive rewrite is
harmless. For an attribute that drives real historical reporting,
it's exactly the problem Type 2 exists to solve.

## Key terms

| Term | Meaning |
|---|---|
| SCD Type 1 | Overwrite the existing dimension row in place when an attribute changes; no history is kept |
| Overwrite | Updating a column's value directly, replacing the old value with no trace of it remaining |
| Retroactive rollup | The side effect where historical facts, joined to an overwritten dimension row, now reflect the new value as if it had always been true |

## Lab

1. In AdventureWorksDW2014, open `DimCustomer`. Pick an attribute
   you believe should be handled as Type 1 (e.g. `EmailAddress`) and
   write the `UPDATE` statement you'd run to correct one customer's
   value.
2. Explain, in your own words, why applying a Type 1 update to
   `DimEmployee.SalesTerritoryKey` would distort a "historical sales
   by territory" report — and what you'd do differently if that
   report needed to stay accurate.

## Check yourself

You're ready for Lesson 18 when you can explain, without looking:
the exact mechanics of a Type 1 update, one real reason it's the
right default for most attributes, and the retroactive-rollup risk
it carries for attributes that actually need history.
