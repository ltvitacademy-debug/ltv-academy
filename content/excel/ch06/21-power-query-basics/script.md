# Script — Power Query Basics

## Segment 1 (title)

Power Query is a separate transformation engine that happens to live inside Excel — not a formula feature, not a PivotTable variant. It connects to a data source, reshapes it, and only then drops the result into your sheet.

## Segment 2 (screenshot: ribbon)

Every query starts in the same place: the Data tab's Get & Transform Data group. From Text/CSV, From Web, From Sheet — pick a source and the Query Editor opens.

## Segment 3 (screenshot: query settings)

The Query Editor has its own ribbon and its own preview, plus a Query Settings pane on the right with an Applied Steps list. Every click you make — removing a column, changing a type — gets recorded there as a named step. Click an earlier step and the preview rewinds to exactly that point.

## Segment 4 (screenshot: four phases)

Microsoft frames the whole process as four phases: Connect, Transform, Combine, Load. This chapter spends most of its time in the middle two — transforming a query in this lesson and the next, then combining multiple queries together in Lesson 23.

## Segment 5 (steps: refresh not redo)

Here's why this matters. Clean a weekly data export by hand and you're redoing identical work forever. Build it as a query once, and updating for next week's file is one click: Refresh. Every recorded step re-runs automatically against the new data.

## Segment 6 (outro)

Next lesson: cleaning data with Power Query — removing duplicates, splitting columns, fixing data types, and filtering out blanks, all as recorded, repeatable steps.
