# Script — Capstone: Wrap-Up & Portfolio Presentation

## Segment 1 (title)

Nine chapters, and one connected report suite to show for it. This lesson, we check it against the scope we set in Lesson 38, and turn it into something you can actually put in front of a hiring manager.

## Segment 2 (steps: chapters-used)

Chapter 1 gave you the Report Server and the choice between Report Builder and SSDT. Chapter 2 gave you the datasets, tables, and matrices both reports in this suite are built from. Chapter 3 gave you the parameters — single-value, multi-value, cascading, internal — the whole thing filters on. And Chapter 6 gave you the drillthrough action that actually connects the two reports together.

## Segment 3 (screenshot: summary-to-detail-drillthrough)

Checking that drillthrough piece against something real — click a value in a summary report's own column, like this category name, and it opens a second report already scoped to just that value. That's the exact mechanic your matrix's data cell does with TerritoryID and Year, just triggered from a different kind of field.

## Segment 4 (steps: presenting-it-right)

When you show this off, order matters. State the problem in one plain-language sentence first — a summarized view with a one-click path down to real orders. Then show the summary report, and explain what the two parameters actually change. Then show the drillthrough, and be ready to explain why the detail report's parameters are Internal — that's the detail that actually proves you understand report-to-report navigation, not just the UI.

## Segment 5 (screenshot: web-portal-report-folder)

Once deployed, your two .rdl files live in a report server folder exactly like this one — each with its own menu for managing it. That's where a reviewer, or future-you, would actually go to open what you built.

## Segment 6 (screenshot: web-portal-report-properties)

Open that menu and you land on a Properties screen like this one — name, description, and a direct download link right there. That's the difference between a project that only exists on your own machine and one someone else can actually open and inspect.

## Segment 7 (outro)

That's SSRS Development, complete. This catalog's Data Modeling & Data Warehousing course goes deeper into the star-schema design behind AdventureWorksDW2014 — the tables this capstone leaned on without ever designing them from scratch. And later, the Microsoft Data & BI Capstone is where a project like this one gets folded into your full portfolio. Congratulations — you've built a real paginated report suite, start to finish.
