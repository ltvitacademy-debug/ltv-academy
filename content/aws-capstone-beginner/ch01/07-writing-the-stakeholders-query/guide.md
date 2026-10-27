# Writing the Stakeholder's Real Query

**Chapter 1 · Beginner Capstone: First Look at the Files · Lesson 7 of 10**

## What you'll learn

- The real SQL query that answers the Operations Manager's exact question
- Why `quantity * unit_price` has to be calculated per row before it's summed
- What the actual result reveals — and why it's more interesting than one number

## Back to the real requirement

Lesson 1 turned the vague ask into a specific one:

> *"For August 2026, show total units sold and total revenue by product category, from the
> order export files already sitting in `northfield-raw-zone`, so the Operations Manager
> can decide what to restock first."*

Every piece of that is now available: `product_category`, `quantity`, and `unit_price` all
live in `orders_raw`, and the table is already scoped to August 2026 because that's the
only month that was ever uploaded.

## The query

```sql
SELECT
  product_category,
  SUM(quantity)              AS total_units,
  ROUND(SUM(quantity * unit_price), 2) AS total_revenue
FROM northfield_raw_db.orders_raw
GROUP BY product_category
ORDER BY total_units DESC;
```

Three things worth noticing:

- `quantity * unit_price` is computed **per row**, inside the `SUM()`, not after
  aggregating — multiplying already-summed totals would silently produce the wrong
  number, since `SUM(quantity) * SUM(unit_price)` is not the same calculation as
  `SUM(quantity * unit_price)`.
- `GROUP BY product_category` collapses every order line into one row per category.
- `ORDER BY total_units DESC` answers "sold the most" directly — the category on top is
  the answer to half the question.

## Reading the real result

```
product_category   | total_units | total_revenue
--------------------|-------------|---------------
Camp Kitchen        | 1,842       | 63,410.50
Footwear            | 1,510       | 118,920.00
Tents & Shelters    | 967         | 183,480.65
Apparel             | 1,340       | 51,260.00
Climbing & Safety   | 402         | 28,940.10
```

This is why the clarified question mattered back in Lesson 1: **Camp Kitchen sold the most
units**, but **Tents & Shelters earned the most revenue** — fewer orders, much higher price
per item. If the Operations Manager had only asked for units, the restock conversation
would have missed the category actually driving the most money. Lesson 9 covers exactly
how to present a result with two valid "winners" without confusing the stakeholder.

## A quick sanity check

Before trusting any aggregate, it's worth spot-checking one category by hand against a raw
row or two — confirm `total_revenue` for Climbing & Safety roughly matches what a handful
of individual orders in that category would add up to. Aggregation bugs are invisible
until you check.

## Key terms

| Term | Meaning |
|---|---|
| Aggregation | Combining many rows into a summary value, here per category |
| `GROUP BY` | SQL clause that defines the grouping grain for aggregate functions |
| Per-row calculation | A computed value (like `quantity * unit_price`) evaluated before aggregation, not after |

## Check yourself

Why would writing `SUM(quantity) * SUM(unit_price)` instead of `SUM(quantity * unit_price)`
produce the wrong revenue number — and why does this project's result need both the units
column and the revenue column to actually answer the stakeholder's real question?
