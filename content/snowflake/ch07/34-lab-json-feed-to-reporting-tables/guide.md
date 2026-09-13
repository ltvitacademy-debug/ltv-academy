# Lesson 34 — Lab: Turning a Raw JSON Feed Into Reporting Tables

**Chapter 7 · Semi-Structured Data · Lesson 34 of 60**

## What you'll learn

- How to chain everything from this chapter — `VARIANT`, colon
  notation, views, and `FLATTEN` — into one real pipeline
- The shape a raw JSON feed takes on its way to becoming a reporting
  table: **land it raw, then reshape it in layers, never in one step**
- How to sanity-check each layer before building the next one on top
  of it

## The pipeline, end to end

Every JSON-to-reporting pipeline in Snowflake follows the same shape,
whether it's SEC filings, application event logs, or an API feed:

1. **Land it raw.** `COPY INTO` a table with a single `VARIANT`
   column. Don't reshape anything yet — just get the JSON in,
   untouched (Lesson 31).
2. **Query into it.** Colon notation (`v:field::type`) pulls out
   scalar fields; `LATERAL FLATTEN` pulls array fields apart into rows
   (Lessons 32–33).
3. **Wrap it in a view.** Once the colon-notation query works, save it
   as a view so nobody downstream has to think about `VARIANT` again.
4. **Join and report.** Query the view(s) like any other tables —
   joins, aggregations, `CASE` logic — exactly like the SQL you
   already know from earlier chapters.

Here's that fourth step, worked all the way through on a real SEC
filings feed: joining two views built over raw JSON, reaching into a
nested `metadata` field with colon notation, and landing on a clean,
report-shaped result:

![Snowsight worksheet showing a CTE-based query joining two views built over raw JSON — using colon notation into a nested metadata field — with the result: a clean table of quarterly net sales by product for one company.](/courses/snowflake/ch07/34-lab-json-feed-to-reporting-tables/sec-filings-reporting-query.png)
*Raw JSON in, a reporting table out — every step between is either colon notation, a view, or a normal JOIN.*
Source: [Snowflake Quickstarts — Getting Started with Snowflake](https://quickstarts.snowflake.com/guide/getting_started_with_snowflake/index.html)

Notice what's *not* special about that final query: no `VARIANT`, no
colon notation, no `FLATTEN`. All of that was resolved one layer
earlier, in the views. The reporting query is just a `JOIN` and a
`CASE` statement — the same tools from Chapters 2 and 6.

## Why layers, not one giant query

It's tempting to write one enormous query that goes straight from
`VARIANT` to final report. Resist it. Layering — raw table, then
views, then reporting query — means:

- You can verify each stage independently (does the raw load have the
  right row count? does the view return sane typed columns?) instead
  of debugging one 80-line query when something's off.
- The expensive part (parsing JSON structure) happens once, in the
  view, not re-evaluated by every query that reports off of it.
- It matches exactly the staging → warehouse → reporting layering from
  Lesson 30 — semi-structured data isn't a special case, it's the same
  discipline applied to JSON instead of CSV.

## Key terms

| Term | Meaning |
|---|---|
| Land raw | Loading JSON into a VARIANT column untouched, before any reshaping |
| Layering | Raw table → view (colon notation/FLATTEN) → reporting query, each stage independently checkable |
| Report-shaped | A result with plain typed columns, ready for a BI tool or a business question — no VARIANT visible |

## Lab

1. Pick (or reuse) a JSON dataset with at least one nested field and
   one array field — SEC filings, sample orders, or any small JSON
   file you can stage.
2. **Land it**: `CREATE TABLE ... (v VARIANT)` and `COPY INTO` it raw.
3. **Query it**: write one colon-notation `SELECT` for the scalar
   fields, and one `LATERAL FLATTEN` query for the array field.
4. **View it**: wrap each into `CREATE OR REPLACE VIEW`.
5. **Report on it**: `JOIN` your views together (or aggregate one of
   them) into a final query whose result has plain typed columns —
   no `VARIANT`, no colon notation — that answers one real question
   about your dataset.
6. Confirm at each step: row counts make sense, types are correct,
   and the final result would be usable in a BI tool without any
   further transformation.

## Check yourself

You're ready for Chapter 8 when you've taken one real JSON feed all
the way from raw `VARIANT` load to a report-shaped result yourself,
and you can explain why each layer (raw → view → report) exists
instead of writing it as one query.
