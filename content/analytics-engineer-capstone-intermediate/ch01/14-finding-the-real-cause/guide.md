# Lesson 14 — Finding the Real Cause

**Chapter 1 · Intermediate Capstone: The Orders Analytics Layer · Lesson 14 of 16**

## What you'll learn

- Checking row counts before and after a join, instead of assuming
  what a join does
- Running a controlled test against `raw_payments` directly to
  confirm a hypothesis before touching any model
- The specific mechanical explanation for why this duplicates rows
- Why this exact bug is easy to make and easy to miss when a join is
  first written

## Step 1: check the row counts on either side of the join

Lesson 4's `int_orders__joined` has no payments join — it's
orders-to-customers only. Lesson 6's `fct_orders` adds payments. Count
both:

```sql
select count(*) from int_orders__joined;   -- one row per order
select count(*) from fct_orders;           -- should be the same...
```

If `fct_orders`'s count is higher than `int_orders__joined`'s, the
payments join is adding rows, not just columns — a join is only
supposed to add columns when each row on the left matches at most one
row on the right.

## Step 2: confirm the hypothesis with a controlled test

Don't just suspect the payments join — prove it. Query `raw_payments`
directly for the specific duplicated `order_id`s found in Lesson 13:

```sql
select order_id, count(*)
from raw_payments
where order_id in (/* the duplicated order_ids from Lesson 13 */)
group by 1
```

This returns `count(*) > 1` for exactly those order IDs — confirming
`raw_payments` is **not** one row per order. That's a controlled
experiment: you checked the one specific table the join reads from,
for the one specific set of rows the symptom points at, and it
confirms the hypothesis exactly.

## Step 3: understand exactly why this happened

Here's the full mechanical explanation:

- A real order can be paid for with more than one payment method — a
  split payment, for example part gift card, part credit card. In the
  real jaffle_shop data, that means `raw_payments` legitimately has
  **more than one row for the same `order_id`** on exactly those
  orders.
- `fct_orders`'s `left join payments on orders.order_id =
  payments.order_id` matches each order row against *every* payments
  row sharing that `order_id` — one order row paired with two payment
  rows produces two output rows, not one. That's a one-to-many join
  fanout, not a one-to-one join.
- Every column copied straight from `orders` (`customer_id`,
  `order_date`, `status`) gets silently duplicated along with it. Any
  `SUM(amount)` over this table is now counting some orders' revenue
  twice.
- This was invisible until recently specifically because most orders
  in the earlier, smaller dataset happened to have exactly one
  payment row — the fanout was always structurally possible, but
  statistically rare until more orders (and more split payments)
  accumulated through the incremental runs.

## Why this is a realistic bug, not a contrived one

Nothing about the join syntax is wrong SQL — `left join ... on
order_id = order_id` is completely correct SQL for a one-to-one
relationship. The bug is an assumption: that `raw_payments` has at
most one row per order. It doesn't, and nothing about reading the SQL
alone reveals that — only checking the actual data does, which is
exactly why Step 1 and Step 2 above matter more than reading the join
one more time.

## Key terms

| Term | Meaning |
|---|---|
| Join fanout | A join where one left-side row matches more than one right-side row, multiplying output rows |
| Split payment | A real order paid with more than one payment method/row in `raw_payments` |
| Controlled test | Querying the exact suspect table for the exact suspect rows, to confirm (not assume) a hypothesis |

## Lab

Run the row-count comparison and the `raw_payments` controlled query
above against your own project. Confirm the duplicated `order_id`s
from Lesson 13 are exactly the ones with more than one `raw_payments`
row.

## Check yourself

You're ready for Lesson 15 when you can explain, specifically, why
the join's SQL syntax was never the bug — and what *was*.
