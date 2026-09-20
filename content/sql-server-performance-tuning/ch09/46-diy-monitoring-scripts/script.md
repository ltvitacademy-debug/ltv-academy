# Script — DIY Monitoring Scripts

## Segment 1 (title)

T-SQL for Database Administrators built a troubleshooting toolkit for when something's already on fire. This lesson turns that same instinct — your own scripts, no vendor required — into something that runs continuously in the background instead.

## Segment 2 (code: the whole pattern, in T-SQL)

The whole pattern is three pieces: a permanent logging table, a stored procedure that inserts a DMV snapshot into it, and a SQL Server Agent job calling that procedure every 15 minutes. A second job deletes rows past a 60-day retention window so the table doesn't grow forever.

## Segment 3 (steps: log, retain, review)

Log, retain, review. An Agent job logs a snapshot every 15 minutes, a nightly job prunes anything older than 60 days, and the real payoff comes from actually querying that table — weekly, or by wiring the baseline-comparison alert from two lessons ago directly to it.

## Segment 4 (outro)

A table, a procedure, an Agent job, and a habit of looking at it gets a DBA most of the practical value of a commercial tool, built entirely from parts this course already covered. Next up: the capstone — a real slow production database, and everything in this course applied to it.
