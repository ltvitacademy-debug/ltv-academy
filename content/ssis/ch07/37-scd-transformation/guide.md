# Lesson 37 — The Slowly Changing Dimension Transformation

**Chapter 7 · Advanced SSIS Patterns · Lesson 37 of 49**

## What you'll learn

- What a "slowly changing dimension" is, and why dimension tables need
  special handling that fact tables don't
- Fixed, Changing, and Historical attribute types — the three ways the
  SCD Transformation can react to a column's value changing
- How the **Slowly Changing Dimension Wizard** walks you through
  configuring all of that, and what data flow it builds for you
- Inferred members, and why they exist

## Why dimensions need special handling

A **slowly changing dimension** is a dimension table where attributes
change over time, just not very often — a customer moves to a new city,
a product gets reclassified into a different category. The question a
data warehouse has to answer is: when that happens, do you *overwrite*
the old value, or do you *keep a history* of what it used to be?

That answer differs by column, and it's exactly what the
**Slowly Changing Dimension Transformation** is built to handle. Rather
than writing the insert/update logic yourself with a Lookup and a
Conditional Split (the general pattern from Lesson 36), this
transformation is purpose-built for dimension tables and comes with a
wizard that generates the whole data flow for you.

## The three attribute types

When you run the Slowly Changing Dimension Wizard, you classify each
dimension column into one of three change types:

- **Fixed attribute** — the value should never change once set (for
  example, a customer's original signup date). If an incoming row tries
  to change it, the wizard can flag it as an error.
- **Changing attribute** — overwrite the old value with the new one, no
  history kept. This is the classic "Type 1" SCD behavior — a corrected
  spelling of a customer's name, for instance.
- **Historical attribute** — keep the old value in an expired record and
  insert a new record with the new value. This is "Type 2" — you can
  still report on what a customer's address *used to be* at any point in
  time.

## What the wizard builds for you

After you answer its questions — pick the dimension table, map the
business key, classify each column, and configure how historical rows
get marked as current vs. expired — the wizard generates a complete data
flow of connected components:

![The Slowly Changing Dimension Transformation's outputs feeding OLE DB Command, Derived Column, and Union All components, with an OLE DB Source feeding in and an OLE DB Destination at the end.](/courses/ssis/ch07/37-scd-transformation/scd-wizard-data-flow.gif)
*The full data flow the SCD Wizard generates once fixed, changing, and historical attributes, plus inferred members, are all configured.*

Notice what's actually there: the **Slowly Changing Dimension**
transformation sits in the middle with several outputs, each one feeding
a different downstream path — a **Changing Attribute Updates Output** and
an **Inferred Member Updates Output** each go to their own `OLE DB
Command` (an in-place update), a **Historical Attribute Inserts Output**
runs through a `Derived Column` to stamp expiration values before its own
`OLE DB Command`, and both that path and the plain **New Output** for
brand-new dimension rows funnel through a `Union All` and one shared
`OLE DB Destination`. You never wired a single one of those connections
by hand — the wizard did it based on how you classified your columns.

## Inferred members

Sometimes a fact table row arrives referencing a dimension key that
doesn't exist yet — a sale for a customer your CRM hasn't synced yet. The
wizard can generate an **inferred member**: a minimal placeholder record
in the dimension table (just the key, everything else null or a default)
so the fact row has something to point to. When the real customer data
eventually arrives, that placeholder gets updated in place through the
Inferred Member Updates Output you saw in the diagram above.

## Key terms

| Term | Meaning |
|---|---|
| Slowly changing dimension | A dimension table whose attribute values change occasionally, not on every load |
| Fixed attribute | A column whose value should never change; changes can be flagged as errors |
| Changing attribute | Type 1 behavior — overwrite the old value, keep no history |
| Historical attribute | Type 2 behavior — keep the old value in an expired record, insert a new current one |
| Inferred member | A minimal placeholder dimension record created when a fact row references a key that doesn't exist yet |

## Lab

1. In SSMS, look at `DimCustomer` in `AdventureWorksDW2014`:
   ```sql
   SELECT CustomerKey, GeographyKey, EnglishEducation, StartDate, EndDate, Status
   FROM dbo.DimCustomer;
   ```
   `StartDate`/`EndDate`/`Status` are exactly the kind of columns a
   Historical attribute configuration would generate and maintain.
2. For `DimCustomer`, decide which change type you'd assign to
   `EnglishEducation` (changing) versus a column you'd want tracked with
   full history if this dimension were rebuilt from scratch with the
   wizard, and explain why.
3. Sketch the data flow shape from the screenshot above from memory —
   which output feeds which component — before moving on to Lesson 38.

## Check yourself

You're ready for Lesson 38 when you can explain, without looking: the
difference between a Changing and a Historical attribute, and why an
inferred member exists at all.
