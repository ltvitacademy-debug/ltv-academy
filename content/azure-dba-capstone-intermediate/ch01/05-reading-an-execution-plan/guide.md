# Lesson 5 — Reading an Execution Plan

**Chapter 1 · Intermediate Capstone: Two Departments, One Performance Problem · Lesson 5 of 16**

## What you'll learn

- Step 3 of the investigation plan: reading the actual execution plan for Billing's invoice query
- Estimated vs. actual plans, and why actual is the one to capture here
- Cost percentage, arrow thickness, and operator names — the three things to check, in order
- What this specific plan shows for the query found in Lesson 4

## Capturing the actual plan

```sql
SELECT InvoiceID, PatientID, ProviderID, InvoiceDate, Amount, Status
FROM dbo.Invoices
WHERE PatientID = @PatientID
ORDER BY InvoiceDate DESC;
```

In SSMS, turn on **Include Actual Execution Plan** (`Ctrl+M`) before
running this exact query — the same one Lesson 4 identified as the
top resource consumer. The actual plan includes real row counts from
this specific run, not just the optimizer's estimate, which matters
because estimated-vs-actual divergence is itself a common clue.

## Three things to check, in order

- **Cost percentage.** Every operator shows a cost relative to the
  whole query, always summing to 100%. The highest percentage is
  where the optimizer thinks the time is going.
- **Arrow thickness.** Thicker means more rows flowing between two
  operators. A thick arrow feeding a small final result is a red
  flag — a lot of rows got read and then thrown away.
  Hover any arrow in SSMS to see the exact row count.
- **Operator name.** `Clustered Index Scan` vs. `Index Seek` each
  mean something specific about how the data was actually retrieved.

## What this plan actually shows

For Billing's invoice query, the plan shows a single dominant
operator: a **Clustered Index Scan** on `dbo.Invoices`, at roughly
90% of the total query cost, feeding a thick arrow into a `Sort` for
`ORDER BY InvoiceDate DESC`. Hovering that arrow shows the scan
reading every row in `dbo.Invoices` — tens of thousands of rows
across every patient — to find the handful belonging to one
`@PatientID`.

```
SELECT
  |
Sort (ORDER BY InvoiceDate DESC)          <- thin arrow out
  |
Clustered Index Scan on dbo.Invoices      <- thick arrow in, ~90% cost
  (reads every row, filters PatientID after the fact)
```

That's the opposite of what you'd want: a query asking for one
patient's invoices is reading the entire table to find them, then
sorting whatever matched. Lesson 6 confirms exactly why — there's no
index that lets the optimizer seek directly to a given `PatientID`.

## Why this matches Billing's symptom precisely

A `Clustered Index Scan` reading the whole table costs roughly the
same amount of work regardless of which patient is looked up, and
that cost only grows as `dbo.Invoices` grows — which explains why
billing clerks specifically describe this screen getting slower over
time, and worst during the morning when many clerks run this same
query concurrently against the same busy table.

## Key terms

| Term | Meaning |
|---|---|
| Actual execution plan | Captured from a query that really ran, with real row counts |
| Cost % | Each operator's relative share of total query cost |
| Clustered Index Scan | Optimizer reads the entire table — a red flag for a highly selective query |

## Lab

Capture the actual execution plan for the invoice-lookup query above
against your own practice table. Confirm it shows a `Clustered Index
Scan` rather than a `Seek`, and hover the arrow feeding the `Sort`
operator to record the real row count scanned.

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: why
is a `Clustered Index Scan` the wrong operator for a query filtering
to one specific `PatientID`, and why does this plan's cost stay
roughly constant no matter which patient is looked up?
