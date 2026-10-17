# Building the Executive Dashboard

Everything so far has been building the data. This lesson builds the two numbers leadership
actually asked for in Lesson 1 — Monthly Recurring Revenue and churn — as real DAX measures over
Lesson 4's marts, the same measure-writing skills from the Power BI course applied to Driftwood's
actual grain and business rules.

## What you'll learn

- How to write an MRR measure correctly against `fct_subscriptions`' event-level grain
- How to write a churn-rate measure using the cancellation data in `dim_subscribers`
- Why both measures are written with `CALCULATE` and explicit filters, not a plain `SUM`

## MRR: summing the right rows, not just the right column

`fct_subscriptions` is event-grained — one row per signup, upgrade, or cancel, not one row per
subscriber per month. A plain `SUM(fct_subscriptions[amount_usd])` would add up *every* event
ever recorded, including cancellations (which should reduce revenue, not inflate it) and every
historical upgrade event, not just currently-active revenue:

```dax
MRR =
CALCULATE(
    SUM(fct_subscriptions[amount_usd]),
    fct_subscriptions[event_type] IN { "signup", "upgrade" },
    dim_subscribers[cancelled_at] = BLANK()
)
```

The `CALCULATE` here does two things a plain `SUM` can't: it filters to only revenue-generating
event types (excluding `cancel` rows, which record a cancellation event, not a negative revenue
line), and it filters to subscribers whose `cancelled_at` is still blank — meaning they're
currently active. Both filters are necessary; either one alone would overcount.

## Churn rate: a ratio, not a count

```dax
Subscribers Cancelled This Month =
CALCULATE(
    DISTINCTCOUNT(dim_subscribers[subscriber_id]),
    dim_subscribers[cancelled_at] >= STARTOFMONTH(TODAY()),
    dim_subscribers[cancelled_at] <= TODAY()
)

Active Subscribers Start of Month =
CALCULATE(
    DISTINCTCOUNT(dim_subscribers[subscriber_id]),
    dim_subscribers[first_seen_at] < STARTOFMONTH(TODAY()),
    OR(dim_subscribers[cancelled_at] = BLANK(), dim_subscribers[cancelled_at] >= STARTOFMONTH(TODAY()))
)

Churn Rate =
DIVIDE(
    [Subscribers Cancelled This Month],
    [Active Subscribers Start of Month]
)
```

`DIVIDE` (rather than a plain `/`) is the detail worth noticing — it returns `BLANK()` instead of
an error when the denominator is zero, which matters the first month this dashboard runs with no
historical "start of month" baseline yet. `Active Subscribers Start of Month` itself is its own
small piece of reasoning: a subscriber counts as active at the start of the month if they'd
already signed up before the month began, *and* either never cancelled or cancelled on or after
the month started — getting this filter wrong (for example, forgetting the `OR`) would undercount
the denominator and overstate churn.

## Putting both on the dashboard

The executive dashboard built from these measures is deliberately simple — leadership asked for
one trustworthy number, not a feature-complete analytics tool:

```
[Card: MRR]              [Card: Churn Rate]          [Card: Active Subscribers]
[Line chart: MRR by month, last 12 months]
[Table: Churn Rate by month, last 12 months]
```

Both measures slice cleanly by month using the same time-intelligence patterns from the Power BI
course's DAX chapters — no new DAX concepts beyond `CALCULATE`, `DIVIDE`, and date filtering, just
applied correctly to Driftwood's actual grain and business rules instead of a generic example
dataset.

## Key terms

| Term | Meaning |
|---|---|
| MRR | Monthly Recurring Revenue — summed only over active-subscriber, revenue-generating events |
| DIVIDE | DAX's safe-division function, returning BLANK() instead of an error on a zero denominator |
| Event-grain vs. subscriber-grain | fct_subscriptions is one row per event; dim_subscribers is one row per subscriber — mixing them up in a measure produces a wrong number silently |

## Check yourself

Why would a plain `SUM(fct_subscriptions[amount_usd])`, with no `CALCULATE` filters, produce a
wrong MRR number for Driftwood — name both specific ways it would be wrong.
