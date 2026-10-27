# Lesson 10 — Automating Index Maintenance

**Chapter 1 · Intermediate Capstone: Two Departments, One Performance Problem · Lesson 10 of 16**

## What you'll learn

- Why Lesson 7's fix doesn't stay fixed forever on its own
- Measuring real fragmentation with `sys.dm_db_index_physical_stats`
- A real REBUILD vs. REORGANIZE decision script, not a blanket rule
- Why this has to run on a schedule, not just once

## Both fixes are real, and both can quietly erode

Lesson 7's new index and Lesson 9's shorter transaction both work —
today. Every `INSERT`, `UPDATE`, and `DELETE` against `dbo.Invoices`
after this point can still force page splits that gradually
fragment `IX_Invoices_PatientID`, the same way any index degrades
over time. A fix that isn't maintained is a fix with an expiration
date nobody wrote down.

## Measuring fragmentation for real

```sql
SELECT
    OBJECT_NAME(ips.object_id) AS table_name,
    i.name AS index_name,
    ips.avg_fragmentation_in_percent,
    ips.page_count
FROM sys.dm_db_index_physical_stats(DB_ID(), NULL, NULL, NULL, 'LIMITED') AS ips
JOIN sys.indexes AS i
    ON ips.object_id = i.object_id AND ips.index_id = i.index_id
WHERE ips.page_count > 500
ORDER BY ips.avg_fragmentation_in_percent DESC;
```

Filtering to `page_count > 500` matters as much as the fragmentation
percentage: a small index at 80% fragmented isn't worth touching,
because the whole thing fits in a handful of reads regardless of
physical order. Fragmentation only costs real I/O once an index is
big enough for its layout to matter.

## A real REBUILD vs. REORGANIZE decision script

```sql
DECLARE @table sysname, @index sysname, @frag float;

DECLARE frag_cursor CURSOR FOR
SELECT OBJECT_NAME(ips.object_id), i.name, ips.avg_fragmentation_in_percent
FROM sys.dm_db_index_physical_stats(DB_ID(), NULL, NULL, NULL, 'LIMITED') AS ips
JOIN sys.indexes AS i ON ips.object_id = i.object_id AND ips.index_id = i.index_id
WHERE ips.page_count > 500 AND i.name IS NOT NULL;

OPEN frag_cursor;
FETCH NEXT FROM frag_cursor INTO @table, @index, @frag;
WHILE @@FETCH_STATUS = 0
BEGIN
    IF @frag >= 30.0
        EXEC('ALTER INDEX ' + @index + ' ON dbo.' + @table + ' REBUILD WITH (ONLINE = ON);');
    ELSE IF @frag >= 5.0
        EXEC('ALTER INDEX ' + @index + ' ON dbo.' + @table + ' REORGANIZE;');
    FETCH NEXT FROM frag_cursor INTO @table, @index, @frag;
END
CLOSE frag_cursor; DEALLOCATE frag_cursor;
```

Below 30% fragmented, `REORGANIZE` — lighter, always online. At or
above 30%, `REBUILD WITH (ONLINE = ON)` — thorough, heavier, but still
non-blocking. This mirrors exactly the trade-off real DBA maintenance
tooling (Ola Hallengren's widely-used Maintenance Solution being the
real community standard most shops install rather than reinventing)
makes automatically.

## Why "run it once" isn't the answer

Running this script once fixes today's fragmentation and tells you
nothing about next month's. `IX_Invoices_PatientID` will fragment
again the moment real write traffic resumes against `dbo.Invoices` —
which is every single business day at Overlook Medical Group. This
has to run on a schedule, which Lesson 11 sets up for real on Azure
SQL Database specifically.

## Key terms

| Term | Meaning |
|---|---|
| `sys.dm_db_index_physical_stats` | The real DMV measuring fragmentation and page count per index |
| REBUILD | Full defragment; heavier, used at higher fragmentation |
| REORGANIZE | Lighter, always-online partial defragment, used at lower fragmentation |

## Lab

Run the fragmentation query against your own practice database.
Confirm `IX_Invoices_PatientID`'s `page_count` and current
fragmentation, and trace through the decision script's logic by hand
for that one row.

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: why
does filtering to `page_count > 500` matter as much as the
fragmentation percentage itself, and why does running the maintenance
script once not solve the problem long-term?
