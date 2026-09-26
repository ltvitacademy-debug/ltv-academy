# Cleaning & Preparing in Python

The SQL extract in lesson 4 dealt with duplicates and the dollar-sign amounts, but it left the customer attributes raw: mixed date formats, sixteen spellings of four regions, and impossible ages. Cleaning is where careless projects go quietly wrong, so this lesson does three things differently. It applies a fixed, written set of rules. It prints a before-and-after count for every rule. And it reconciles the Python result against the SQL result, so two independent routes to the same numbers give you confidence.

You already know pandas. The interesting part is the judgment behind each rule.

## What you'll learn

- The six cleaning rules used everywhere in this capstone
- How to parse mixed date formats safely and justify the choice
- How to handle impossible values and the leakage caveat around imputation
- How to package the rules in one reusable function
- How to reconcile Python features against SQL features

## The six rules

1. Deduplicate customers on `customer_id`.
2. Parse `signup_date` from its three formats into real dates.
3. Standardize `region`: strip whitespace, title-case.
4. Treat ages below 16 or above 100 as missing, then fill all missing ages with the median.
5. Strip the `$` from `amount` and cast to float.
6. Fill missing `discount_pct` with 0.

Each rule is a decision you could defend to a reviewer. Write the rule first, then the code.

## Load and look

```python
import sqlite3
import numpy as np
import pandas as pd

con = sqlite3.connect("harvest_table.db")
cust = pd.read_sql_query("SELECT * FROM customers", con)
orders = pd.read_sql_query("SELECT * FROM orders", con)
print(cust.shape, orders.shape)
print(orders.amount.map(type).value_counts().to_dict())
```

This prints `(4040, 7) (140643, 7)` and `{<class 'str'>: 140643}`. Every amount, not only the dollar-sign ones, arrives as a string, because the SQLite column is text. Casting is needed regardless.

## Rules 1 to 4: customers

```python
n0 = len(cust)
cust = cust.drop_duplicates("customer_id").reset_index(drop=True)
print("rows", n0, "->", len(cust))

raw = cust.signup_date
parsed = pd.Series(pd.NaT, index=cust.index, dtype="datetime64[ns]")
for fmt in ["%Y-%m-%d", "%d/%m/%Y", "%b %d, %Y"]:
    parsed = parsed.fillna(pd.to_datetime(raw, format=fmt, errors="coerce"))
print("unparsed", parsed.isna().sum(), parsed.min().date(), parsed.max().date())
slash = raw[raw.str.contains("/")]
print(len(slash), "slash dates,", (slash.str[:2].astype(int) > 12).sum(),
      "with a first field above 12")
cust["signup_date"] = parsed

print(cust.region.nunique(), "->", end=" ")
cust["region"] = cust.region.str.strip().str.title()
print(cust.region.nunique(), cust.region.value_counts().to_dict())

bad = (cust.age < 16) | (cust.age > 100)
print("age NaN", cust.age.isna().sum(), "impossible", bad.sum())
cust.loc[bad, "age"] = np.nan
median_age = cust.age.median()
cust["age"] = cust.age.fillna(median_age)
print("median", median_age, "NaN left", cust.age.isna().sum())
```

The output, line by line:

```
rows 4040 -> 4000
unparsed 0 2023-07-02 2025-06-29
441 slash dates, 271 with a first field above 12
16 -> 4 {'East': 1029, 'South': 1005, 'North': 1003, 'West': 963}
age NaN 158 impossible 12
median 38.0 NaN left 0
```

Some of these deserve a comment.

**Dates.** We try each explicit format in turn and fill in what the previous format could not parse, rather than letting pandas guess. The slash format is the risky one: `03/04/2024` is March 4 in the US and April 3 elsewhere. Here the data settles it. 271 of the 441 slash dates have a first field above 12, which can only be a day, so the column is day-first. Every value parses under that reading, with zero left over. In a real project you would also confirm the convention with whoever owns the source system. The parsed range, 2023-07-02 to 2025-06-29, ends before the snapshot, so every customer signed up on or before 2025-06-30.

**Ages.** The rule turns 12 impossible values (such as 0 and 999) into missing, giving 158 + 12 = 170 to fill. The median is 38. One caveat: a median computed on the whole table uses information from every customer. It is a minor effect here, but when you build the modeling pipeline you can put a median imputer inside a scikit-learn `Pipeline` so it is fitted on training data only. The fixed rule stays the same either way.

## Rules 5 and 6: orders

```python
print("dollar strings", orders.amount.str.startswith("$").sum())
orders["amount"] = orders.amount.str.replace("$", "", regex=False).astype(float)
print(orders.amount.dtype, round(orders.amount.mean(), 4))

print("discount NaN", orders.discount_pct.isna().sum(), "->", end=" ")
orders["discount_pct"] = orders.discount_pct.fillna(0)
print(orders.discount_pct.isna().sum())
```

The output is `dollar strings 1406`, `float64 65.5572`, and `discount NaN 300 -> 0`. The mean of 65.5572 matches the "fixed" average from the SQL lesson, which is a first small reconciliation.

Filling missing discounts with 0 assumes a missing discount means no discount. That is a business assumption, so record it. (With only 300 of 140,643 orders missing, the choice cannot move results much.)

## Package the rules

A cleaning notebook that only works once is a liability. Put the rules in one function in `clean.py`, so every later lesson calls it and gets identical data.

```python
# clean.py
import sqlite3
import numpy as np
import pandas as pd

SNAP = pd.Timestamp("2025-06-30")


def load_clean(db="harvest_table.db"):
    con = sqlite3.connect(db)
    cust = pd.read_sql_query("SELECT * FROM customers", con)
    orders = pd.read_sql_query("SELECT * FROM orders", con)
    tickets = pd.read_sql_query("SELECT * FROM tickets", con)
    canc = pd.read_sql_query("SELECT * FROM cancellations", con)
    con.close()

    # Rule 1: one row per customer_id
    cust = cust.drop_duplicates("customer_id").reset_index(drop=True)

    # Rule 2: parse the three signup_date formats
    parsed = pd.Series(pd.NaT, index=cust.index, dtype="datetime64[ns]")
    for fmt in ["%Y-%m-%d", "%d/%m/%Y", "%b %d, %Y"]:
        parsed = parsed.fillna(
            pd.to_datetime(cust.signup_date, format=fmt, errors="coerce"))
    assert parsed.notna().all()
    cust["signup_date"] = parsed

    # Rule 3: region -> strip + title case
    cust["region"] = cust.region.str.strip().str.title()

    # Rule 4: impossible ages -> NaN, then median-impute
    bad = (cust.age < 16) | (cust.age > 100)
    cust.loc[bad, "age"] = np.nan
    cust["age"] = cust.age.fillna(cust.age.median())

    # Rule 5: '$52.30' strings -> floats
    orders["amount"] = (orders.amount.astype(str)
                        .str.replace("$", "", regex=False).astype(float))

    # Rule 6: missing discount -> 0
    orders["discount_pct"] = orders.discount_pct.fillna(0)

    orders["order_date"] = pd.to_datetime(orders.order_date)
    tickets["created_at"] = pd.to_datetime(tickets.created_at)
    canc["cancel_date"] = pd.to_datetime(canc.cancel_date)
    return cust, orders, tickets, canc
```

The `assert` turns a silent failure into a loud one: if a new date format ever appears, the function stops instead of passing missing dates downstream. Check the result:

```python
from clean import load_clean

cust, orders, tickets, canc = load_clean()
print(cust.shape, orders.shape, tickets.shape, canc.shape)
print(int(cust.isna().sum().sum()), int(orders.isna().sum().sum()))
print(cust.signup_date.dtype, orders.amount.dtype, orders.order_date.dtype)
```

This prints `(4000, 7) (140643, 7) (4351, 5) (878, 2)`, then `0 0`, then `datetime64[ns] float64 datetime64[ns]`. No missing values remain in customers or orders, and the types are right.

## Reconcile with SQL

Now the trust check. Rebuild the population, the label, and three features in pandas, and compare them with the SQL extract.

```python
import sqlite3
import numpy as np
import pandas as pd
from clean import load_clean, SNAP

cust, orders, tickets, canc = load_clean()
c = cust.merge(canc, on="customer_id", how="left")
active = c[c.cancel_date.isna() | (c.cancel_date >= SNAP)].copy()
active["churn_60d"] = (active.cancel_date > SNAP).astype(int)
print(len(active), active.churn_60d.sum())

o = orders[orders.order_date <= SNAP].copy()
o["days_ago"] = (SNAP - o.order_date).dt.days
g = o.groupby("customer_id").agg(
    recency_days=("days_ago", "min"),
    orders_90d=("days_ago", lambda s: (s < 90).sum()),
    avg_amount=("amount", "mean"))
pf = active.set_index("customer_id").join(g)
pf["orders_90d"] = pf.orders_90d.fillna(0)

con = sqlite3.connect("harvest_table.db")
sql = pd.read_sql_query(open("extract.sql").read(), con,
                        params={"snap": "2025-06-30"}).set_index("customer_id")
for col in ["recency_days", "orders_90d", "avg_amount"]:
    same = np.allclose(pf[col].sort_index().fillna(-1),
                       sql[col].sort_index().fillna(-1))
    print(col, same)
```

The output is `3690 568` followed by `True` for all three columns. Two independent implementations agree on the population, the label, and the features, which is strong evidence that neither has a bug. Note the `fillna(0)` on `orders_90d`: customers who never ordered get a missing count from the pandas join, but a count of zero from SQL's `COALESCE`. Reconciling flushed out that difference, which is exactly why you do it.

## Recap

Six rules, each with a before-and-after count: 4,040 rows to 4,000, 16 region spellings to 4, 170 ages imputed with a median of 38, 1,406 dollar strings converted, and 300 missing discounts filled. The rules live in `clean.py`, and the Python features match the SQL features exactly. Next, with clean data in hand, you explore it.
