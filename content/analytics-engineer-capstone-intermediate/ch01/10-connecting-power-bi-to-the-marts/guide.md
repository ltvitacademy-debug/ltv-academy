# Lesson 10 — Connecting Power BI to the Marts

**Chapter 1 · Intermediate Capstone: The Orders Analytics Layer · Lesson 10 of 16**

## What you'll learn

- The real Power BI Desktop flow for connecting to a Snowflake-backed
  dbt project — the exact same connector this project's Power BI +
  Snowflake chapter already teaches
- The two required fields, and why the warehouse field is a cost
  decision, not just a connection detail
- Where database/schema selection and the Import vs. DirectQuery
  choice actually happen in this flow
- Which dbt models to select in Navigator for this chapter's two
  upcoming pages

## Finding the connector

Everything starts at **Get Data** in Power BI Desktop. Snowflake
lives under the **Database** category, alongside Redshift, BigQuery,
and the other warehouse connectors — not a separate "cloud" bucket.

## Two required fields — both about compute

Selecting Snowflake and clicking **Connect** opens a dialog asking for
exactly two things:

- **Server** — the Snowflake account hostname
  (`<account_identifier>.snowflakecomputing.com`).
- **Warehouse** — the compute warehouse this report's queries will
  run against. Whatever warehouse gets typed here is the one burning
  credits every time this specific report queries Snowflake — a cost
  decision, not a mere connection string field.

Notice what's *not* asked yet: which database, schema, or table.
That comes one step later.

## Authenticating, then Navigator

After **OK**, Power BI asks for credentials (Snowflake
username/password, or Microsoft Entra ID where configured) —
whichever role you authenticate as determines exactly what this
report can see, the same role-based access control as any other
Snowflake client. Then **Navigator** opens: this is where database,
schema, and table selection actually happens. For this chapter,
select `fct_orders` and the `customers` mart from the schema your dbt
project writes to — both marts, nothing from `staging` or
`intermediate`, since Finance and Ops only need the business-facing
layer.

## Import vs. DirectQuery

The last step of this same flow asks **Import** or **DirectQuery**.
For this capstone, use **Import** — `fct_orders` is already
incrementally maintained in Snowflake itself, so Power BI doesn't need
to re-query it live on every report interaction; a scheduled refresh
after each `dbt run` is enough to keep Finance and Ops current.

## Why only the marts layer gets selected

Selecting a staging or intermediate model directly in Power BI would
expose implementation details (raw renamed columns, an in-progress
join) that aren't meant to be business-facing — exactly the reason
this project built a marts layer in the first place back in Lesson 2.
Finance and Ops should never need to know `int_orders__joined` exists.

## Key terms

| Term | Meaning |
|---|---|
| Server / Warehouse | The two required fields — the warehouse decides which compute footprint this report uses |
| Navigator | Where database/schema/table selection happens, after authenticating |
| Import vs. DirectQuery | The final choice in this flow — Import fits an already-incremental, dbt-maintained mart |

## Lab

In Power BI Desktop, open Get Data > Database > Snowflake, connect
with your server and warehouse, authenticate, and in Navigator select
`fct_orders` and `customers`. Choose Import and load both tables.

## Check yourself

You're ready for Lesson 11 when both tables are loaded and you can
explain why `fct_orders` and `customers`, specifically — not
`int_orders__joined` or either staging model — are the only tables
this report should ever touch.
