# Lesson 9 — Live Connections vs. Extracts

**Chapter 2 · Connecting & Preparing Data · Lesson 9 of 95**

## What you'll learn

- What a Live connection actually does versus what an Extract actually
  does, mechanically
- Where this choice lives in the Tableau interface (you've already seen
  it, in Lessons 7 and 8)
- The real tradeoffs: freshness, performance, offline access, and load
  on the source system
- A framework for picking one over the other for a given situation

## The choice you've already seen

Every connection's Data Source page has shown a **Connection: Live /
Extract** toggle. This lesson is entirely about what that one choice
actually does under the hood.

![Real screenshot of Tableau's Connection radio buttons: Live and Extract, with Extract selected, an Edit/Refresh link, and the caption 'Extract will contain all data.'](/courses/tableau/ch02/09-live-connections-vs-extracts/live-extract-toggle.png)
*The exact control from every Data Source page — Live is the default; Extract is opt-in.*
Source: [Tableau Help — Extract Your Data](https://help.tableau.com/current/pro/desktop/en-us/extracting_data.htm)

## Live connection: query the source directly

With **Live**, Tableau sends a new query straight to the underlying
data source — your SQL Server, your Excel file, whatever it is —
every time you interact with a view (change a filter, add a field,
open the workbook). There's no copy of the data sitting inside
Tableau; Tableau is a window looking directly at the source.

- **Pro:** Always shows current data — no refresh step required.
- **Con:** Performance depends entirely on the source. A slow,
  overloaded, or remote SQL Server means a slow Tableau view. Heavy
  interactive use also means repeated load on that source server.

## Extract: a local, optimized copy

With **Extract**, Tableau pulls a snapshot of the data out of the
source and stores it locally in its own highly-optimized **Hyper**
data engine format (a `.hyper` file). From that point on, the view
queries the extract, not the original source, until you explicitly
refresh it.

- **Pro:** Often dramatically faster, since Hyper is built for
  analytical queries; works offline (no live connection needed at
  all); takes load off the source system entirely.
- **Con:** Data goes stale the moment the source changes — you see the
  extract's snapshot until you manually or automatically refresh it.

This diagram of Tableau's own architecture shows both paths at once:
the **Tableau Data Engine** on the left is the extract path; the
direct **SQL Connector** next to it is the live path. Both eventually
reach the same VizQL layer that renders your view.

![Real Tableau Server architecture diagram from a third-party training resource, showing Data Connectors split into a Tableau Data Engine path (extracts) and a direct SQL Connector path (live queries), both feeding into VizQL Server components and a Gateway to web/mobile/desktop clients.](/courses/tableau/ch02/09-live-connections-vs-extracts/tableau-architecture.png)
*Two paths from the same source data — Data Engine (extract) vs. direct connector (live).*
Source: [Guru99 — Tableau Architecture Diagram & Server Components](https://www.guru99.com/tableau-architecture.html)

## Choosing between them

| Situation | Likely choice |
|---|---|
| Small, fast source; you need up-to-the-second data | Live |
| Large or slow source; occasional refresh is fine | Extract |
| You need to work offline (laptop, no VPN) | Extract |
| Publishing to Tableau Public (no live DB connections allowed) | Extract (required) |
| A dashboard viewed by hundreds of people, hitting the source repeatedly | Extract, to avoid hammering the source |

There's no universally "correct" answer — it's a real tradeoff between
freshness and performance/portability, and experienced Tableau users
switch between them per workbook based on exactly these factors.

## Key terms

| Term | Meaning |
|---|---|
| Live connection | Every interaction queries the original data source directly |
| Extract | A local snapshot stored in Tableau's Hyper engine, queried instead of the source |
| Hyper | Tableau's in-memory analytical data engine used for extracts |
| Refresh | The action of updating an extract's data from the source again |

## Lab

1. On any connection you've made in this chapter, toggle between Live and Extract on the Data Source page and notice what happens (Extract prompts you to save a `.hyper` file).
2. Time how long a filter change takes on a Live connection vs. the same filter change after switching to Extract.
3. Write one sentence describing which mode you'd choose for a dashboard meant to be viewed by 200 people daily, and why.

## Check yourself

You're ready for Lesson 10 when you can explain, without notes, what
physically happens differently between a Live query and an Extract
query, and name one situation where Extract is actually required, not
just preferred.
