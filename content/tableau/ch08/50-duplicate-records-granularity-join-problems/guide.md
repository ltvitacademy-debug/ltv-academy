# Lesson 50 — Duplicate Records, Granularity & Join Problems

**Chapter 8 · Data Modeling · Lesson 50 of 95**

## What you'll learn

- What "granularity" means for a table, in the same terms you'd use
  for a SQL result set's grain
- Exactly how a join multiplies rows when two tables don't share a
  grain — the classic "fan-out" problem
- Why your `SUM(Sales)` can be dead wrong even though every individual
  row looks correct
- Three ways to detect and fix it in Tableau

## Granularity: the level of detail one row represents

**Granularity** (or "grain") is the level of detail a single row in a
table represents. An Orders table where each row is one order line
item has finer granularity than a Customers table where each row is
one customer. This is the exact same concept you already know from
SQL — it's why `GROUP BY CustomerID` on an unaggregated Orders table
collapses many rows into one per customer.

Joins go wrong specifically when you join two tables with
**different, mismatched granularity** without first aggregating one
side to match the other.

## The fan-out problem, worked through

Say you have:

- **Customers**: 1 row per customer (100 customers)
- **Orders**: 1 row per order (a customer can have several orders)

Join Customers to Orders on CustomerID, and each customer row is
duplicated once for every order that customer placed:

| Step | What happens | Row count |
|---|---|---|
| Customers alone | One row per customer | 100 |
| Orders alone | One row per order | 340 |
| Customers JOIN Orders | Each customer row repeats once per matching order | 340 |

That 340-row result is *correct* for order-level questions ("what did
each order cost?"). But if you now try to answer a customer-level
question — "what's each customer's `Signup Bonus`, summed?" — and
`Signup Bonus` lives on the Customers side, you've just summed a
customer-level value multiple times per customer, once for every order
they placed. The number comes out too high, and every individual row
still looks completely correct — the mistake only shows up in the
aggregate.

## Why this bites you specifically in Tableau

This is exactly why Lesson 47 spent time on relationships vs. joins:
a **relationship** avoids this by aggregating each side to the level
of detail a worksheet actually needs before combining anything. A
**join**, like its SQL counterpart, combines rows immediately at the
row level — so if you reach for a join (Lesson 49) between tables of
different granularity, you inherit this exact fan-out risk, the same
way you would writing the equivalent SQL by hand.

## Detecting it

- **Row count check**: Compare the row count of your joined data
  source against the largest input table. If it's much bigger than
  expected, you likely have a fan-out.
- **Known totals check**: If you know a number should be a specific
  value (e.g., "we have exactly 100 customers"), and
  `COUNTD(CustomerID)` after the join doesn't match, something
  multiplied.
- **Suspiciously round multiplication**: If your total is roughly 3-4x
  what it should be, count how many orders per customer on average —
  that's often the exact multiplier.

## Fixing it

1. **Use a relationship instead of a join** wherever possible —
   Tableau aggregates each side per worksheet, sidestepping fan-out
   entirely.
2. **Aggregate before joining** — if you must join, pre-aggregate the
   "many" side down to one row per key first (e.g., in Tableau Prep,
   or with a pre-aggregated custom SQL query) so both sides share a
   grain.
3. **Use a table calculation or LOD expression** (Chapter 11 covers
   LOD expressions in depth) to compute the customer-level value at
   the customer's grain, independent of how many order rows exist.

## Key terms

| Term | Meaning |
|---|---|
| Granularity / grain | The level of detail one row in a table represents |
| Fan-out | Row duplication caused by joining tables of mismatched granularity |
| Row-level correctness vs. aggregate correctness | Individual joined rows can look right while a SUM/COUNT built on top of them is wrong |

## Lab

1. In the Sample Superstore workbook, note that Orders has multiple
   rows per Order ID (one per line item) while a hypothetical
   "Order Summary" table would have exactly one.
2. If you joined Orders to a one-row-per-order summary table on Order
   ID, predict what would happen to a `SUM` of a summary-level field
   (like a flat shipping fee) versus a `SUM` of `Sales` from the
   Orders table itself.
3. Check your prediction: which one would double-count, and which
   wouldn't?

## Check yourself

You're ready for Lesson 51 when you can explain, using your own
numbers, why joining two tables of different grain can make a SUM too
high even when every row in the joined result is technically correct.
