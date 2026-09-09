# Lesson 106 — SQL Server Profiler · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Chapter 11's finale steps outside T-SQL syntax itself, to a tool for a
completely different kind of question: SQL Server Profiler.

## S2 · STEPS CARD (what a trace captures)

Every tool from Chapter 10 analyzes one query you already picked. A
Profiler trace watches the ENTIRE server, capturing every query from
every session as it happens — the actual statement text, duration and
CPU just like Lesson 91's STATISTICS TIME, reads and writes just like
STATISTICS IO, plus who ran it and against which database.

## S3 · CODE CARD (comparison)

That's the real difference. Chapter 10's tools answer 'is THIS query
slow.' A trace answers 'something on this server is slow, and I don't
even know which query yet' — it watches everything, passively, until the
culprit shows up.

## S4 · CODE CARD (deprecation)

One honest note: Microsoft has officially deprecated SQL Server Profiler
and the SQL Trace feature behind it — the same fate as Lesson 92's old
STATISTICS PROFILE. The modern replacement is Extended Events, a much
lighter-weight tracing engine, available right in SSMS as the XEvent
Profiler.

## S5 · OUTRO CARD

That closes out Chapter 11 — twelve lessons on keys, relationships,
normalization, and the databases and tools underneath it all. Next up,
the final chapter: Data Warehouse Concepts — OLTP versus OLAP,
warehouses, lakes, and marts. See you there.
