# Script — Sorting & Filtering

## Segment 1 (title)

Sort-Object reorders whatever reaches it, by whichever property you name — ascending by default, -Descending to reverse it, and it doesn't change or remove anything, just the order.

## Segment 2 (code: sorting by one or more properties)

Get-Process | Sort-Object CPU -Descending. Sort by more than one property and order matters — PowerShell sorts by the first property, then uses the second only to break ties within each group of the first.

## Segment 3 (code: the practical task)

The 5 SQL Server processes using the most memory, sorted highest first: Get-Process -Name sqlservr, sorted by WorkingSet descending, then Select-Object -First 5 down to name, ID, and a calculated memory-in-megabytes column. Every stage still works with real objects the whole way through.

## Segment 4 (code: filter and sort together)

Add a Where-Object stage and the same idea answers a narrower question — only sqlservr processes over a memory threshold, sorted. Filter, then sort, then shape — three of this chapter's ideas in one line a DBA might genuinely run.

## Segment 5 (outro)

Chapter 2, Working With Objects & Pipelines, is done. Chapter 3, Scripts & Control Flow, is next — saving what you've typed interactively into a real .ps1 file, with if/else, loops, and functions.
