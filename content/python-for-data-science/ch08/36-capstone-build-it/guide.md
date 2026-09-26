# Capstone: Build It

In the kickoff we framed two questions, generated an illustrative messy orders file, audited it, and wrote a cleaning plan. Now we execute: turn the plan into tested code, produce a clean dataset, and answer both questions with numbers and a chart. All figures below are from our **illustrative** dataset, generated with seed 42.

## What you'll learn

- How to turn a written cleaning plan into small, testable functions
- How to verify the cleaning worked and track how many rows each step removes
- How to answer "where and when?" with `groupby`
- How to test the discount question and interpret the result carefully
- How to produce a chart from code you can rerun

## Step 1: the cleaning module

Each item in the plan becomes one function in `cleaning.py`, and `clean_orders` chains them.

```python
import pandas as pd

MAX_QUANTITY = 20  # business rule: confirm with the shop


def drop_duplicate_rows(df):
    return df.drop_duplicates()


def standardize_text(df):
    out = df.copy()
    out["region"] = out["region"].str.strip().str.title().fillna("Unknown")
    out["status"] = out["status"].str.strip().str.lower()
    return out


def parse_types(df):
    out = df.copy()
    out["unit_price"] = (
        out["unit_price"].str.replace("$", "", regex=False).astype(float)
    )
    iso = pd.to_datetime(out["order_date"], format="%Y-%m-%d", errors="coerce")
    us = pd.to_datetime(out["order_date"], format="%m/%d/%Y", errors="coerce")
    out["order_date"] = iso.fillna(us)
    return out


def filter_quantity(df):
    return df[df["quantity"].between(1, MAX_QUANTITY)].copy()


def handle_discount(df):
    out = df.copy()
    out["discount_missing"] = out["discount_pct"].isna()
    out["discount_pct"] = out["discount_pct"].fillna(0)
    return out


def add_revenue(df):
    out = df.copy()
    out["revenue"] = (
        out["quantity"] * out["unit_price"] * (1 - out["discount_pct"] / 100)
    )
    out["month"] = out["order_date"].dt.to_period("M")
    return out


def clean_orders(raw):
    return (
        raw.pipe(drop_duplicate_rows)
        .pipe(standardize_text)
        .pipe(parse_types)
        .pipe(filter_quantity)
        .pipe(handle_discount)
        .pipe(add_revenue)
    )
```

The date trick is worth noting: we parse the whole column with each format using `errors="coerce"` (failures become `NaT`), then `fillna` combines the two results. Every date matches exactly one format.

## Step 2: test it

```python
def test_filter_quantity_drops_missing_zero_negative_and_huge():
    df = pd.DataFrame({"quantity": [1.0, 5.0, 0.0, -2.0, 999.0, None]})
    assert filter_quantity(df)["quantity"].tolist() == [1.0, 5.0]
```

We wrote three tests in all: date and price parsing, the quantity filter, and one on the real file asserting unique order IDs, no missing dates, and positive revenue. They all passed.

## Step 3: run it and count the rows

```python
raw = pd.read_csv("data/raw/orders_raw.csv")
clean = clean_orders(raw)
print(len(raw), len(raw.drop_duplicates()), len(clean))   # 1530 1500 1442
clean.to_csv("data/clean/orders_clean.csv", index=False)
```

The funnel is 1,530 raw rows, 1,500 after removing duplicates, and 1,442 after the quantity rule. Of those, 74 rows have a flagged missing discount, and dates now span 2024-01-01 to 2024-12-31. Always report how many rows your cleaning removed; losing about 4% of the deduplicated rows to the quantity rule deserves a sentence in your write-up.

## Step 4: where and when does revenue come from?

```python
sales = clean[clean["status"] == "complete"]      # 1,267 orders
sales["revenue"].sum()                            # about $183,979
sales.groupby("region")["revenue"].sum().sort_values(ascending=False)
sales.groupby("category")["revenue"].agg(["sum", "mean", "count"])
monthly = sales.groupby("month")["revenue"].sum()
```

On our data: North leads regions at about $50,958, followed by East ($49,016), West ($42,881), and South ($37,899). Electronics generates the most revenue, $62,979 from just 182 orders, because its average order is about $346. Apparel has the most orders (392) but a $105 average. Monthly revenue stays between roughly $10,500 and $15,300 from January to September, then jumps to $19,092, $23,562, and $20,997 in October, November, and December. Q4 is 34.6% of annual revenue, though it is only 25% of the calendar.

## Step 5: do discounts work?

```python
orders = clean[clean["status"] != "cancelled"].copy()
orders["discount_band"] = pd.cut(
    orders["discount_pct"], bins=[-1, 0, 10, 20, 30],
    labels=["0%", "1-10%", "11-20%", "21-30%"])
orders.groupby("discount_band").agg(
    orders=("order_id", "count"),
    avg_quantity=("quantity", "mean"),
    return_rate=("status", lambda s: (s == "returned").mean()),
)
```

| Discount | Orders | Avg quantity | Return rate |
|---|---|---|---|
| 0% | 665 | 3.03 | 7.2% |
| 1-10% | 465 | 2.95 | 10.5% |
| 11-20% | 159 | 3.08 | 9.4% |
| 21-30% | 103 | 2.80 | 12.6% |

Average quantity per order is flat at roughly three items, so on this data discounts are not making customers buy more per order. Return rates are higher in discounted bands. Be careful with the wording: this shows an association, and the top band has only 103 orders, so treat it as a lead worth testing, not proof. (The statistics course that follows teaches how to quantify that uncertainty.)

## Step 6: the chart

```python
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(8, 4))
monthly.index = monthly.index.strftime("%b")
monthly.plot(kind="bar", ax=ax, color="#8E1C1C")
ax.set_title("Monthly revenue, completed orders (illustrative data)")
ax.set_ylabel("Revenue ($)")
ax.set_xlabel("")
fig.tight_layout()
fig.savefig("reports/monthly_revenue.png", dpi=150)
```

The saved chart makes the Q4 surge obvious at a glance.

## Recap

- Each cleaning decision became a small tested function, chained with `.pipe()`.
- We tracked rows through the funnel: 1,530, 1,500, 1,442.
- Revenue is concentrated in the North, in Electronics, and in Q4.
- Discounts did not raise items per order, and returns were higher in discounted bands, a lead to investigate carefully.

Next, we wrap up: turn these findings into a presentation and a portfolio piece.
