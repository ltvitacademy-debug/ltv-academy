# Exporting Reports

**Chapter 2 · Report Management · Lesson 12 of 22**

Reports and dashboards cover most ad-hoc analysis, but sometimes the data has to leave Salesforce entirely — into a spreadsheet for a board deck, a pivot table a finance team already lives in, or a one-time cleanup pass in Excel. Exporting is how a report's underlying rows become a file you can hand to anyone, with no login required.

## What you'll learn

- Where Export lives on a report's run page
- What gets exported and what doesn't
- Details Only vs. Formatted Report, and when each matters
- Encoding, and why it occasionally matters
- Why a scheduled export (a subscription) beats a manual one

## Finding Export

On a report's run page, the **Edit ▾** dropdown (or the row-level menu from a list view) holds **Export**. It's the same entry point whether you're exporting a tabular list or a grouped summary report — Salesforce doesn't require a different workflow per format.

## What actually comes out

Export gives you two shapes:

| Format | What you get |
|---|---|
| Formatted Report (.xlsx) | Groupings, subtotals, and chart image preserved, close to what you see on screen |
| Details Only (.csv) | Every underlying record as flat rows — no subtotals, no grouping, no chart |

The flat **Details Only** export is what most people actually want when the destination is another tool: a CSV of raw rows is far easier to re-pivot, join, or load somewhere else than a formatted spreadsheet full of merged cells and subtotal rows.

## Encoding

CSV exports let you optionally change the character **encoding**. The default works for most English-language data; switch it if the report contains non-ASCII characters (accented names, non-English currency symbols) that are coming out garbled in the destination tool. It's a minor setting that only matters occasionally, but it's the first thing to check when an export "looks broken" in another application.

## The manual-export trap

A one-time export is fine for a one-time need. The trap is relying on manual exports for anything recurring — a weekly numbers pull that becomes someone's standing Tuesday-morning chore. If the same export happens on a schedule, a **subscription** (Lesson 11) with Attach File turned on does the same job automatically, without anyone remembering to click Export at all.

## Recap

- Export lives under the Edit dropdown on a report's run page.
- Formatted Report keeps the on-screen layout; Details Only gives flat, re-usable rows.
- Encoding rarely matters, except when non-English characters come out wrong.
- Anything exported on a recurring basis belongs in a subscription, not a standing manual habit.

## Check yourself

A finance analyst wants to pull a report's raw records into a pivot table they maintain outside Salesforce. Which export format should they choose, and why would the other format actively get in their way?
