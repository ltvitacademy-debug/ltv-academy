# Lesson 6 — Diagnosing a Missing Index

**Chapter 1 · Intermediate Capstone: Two Departments, One Performance Problem · Lesson 6 of 16**

## What you'll learn

- Confirming Lesson 5's plan reading with `sys.dm_db_missing_index_details`
- Why `dbo.Invoices` has no index that helps a `PatientID` filter
- Reading the optimizer's own suggestion, and what to trust vs. verify
- The exact diagnosis to carry into Lesson 7's fix

## Confirming the hypothesis, not just eyeballing a plan

Lesson 5's plan reading is a strong lead — a full `Clustered Index
Scan` for a highly selective filter — but a real diagnosis confirms
it with evidence, not just a visual impression. SQL Server records
every time the optimizer would have benefited from an index that
doesn't exist:

```sql
SELECT
    d.statement AS table_name,
    d.equality_columns,
    d.inequality_columns,
    d.included_columns,
    s.avg_total_user_cost,
    s.avg_user_impact,
    s.user_seeks + s.user_scans AS times_this_would_have_helped
FROM sys.dm_db_missing_index_details d
JOIN sys.dm_db_missing_index_groups g ON d.index_handle = g.index_handle
JOIN sys.dm_db_missing_index_group_stats s ON g.index_group_handle = s.group_handle
WHERE d.statement LIKE '%Invoices%'
ORDER BY s.avg_user_impact * (s.user_seeks + s.user_scans) DESC;
```

## What this actually returns for `dbo.Invoices`

```
table_name:          [OverlookClinicalDB].[dbo].[Invoices]
equality_columns:    [PatientID]
included_columns:    [InvoiceDate], [Amount], [Status], [ProviderID]
avg_user_impact:     ~87
times_this_would_have_helped:  very high (every clerk, every lookup)
```

`equality_columns` lists `PatientID` — exactly the column the query
filters on with `=`, and exactly what should lead the new index.
`included_columns` lists the other columns the query reads but
doesn't filter on — `InvoiceDate`, `Amount`, `Status`, `ProviderID` —
which is what `INCLUDE` is for in Lesson 7's fix. `avg_user_impact`
near 87 is the optimizer's own estimate that a correctly built index
would eliminate roughly that percentage of this query's current
cost.

## Why no existing index already covers this

`dbo.Invoices` has a clustered index on `InvoiceID` (its primary key)
— efficient for looking up one invoice by ID, but useless for finding
"every invoice for this patient," because `PatientID` isn't the
clustering key and no nonclustered index on `PatientID` exists at
all. Without one, the only way to find a patient's invoices is to
read every row and check each one — exactly the `Clustered Index
Scan` Lesson 5 found.

## Treat the suggestion as a strong hint, not a guarantee

`avg_user_impact` is the optimizer's own estimate, not a measured
fact — Lesson 7 still creates the index and re-captures a real
execution plan to confirm the fix actually worked, rather than
trusting this number alone. That verification step is what separates
a real fix from a guess that happened to look right on paper.

## Key terms

| Term | Meaning |
|---|---|
| `sys.dm_db_missing_index_details` | DMV listing indexes the optimizer wanted but didn't have |
| `equality_columns` | Columns filtered with `=` — what should lead the new index |
| `included_columns` | Non-filter columns the query reads — candidates for `INCLUDE` |
| `avg_user_impact` | The optimizer's own estimated percentage cost reduction |

## Lab

Run the missing-index query above against your own practice
`dbo.Invoices` table. Confirm `PatientID` appears in
`equality_columns` and record the exact `included_columns` list —
you'll use both in Lesson 7's `CREATE INDEX` statement.

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: why
does `dbo.Invoices`'s existing clustered index on `InvoiceID` not help
a query filtering by `PatientID`, and what's the difference between
`equality_columns` and `included_columns` in the missing-index report?
