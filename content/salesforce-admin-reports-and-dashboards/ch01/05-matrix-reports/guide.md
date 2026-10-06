# Matrix Reports

**Chapter 1 · Reports · Lesson 5 of 22**

A summary report groups rows. A **matrix report** groups rows *and* columns at the same time, producing a true two-dimensional grid — pipeline by owner across stage, attendance by year across month, anything you'd reach for a spreadsheet pivot table to build. This lesson covers how to create one and how to read it.

## What you'll learn

- How grouping columns, not just rows, creates a matrix report
- Reading a matrix report's row/column intersections
- Why matrix reports are the closest thing to a pivot table in Salesforce
- When a matrix report is the right choice over a summary report

## Row groups and column groups together

In the Outline tab, the grouping area is split into **Group Rows** and **Group Columns**. A summary report only ever uses Group Rows. The moment you also drag a field into **Group Columns**, the report becomes a **matrix report**, and every number in the grid is the intersection of one row group and one column group — total pipeline for *this owner* in *that stage*, for example.

## Reading a matrix report

Each cell shows a summarized value (Sum, Average, Count, whichever summary type you chose) for the records that fall into both its row group and its column group. Row subtotals appear at the right edge of each row, column subtotals along the bottom, and a single grand total sits in the bottom-right corner — the intersection of every row and every column.

A classic matrix report groups **Opportunity Owner** by rows and **Stage** by columns, giving a sales manager a single screen that answers "where is every rep's pipeline sitting, stage by stage" — the kind of bird's-eye view a flat list or a one-dimensional summary report can't show at a glance.

## When to reach for a matrix report

Use a matrix report whenever you need to compare one dimension **across** another — reps across stages, regions across quarters, products across months. If you only need one dimension of grouping, a summary report is simpler and faster to read. If you need to lay several *different* report types side by side instead of crossing two dimensions of the same report, that's a joined report, covered next.

## Key terms

| Term | Meaning |
|---|---|
| Group Columns | The Outline section where you drag a field to group by column |
| Matrix report | A report grouped by both rows and columns, forming a grid |
| Cell | The intersection of one row group and one column group |
| Row/column subtotal | The summarized value for an entire row or column |
