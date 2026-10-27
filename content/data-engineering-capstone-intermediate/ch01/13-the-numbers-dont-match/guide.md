# Lesson 13 — The Numbers Don't Match — Now What?

**Chapter 1 · Data Engineering Capstone — Intermediate Project · Lesson 13 of 16**

## What you'll learn

- Reproducing a reported reconciliation failure instead of guessing at it
- Re-running Lesson 9's exact validation query against real, current data
- Why isolating one variable — the date range — is the first real diagnostic step
- The specific tell that narrows this bug down before you've touched a single table

## The report comes in

The Regional Manager emails: "I pulled up `gold.category_breakdown` for Store 48 on March 2nd and
the categories add up to $13,897.52. But the Store Ops dashboard, built off `gold.daily_sales_summary`,
shows $15,342.18 in total sales for that exact same store and day. Those two numbers are supposed to
be the same pipeline. Which one is right?"

That's a real production ticket, and "which one is right" isn't something to answer by eyeballing a
dashboard. The first job isn't fixing anything — it's reproducing the problem reliably, with the
validation tool this course already built, before touching a single table.

## Step 1: reproduce it with Lesson 9's query

Lesson 9 built exactly the tool for this. Run it again, unmodified, filtered down to the one
store/day the Regional Manager named:

```sql
WITH category_rolled_up AS (
  SELECT
    store_id,
    sale_date,
    SUM(total_sales) AS rolled_up_sales
  FROM gold.category_breakdown
  WHERE store_id = 48
    AND sale_date = '2024-03-02'
  GROUP BY store_id, sale_date
)
SELECT
  d.store_id,
  d.sale_date,
  d.total_sales       AS daily_summary_sales,
  c.rolled_up_sales   AS category_breakdown_sales,
  ABS(d.total_sales - c.rolled_up_sales) AS diff
FROM gold.daily_sales_summary d
JOIN category_rolled_up c
  ON d.store_id = c.store_id
 AND d.sale_date = c.sale_date
WHERE d.store_id = 48
  AND d.sale_date = '2024-03-02';
```

Run it for real, against the pipeline as it stands today. It comes back with exactly one row:

| store_id | sale_date | daily_summary_sales | category_breakdown_sales | diff |
|---|---|---|---|---|
| 48 | 2024-03-02 | 15342.18 | 13897.52 | 1444.66 |

A $1,444.66 gap is not floating-point noise — Lesson 9's tolerance is one cent, and this blows past
it by five orders of magnitude. The report is confirmed. This is a genuine discrepancy, not a
misreading of a dashboard.

## Step 2: isolate the variable — when did this start?

A single bad row tells you *that* something is wrong. It doesn't tell you *when* it started going
wrong, and that's the next thing worth knowing before you go looking for a cause. Widen the same
query to a date range instead of one day, and group by date to see the shape of the problem:

```sql
WITH category_rolled_up AS (
  SELECT store_id, sale_date, SUM(total_sales) AS rolled_up_sales
  FROM gold.category_breakdown
  WHERE store_id = 48
  GROUP BY store_id, sale_date
)
SELECT
  d.sale_date,
  d.total_sales       AS daily_summary_sales,
  c.rolled_up_sales   AS category_breakdown_sales,
  ABS(d.total_sales - c.rolled_up_sales) AS diff
FROM gold.daily_sales_summary d
JOIN category_rolled_up c
  ON d.store_id = c.store_id
 AND d.sale_date = c.sale_date
WHERE d.store_id = 48
  AND d.sale_date BETWEEN '2024-02-15' AND '2024-03-10'
ORDER BY d.sale_date;
```

The result is the real tell. Every day from February 15th through February 29th comes back with
`diff = 0.00` — clean, like it should be. Starting March 1st, every single day shows a nonzero
diff, and the gaps only grow from there. Nothing before March 1st is affected. Everything from
March 1st forward is.

## That pattern is the real lead

A discrepancy that starts cleanly on one specific date and holds steady from there isn't random
data corruption — it's the signature of a **change** that went live on or around that date. Lesson
5 built the correct `MERGE INTO` that keeps `silver.sales_clean` in sync with incoming Bronze data.
If something about that MERGE job changed right around March 1st, this is exactly the kind of
downstream symptom you'd expect: Silver drifts quietly, and the drift shows up here, in Gold, as a
reconciliation failure between two tables that are supposed to agree.

That's a lead, not a conclusion. You haven't looked at the actual MERGE job yet.

## What NOT to do yet

Don't touch `gold.daily_sales_summary`, don't touch `gold.category_breakdown`, and don't re-run the
MERGE job hoping it "fixes itself." You have a reproducible symptom (Store 48, March 2nd, a
$1,444.66 gap) and a strong lead (something changed around March 1st). Lesson 14 confirms the actual
cause before anything gets changed.

## Key terms

| Term | Meaning |
|---|---|
| Reproduce | Confirm a reported problem by re-running a known-good diagnostic query against real data |
| Isolate the variable | Widen or narrow one dimension (here, the date range) to see exactly where a symptom starts and stops |
| Discrepancy | A real, material difference between two numbers that are structurally guaranteed to agree |

## Lab

Run both queries above against your own pipeline (or against the scenario data if you're following
along). Confirm Store 48 shows a clean `diff = 0.00` for every day before March 1st, 2024, and a
nonzero diff for every day from March 1st forward. Write down the exact date the pattern changes.

## Check yourself

Without looking back: what two concrete numbers confirmed this was a genuine discrepancy and not
rounding noise, and what specific pattern — not just "the numbers are wrong" — tells you roughly
*when* the underlying cause started, before you've looked at a single line of pipeline code?
