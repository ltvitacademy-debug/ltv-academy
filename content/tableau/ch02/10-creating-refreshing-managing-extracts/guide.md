# Lesson 10 — Creating, Refreshing & Managing Extracts

**Chapter 2 · Connecting & Preparing Data · Lesson 10 of 95**

## What you'll learn

- How to actually create an extract from an existing connection
- How to refresh an extract, and the difference between a full refresh
  and an incremental refresh
- How to read an extract's refresh history
- What happens — and how to recover — when an extract's underlying
  file goes missing

## Creating an extract

You met the Live/Extract toggle in Lesson 9. Selecting **Extract** on
the Data Source page (or right-clicking a data source in the sidebar
and choosing **Extract > Create Extract**) opens a dialog where you can
optionally filter which rows/columns get pulled in, then prompts you to
save a `.hyper` file. From that point on, the workbook queries that
file instead of the original source.

## Refreshing an extract

An extract is a snapshot — it does not update itself. To bring it
current, right-click the data source and choose **Extract > Refresh**.
You get two choices:

- **Full Refresh** — throws away the existing extract and re-pulls
  everything from the source, from scratch.
- **Incremental Refresh** — appends only new rows since the last
  refresh (based on a column you designate, usually a date or an
  ID that only increases), which is much faster for large,
  append-only data like daily transaction logs.

Every refresh — full or incremental — gets logged. Right-click the
data source and choose **Extract > History** to see it:

![Real screenshot of Tableau's Extract History dialog, showing a logged row: Time '11/21/2017 11:56:23 AM', Action 'Full refresh', Rows '67822'.](/courses/tableau/ch02/10-creating-refreshing-managing-extracts/extract-history.png)
*Every refresh — automatic or manual — is logged here with a timestamp and row count.*
Source: [Tableau Help — Extract Your Data](https://help.tableau.com/current/pro/desktop/en-us/extracting_data.htm)

This history is genuinely useful for troubleshooting: if a dashboard
looks wrong, checking whether the extract actually refreshed recently
(and how many rows it pulled) is often the fastest first diagnostic
step, before assuming a calculation or filter is broken.

## When the extract goes missing

Extracts live as `.hyper` files on disk. If that file gets moved,
renamed, or deleted — say, someone reorganizes a shared drive — Tableau
can't silently ignore it. Opening the workbook shows:

![Real screenshot of Tableau's 'Extract Not Found' dialog, showing the Data Source name, the expected file path in the Tableau Repository, and four radio button recovery options: Locate the extract, Remove the extract, Deactivate the extract, Regenerate the extract.](/courses/tableau/ch02/10-creating-refreshing-managing-extracts/extract-not-found.png)
*The real recovery dialog — four honest options, no silent failure.*
Source: [Tableau Help — Extract Your Data](https://help.tableau.com/current/pro/desktop/en-us/extracting_data.htm)

| Option | What it does |
|---|---|
| Locate the extract | Point Tableau to the file's new location |
| Remove the extract | Delete the reference and fall back to a Live connection to the original source (if still reachable) |
| Deactivate the extract | Keep the reference but stop trying to use it for now |
| Regenerate the extract | Re-create it entirely from the original source, as if creating it fresh |

## Key terms

| Term | Meaning |
|---|---|
| Full refresh | Discards and re-pulls the entire extract from the source |
| Incremental refresh | Appends only new rows since the last refresh, based on a chosen column |
| Extract History | The log of every refresh, with timestamp and row count |
| .hyper file | The physical file an extract is stored in |

## Lab

1. On any workbook with a Live connection from earlier chapters, create an extract and note where Tableau saves the `.hyper` file.
2. Refresh it once as a Full Refresh and check the Extract History afterward.
3. If you can, set up an Incremental Refresh on a column that only increases (a date or auto-incrementing ID) and explain, in one sentence, why that column choice matters.

## Check yourself

You're ready for Lesson 11 when you can explain the difference between
a full and an incremental refresh, and name all four recovery options
Tableau offers when an extract's file goes missing.
