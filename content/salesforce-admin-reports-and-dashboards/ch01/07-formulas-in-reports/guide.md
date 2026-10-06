# Formulas in Reports

**Chapter 1 · Reports · Lesson 7 of 22**

Not every number a report needs already exists as a field. Report formulas calculate new values on the fly, without touching the data model — no new custom field, no admin ticket. This lesson covers the two formula types every report builder uses, plus the cross-block variant from Lesson 6.

## What you'll learn

- Row-level formulas vs. summary formulas
- How to add either one from the Columns dropdown
- Reading and validating a formula before applying it
- Where PARENTGROUPVAL and PREVGROUPVAL fit in

## Row-level formulas

A **row-level formula** calculates a new value for **each individual record** in the report, the same way a formula field would, but without creating one. From the Columns dropdown, choose **Add Row-Level Formula**, give it a name and an output type (Number, Currency, Percent, and so on), then build the formula from the Fields and Functions tabs — for example `CLOSE_DATE - DATEVALUE(CREATED_DATE)` to show how many days each opportunity took to close. A report can have only **one** row-level formula, and it can reference at most five fields.

## Summary formulas

A **summary formula** calculates one value **per group** (or for the whole report, if there's no grouping) instead of per row — things like a percentage of total, or a ratio between two summarized columns. Choose **Add Summary Formula** from the same Columns dropdown, pick the summary field and aggregation (Sum, Average, and so on) from the Fields tab, and build the formula, such as `WON:SUM / CLOSED:SUM` to calculate a win rate. A report can have up to **five** summary formulas, and — unlike the row-level formula — they can be placed inside a grouped report to summarize each group separately.

## PARENTGROUPVAL and PREVGROUPVAL

Two functions make summary formulas aware of the groups around them. **PARENTGROUPVAL** returns a summarized value from an outer (parent) grouping, useful for a "percent of annual total" column inside a report grouped by year and then month. **PREVGROUPVAL** returns the same summarized value from the *previous* group at the same level, which is exactly how you'd build a month-over-month change column. Both take the field and the grouping level as arguments, the same way you'd reference them anywhere else in a summary formula.

## Validating before you apply

Every formula editor has a **Validate** button. Use it before clicking Apply — it catches type mismatches and syntax errors (like dividing a Number by a Percent without converting) before the formula is saved into the report.

## Key terms

| Term | Meaning |
|---|---|
| Row-level formula | Calculates a value per record; max one per report |
| Summary formula | Calculates a value per group or report-wide; max five per report |
| PARENTGROUPVAL | Returns a value from an outer grouping level |
| PREVGROUPVAL | Returns the same value from the previous group at the same level |
