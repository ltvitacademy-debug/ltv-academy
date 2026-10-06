# Formula Fields for Logic

**Chapter 3 · Business Logic · Lesson 15 of 24**

A formula field is a read-only field that calculates its own value from other fields, every time it's viewed. It uses the same formula editor as a validation rule — same functions, same syntax — but instead of returning `TRUE`/`FALSE` to block a save, it returns a value to display: a number, a date, a checkbox, a block of text.

## What you'll learn

- How a formula field differs from a validation rule and from a stored field
- Return types and the functions that work across them
- Cross-object formulas and how far they can reach
- Where formula fields are strong, and where they genuinely aren't

## Not stored, always current

A formula field's value isn't written to the database. It's computed at the moment a record is viewed, reported on, or queried — which means it's always current, but it also means it can't be edited directly, can't have its own field history tracking (there's nothing to track; it was never "changed," it was recalculated), and can't be the target of a Data Loader import.

## Building one

From **Object Manager → Fields & Relationships → New**, choose **Formula** as the field type, then pick a **return type**: Checkbox, Currency, Date, Date/Time, Number, Percent, Text. The return type determines which functions and nesting are even legal — you can't return `"Yes"` from a formula typed as Number without wrapping it, and mismatched types are the single most common error new builders hit.

## Common patterns

```
IF( Amount__c > 10000, "High Value", "Standard" )

CASE( Priority__c,
  "High", 1,
  "Medium", 2,
  "Low", 3,
  0 )

BLANKVALUE( Discount__c, 0 ) + Amount__c
```

`IF` handles two outcomes; `CASE` handles several without nested `IF`s. `BLANKVALUE()` substitutes a default when a field is empty, which matters because Salesforce's math functions can return an error — not zero — when they hit a null. `TEXT()` converts a picklist or number to a string for concatenation; `VALUE()` does the reverse.

## Reaching across objects

A formula field can reference fields on a related object through dot notation: `Account.Industry`, or further, `Account.Owner.Name`. This works across lookup *and* master-detail relationships, up to 10 relationships deep for most editions, and it's read-only in both directions — the formula only ever reads the related record, never writes to it. This is the main way a Platform App Builder surfaces parent data on a child record without duplicating it.

## Where formula fields are strong, and where they aren't

Strong: live calculated values (age-in-days, margin, full name concatenation), conditional display text, flags used in list view filters and report criteria, and reducing duplicate data by pulling from a related record instead of copying it. Not a fit: anything that needs to be *stored and preserved* at a point in time (a formula recalculates, so it can't "freeze" a value the way a workflow field update or Flow assignment can), anything users should be able to type over manually, and performance-sensitive filters on very long cross-object chains, which can be slower than a stored value.

## SQL mapping

A formula field is a **computed/generated column**: `GENERATED ALWAYS AS (amount * 0.1) STORED` or its virtual equivalent — calculated from other columns, never written directly, and recalculated whenever read.

## Recap

A formula field calculates a value from other fields using the same editor as a validation rule, but it displays rather than blocks. It isn't stored, so it's always current but never directly editable or trackable, and it can reach across relationships to pull related data read-only. Next, the tool that *does* store an aggregated value from child records: the roll-up summary field.

## Check yourself

You need a Text field on Contact that shows "VIP" when the related Account's Annual Revenue is over $1,000,000, and "Standard" otherwise. Name the return type you'd choose and sketch the formula.
