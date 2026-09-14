# Lesson 48 — LLMs for Automated Data Documentation

**Chapter 3 · AI for Data Engineers (Bonus) · Lesson 48 of 81**

## What you'll learn

- How to draft table and column descriptions from schema plus sample rows
- Why sample data matters as much as column names for a useful draft
- A concrete case where a generated description is plausible and wrong
- Why a human still has to review documentation before it ships
- Where this fits next to the DAX/data documentation habits from earlier courses

## Why documentation gets skipped, and why AI helps here

Writing table and column descriptions is exactly the kind of task that
gets postponed indefinitely on a real team — it's necessary, it's not
urgent, and it's tedious to write from scratch for forty columns. This is
one of AI's genuinely strong spots: give it the schema and a handful of
real sample rows, and it drafts a first pass fast.

## The prompt: schema plus sample rows, not schema alone

Column names alone underdetermine what a column means. `status` could be
an order status, a shipment status, a data-quality status — the sample
values disambiguate it. A useful documentation prompt supplies both:

```
Table: Orders
Columns: order_id (int), customer_id (int), status (string),
         order_date (date), total_amount (decimal)
Sample rows:
  1001, 501, "SHIPPED",   2026-08-02, 129.99
  1002, 502, "CANCELLED", 2026-08-03, 0.00
  1003, 501, "PENDING",   2026-08-04, 54.50

Draft a one-sentence description for each column.
```

## The draft, and where it goes wrong

A plausible draft comes back fast:

```
status: The current status of the order (e.g. SHIPPED, CANCELLED,
        PENDING).
total_amount: The total dollar amount charged for the order.
```

That second line is a reasonable-sounding guess — and it's wrong for row
1002. A cancelled order shows `total_amount = 0.00`, meaning this column
almost certainly reflects **the amount actually charged**, not the
original order value before cancellation. The three sample rows contain
exactly the evidence needed to catch this, but the model's one-sentence
draft glossed right over it.

## The review that catches it

```
1. Does the draft description hold for every sample row shown,
   not just the typical-looking ones? (row 1002 breaks it)
2. Would a teammate reading this description draw the wrong
   conclusion about a cancelled order's total_amount?
3. Ask the person or system that actually owns this table —
   documentation is a claim about the business, not just the data
```

The corrected description matters here specifically because it's the kind
of subtle error that looks completely fine until someone builds a revenue
report on top of it and undercounts every cancelled order's original
value.

## Key terms

| Term | Meaning |
|---|---|
| Schema plus sample rows | The two inputs a documentation prompt needs — names alone underdetermine meaning |
| Plausible but wrong | A generated description that reads fine and misses an edge case visible in the sample data |
| Ownership review | Checking a drafted description against the person or system that actually defines the column's meaning |

## Check yourself

You're ready for Lesson 49 when you can explain, without looking: why did
sample rows, not just column names, matter for catching the `total_amount`
documentation error?
