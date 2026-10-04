# Lesson 21 — Thresholds and Tolerances

**Chapter 4 · Rules and Checks · Lesson 21 of 30**

## What you'll learn

- Why "zero failures" is the wrong default target for most checks
- The difference between a hard threshold and a tolerance band
- How to write a check that only fires when a rate crosses a
  deliberately chosen line
- How to use `HAVING` to threshold an aggregated check directly in SQL

## Why "zero" is usually the wrong target

Every check so far in this chapter returns every violating row,
every time. In practice, a handful of violations in a 2-million-row
table is often *expected* — a few late-arriving records, a few
legitimately unusual values, a known gap in an upstream feed that's
already being fixed. Treating every single violation as equally urgent
either trains everyone to ignore the alerts, or burns the team out
chasing noise.

**Thresholds and tolerances** turn a check from "did anything fail?"
into "did *enough* fail to actually matter?" — and the lessons before
this one (completeness, accuracy, reconciliation) all produced the
exact kind of rate or count a threshold needs.

## Hard thresholds vs. tolerance bands

| Concept | What it means | Example |
|---|---|---|
| **Hard threshold** | A single line — cross it, and the check fails | "Alert if more than 50 orders are missing a shipping address" |
| **Tolerance band** | A range around an expected value — only alert outside the range | "Alert if daily order count is outside 950–1,050 (expected ~1,000)" |

Hard thresholds suit counts and rates with a clear "too much is
always bad" direction (missing data, orphaned rows). Tolerance bands
suit reconciliation and volume checks where *both* too high and too
low are suspicious (a sudden spike can mean a duplicate load, not just
a drop can mean a missed one).

## Writing a hard threshold check

Take the completeness rate pattern from Lesson 12 and add a threshold
directly in the query, using `HAVING` on the aggregated result:

```sql
SELECT
    COUNT(*) AS TotalOrders,
    SUM(CASE WHEN ShippingAddress IS NULL THEN 1 ELSE 0 END) AS MissingAddress
FROM dbo.Orders
HAVING SUM(CASE WHEN ShippingAddress IS NULL THEN 1 ELSE 0 END) > 50;
```

This query returns **a row only when the threshold is actually
crossed** — zero rows back means "fine, no alert needed," which is
exactly the shape an automated job (Lesson 22) wants to check against.

## Writing a tolerance band check

```sql
SELECT
    CAST(GETDATE() AS DATE) AS CheckDate,
    COUNT(*) AS TodayOrderCount
FROM dbo.Orders
WHERE CAST(OrderDate AS DATE) = CAST(GETDATE() AS DATE)
HAVING COUNT(*) NOT BETWEEN 950 AND 1050;
```

Same shape as the hard threshold — a row comes back only when
today's count falls outside the expected band, in *either* direction.

## Where the numbers themselves come from

A threshold is only as good as the number behind it, and that number
should never be a guess. Three common, defensible sources:

- **Historical baseline** — look at 90 days of the metric and set the
  band around its actual observed range (mean ± a few standard
  deviations, or simply min/max with a margin)
- **Business SLA** — a number someone already promised ("shipping
  address required for 98% of orders," agreed with the fulfillment
  team)
- **Regulatory or contractual requirement** — a number that isn't
  negotiable (certain compliance reporting has hard-coded accuracy
  requirements)

Whichever source you use, document it the same way you documented
rule ownership in Lesson 17 — a threshold with no stated justification
is just as fragile as a rule with no owner.

## Key terms

| Term | Meaning |
|---|---|
| Hard threshold | A single line that, once crossed, triggers a failure |
| Tolerance band | An expected range; values outside it in either direction trigger a failure |
| Baseline | A historical range of normal values used to justify a threshold |

## Lab

1. Take any completeness or count check you've written in this
   chapter and add a `HAVING` clause that only returns a row once a
   threshold you choose is crossed.
2. Write a second query using a tolerance band (`NOT BETWEEN`) for a
   count-style metric.
3. In a comment above each query, state which of the three threshold
   sources (historical baseline, business SLA, regulatory requirement)
   justifies the number you picked, and why.

## Check yourself

- Why is "alert on any failure at all" usually the wrong default for
  a high-volume check?
- When would a tolerance band be more appropriate than a hard
  threshold?
- Why does a threshold need a documented justification, the same way
  a rule needs a documented owner?
