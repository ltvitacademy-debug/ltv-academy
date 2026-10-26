# Lesson 19 — Publishing to Tableau Public

**Chapter 5 · The Tableau Board Deck · Lesson 19 of 26**

## What you'll learn

- How to publish a finished Tableau workbook to Tableau Public
- Why a Live connection to a private SQL Server warehouse can't travel
  to Tableau Public the way it worked in Tableau Desktop
- The real, necessary trade-off this step forces: an extract, not a
  live link, for anything published externally
- What "done" means for the Tableau deliverable specifically, and how
  it compares to Power BI's publishing story from Lesson 15

## Why Tableau Public is the real choice here

Thornbury's board includes external members without Tableau Desktop
licenses or access to the company's internal network. Tableau Public
is Tableau's free, web-hosted option for exactly this situation — a
link anyone can open in a browser, no license and no network access
required. It's the right fit for a deck that has to reach people
outside the company's own infrastructure, which is precisely why this
capstone picked Tableau for the Board in the first place back in
Lesson 1.

## The real trade-off: an extract, not a live link

Lesson 16 connected this workbook to `dw.*` with a **Live** connection
— every interaction queried the actual warehouse directly. Tableau
Public cannot maintain a live connection to a private, on-premises SQL
Server database; there's no network path from the public internet to
Thornbury's internal server, and there shouldn't be one. Publishing to
Tableau Public requires converting the data source to an **Extract**
first: **Data → [your data source] → Extract Data**, which saves a
compressed, point-in-time snapshot of the query results directly
inside the published workbook.

This is a genuine, necessary trade-off, not an oversight: the Board's
published deck shows the data as of the extract's creation time, not
live. **Server → Publish Workbook → Tableau Public** uploads that
workbook, extract included, to a public, shareable URL.

## Why this doesn't break the "one source of truth" principle

It's worth being precise about what actually changes here. Up through
Lesson 18, this workbook's queries ran live against the same warehouse
Power BI reads. The extract is a **snapshot of that same correct
data**, taken once, not a different calculation or a different source.
The numbers in the published deck are exactly as correct as they were
the moment the extract was taken — what's lost is only the automatic
refresh, not the correctness of the underlying figures. Keeping the
extract current means re-running **Extract Data → Refresh** and
republishing before each new QBR cycle, a manual step Finance's
process (Chapter 6) will turn out to share for a different reason.

## Comparing to Power BI's publishing story

| | Power BI (Lesson 15) | Tableau Public (this lesson) |
|---|---|---|
| Audience | Internal Executives only | Board, including external members |
| Connection after publish | Live, via gateway, auto-refreshing nightly | Extract, refreshed manually before each QBR |
| Access requirement | Power BI Service account within the org | A public URL, no account needed |

Neither approach is "better" in the abstract — each is the right fit
for its actual audience's actual constraints, which is the real
lesson underneath both publishing steps in this capstone.

## Key terms

| Term | Meaning |
|---|---|
| Tableau Public | A free, web-hosted Tableau platform for publishing workbooks to a public, shareable link |
| Extract | A saved, compressed snapshot of query results, required here since Tableau Public can't reach a private database live |
| Point-in-time snapshot | Data captured as of one specific moment, not automatically kept current afterward |

## Lab

1. Convert your data source to an Extract and inspect the row count
   to confirm it matches your live connection's current totals.
2. Publish the workbook to Tableau Public and open the resulting
   public URL in a private/incognito browser window, confirming it
   loads with no login.
3. Write one sentence explaining why the published deck's numbers are
   still correct, even though the connection is no longer live.

## Check yourself

You're ready for Chapter 6 when you can explain why Tableau Public
requires an Extract instead of a Live connection, why that doesn't
compromise the correctness of the data, and how this publishing
approach compares to Power BI's gateway-based scheduled refresh.
