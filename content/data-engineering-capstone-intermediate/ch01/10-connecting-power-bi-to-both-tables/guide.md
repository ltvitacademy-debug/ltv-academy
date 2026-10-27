# Lesson 10 — Connecting Power BI to Both Tables

**Chapter 1 · Data Engineering Capstone — Intermediate Project · Lesson 10 of 16**

## What you'll learn
- Why Power BI should connect to the Gold layer, and never to Silver or Bronze
- How Get Data reaches both `gold.daily_sales_summary` and `gold.category_breakdown` through one SQL endpoint
- The real tradeoff between Import mode and DirectQuery for this specific pipeline
- Why loading both Gold tables into one Power BI model, rather than two separate files, is the right call here

## Why Gold, and only Gold

A BI tool like Power BI should never read from Bronze or Silver. Bronze is raw and append-only — it
still has duplicate transactions from retried ingestion runs and no business logic applied at all.
Silver is cleaner, upserted via `MERGE INTO` on `transaction_id`, but it's still row-level transaction
detail, not the aggregated shape a report needs, and it's not contractually stable — a data engineer
can reshape Silver's intermediate columns without warning anyone downstream.

Gold exists specifically so a consumer like Power BI has something stable to point at: `gold.daily_sales_summary`
and `gold.category_breakdown` are both pre-aggregated to the exact grain their stakeholders asked for,
and they change shape only when someone deliberately redesigns the pipeline — not every time a nightly
job runs. Connecting Power BI to Gold means the report layer and the data engineering layer can evolve
somewhat independently, as long as the Gold contract holds.

## Getting both tables into one model

Both Gold tables live as Delta tables exposed through the Lakehouse's SQL endpoint — the same kind of
connection a SQL client or a notebook would use, just reached from Power BI's **Get Data** dialog
instead. The connection flow, structurally:

- **Get Data** → connect to the Lakehouse SQL endpoint (the same endpoint the Lessons 1-9 PySpark/SQL
  work has been running against all along — Power BI is just a new client of it).
- In the navigator, select **both** `gold.daily_sales_summary` and `gold.category_breakdown` in the
  same connection, rather than building two separate Power BI files for two separate stakeholders.
- **Load** both tables into a single Power BI data model.

Loading both tables into one model matters even though you're about to build two separate report
pages for two separate stakeholders. One model means one refresh schedule, one set of credentials, one
place to maintain any shared logic (like a `sale_date` calendar table) if this model grows later. Two
stakeholders can still each get their own page — or even their own app in Power BI's distribution
model — without needing two independent connections to the same underlying data.

## Import vs. DirectQuery — the real tradeoff here

Power BI offers two ways to load a table, and the choice matters for this pipeline specifically:

- **Import** copies the data into Power BI's own compressed in-memory engine at refresh time. Reports
  built on imported data are fast to interact with — slicing, filtering, and cross-highlighting all
  happen against data already sitting in memory — but the data is only as fresh as the last scheduled
  refresh.
- **DirectQuery** sends a live query back to the Lakehouse SQL endpoint every time someone touches a
  slicer or opens a page. The report always reflects whatever is currently in the Gold tables, with no
  refresh lag, but every interaction costs a real round-trip query, so performance depends entirely on
  how fast the SQL endpoint answers.

For these two Gold tables, **Import** is the right default. Both tables already refresh on the same
schedule as the nightly incremental pipeline — there's no value in querying live between pipeline runs,
because the data genuinely doesn't change until the next run finishes. Import also keeps both stakeholder
pages fast regardless of how much history accumulates in Gold, since Power BI's own engine — not the
Lakehouse endpoint — is answering every slicer click. DirectQuery would only earn its cost here if Gold
needed to reflect changes *within* a day, which this pipeline's design doesn't call for.

## Key terms

| Term | Meaning |
|---|---|
| SQL endpoint | The query interface a Lakehouse exposes so SQL clients and BI tools can read Delta tables without running Spark themselves |
| Import mode | Power BI copies table data into its own in-memory engine at refresh time |
| DirectQuery | Power BI queries the source live on every interaction, trading refresh lag for real-time freshness |
| Data model | The set of tables loaded into one Power BI file, shared across however many report pages you build on it |

## Lab

Sketch (in words, no screenshots needed) the exact Get Data flow you'd walk through to load both Gold
tables into one Power BI file: which endpoint you connect to, which two tables you select in the
navigator, and which load mode you choose and why, given this pipeline's actual refresh cadence.

## Check yourself

Without looking back at the lesson: explain why Power BI connects to Gold and not Silver or Bronze,
name the two tables loaded into this single Power BI model, and say which load mode fits this
pipeline's nightly refresh cadence and why DirectQuery wouldn't earn its cost here.
