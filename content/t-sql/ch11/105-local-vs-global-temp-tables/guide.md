# Lesson 105 — Local vs. Global Temp Tables

**Chapter 11 · Database Design Fundamentals · Lesson 11 of 12**

## What you'll learn

- The difference between `#local` and `##global` temp tables
- Who can see each one, and when each one gets automatically dropped
- Why global temp tables are powerful but risky, and rarely the right
  default choice

## Local temp tables — one connection only

A single `#` prefix creates a **local** temp table — the kind Lesson 93
already introduced. It's visible only to the session (the connection) that
created it, plus any stored procedures that session calls. It's
automatically dropped the moment that session disconnects, or sooner if
you `DROP` it yourself.

```sql
CREATE TABLE #MyLocalTemp (ID INT, Label NVARCHAR(50));
INSERT INTO #MyLocalTemp VALUES (1, 'Only I can see this');

-- Open a second SSMS query window connected to the same server and run:
SELECT * FROM #MyLocalTemp;
-- Error: Invalid object name '#MyLocalTemp' — a different session can't see it
```

## Global temp tables — every connection, until the last one leaves

A **double** `##` prefix creates a **global** temp table — visible to
**every** session connected to the server, not just the one that created
it. It's dropped only when the session that created it disconnects **and**
no other session is still actively referencing it.

```sql
CREATE TABLE ##MyGlobalTemp (ID INT, Label NVARCHAR(50));
INSERT INTO ##MyGlobalTemp VALUES (1, 'Everyone can see this');

-- Now a SECOND SSMS query window (different session) can run:
SELECT * FROM ##MyGlobalTemp;
-- Works! Global temp tables cross session boundaries.
```

## Why global temp tables are risky

Because any connection can read *and write* to a `##global` temp table,
two sessions can collide — one truncating or dropping it while another is
mid-read. There's also just one `##global` table with that name across the
**entire server**, so a naming collision between two unrelated scripts
running at the same time is a real possibility. For most "share data across
calls" needs, a real permanent table (or, within one session, the `#local`
temp table from Lesson 93) is the safer choice. Reach for `##global` only
when you specifically need cross-session sharing and understand the
concurrency risk.

## Key terms

| Term | Meaning |
|---|---|
| #local temp table | Visible only to the creating session; dropped when that session ends |
| ##global temp table | Visible to every session; dropped when the creator disconnects and no one else references it |

## Lab

Run in one SSMS query window:

```sql
CREATE TABLE #Lesson105Local (ID INT);
CREATE TABLE ##Lesson105Global (ID INT);
INSERT INTO #Lesson105Local VALUES (1);
INSERT INTO ##Lesson105Global VALUES (1);
```

Then open a **second** query window (same server, new session) and try:

```sql
SELECT * FROM #Lesson105Local;   -- fails: not visible outside its session
SELECT * FROM ##Lesson105Global; -- works: visible everywhere

-- Clean up from either window
DROP TABLE ##Lesson105Global;
```

## Check yourself

You're ready for Lesson 106 when you can explain, without looking: who can
see a `##global` temp table that a `#local` temp table can't be seen by,
and when does each one get automatically dropped?
