# Lesson 90 — Reading Execution Plans: Scans vs. Seeks · Voiceover script

Segments map 1:1 to slides. Target: ~2 minutes total.

---

## S1 · TITLE CARD

Every query you run gets compiled into a plan — a tree of operations SQL
Server decided was the cheapest way to answer it. Today we learn how to
actually look at that plan.

## S2 · SCREENSHOT (toolbar)

Click Include Actual Execution Plan on the toolbar — or just press Control M
— before you run a query. Do that, run the query, and SSMS adds a brand new
tab right next to Results and Messages, showing exactly what happened under
the hood.

## S3 · SCREENSHOT (plan tree)

Here's a real one. Read it right to left, bottom to top: data flows out of
the scans and seeks on the right, up through the joins, to the SELECT on the
far left. Two operators matter most. An Index Seek means SQL Server used the
index's tree structure to jump straight to the rows it needed — the fast
path. An Index Scan, or Clustered Index Scan, means it read through every
single row checking each one. A scan isn't automatically bad — sometimes a
query genuinely needs most of the table. The red flag is a scan on a LARGE
table when you only expected a handful of rows back.

## S4 · CODE CARD (scan becomes seek)

Watch this happen live. With no index on Name, this query produces a
Clustered Index Scan — every row read, one by one, hunting for the match.
Now create a nonclustered index on Name, and run the exact same query again.
Same result, completely different plan: now it's an Index Seek, straight to
the rows that matter. This is Lesson 88's indexing lesson paying off,
visibly, in the plan.

## S5 · OUTRO CARD

Seek good, unnecessary scan bad — but always check whether that scan is
actually necessary before you assume it's a problem. Next lesson: SET
STATISTICS TIME and IO, so you can measure a query's real cost in numbers,
not just shapes in a diagram. See you there.
