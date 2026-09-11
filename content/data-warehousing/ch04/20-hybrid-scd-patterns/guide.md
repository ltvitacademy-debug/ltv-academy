# Lesson 20 — Hybrid SCD Patterns

**Chapter 4 · Slowly Changing Dimensions · Lesson 20 of 39**

## What you'll learn

- Why real dimension tables almost never use just one SCD type for
  every attribute
- A decision process for classifying each attribute on a dimension,
  one at a time
- A worked example: a Customer dimension using Types 0, 1, and 2
  together, attribute by attribute
- Why this hybrid approach is the norm in mature warehouses, not an
  exception

## One dimension, several rules

Everything in this chapter so far has treated SCD Type 0, 1, 2, and
3 as separate, distinct patterns. In practice, a single dimension
table almost always applies **different SCD types to different
columns**, based on each attribute's own history requirement.
Microsoft's own dimensional modeling guidance says this directly:
"it's possible that a dimension could support both SCD type 1 and
SCD type 2 changes" — and in real warehouses, that's closer to the
rule than the exception.

This isn't a new pattern to memorize — it's the previous four
lessons, applied attribute-by-attribute to the same table instead of
picking one type for the whole dimension.

## The question that decides it, per attribute

For every attribute on a dimension, ask: **does any report need
this value exactly as it was at the time a related fact occurred?**

- **No, and the change is a correction (a typo, a formatting fix)**
  → Type 1. Overwrite it; nobody needs the wrong value preserved.
- **No, and the value is fixed by definition (a signup date, a
  birth date)** → Type 0. Freeze it at insert; it was never meant to
  change.
- **Yes, and it materially affects historical rollups (a sales
  region, a customer segment, a price tier)** → Type 2. Version it,
  so past facts keep reporting against the value that was true then.
- **Only the immediately previous value, not a full timeline** →
  Type 3, sparingly, per Lesson 19's caution.

## A worked example: the Customer dimension

| Attribute | SCD type | Why |
|---|---|---|
| `DateFirstPurchase` | Type 0 | Fixed the moment it's recorded; never a real "change" |
| `EmailAddress`, `PhoneNumber` | Type 1 | Corrections and updates with no analytical need for the old value |
| `CustomerSegment` | Type 2 | "Revenue by segment, at the time of each order" needs the segment as it was *then*, not today |
| `MailingRegion` | Type 2 | Same reasoning — regional rollups must reflect where the customer actually was when each order shipped |
| `PreferredContactMethod` | Type 1 | Purely operational; no report depends on its history |

Notice this single table now carries the historical tracking
columns (`EffectiveDate`, `ExpirationDate`, `IsCurrentFlag`) needed
for its Type 2 columns, while its Type 1 columns are simply
overwritten on the *current* row whenever they change — including on
the current row of whichever `CustomerSegment` version happens to be
active. A change to `EmailAddress` doesn't create a new version; a
change to `CustomerSegment` does.

## What this means for the ETL process

A hybrid dimension means the load logic has to know, **column by
column**, which comparison branch to run:

1. Compare each incoming source row to the current dimension row.
2. For columns classified Type 1: if changed, `UPDATE` them on the
   current row directly.
3. For columns classified Type 2: if changed, close out the current
   row (`ExpirationDate`, `IsCurrentFlag = 0`) and `INSERT` a new
   version carrying the *unchanged* Type 1 and Type 0 columns forward
   alongside the new Type 2 value.
4. Columns classified Type 0 are never touched by step 2 or step 3,
   on any row, ever.

This is more ETL logic than a single-type dimension needs — but it's
exactly the right amount of complexity, because it matches the real
mix of history requirements a business actually has.

## Why hybrid is the norm, not the exception

Treating an entire dimension as pure Type 2 sounds simpler to reason
about, but it isn't actually simpler in practice: every trivial
correction — a fixed typo, a formatting cleanup — would spawn a new
versioned row, and the dimension would balloon with versions that
carry no real analytical meaning. Treating an entire dimension as
pure Type 1 is simpler still, but it silently discards history that
some attributes genuinely need. The hybrid approach is more upfront
design work, attribute by attribute, but it's what keeps a dimension
both historically accurate *and* manageable in size.

## Key terms

| Term | Meaning |
|---|---|
| Hybrid SCD dimension | A single dimension table applying different SCD types to different columns |
| Per-attribute classification | The design step of assigning an SCD type to each attribute individually, based on its own history requirement |

## Lab

1. In AdventureWorksDW2014, open `DimCustomer` and pick five
   attributes. For each one, classify it as Type 0, 1, 2, or 3 and
   write one sentence justifying the choice.
2. Sketch the historical tracking columns (`EffectiveDate`,
   `ExpirationDate`, `IsCurrentFlag`) that dimension would need to
   support whichever attributes you classified as Type 2.

## Check yourself

You're ready for Chapter 5 when you can explain, without looking:
why most real dimensions mix SCD types rather than using one type
for every column, and walk through classifying at least three
attributes on a dimension of your choosing.
