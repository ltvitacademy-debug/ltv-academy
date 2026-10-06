# Script — Building a Simple Financial Report

## Segment 1 (title)

Time to put the building blocks together. Let's walk through the conceptual steps of building a simple financial report: a condensed, three-line summary, the kind of thing you'd build before tackling a full Income Statement.

## Segment 2 (steps)

The build sequence generally goes: start a new report and add a grid, define your rows, define your columns, set the point of view for anything not covered by rows or columns, format the grid with number formatting and headers, then preview against a real point of view before saving.

## Segment 3 (code)

Here's a worked example. Row one, Total Revenue, references the revenue hierarchy's parent node. Row two, Total Expenses, does the same for expenses. Row three, Net Result, is a formula: row one minus row two. One column, Actual. Run it against March, you get March's numbers. Change the point of view to April and rerun the exact same design, and you get April's numbers instead.

## Segment 4 (steps)

One habit matters a lot here. A well-built report doesn't hard-code "March 2026" as literal text in its title. The header references the point-of-view values themselves, so it updates automatically when you change the period. That single habit prevents an entire category of embarrassing errors, a heading that still says January while the numbers are from March.

## Segment 5 (outro)

And saving isn't the same as publishing. Saving keeps your work; publishing to the right folder in the Financial Reporting Center is the separate step that makes it visible to its intended audience. That closes out Chapter 2. Up next, Chapter 3 begins with OTBI and subject areas, moving from formatted statements to ad hoc exploration.
