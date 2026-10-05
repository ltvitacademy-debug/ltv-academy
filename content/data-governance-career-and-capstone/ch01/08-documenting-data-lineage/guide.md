# Lesson 8 — Documenting Data Lineage

**Chapter 1 · Capstone: LTV Global Data Governance Program · Lesson 8 of 35**

## What you'll learn

- How to trace one critical data element's full path from source
  system to executive dashboard
- A documented lineage map for `OrderTotal`, from Atlas to Summit to
  Power BI
- How to run an impact analysis: what breaks downstream if one step
  changes
- Why lineage for "Customer" has to stay incomplete until Lesson 9

**Reminder:** LTV Global, its systems, and the pipeline below are
fictional and illustrative, invented for this capstone.

## Tracing OrderTotal, step by step

Steward Sam Okonjo documents the full path `Orders.OrderTotal` takes
from the moment it's created to the moment an executive sees it:

1. **Atlas** — `dbo.Orders.OrderTotal` is calculated and written when
   an order completes (the Lesson 5 glossary definition).
2. **Nightly Atlas-to-Summit load** — a scheduled job extracts new and
   changed orders from Atlas and lands them in a Summit staging table,
   `stg_atlas_orders`, once every 24 hours.
3. **Summit curated layer** — a transformation step cleans and
   conforms the staged rows into `fact_Orders`, applying the Lesson
   7 quality rules as a filter before anything is marked "curated."
4. **Power BI** — the "Executive Revenue Dashboard" queries
   `fact_Orders` directly, refreshing each morning before the 9 AM
   leadership standup.

Documented this way, the lineage is four plain steps, each with a
named system and a named trigger (order completion, nightly schedule,
transformation, morning refresh) — not a vague "data flows into
reporting" statement.

## Running an impact analysis

Lineage only earns its keep when someone uses it before a change, not
after an incident. Hypothetical: Atlas's finance team proposes adding
a multi-currency conversion step directly inside `dbo.Orders.OrderTotal`
for the Singapore region. Walking the lineage map backward from the
dashboard tells Sam exactly who to warn:

- The nightly load (step 2) needs to know whether it's extracting a
  raw or converted value, or `stg_atlas_orders` silently mixes
  currencies.
- The curated transformation (step 3) needs new logic, or `fact_Orders`
  inherits the same mixing problem one layer downstream.
- The Executive Revenue Dashboard (step 4) needs a currency column
  added, or leadership sees a revenue number that's quietly wrong for
  one region — a worse version of the Lesson 1 incident, because this
  time it would be a silent financial misstatement, not a slow
  response to a request.

Dana Whitfield's program requires this walk-the-map step before any
change is approved for a documented CDE — the lineage map is what
makes "who do I need to tell" an answerable question instead of a
guess.

## Why Customer lineage stays incomplete for now

Sam deliberately does **not** attempt to document a clean lineage for
"Customer" in this lesson. With three unreconciled source copies
(Atlas, Beacon, Comet) and no declared authoritative source, any
lineage diagram drawn today would just formalize the confusion from
Lesson 1's incident. That gap is exactly what Lesson 9 resolves before
Customer lineage gets documented for real.

## Key terms

| Term | Meaning |
|---|---|
| Lineage | The documented, step-by-step path data takes from its source to where it's consumed |
| Impact analysis | Walking a lineage map to determine what breaks downstream before a change is made |
| Curated layer | A warehouse layer holding cleaned, quality-checked data, as opposed to raw staged data |

## Lab

Pick one metric or field you use regularly (a spreadsheet total, a
dashboard number, a report field) and document its lineage in the same
four-step style as `OrderTotal` above: source, movement/transformation,
storage, and consumption. Then run a one-paragraph impact analysis:
if the source changed tomorrow, name every downstream step that would
need to change with it.

## Check yourself

- Name the four steps in `OrderTotal`'s documented lineage, in order.
- In the currency-conversion impact analysis, which three downstream
  steps would break if nobody was told?
- Why does this lesson deliberately avoid documenting Customer lineage
  yet?
