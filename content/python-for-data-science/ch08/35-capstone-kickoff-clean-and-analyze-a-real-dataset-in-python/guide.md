# Capstone Kickoff: Clean and Analyze a Real Dataset in Python

You have spent this course learning the pieces: Python basics, NumPy, pandas, cleaning, files and databases, and reliable-code habits. The capstone puts them together on one project, start to finish, the way a working data scientist would.

A note on the data. Real company data can't be shared, so we generate an **illustrative** retail orders file with NumPy and pandas. It is "real-style": we deliberately built in the problems real exports have, such as mixed date formats, inconsistent text, missing values, absurd outliers, and duplicate rows. Generating it from a fixed seed means everyone gets identical numbers. Once you finish, you can repeat the workflow on any public dataset you like.

## What you'll learn

- How to turn a vague request into a clear business question and deliverables
- How to set up a project that follows the last chapter's habits
- How to generate the practice dataset
- How to audit a raw file systematically before touching it
- How to write a cleaning plan you can execute in the next lesson

## Step 1: frame the problem

Imagine you've joined an online home-and-lifestyle shop. The head of sales asks: *"Where does our revenue come from, and are our discounts actually working?"* That is too vague to code, so sharpen it:

1. **Where and when?** Which regions, product categories, and months drive revenue?
2. **Do discounts work?** Do heavily discounted orders contain more items, and do they come back more often?

Also define your metric before you look at data. Here, **revenue = quantity × unit price × (1 − discount)**, counted only for orders with status "complete". Returned and cancelled orders are not revenue.

Your deliverables: a cleaned dataset, reusable cleaning code with a few tests, a short analysis with charts, and a README with your findings.

## Step 2: set up the project

```
capstone/
    make_data.py
    data/raw/orders_raw.csv
    data/clean/
    cleaning.py
    tests/
    analysis.ipynb
    README.md
```

Raw data goes in `data/raw` and is never edited. Cleaned data goes in `data/clean`.

## Step 3: generate the data

Save this as `make_data.py` and run `python make_data.py`.

```python
"""Generate an illustrative, deliberately messy retail orders file."""
from pathlib import Path

import numpy as np
import pandas as pd

rng = np.random.default_rng(42)
n = 1500

# ---- the clean "truth" ----
categories = ["Home", "Electronics", "Apparel", "Sports", "Beauty"]
base_price = {"Home": 45, "Electronics": 120, "Apparel": 38,
              "Sports": 55, "Beauty": 22}

weights = np.where(np.arange(366) >= 274, 1.6, 1.0)  # busier Q4
days = rng.choice(366, size=n, p=weights / weights.sum())
category = rng.choice(categories, size=n, p=[0.25, 0.15, 0.30, 0.15, 0.15])
discount = rng.choice([0, 5, 10, 20, 30], size=n,
                      p=[0.45, 0.15, 0.20, 0.12, 0.08])
p_return = 0.06 + 0.004 * discount
r = rng.random(n)

df = pd.DataFrame({
    "order_id": np.arange(1001, 1001 + n, dtype="int64"),
    "customer_id": ["C" + str(i).zfill(3) for i in rng.integers(1, 301, n)],
    "order_date": pd.Timestamp("2024-01-01") + pd.to_timedelta(days, unit="D"),
    "region": rng.choice(["North", "South", "East", "West"], size=n,
                         p=[0.30, 0.20, 0.25, 0.25]),
    "category": category,
    "quantity": rng.integers(1, 6, n).astype(float),
    "unit_price": (np.array([base_price[c] for c in category])
                   * rng.uniform(0.85, 1.15, n)).round(2),
    "discount_pct": discount.astype(float),
    "status": np.where(r < 0.04, "cancelled",
                       np.where(r < 0.04 + p_return, "returned", "complete")),
})

# ---- now make it messy ----
us = rng.random(n) < 0.3  # 30% of dates in US format
df["order_date"] = np.where(us, df["order_date"].dt.strftime("%m/%d/%Y"),
                            df["order_date"].dt.strftime("%Y-%m-%d"))
df["region"] = df["region"].where(rng.random(n) > 0.15,
                                  df["region"].str.upper())
df["region"] = df["region"].where(rng.random(n) > 0.10,
                                  " " + df["region"] + " ")
df["status"] = df["status"].where(rng.random(n) > 0.10,
                                  df["status"].str.title())
df["unit_price"] = df["unit_price"].map("{:.2f}".format)
dollar = rng.random(n) < 0.4
df["unit_price"] = np.where(dollar, "$" + df["unit_price"], df["unit_price"])
df.loc[rng.random(n) < 0.03, "quantity"] = np.nan
df.loc[rng.random(n) < 0.05, "discount_pct"] = np.nan
df.loc[rng.random(n) < 0.02, "region"] = np.nan
bad = rng.choice(n, size=6, replace=False)
df.loc[bad, "quantity"] = [500, 250, 999, -2, -1, 0]
df = pd.concat([df, df.sample(n=30, random_state=42)], ignore_index=True)
df = df.sample(frac=1, random_state=42).reset_index(drop=True)

out = Path("data/raw/orders_raw.csv")
out.parent.mkdir(parents=True, exist_ok=True)
df.to_csv(out, index=False)
print(f"Wrote {len(df)} rows to {out}")
```

Notice how the reproducibility lesson shows up: a seeded generator, `pathlib`, and no hard-coded paths. The relationships (a busy fourth quarter, returns rising with discounts) are illustrative, planted by us so there is something to find.

## Step 4: audit before you clean

Load the raw file and interrogate it, changing nothing yet:

```python
import pandas as pd

raw = pd.read_csv("data/raw/orders_raw.csv")
print(raw.shape)                    # (1530, 9)
print(raw.isna().sum())
print(raw.duplicated().sum())       # 30
print(raw["quantity"].nlargest(3))
raw["region"].value_counts(dropna=False)
```

Here is what the audit shows on our file:

- **Shape:** 1,530 rows, 9 columns.
- **Duplicates:** 30 fully duplicated rows.
- **Missing values:** region 26, quantity 54, discount_pct 78.
- **Wrong types:** `order_date` and `unit_price` are stored as text (`object`). Prices sometimes carry a `$`, and dates arrive as both `2024-05-03` and `11/23/2024`.
- **Inconsistent text:** region appears as `North`, `NORTH`, and ` North ` (with spaces); status as `complete` and `Complete`.
- **Outliers:** quantities of 999, 500, and 250, plus values of 0, -1, and -2.

## Step 5: write the cleaning plan

Turn every finding into a decision, written down before you code:

1. Drop exact duplicate rows.
2. Standardize region and status text; label missing region "Unknown".
3. Convert prices to numbers and parse both date formats.
4. Keep only quantities from 1 to 20 (a business rule you would confirm with the shop); drop missing quantities because revenue can't be computed.
5. Treat a missing discount as 0, but flag those rows.
6. Add revenue and month columns.

## Recap

- Sharpen a vague request into specific questions and a defined metric.
- Keep raw data untouched and audit it before cleaning.
- Every problem found becomes a written cleaning decision.

Next lesson, we build it.
