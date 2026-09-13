# Lesson 15 — The Marts Layer

**Chapter 3 · Staging, Intermediate & Marts · Lesson 15 of 45**

## What you'll learn

- What "business-conformed" means, and why marts are the layer where
  data finally becomes that
- Why marts models are deliberately wide and denormalized instead of
  clean and normalized
- How marts are materialized, and why that changes as a project grows
- The naming anti-patterns dbt Labs explicitly warns against

## From source-conformed to business-conformed

The whole arc of this chapter, staging through marts, moves data from
**source-conformed** (shaped by whatever system happened to produce
it) to **business-conformed** (shaped by what the business actually
means when it says "an order" or "a customer"). The marts layer is
where that arc ends. A mart is an **entity-grained** table — each row
is one discrete instance of a business concept — built to directly
answer the questions people in the business actually ask about that
entity, with everything relevant already joined and computed in.

## Wide and denormalized, on purpose

Marts intentionally pack in far more than a normalized data model
would allow: order costs, item counts, boolean flags like
`is_food_order` — anything a mart's users would otherwise have to
compute themselves. This isn't messiness; it's the point. Storage is
cheap; compute — and an analyst's time re-deriving the same logic
every dashboard — is expensive. A mart absorbs that cost once, at
build time, so nobody downstream pays it again.

```sql
-- orders.sql (dbt Labs' own example)
with orders as (
    select * from {{ ref('stg_orders') }}
),
order_items_summary as (
    select
        order_id,
        sum(supply_cost) as order_cost,
        count(order_item_id) as count_order_items,
        sum(case when is_food_item then 1 else 0 end) as count_food_items
    from {{ ref('order_items') }}
    group by 1
)
select
    orders.*,
    order_items_summary.order_cost,
    order_items_summary.count_order_items,
    order_items_summary.count_food_items > 0 as is_food_order
from orders
left join order_items_summary on orders.order_id = order_items_summary.order_id
```

Notice the mart references `ref('stg_orders')` *and* `ref('order_items')`
— marts are allowed to build on other marts, not just intermediate
models, as long as the result stays readable. If a mart needs to join
four or five separate concepts, that's the signal to push some of that
work back into an intermediate model instead.

## Naming: by entity, not by department or time window

dbt Labs' guidance is direct about two anti-patterns to avoid:

- **Don't name marts by time rollup** — `orders_per_day` describes a
  metric, not an entity; metrics belong in queries or a semantic layer,
  not baked into a table name.
- **Don't create departmental duplicates** — `finance_orders` and
  `marketing_orders` as two separate marts describing the same
  underlying entity is exactly the kind of drift this layer exists to
  prevent. One `orders` mart, used by everyone.

Marts are named in plain English, by the entity they represent —
`customers`, `orders`, `products` — and grouped into subfolders by
business area only once a project has grown past roughly ten marts.

## Materialization grows with the project

Marts start life materialized as **views**. As query performance
degrades under real usage, they get converted to **tables**. Once the
*build* itself becomes too expensive to run in full every time,
**incremental models** (Chapter 5) take over. That progression —
view, then table, then incremental — is deliberate: don't pay for
infrastructure a project doesn't need yet.

## Key terms

| Term | Meaning |
|---|---|
| Business-conformed | Data shaped by what the business means by a concept, not by the source system that produced it |
| Entity-grained | Each row in a mart is one discrete instance of a business concept (one order, one customer) |
| Denormalization | Deliberately packing related, precomputed data into one wide table instead of splitting it normally |
| Marts anti-pattern | Naming by time rollup (`orders_per_day`) or creating departmental duplicates of the same entity |

## Lab

1. Take an intermediate model from Lesson 14 and build the mart that
   sits on top of it — name it after the entity it represents.
2. Denormalize deliberately: add one or two computed boolean or
   summary columns a real dashboard would otherwise have to derive
   itself.
3. Materialize it as a view for now, and note in a comment what
   condition (row count, query latency) would justify converting it to
   a table later.

## Check yourself

You're ready for Lesson 16 when you can explain why `finance_orders`
and `marketing_orders` as two separate marts is an anti-pattern this
layer is specifically designed to prevent.
