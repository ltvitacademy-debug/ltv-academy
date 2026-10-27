# Lesson 7 — Creating the Index and Re-Testing

**Chapter 1 · Intermediate Capstone: Two Departments, One Performance Problem · Lesson 7 of 16**

## What you'll learn

- Step 5 of the investigation plan: applying the fix Lesson 6 diagnosed
- Writing a covering nonclustered index from a real missing-index report
- Re-running the query and re-capturing a new execution plan to prove it worked
- Why "it feels faster" is never the actual proof

## Turning Lesson 6's report into a real index

Lesson 6's missing-index report gave you exactly what the new index
needs: `PatientID` as the key (what the query filters on), and
`InvoiceDate`, `Amount`, `Status`, `ProviderID` as included columns
(what the query reads but doesn't filter on):

```sql
CREATE NONCLUSTERED INDEX IX_Invoices_PatientID
ON dbo.Invoices (PatientID)
INCLUDE (InvoiceDate, Amount, Status, ProviderID);
```

Naming the key column first in `ON dbo.Invoices (PatientID)` makes
this a **covering index** for Billing's exact query: every column the
query needs — the filter column and every selected column — now lives
directly in the nonclustered index itself, so SQL Server never has to
make a second trip (a Key Lookup) back to the clustered index to get
the rest of the row.

## Re-running the exact same query

```sql
SELECT InvoiceID, PatientID, ProviderID, InvoiceDate, Amount, Status
FROM dbo.Invoices
WHERE PatientID = @PatientID
ORDER BY InvoiceDate DESC;
```

Run this again, with `Ctrl+M` still on, against the same query Lesson
5 captured a plan for. Don't change the query itself — changing both
the index and the query at once would make it impossible to tell
which change actually fixed anything.

## Reading the new plan

```
SELECT
  |
Index Seek on IX_Invoices_PatientID    <- thin arrow, few rows
  (seeks directly to this PatientID, every needed column included)
```

The `Clustered Index Scan` from Lesson 5 is gone, replaced by an
**Index Seek** on the new index — the optimizer now navigates
straight to the rows for this one `PatientID` instead of reading the
whole table. The `Sort` operator is gone too, because the index
stores rows for a given `PatientID` in a way that already supports
the `ORDER BY` efficiently. Hovering the arrow shows a handful of
rows read, not tens of thousands.

## Why re-testing is the real proof, not a formality

"It feels faster" isn't evidence — table size, server load, and
caching can all make a query feel different from one run to the next
for reasons that have nothing to do with the fix. A new captured
execution plan showing `Index Seek` instead of `Clustered Index Scan`
*is* evidence: it's a structural change in how the optimizer retrieves
the data, not a subjective impression.

## This closes Billing's complaint — not Scheduling's

Billing's invoice lookups are fixed, with concrete before/after proof.
Scheduling's appointment-calendar complaint from Lesson 1 is still
completely unexplained — nothing in this fix touches `dbo.Appointments`.
Lesson 8 picks that up as a separate, second root cause.

## Key terms

| Term | Meaning |
|---|---|
| Covering index | An index that includes every column a query needs, avoiding a Key Lookup |
| `INCLUDE` | Adds non-key columns to a nonclustered index's leaf level |
| Structural proof | A plan showing a changed operator (Scan → Seek) — not a subjective "feels faster" |

## Lab

Create the index above against your own practice `dbo.Invoices`
table, re-run the exact query from Lesson 5, and confirm the new plan
shows `Index Seek` on `IX_Invoices_PatientID` with no `Sort` operator.

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: why
is re-capturing a new execution plan real proof while "it feels
faster" isn't, and why does fixing Billing's query not touch
Scheduling's complaint at all?
