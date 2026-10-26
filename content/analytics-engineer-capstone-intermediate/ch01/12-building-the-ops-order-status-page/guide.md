# Lesson 12 — Building the Ops Order-Status Page

**Chapter 1 · Intermediate Capstone: The Orders Analytics Layer · Lesson 12 of 16**

## What you'll learn

- Translating Ops's ask from Lesson 1 into a specific measure and
  visual
- Why counting orders by status needs a distinct-count pattern, not a
  plain row count, on this particular model
- A real DAX pattern for "orders older than N days still not
  completed" — the kind of operational alert Ops actually wants
- Why this page's row-count sanity check matters even more than
  Finance's did

## Back to the actual ask

Lesson 1: "We need to see how many orders are sitting in each
status... so we know where orders are piling up." That's a count, by
`status`, on `fct_orders`.

## The core measure — and why it has to be `DISTINCTCOUNT`

```dax
Order Count = DISTINCTCOUNT ( fct_orders[order_id] )
```

This is the detail that matters most on this page: use
`DISTINCTCOUNT(order_id)`, not `COUNTROWS(fct_orders)`. If
`fct_orders` ever has more than one row for the same `order_id` — for
any reason — a plain row count would silently inflate Ops's numbers
right along with it, while `DISTINCTCOUNT` stays correct regardless.
Keep this measure in mind; it's about to matter more than it looks
like it should.

## The required visual

A bar chart or table with `status` on the axis and
`[Order Count]` as the value — directly answering "how many orders
are sitting in each status," using the real status values you
recorded back in Lesson 1's lab.

## An operational alert Ops will actually use

```dax
Orders Stuck =
CALCULATE (
    [Order Count],
    fct_orders[status] <> "completed",
    DATEDIFF ( fct_orders[order_date], TODAY(), DAY ) > 7
)
```

This counts orders that aren't `completed` and were placed more than
seven days ago — a real operational tripwire, not just a status
breakdown, and the kind of measure that turns a reporting page into
something Ops actually checks daily.

## Why the sanity check matters even more here

Run `select count(distinct order_id) from fct_orders` directly in
Snowflake and compare it to `[Order Count]` with no filters in Power
BI. For Finance's revenue page, a mismatch would mean dollars are
off. Here, a mismatch means Ops is being told the wrong number of
orders exist — a more immediately visible kind of wrong, and exactly
the measure that's about to expose a real problem in this model.

## Key terms

| Term | Meaning |
|---|---|
| `DISTINCTCOUNT` | Counts distinct values of a column — stays correct even if a table has duplicate rows per entity |
| `COUNTROWS` | Counts physical rows — silently inflates if the underlying table has duplicates |
| Operational alert measure | A DAX measure built to flag a condition someone should act on, not just report a total |

## Lab

Build `[Order Count]` using `DISTINCTCOUNT`, the status bar chart, and
the `Orders Stuck` measure. Run the Snowflake sanity check and record
whether `DISTINCTCOUNT(order_id)` matches exactly.

## Check yourself

You're ready for Lesson 13 when you can explain, specifically, why
`DISTINCTCOUNT(order_id)` was the safer choice here than
`COUNTROWS(fct_orders)` — even before you've seen whether it actually
matters yet.
