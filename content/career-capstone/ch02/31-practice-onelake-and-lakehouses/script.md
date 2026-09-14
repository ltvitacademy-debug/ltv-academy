# Script — Practice Questions: OneLake and Lakehouses

## Segment 1 (title)

This lesson is a drill, not a new lesson — worked DP-700 practice questions on OneLake and Lakehouses, at real exam difficulty, with full reasoning for each answer.

## Segment 2 (steps: Files vs Tables, Shortcuts)

Loading a file into a Lakehouse's Files area just stores it — converting it into a queryable table needs an explicit load-to-table step. A Shortcut lets a separate workspace query the same data without copying it, and without going stale.

## Segment 3 (code: Direct Lake scenario)

A team wanting the lowest-latency Power BI reports with no refresh schedule should use Direct Lake Mode — it reads Delta files straight from OneLake, skipping both Import refresh and a DirectQuery round trip, as long as the table stays within its size limits.

## Segment 4 (outro)

If you miss more than one question on this lesson's quiz, revisit Fabric Lessons 3, 4, 7, and 12 before moving on. Next up: practice questions on Data Warehouses.
