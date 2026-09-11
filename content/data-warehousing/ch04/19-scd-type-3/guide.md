# Lesson 19 — SCD Type 3

**Chapter 4 · Slowly Changing Dimensions · Lesson 19 of 39**

## What you'll learn

- What SCD Type 3 does: track *limited* history using an extra
  column, instead of an extra row
- How it differs mechanically from both Type 1 and Type 2, in a
  real Microsoft dimensional modeling diagram
- Why Microsoft's own guidance says Type 3 "isn't commonly used" —
  and the narrow case where it's still genuinely useful
- Why you should default to asking "would Type 2 fit better?" before
  reaching for Type 3

## Limited history, no new row

**SCD Type 3** sits between Type 1 and Type 2. Like Type 1, it
doesn't insert a new row — the dimension member keeps the same
surrogate key, and there's still exactly one row per member. But
unlike Type 1, it doesn't throw the old value away either: it adds
one or more extra columns specifically to hold the **previous**
value, alongside the column that now holds the current one.

![Diagram showing a salesperson dimension row before and after a Type 3 change: the current sales region is overwritten, but the previous sales region and the date it ended are captured into two new columns on the same row.](/courses/data-warehousing/ch04/19-scd-type-3/slowly-changing-dimension-type-3.svg)
*The row keeps one prior value alongside the current one — no new row.*

In this real Microsoft example, salesperson Lynn Tsoflias moves from
sales region `4` to sales region `5`. There's still only one row for
Lynn — surrogate key unchanged — but that row now carries two new
columns: `PreviousSalesRegion_FK` (`4`, the value that used to be
current) and `PreviousSalesRegionEndDate` (`20240523`, when it
stopped being current). The current `SalesRegion_FK` column simply
becomes `5`.

## The SQL pattern

```sql
ALTER TABLE DimSalesperson
  ADD PreviousSalesRegionKey     INT  NULL,
      PreviousSalesRegionEndDate DATE NULL;

UPDATE DimSalesperson
SET    PreviousSalesRegionKey     = SalesRegionKey,
       PreviousSalesRegionEndDate = '2024-05-23',
       SalesRegionKey             = 5
WHERE  SalespersonKey = 296;
```

Notice the `UPDATE` captures the *current* value into the
`Previous*` column in the same statement that overwrites it with the
new one — the row never has two "current" values at once, only a
current one and a single prior one.

## Why Type 3 is limited, on purpose

The name "limited history" is precise, not casual. A Type 3 column
only ever holds **one** prior value. If the attribute changes again
— region `5` moves to region `7` next year — the *current*
implementation above would overwrite `PreviousSalesRegionKey` from
`4` to `5`, and the fact that the salesperson was ever in region `4`
at all is lost. Type 3 answers "what was this immediately before?"
It cannot answer "show me the full timeline of every value this
attribute ever had" — that's what Type 2 is for.

## Why Microsoft's own guidance is lukewarm on Type 3

Microsoft's dimensional modeling documentation is direct about
this: SCD Type 3 "isn't commonly used, in part due to the fact that
it's difficult to use in a semantic model," and it explicitly
recommends considering "whether an SCD type 2 approach would be a
better fit" before reaching for Type 3. Two real reasons for that
caution:

- **It doesn't scale to repeated changes.** Every additional change
  needs its own new column (or overwrites the one you have), which
  gets unwieldy fast.
- **Reporting tools handle it awkwardly.** A Type 2 dimension's
  history is queryable with ordinary filters and joins. A Type 3
  dimension's history lives sideways, in extra columns, which
  general-purpose reporting and semantic-model tooling isn't built
  to traverse the way it can traverse rows.

## When Type 3 is still the right call

Despite that caution, Type 3 earns its place in specific situations:
when a report genuinely only needs to compare **"current vs.
immediately previous"** directly on the same row — without an extra
join — and a full historical timeline would be overkill. A classic
example: "which customers changed their assigned sales rep in the
last reporting period, and who was it before?" is answerable in one
row with Type 3, where Type 2 would need a self-join across two
versions.

## Key terms

| Term | Meaning |
|---|---|
| SCD Type 3 | Track only the immediately previous value of an attribute, in an extra column on the same row |
| Previous-value column | The extra column(s) added specifically to hold the prior value and, often, when it changed |
| Limited history | The defining constraint of Type 3 — only one prior value is retained, not a full timeline |

## Lab

1. Sketch the `Previous*` columns you'd add to `DimCustomer` in
   AdventureWorksDW2014 to track only the customer's prior
   `MaritalStatus`, Type 3 style.
2. Explain, in your own words, what information is permanently lost
   under a Type 3 design if the tracked attribute changes a second
   time before anyone queries it.

## Check yourself

You're ready for Lesson 20 when you can explain, without looking:
how Type 3 differs mechanically from both Type 1 and Type 2, why
Microsoft's own guidance is cautious about it, and the one kind of
question it answers well that Type 2 answers only with extra work.
