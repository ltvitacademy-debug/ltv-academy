# Lesson 13 — Feature Engineering, Basics

**Chapter 3 · Working With Data for ML · Lesson 13 of 30**

## What you'll learn

- What feature engineering actually means, beyond the buzzword
- A worked example: turning three raw columns into five useful features
- Common feature engineering patterns you'll reuse constantly
- Why good features often beat a fancier algorithm

## Raw data rarely asks the question you need answered

A model can only learn from the columns you give it. If the real driver of churn is "how often does this customer contact support, relative to how long they've been a customer," but your table only has raw `support_calls` and `signup_date` columns separately, the model has to work much harder to approximate that relationship — if it ever does. **Feature engineering** is the practice of transforming or combining raw columns into new ones that more directly expose the pattern a model needs to learn.

## A worked example

Start with three raw columns a billing system might actually hand you:

```
customer_id | signup_date | last_login     | total_support_tickets
1001        | 2022-03-14  | 2024-06-01     | 7
```

A few engineered features, built from just those three raw columns:

```python
df["tenure_days"] = (today - df["signup_date"]).dt.days
df["days_since_login"] = (today - df["last_login"]).dt.days
df["tickets_per_year"] = (
    df["total_support_tickets"] / (df["tenure_days"] / 365)
)
df["is_recently_active"] = (df["days_since_login"] < 30).astype(int)
df["signup_month"] = df["signup_date"].dt.month   # captures seasonality
```

`tenure_days` and `tickets_per_year` didn't exist in the raw data at all — they're computed relationships, and `tickets_per_year` in particular is often a far stronger churn signal than raw `total_support_tickets`, because it accounts for how long the customer has even had the chance to file tickets. A customer with 7 tickets in 3 months is a very different story than 7 tickets in 3 years, and the raw column alone can't tell those apart.

## Patterns you'll reuse constantly

- **Ratios and rates** — `tickets_per_year`, `spend_per_visit`, `error_rate` — normalize a raw count by exposure (time, visits, opportunities), which is usually more meaningful than the raw count alone.
- **Date/time decomposition** — pull `day_of_week`, `month`, `is_weekend`, or `days_since_X` out of a single timestamp column, since a raw date string carries no numeric meaning a model can use directly.
- **Binning/thresholding** — turning a continuous value into a meaningful flag, like `is_recently_active` above, when the question is really "above or below some meaningful line" rather than the exact number.
- **Combining columns** — `price_per_sqft = price / square_feet` often predicts better than `price` and `square_feet` as two separate features, because it's the actual relationship that matters.
- **Aggregation** — for data with multiple rows per entity (e.g. every transaction a customer ever made), rolling it up to one row per entity with features like `avg_order_value` or `num_orders_last_90_days`.

## Why this often matters more than the algorithm

It's a common, repeatedly-confirmed finding in applied ML: a simple model with well-engineered features frequently beats a sophisticated model fed raw, unprocessed columns. This isn't a knock on complex models — it's that no algorithm can recover information that was never exposed in the input in the first place. `tickets_per_year` makes an obviously useful pattern available to even a plain linear regression; without it, a neural network would have to approximately rediscover division from scratch, using only noisy numeric examples, which is a much harder problem than it sounds.

## Recap

Feature engineering transforms and combines raw columns into new ones that expose the pattern a model actually needs, using patterns like ratios, date decomposition, binning, column combinations, and aggregation. Well-chosen features routinely matter more to final performance than algorithm choice, because no model can learn a relationship that the input data never makes available. Next, we look at a problem feature engineering often runs into directly: what to do when a column has missing data.
