# Lesson 33 — FLATTEN: Converting Semi-Structured Data to Relational

**Chapter 7 · Semi-Structured Data · Lesson 33 of 60**

> A note on this lesson's visuals: `LATERAL FLATTEN` is a SQL
> function, not a Snowsight UI feature, and after checking Snowflake's
> own Quickstarts (including the semi-structured-data walkthrough used
> in Lessons 31–32) and searching for a dedicated FLATTEN guide, no
> real screenshot of a FLATTEN query result was found anywhere. Rather
> than reuse an unrelated screenshot or fabricate one, this lesson
> uses real, runnable SQL instead — see `sources.json` for exactly
> what was checked.

## What you'll learn

- Why colon notation (Lesson 32) breaks down the moment a JSON field
  is an **array** instead of a single value
- `LATERAL FLATTEN` — the function that turns a JSON array into one
  row per array element
- How to combine `FLATTEN` with the surrounding row's other columns,
  so each array element comes out alongside its parent record's data
- When to reach for `FLATTEN` versus when colon/dot notation (Lesson
  32) is still all you need

## The problem colon notation can't solve

Colon notation is great for a JSON field that holds one value —
`v:company_name::string`. But what about a field that holds an
**array**, like a list of line items on an order, or a list of tags on
a record?

```json
{
  "order_id": 4471,
  "customer": "Acme Corp",
  "line_items": [
    { "sku": "WIDGET-1", "qty": 3, "price": 12.50 },
    { "sku": "GADGET-9", "qty": 1, "price": 44.00 }
  ]
}
```

`v:line_items` gets you the whole array back as one VARIANT value —
still not one row per item. That's what `FLATTEN` is for.

## LATERAL FLATTEN: one row per array element

`FLATTEN` is a table function: it takes a VARIANT array as input and
returns one row per element. `LATERAL` lets it reference columns from
the row it's flattening, so you can pull the array apart *and* keep
the parent record's other fields on each resulting row:

```sql
SELECT
    v:order_id::int      AS order_id,
    v:customer::string   AS customer,
    item.value:sku::string   AS sku,
    item.value:qty::int      AS qty,
    item.value:price::number(10,2) AS price
FROM raw_orders,
LATERAL FLATTEN(input => v:line_items) AS item;
```

For the JSON above, this returns two rows — one per line item — each
carrying `order_id` and `customer` from the parent object alongside
that item's own `sku`, `qty`, and `price`. This is exactly the shape a
reporting table needs: one row per fact (line item), with its
dimensional context (order, customer) attached.

`item.value` is the flattened element itself; `FLATTEN` also exposes
`item.index` (the array position), `item.key` (for object flattening),
and `item.this` (the full parent value), which come up in more
advanced cases than this lesson needs.

## When you don't need FLATTEN

If every field you need is a scalar value — a string, a number, a
date — colon/dot notation from Lesson 32 is simpler and enough.
Reach for `FLATTEN` specifically when a field is an **array** and you
need one row per element, not one row per parent record.

## Key terms

| Term | Meaning |
|---|---|
| `FLATTEN` | A table function that turns a VARIANT array into one row per element |
| `LATERAL` | Lets `FLATTEN` reference the current row's other columns while it flattens |
| `item.value` | The flattened element itself, inside a `LATERAL FLATTEN` |
| `item.index` | The array position of the flattened element (0-based) |

## Lab

1. Create a table with one `VARIANT` column and load a small JSON
   file where at least one field is an array (orders with line items,
   or a similar shape).
2. Write a `LATERAL FLATTEN` query that returns one row per array
   element, with the parent record's other fields included on each
   row.
3. Confirm the row count equals the total number of array elements
   across all your source records, not the number of source records.

## Check yourself

You're ready for Lesson 34 when you can explain, in one sentence, why
colon notation alone can't turn a JSON array into multiple rows — and
you've written a working `LATERAL FLATTEN` query yourself.
