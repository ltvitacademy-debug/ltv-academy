# Lesson 25 — Connecting Python to SQL · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Files and APIs aren't the only source. A huge amount of real data
engineering work means connecting Python directly to a database — no
export step in between.

## S2 · CODE CARD (connecting)

Py O-D-B-C is Python's standard way to talk to SQL Server. The
connection string names the driver, the server, the database, and how
to log in — here, Windows authentication.

## S3 · CODE CARD (read_sql)

And if you've taken this site's T-SQL course, this query should look
completely familiar — real T-SQL, running against the exact same
AdventureWorks 2012 database. Read SQL runs it and hands the result
straight back as a DataFrame, types already figured out.

## S4 · CODE CARD (finally)

Connecting directly beats exporting to a file first for two real
reasons: your script always sees current data, and the database
engine — built for exactly this — does the filtering and sorting for
you, instead of pulling everything into Python first.

## S5 · OUTRO CARD

And always close the connection in a finally block — this is Lesson
19's pattern, for real, so a failed query never leaves a connection
hanging open. Next lesson: cleaning data with Python — wherever it
came from, now it needs fixing. See you there.
