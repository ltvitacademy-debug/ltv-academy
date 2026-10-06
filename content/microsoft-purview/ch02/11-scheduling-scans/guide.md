# Lesson 11 — Scheduling Scans

**Chapter 2 · The Data Map · Lesson 11 of 35**

## What you'll learn

- The scan trigger options: once, or a recurring schedule
- Every recurrence setting you can configure — time zone, cadence, start, and end
- How to find a scan from its collection or domain afterward
- The difference between a full scan and an incremental scan, and when each runs

## Choosing a trigger

When you create a scan, the last real decision before **Save and run** is its **trigger** — run it once, or set it up to recur automatically:

![Screenshot of the Set a scan trigger page, showing Recurring selected, time zone set to UTC, recurrence set to every 1 Month(s), a calendar grid for picking the day of the month, and start recurrence date/time fields.](/courses/microsoft-purview/ch02/11-scheduling-scans/register-blob-scan-trigger.png)
*Recurring is the common choice for production sources — the initial run is always a full scan, and every scan after that is incremental by default.*

A recurring schedule gives you full control:

- **Time zone** — the schedule aligns to this, and automatically adjusts for daylight saving if the zone observes it
- **Recurrence** — daily, weekly, or monthly, with sub-options: every *X* days; every *X* weeks on one or more weekdays; every *X* months by day-of-month or by weekday
- **Start recurrence at** — when the schedule begins
- **Specify recurrence end date** (optional) — set a stop date if the scan shouldn't run forever

Daily or weekly scans suit sources whose structure changes often. Monthly fits sources that barely change. Whatever you pick, coordinate with the source's own administrator — scanning puts real load on the system underneath.

## Finding a scheduled scan later

Once a scan exists, you can reach it two ways. From the **collection** or **domain** it belongs to, select **Scans**:

![Screenshot of a collection's Overview page with the Scans card highlighted, showing a count of 1 scan.](/courses/microsoft-purview/ch02/11-scheduling-scans/select-scans.png)
*Every collection and domain tracks its own Assets, Sources, and Scans counts right on the Overview tab.*

That opens a list of every scan in that collection — select the scan's name to see its run history and manage it:

![Screenshot of the Scans in collections list, showing one scan named Scan-c9H with its source name and source type, with the scan name highlighted.](/courses/microsoft-purview/ch02/11-scheduling-scans/select-scan-name.png)
*You can also reach the same scan directly from the source's own Overview tab, under Recent scans.*

## Full scan vs. incremental scan

When you manually re-run a scan (or it fires on schedule), you get to choose how much of the source it re-reads:

![Screenshot of the Run scan now dropdown showing two options, Incremental scan and Full Scan, each with an info icon.](/courses/microsoft-purview/ch02/11-scheduling-scans/register-blob-full-inc-scan.png)
*A Full Scan re-reads everything in scope. An Incremental scan only processes what's changed since the last run — faster, and the default behavior after a source's first scan.*

Not every source supports incremental scanning — check the **Supported capabilities** table on that source's own documentation page before you assume it's available.

## Key terms

| Term | Meaning |
|---|---|
| Scan trigger | Once, or a recurring schedule — set when you create or edit a scan |
| Recurrence | Daily, weekly, or monthly cadence, with its own sub-options for timing |
| Full scan | Re-reads everything in the scan's scope |
| Incremental scan | Only processes resources that changed since the last successful scan |

## Lab

Design a schedule for a hypothetical finance data source that changes constantly during business hours but needs to stay accurate for a nightly report. Write out the time zone, recurrence setting, and start time you'd choose, and explain why daily (rather than weekly or monthly) is the right call here.

## Check yourself

What's the difference between a full scan and an incremental scan, and which one runs automatically the very first time a new scan executes?
