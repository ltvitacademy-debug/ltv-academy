# Case Volume & Resolution Time

The Head of Support at Alder & Vale Systems asked two questions that sound simple: is the queue growing, and are answers slow? This lesson answers them with two report families, case volume and resolution time, and shows how to check that the numbers agree with each other. All figures are illustrative; click-paths and field names vary by org and release, so use the pickers your org shows you.

## What you'll learn

- How to build a case-volume report that separates opened from closed
- How to compute backlog and prove the arithmetic
- How to measure resolution time by priority, and why averages need a sanity check
- How to cross-check a report with SOQL

## Report 1: volume by month

Use the standard **Cases** report type. Filter Created Date to the quarter you're analyzing, group rows by Created Date (by Calendar Month) and add a second grouping on Priority if you want a matrix. Add a chart, a column chart works well for volume over time.

Example result for the quarter, illustrative: July 380, August 410, September 450, a total of **1,240 cases opened**. That upward drift is the first piece of evidence for the manager's "growing" instinct, but opened cases alone don't prove a growing queue.

## Report 2: closed in the same period

Clone the report, filter on Closed Date instead of Created Date, and require the case to be closed. Example: **1,180 cases closed**. Notice the gap: 1,240 opened against 1,180 closed means 60 more came in than went out.

## The backlog equation

Backlog at end equals backlog at start, plus opened, minus closed.

- Start of quarter: 150 open cases (a snapshot you get by filtering on cases created before the quarter that were still open then, or from a saved earlier report)
- 150 + 1,240 - 1,180 = **210** open cases at quarter end
- Check it against a live report of open cases: filter Closed equals false. It should say 210.

A caution: the live open-case report shows today, not the quarter's last day. If the dates differ, tell the reader which day the number describes. If your org tracks history for case status, historical reporting may be possible, so check what your org has enabled rather than assuming.

## Report 3: resolution time by priority

Filter to closed cases. Group by Priority. You need a duration per case: the Cases report type usually offers age-style fields, so check the field picker, or build a row-level formula that converts closed minus created into hours. Summarize with Average.

Illustrative results: High 9.5 hours, Medium 34 hours, Low 61 hours, **38 hours overall**. The overall figure is a blend, so verify it: 15 percent of cases are High, 55 percent Medium, 30 percent Low, and 0.15 x 9.5 + 0.55 x 34 + 0.30 x 61 is about 38.4.

## Averages can mislead

A few cases left open over a holiday can pull the average up. Compare Average with Max, and look for the shape of the distribution. If your report offers a median, use it; if not, export the data and compute it in Excel or Tableau. Also state your clock: calendar hours include nights and weekends, which makes a Friday-evening case look slow. Business-hours calculation needs extra setup, so say which clock you used.

## Cross-check with SOQL

A quick query from the Developer Console or Workbench confirms your report totals:

`SELECT Priority, COUNT(Id) FROM Case WHERE CreatedDate = LAST_QUARTER GROUP BY Priority`

The three counts should add up to the volume report's total. Two independent routes to the same number is what reconciliation means.

## Your turn

Build all three reports, put the equation on a slide, and decide what chart each deserves. Then write one sentence per report that states what it tells the Head of Support.

## Recap

Volume in and volume out give you backlog. Resolution time by priority shows where the delay lives. Always reconcile, name your clock, and treat averages with suspicion.

## Check yourself

If opened equals 1,240, closed equals 1,180, and the start backlog was 150, what is the end backlog, and what would make a live report disagree with it?
