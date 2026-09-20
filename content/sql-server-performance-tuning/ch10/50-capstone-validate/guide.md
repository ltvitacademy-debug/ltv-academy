# Capstone: Validate the Fix

Chapter 1's loop doesn't end at "made a change." It ends at **verify** — measuring again
and confirming the exact bottleneck actually moved, without quietly breaking something
else. This lesson runs that step for real against the new
`IX_Orders_CustomerID_OrderDate` index.

## What you'll learn

- How to compare before/after duration and logical reads for the same execution
- How to confirm the Key Lookup is actually gone from the plan, not just "probably" gone
- How to check that the fix didn't cost anything on the write side

## Re-running the exact same test

Verification only means something if it's measuring the same thing Lesson 48 measured.
Running `dbo.usp_CustomerOrderHistory` for `CustomerID = 48213` (TrailWorks Co-op) again,
with `SET STATISTICS IO, TIME ON`:

```sql
SET STATISTICS IO, TIME ON;
EXEC dbo.usp_CustomerOrderHistory @CustomerID = 48213;
```

**Before:** ~28,000 ms elapsed, ~118,000 logical reads, Key Lookup executed 18,400 times.
**After:** ~85 ms elapsed, ~350 logical reads, **no Key Lookup operator in the plan at
all** — just a single Index Seek against `IX_Orders_CustomerID_OrderDate` that returns
already-sorted, fully-covered rows. That's not "feels faster." That's a specific operator
Lesson 48 named, confirmed gone, with the exact metrics Lesson 48 baselined dropping by
more than 300x on both duration and logical reads.

## Confirming at the wait-stat level too

Chapter 1 warned against declaring victory off a single number. Checking
`sys.dm_os_wait_stats` (or Query Store's wait-stats breakdown for this query) during the
next 10 AM–2 PM window shows `PAGEIOLATCH_SH` waits attributable to this query have
dropped to essentially nothing — consistent with the plan no longer scattering 18,400
random-page reads through the buffer pool per execution. Plan, metrics, and waits all
agree, which is what makes this a verified fix rather than a lucky-looking number.

## Checking you didn't break anything else

Lesson 47's guide called out the classic trap: a change that helps reads while quietly
hurting writes. `dbo.Orders` gets thousands of new rows a day, and every nonclustered
index adds a small maintenance cost to every `INSERT`. But this lesson already dropped
the redundant `IX_Orders_CustomerID` (Lesson 49) — so the table now maintains **the same
number of nonclustered indexes it did before**, just one wider one instead of one narrow
one. Comparing `sys.dm_db_index_usage_stats` write counts and checking Query Store for
any newly-regressed `INSERT` plans against `dbo.Orders` confirms no measurable write-side
regression. The fix improved reads and cost nothing extra on writes — because retiring the
old index, not just adding the new one, was part of the deliberate change.

## What "verified" actually means here

- The specific operator named in diagnosis (Key Lookup) is gone from the plan.
- The specific metrics baselined in diagnosis (duration, logical reads) dropped by orders
  of magnitude, for the same input.
- The specific wait type identified in diagnosis (`PAGEIOLATCH_SH`) dropped correspondingly.
- The specific risk called out up front (write-side regression) was checked and ruled out.

That's four independent confirmations, not one. This is what separates tuning from a
change that merely "feels" faster.

## Key terms

| Term | Meaning |
|---|---|
| SET STATISTICS IO, TIME ON | A session setting that reports logical reads and elapsed/CPU time for each statement executed |
| Before/after comparison | Re-measuring the exact metric baselined in diagnosis, for the same input, after the change |
| Write-side regression | An unintended slowdown to INSERT/UPDATE/DELETE performance caused by a change aimed at reads |
| Verified fix | A change confirmed via plan, metrics, and wait stats together — not a single number or a feeling |

## Check yourself

Why does confirming the fix at three separate levels — the plan shape, the raw metrics,
and the wait stats — matter more than just checking that the query "feels" faster now?
