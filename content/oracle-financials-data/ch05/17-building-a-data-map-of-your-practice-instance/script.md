# Script — Building a Data Map of Your Practice Instance

## Segment 1 (title)

You now know a genuinely large slice of the Oracle Fusion Financials data model. This lesson is about turning that into something durable: a personal map of your own practice instance, built and refined as you go, instead of relying on memory alone.

## Segment 2 (steps)

It's tempting to try to memorize "all the AP tables" as an abstract exercise. It rarely sticks. A better approach starts from a real business question — which suppliers have invoices open longer than thirty days — because it forces you to identify a driving table and trace outward only as far as the question needs.

## Segment 3 (steps)

Here's a repeatable process. Pick one module at a time. Identify the four to six core tables for its main transaction. Trace the primary and foreign keys between them, confirming each relationship against the documented descriptions, not guesses. Note the key columns your actual question needs. And write it down somewhere you'll look again.

## Segment 4 (steps)

Keep your notes short: table name, primary key, one line on what a row represents, and the foreign keys that matter for your question. Resist copying every column — that's what the documentation itself is for. Your map is the "why" and "how these connect" layer on top of it, not a duplicate.

## Segment 5 (outro)

One more check: if you've worked through Oracle Financial Reporting, OTBI subject areas are built on views over these same tables. How a subject area groups its fields is a useful sanity check on a map you built by hand. Up next, the final lesson: data quality and the common problems you'll actually run into.
