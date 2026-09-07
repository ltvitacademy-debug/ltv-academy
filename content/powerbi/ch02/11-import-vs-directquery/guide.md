# Lesson 11 — Import vs. DirectQuery

**Chapter 2 · Connecting to Data · Lesson 6 of 6**

## What you'll learn

- What Import and DirectQuery actually do differently, in plain terms
- Why every lesson in this course, until now, has quietly used Import
- Where to see (and change) a table's storage mode after connecting
- Dual mode, and why it exists

## The choice you've been making without noticing

Every connector dialog with a Data Connectivity choice — you saw it first
back in Lesson 9 — asks this question the moment you connect:

![Screenshot of the SQL Server database dialog with Server and Database fields, and Import/DirectQuery radio buttons.](/courses/power-bi/ch02/11-import-vs-directquery/signin.png)
*Same dialog from Lesson 9. Import has been selected, by default, in every lesson so far.*

Here's the actual difference:

| | Import | DirectQuery |
|---|---|---|
| **Where the data lives** | Copied into your Power BI file | Stays in the source; nothing is copied |
| **Speed of visuals** | Fast — reading from memory | Depends entirely on the source's speed |
| **Freshness** | As of the last refresh | Live, every time a visual loads |
| **Data volume** | Limited by file size (1 GB typical cap) | Handles very large sources |
| **Feature support** | Full — everything in this course works | Some features restricted (see below) |

## Why Import has been the default all course long

For learning, and for most real reports, **Import wins**: full DAX support,
no dependency on a live connection while you work, and no waiting on a
database every time you drag a field onto the canvas. That's exactly why
every lesson from Chapter 1 onward has used it without a second thought.

DirectQuery earns its place specifically when: the source is too large to
import practically, the data must be truly real-time, or a security policy
requires the data to never leave its source system.

## Seeing (and changing) storage mode later

Once connected, every table's storage mode is visible — and sometimes
changeable — in Model view:

![Screenshot of Model view in Power BI Desktop with a table selected and the Storage mode property expanded in the Properties pane, showing Import, DirectQuery, and Dual options.](/courses/power-bi/ch02/11-import-vs-directquery/see-storage-mode.png)
*Select a table, expand Advanced in the Properties pane, and Storage mode is right there — along with a third option we haven't covered yet: Dual.*

One important asymmetry: **you can convert a DirectQuery table to Import,
but never the other way around.** Start with DirectQuery if you're unsure —
you can always switch to Import later; going the other direction means
reconnecting from scratch.

## A visible consequence: Table view

Table (Data) view — from Lesson 3 — behaves differently depending on
storage mode:

![Screenshot of Table view in Power BI Desktop showing cached product data in rows and columns.](/courses/power-bi/ch02/11-import-vs-directquery/table-view-table-data.png)
*Import and Dual tables show their cached data here, like this. DirectQuery tables show nothing — a message explains that DirectQuery data can't be displayed this way, because nothing is actually stored locally to show.*

## Dual mode: getting the best of both

Real reports often mix fact tables (huge, changing constantly) with
dimension tables (small, rarely changing) like Date, Customer, or Geography:

![Screenshot of Model view showing five related tables: Date, Sales, SurveyResponse, Customer, and Geography, connected by relationship lines.](/courses/power-bi/ch02/11-import-vs-directquery/model-view-table-relationships.png)
*A typical mix: a large Sales fact table alongside smaller dimension tables like Date and Customer.*

If you convert one DirectQuery table to Import, Power BI warns you about the
consequence and offers a fix:

![Screenshot of the Storage mode dialog warning that converting to Import is irreversible, and offering to set the Customer, Geography, and Date tables to Dual mode.](/courses/power-bi/ch02/11-import-vs-directquery/limited-relationship-warning.png)
*Dual tables behave as Import when that's faster, and as DirectQuery when needed for consistency with a still-live fact table — the practical middle ground.*

You won't need Dual mode for a while — it matters once you're combining a
huge DirectQuery fact table with small reference tables, a scenario later
chapters build toward. For now, know it exists and what problem it solves.

## Key terms

| Term | Meaning |
|---|---|
| Import | Copies data into the Power BI file; fast, full-featured, needs a refresh to update |
| DirectQuery | Queries the source live on every visual interaction; real-time but source-dependent |
| Storage mode | The per-table setting (Import/DirectQuery/Dual) visible in Model view |
| Dual | A hybrid mode that acts as Import or DirectQuery depending on what a query needs |

## Lab

1. Open any .pbix file you've built in this course, switch to Model view,
   and check a table's storage mode in the Properties pane.
2. In your own words, write one sentence explaining why this course has
   used Import by default.
3. Name one real-world scenario where DirectQuery would be the better
   choice, and explain why in a sentence.

## Check yourself

You're ready for Chapter 3 when you can explain, without notes, the core
trade-off between Import and DirectQuery, and why you can convert a
DirectQuery table to Import but never reverse that conversion.
