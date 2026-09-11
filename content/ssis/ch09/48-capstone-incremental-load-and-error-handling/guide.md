# Lesson 48 — Capstone: Incremental Load & Error Handling

**Chapter 9 · Capstone · Lesson 48 of 49**

## What you'll learn

- Why Lesson 47's truncate-and-reload package doesn't scale, and the
  watermark pattern that replaces it
- How to redirect rows that fail the Lookup instead of silently losing
  them
- How to log every run — success or failure — so the package proves
  what it did without you watching it run
- How all three pieces fit into the package you already built, without
  starting over

## The problem with truncate-and-reload

Lesson 47's package works, but it doesn't scale: every run re-extracts
every order that has ever existed in `AdventureWorks2012`, even the
ones loaded five runs ago. On a small lab table that's invisible. On a
real orders table with millions of rows, it's a package that gets
slower every single day. Chapter 7's incremental load pattern
(Lesson 36) exists exactly for this.

## Adding a watermark

1. Create one small control table in `AdventureWorksDW2014` to hold the
   watermark:

   ```sql
   CREATE TABLE dbo.CapstoneLoadControl (
       LastLoadDate DATETIME NOT NULL
   );
   INSERT INTO dbo.CapstoneLoadControl (LastLoadDate) VALUES ('1900-01-01');
   ```

2. Add a package variable, `User::LastLoadDate` (`DateTime`) — Chapter
   5, Lesson 26.
3. Add a new **Execute SQL Task**, *before* the data flow, that reads
   `CapstoneLoadControl` and maps the result into `LastLoadDate`.
4. Change the OLE DB Source's query to filter on it, using a
   parameter:

   ```sql
   SELECT
       soh.SalesOrderID, soh.OrderDate, soh.ModifiedDate,
       sod.ProductID, sod.OrderQty, sod.UnitPrice, sod.LineTotal
   FROM Sales.SalesOrderHeader AS soh
   JOIN Sales.SalesOrderDetail AS sod
       ON sod.SalesOrderID = soh.SalesOrderID
   WHERE soh.ModifiedDate > ?;
   ```

5. Add one more **Execute SQL Task**, *after* the data flow succeeds,
   that updates `CapstoneLoadControl` to the current run's time. The
   destination no longer needs truncating — remove that task, or leave
   it disconnected — since every run now only extracts what's new since
   the last successful run.

```
[Get Watermark] -> [Data Flow: Extract WHERE ModifiedDate > watermark] -> [Update Watermark]
```

## Redirecting bad rows instead of losing them

Lesson 47 let the Lookup's error output quietly drop unmatched rows.
That's the kind of silent data loss Chapter 6 exists to stop.

1. On the Lookup transformation, change its error-output setting from
   *Fail Component* to **Redirect Row** (Chapter 6, Lesson 32).
2. Send that redirected output to a new **Flat File Destination**,
   `capstone_lookup_errors.csv`, so every unmatched `ProductID` is
   captured, not discarded.
3. On the OLE DB Destination itself, do the same: redirect its error
   output to a second flat file, `capstone_load_errors.csv`, for rows
   that fail to insert (a truncated string, a type mismatch — anything
   the destination itself rejects).

## Logging every run

1. Add an **OnError** event handler (Chapter 6, Lesson 31) on the Data
   Flow Task that inserts a row into a simple log table —
   `dbo.CapstoneRunLog (RunTime, PackageName, ErrorMessage)` — so a
   failure leaves a record even if nobody was watching the console.
2. Turn on the **SSIS log provider for SQL Server** at the package
   level (Chapter 6, Lesson 33) so `OnPreExecute`/`OnPostExecute` events
   land in `sysssislog` automatically, giving you a full run history for
   free, on top of the custom log table.
3. Optionally, enable a **checkpoint file** on the package (Chapter 6,
   Lesson 34) so a mid-run failure can restart from the failed task
   instead of the very beginning — useful once the package has more
   than the two or three tasks it has today.

## Key terms

| Term | Meaning |
|---|---|
| Watermark | A stored value (here, a date) marking how far a previous run got, used to filter the next run to only new/changed rows |
| Incremental load | Extracting only rows that changed since the last successful run, instead of reloading everything |
| Redirect Row | An error-output setting that sends failing rows down a separate path instead of failing the whole component |
| Event handler | Package-level logic (like OnError) that runs in response to something happening during execution |

## Lab

1. Add the watermark control table, variable, and both Execute SQL
   Tasks to your Lesson 47 package; update the source query to filter
   on `ModifiedDate`.
2. Change both the Lookup's and the OLE DB Destination's error
   handling to Redirect Row, and add the two flat file destinations.
3. Add the OnError event handler and the SQL Server log provider.
4. Run the package twice. The first run should load every order that
   currently exists; the second run — with no new orders since — should
   load zero rows, proving the watermark is actually working.

## Check yourself

You're ready for Lesson 49 when your package no longer truncates
anything, a row that fails the Lookup lands in a CSV instead of
disappearing, and you can point to exactly where a failure would get
logged if one happened tonight while you were asleep.
