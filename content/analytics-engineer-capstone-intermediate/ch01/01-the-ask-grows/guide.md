# Lesson 1 — The Ask Grows: Two Stakeholders, One Orders Model

**Chapter 1 · Intermediate Capstone: The Orders Analytics Layer · Lesson 1 of 16**

## What you'll learn

- Where this capstone picks up from the Beginner project's customer mart
- The two real stakeholders behind this project, and what each one
  actually needs
- Why both asks point at the same underlying table — `raw_orders`
- The one fact about that table that will shape almost every decision
  in this chapter

## Where you left off

The Beginner tier of this capstone built one thing: a `customers`
mart, staged from the real dbt Labs `jaffle_shop` seed data
(`raw_customers`) and enriched with order history. That mart works,
it's tested, and it answers "who are our customers." It does not
answer anything about revenue trends or order fulfillment — and now
two different people want exactly that.

## Stakeholder 1: Finance

Finance's ask is blunt: "We need a number we trust for revenue, by
day, by payment method, that doesn't move when we're not expecting it
to." They don't care about the model layer underneath. They care that
the number on their report this week matches the number next week,
for the same date range, every time they pull it.

## Stakeholder 2: Ops

Ops's ask is different in shape but comes from the same table: "We
need to see how many orders are sitting in each status —
`placed`, `shipped`, `completed`, `returned` — so we know where
orders are piling up." Where Finance wants a trustworthy sum, Ops
wants a trustworthy count, broken out by a status column.

## One table underneath both asks

Both requests trace back to the same real source: `raw_orders`, the
jaffle_shop seed table holding every order ever placed, one row per
order, with a `status` column and a `user_id` that ties back to the
customers mart you already built. Finance's revenue number and Ops's
status counts are two different *views* over the same orders data —
which means one well-built orders layer can serve both, instead of
Finance and Ops each getting a one-off query that quietly drifts out
of sync with the other.

## The fact that changes everything downstream

Here's the detail that matters for the rest of this chapter:
`raw_orders` isn't a static seed file anymore in this scenario — it's
a table that gets new rows every single day the shop is open. A model
built the simple way, re-reading the entire order history from
scratch on every run, works fine today. It will not stay fine as that
history grows into months and years of orders. Keep that in mind —
Lesson 5 comes back to it directly, once you've actually built the
model that will need to change.

## Key terms

| Term | Meaning |
|---|---|
| `raw_orders` | The real jaffle_shop seed table: one row per order, with `status` and `user_id` |
| Stakeholder | A real person or team with a specific, concrete need from the data — not just "the business" |
| Model layer | The staging → intermediate → marts structure a project builds to serve more than one downstream need from one source |

## Lab

Open your Beginner project. Confirm you can see `raw_customers` and
`raw_orders` as declared sources (or add `raw_orders` now if it isn't
declared yet). Run a plain `select status, count(*) from raw_orders
group by 1` in Snowflake and write down what statuses actually exist
in the real data — you'll need that exact list again in Lesson 8.

## Check yourself

You're ready for Lesson 2 when you can state, in one sentence each,
what Finance needs and what Ops needs — and explain why both needs
come from the same single source table.
