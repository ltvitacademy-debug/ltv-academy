# Lesson 6 — Datasets & Data Sources

**Chapter 2 · Building Reports · Lesson 6 of 40**

## What you'll learn

- The difference between a **data source** (the connection) and a **dataset**
  (the query) — two separate objects that report authors constantly
  conflate
- The two flavors of each: **embedded** (lives only in this report) vs.
  **shared** (published once, reused by many reports)
- How to add both from the **Report Data** pane
- Why getting this layer right first saves you from rebuilding every
  report downstream

## Two objects, not one

Every paginated report needs two separate things before it can show a
single row of data: a **data source** — the connection information (server,
database, credentials) — and a **dataset** — a query run against that
connection, producing the actual rows and columns your report will use.
New report authors often use "data source" to mean both. Don't: a data
source without a dataset gives you a connection to nowhere in particular;
a dataset needs a data source to run against. They're always a pair.

## Embedded vs. shared

Both data sources and datasets come in two flavors:

- **Embedded** — saved inside this one report only. Fastest to set up,
  but if five reports each need the same AdventureWorks connection, you're
  maintaining five separate copies of the same connection string.
- **Shared** — published once to the Report Server, then referenced by
  any report that needs it. Change the server name in one place, and
  every report that points to that shared data source picks up the
  change automatically.

In Report Builder, you choose which one you want right in the **Data
Source Properties** dialog:

![The Data Source Properties dialog, with "Use a connection embedded in my report" selected, Microsoft SQL Server as the connection type, and a connection string pointing at a named server.](/courses/ssrs/ch02/06-datasets-and-data-sources/ssrs-tutorial-data-source-general.png)
*An embedded data source — the connection lives only inside this report.*

![The same dialog with "Use a shared connection or report model" selected instead, ready to browse to a data source already published on the report server.](/courses/ssrs/ch02/06-datasets-and-data-sources/use-shared-connection-or-report-model.png)
*A shared data source — pointing at a connection published once on the report server.*

## Adding a data source and dataset

Both live in the **Report Data** pane on the left side of Report Builder:

1. On the **Report Data** pane's menu, select **New**, then **Data Source**.
2. Name it, choose embedded or shared, set the connection type (usually
   **Microsoft SQL Server**) and connection string, then **Test Connection**
   before clicking **OK**.
3. Right-click that new data source and select **Add Dataset**. The
   **Dataset Properties** dialog opens on its **Query** page.
4. Pick a **Query type** — **Text** (write SQL directly), **Table**
   (every column of one table, no filtering), or **StoredProcedure**.
   For anything beyond the trivial, **Text** with a real `SELECT`
   statement is what you'll use most.
5. Click **Refresh Fields** (or just **OK**) to run the query once and
   populate the dataset's field collection — the list of columns you'll
   drag onto the design surface next lesson.

## Key terms

| Term | Meaning |
|---|---|
| Data source | The connection information — server, database, credential method |
| Dataset | A query run against a data source, producing the fields you'll use in the report |
| Embedded | Saved inside one report only |
| Shared | Published once on the report server, referenced by many reports |
| Report Data pane | Where every data source, dataset, and field lives before you touch the design surface |

## Lab

1. In Report Builder or SSDT, create a new embedded data source pointing
   at a SQL Server instance you have access to (AdventureWorks2012 is a
   good target if you set it up in Chapter 4's SQL labs — otherwise any
   database you can reach).
2. Add a dataset from that data source using a **Text** query type —
   write a simple `SELECT` against one real table.
3. Confirm the field collection appears under the dataset node in the
   Report Data pane once the query runs successfully.

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: what's
the difference between a data source and a dataset, and what's the
practical benefit of making either one "shared" instead of "embedded"?
