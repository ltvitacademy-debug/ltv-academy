# Lesson 16 — SCD Type 0

**Chapter 4 · Slowly Changing Dimensions · Lesson 16 of 39**

## What you'll learn

- What SCD Type 0 means, and why Microsoft's own dimensional
  modeling docs don't even list it as a "change type"
- Real attributes that behave this way on purpose: original signup
  date, date of birth, the credit score at loan origination
- Why deliberately freezing an attribute is a design decision, not
  an oversight
- How to actually enforce Type 0 in an ETL load, so a well-meaning
  future change to the pipeline can't quietly break it

## The dimension that refuses to change

Every other Slowly Changing Dimension type in this chapter answers
the question "how do we handle a change?" **SCD Type 0** answers a
different question: "what happens when this attribute must
*never* change, no matter what the source system says?"

Microsoft's own Fabric data warehouse documentation on managing
historical change only names three SCD types — Type 1, Type 2, and
Type 3. Type 0 is a term from Ralph Kimball's original dimensional
modeling vocabulary, and it doesn't get a heading of its own on
Microsoft Learn for a simple reason: it isn't really a "change
handling" pattern at all. It's the *absence* of one, applied
deliberately to a specific column.

## Real examples

- **`DateFirstPurchase`** on a customer dimension — the date a
  customer's very first order was placed. Later orders don't change
  when the *first* one happened.
- **`DateOfBirth`** — a person's birth date doesn't change, and any
  source-system correction to it is a data-quality fix, not a
  business event worth tracking as history.
- **`OriginalCreditScore`** on a loan dimension — the score at
  origination is a fixed fact about that loan for as long as the
  loan exists, even though the borrower's *current* credit score
  changes constantly.
- **`OriginalListPrice`** on a product dimension, kept alongside a
  `CurrentPrice` column that *does* update — the two coexist on
  purpose.

In every case, the value isn't "slowly changing" — it's frozen the
moment the row is first loaded, and it stays frozen for the life of
that dimension member.

## Why this needs to be a deliberate rule, not an accident

It's tempting to treat Type 0 as "we just never bothered writing an
UPDATE for this column." That's fragile. If a future ETL change adds
a generic "refresh all attributes from source" step, an
unprotected column gets silently overwritten and the original value
is gone for good — with no error, and often no one noticing until an
audit or a business question depends on it.

The fix is to make the rule explicit: the ETL load process should
document, and ideally enforce in code, that specific columns are
**write-once**. The cleanest way to do that is to leave the column
out of every `UPDATE` statement's `SET` list entirely, on every load,
forever — not just the first one you happen to write today.

```sql
-- Loaded once, at INSERT, and never touched again
INSERT INTO DimCustomer (CustomerKey, CustomerName, DateFirstPurchase)
VALUES (@key, @name, @today);

-- Every later load can update CustomerName (Type 1) —
-- but DateFirstPurchase is never in this column list
UPDATE DimCustomer
SET    CustomerName = @newName
WHERE  CustomerKey = @key;
```

## Type 0 vs. Type 1 — the distinction that matters

It's easy to confuse Type 0 with Type 1, because both end up with
exactly one row per dimension member and no history. The difference
is *intent*: Type 1 (Lesson 17) deliberately allows the value to be
overwritten when the source changes. Type 0 deliberately refuses to,
even if the source value changes. Knowing which one applies to a
given attribute is a modeling decision you make attribute-by-attribute
when you design the dimension — not something the ETL tooling decides
for you.

## Key terms

| Term | Meaning |
|---|---|
| SCD Type 0 | An attribute whose value is fixed at insert and is never updated, regardless of later source changes |
| Write-once column | A column deliberately excluded from every load's `UPDATE` logic |
| Original value | The value captured the first time a dimension member was loaded — by definition, permanent |

## Lab

1. In AdventureWorksDW2014, open `DimCustomer` and look for a column
   that behaves like a Type 0 attribute — a value that logically
   should never change once set (hint: look at date-based columns).
2. Write the `INSERT` statement you'd use to load a new
   `DimCustomer` row with a Type 0 `DateFirstPurchase` column, then
   write a *separate* `UPDATE` statement that changes the customer's
   email address without touching that column.

## Check yourself

You're ready for Lesson 17 when you can explain, without looking:
what makes SCD Type 0 different from simply forgetting to write an
UPDATE statement, and name two real attributes that should be
Type 0 by design.
