# Exploratory Data Analysis

Now that the data is clean, you can finally look at it. Exploratory analysis has a different job in a capstone than in a tutorial. You are not collecting pretty pictures; you are answering three questions the modeling phase depends on. Which signals separate churners from stayers? How strong are they, honestly, given the sample size? And what should the model be allowed, and not allowed, to use?

You know how to draw a histogram. What matters here is the discipline: compare against the base rate, show uncertainty, and write down what you find, including what you find that is boring.

## What you'll learn

- How to build a one-row-per-customer exploration table from the cleaned data
- How to compare churn rates across groups with error bars and sample sizes
- Which Harvest Table signals are strong, which are weak, and which are noise
- How to notice when two signals overlap or stack
- How to keep exploration honest

## Build the exploration table

Save this as `frame.py`. It reuses `load_clean()` from lesson 5 and returns one row per active customer with the label and a handful of behavior columns, all computed as of the snapshot.

```python
# frame.py: the exploration table, one row per active customer
import pandas as pd
from clean import load_clean, SNAP


def build_frame():
    cust, orders, tickets, canc = load_clean()
    c = cust.merge(canc, on="customer_id", how="left")
    pop = c[c.cancel_date.isna() | (c.cancel_date >= SNAP)].copy()
    pop["churn"] = (pop.cancel_date > SNAP).astype(int)

    o = orders[orders.order_date <= SNAP].copy()
    o["days_ago"] = (SNAP - o.order_date).dt.days
    og = o.groupby("customer_id").agg(
        n_orders=("order_id", "size"),
        recency=("days_ago", "min"),
        orders_90d=("days_ago", lambda s: (s < 90).sum()),
        avg_amount=("amount", "mean"),
        bad_share=("status", lambda s: (s != "delivered").mean()))
    t = tickets[tickets.created_at <= SNAP]
    tg = (SNAP - t.created_at).dt.days.lt(90).groupby(t.customer_id).sum()

    df = pop.set_index("customer_id").join(og)
    df["tickets_90d"] = tg.reindex(df.index).fillna(0)
    df["n_orders"] = df.n_orders.fillna(0)
    df["orders_90d"] = df.orders_90d.fillna(0)
    df["tenure_days"] = (SNAP - df.signup_date).dt.days
    df["order_rate"] = df.n_orders / (df.tenure_days.clip(lower=7) / 7)
    return df.drop(columns=["email", "signup_date", "cancel_date"])
```

`bad_share` is the share of a customer's orders that were late or refunded. `order_rate` is orders per week since signup, a measure of how consistently someone orders over their whole life with us. The table has 3,690 rows and a 15.4% churn rate, exactly as before. Three columns have 27 missing values each, the customers who have never ordered:

```python
from frame import build_frame

df = build_frame()
print(df.shape, round(df.churn.mean(), 3))
print(df.isna().sum()[lambda s: s > 0].to_dict())
```

This prints `(3690, 13) 0.154` and `{'recency': 27, 'avg_amount': 27, 'bad_share': 27}`.

## A first ranking of signals

A quick way to rank numeric columns is a Spearman correlation with the label. It measures whether higher values go with more churn, and it does not assume a straight line.

```python
num = ["order_rate", "tenure_days", "bad_share", "orders_90d",
       "recency", "avg_amount", "age", "tickets_90d"]
print(df[num].corrwith(df.churn, method="spearman").round(3)
      .sort_values(key=abs, ascending=False).to_string())
```

```
order_rate    -0.173
tenure_days    0.166
bad_share      0.143
orders_90d    -0.089
recency        0.043
avg_amount     0.033
age            0.017
tickets_90d    0.005
```

Correlations of this size are modest, which is normal for behavioral data. The ordering is what matters: order consistency, tenure, and late-or-refunded share stand out, while age and recent tickets look like noise. Notice too that recency, the "days since last order" that many people would guess first, is weak here.

## Look at the groups, with uncertainty

A number without its sample size is a rumor. The chart code below computes churn rate per group, adds a 95% normal-approximation error bar, labels each bar with its group size, and draws the overall 15.4% as a dashed reference. Save it as `charts.py`.

```python
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from frame import build_frame

df = build_frame()
base = df.churn.mean()
CRIMSON, STONE = "#8E1C1C", "#6B6259"
plt.rcParams.update({"font.size": 12, "axes.spines.top": False,
                     "axes.spines.right": False})


def rate_table(by):
    g = df.groupby(by, observed=True).churn.agg(n="size", rate="mean")
    g["err"] = 1.96 * np.sqrt(g.rate * (1 - g.rate) / g.n)
    return g


def bars(ax, g, title):
    labels = [f"{i}\nn={n:,}" for i, n in zip(g.index, g.n)]
    ax.bar(labels, g.rate, yerr=g.err, width=0.55, color=CRIMSON,
           capsize=4, ecolor=STONE)
    ax.axhline(base, color=STONE, linestyle="--", linewidth=1.2,
               label=f"all active customers: {base:.1%}")
    ax.set_title(title, loc="left", fontsize=13)
    ax.set_ylim(0, 0.36)
    ax.yaxis.set_major_formatter(lambda v, _: f"{v:.0%}")


# Figure 1: categorical columns
fig, axes = plt.subplots(1, 3, figsize=(13, 4.6), sharey=True)
for ax, col, name in zip(axes, ["plan", "acquisition_channel", "region"],
                         ["Plan", "Channel", "Region"]):
    bars(ax, rate_table(col), f"Churn rate by {name}")
axes[0].legend(loc="upper left", frameon=False, fontsize=10)
fig.tight_layout()
fig.savefig("eda_categorical.png", dpi=150)

# Figure 2: behaviour bands
bands = {
    "Late or refunded share of orders": ("bad_share", [-0.01, .05, .10, .15, 1],
                                         ["0-5%", "5-10%", "10-15%", "15%+"]),
    "Tenure": ("tenure_days", [-1, 180, 365, 545, 800],
               ["<6 mo", "6-12 mo", "12-18 mo", "18+ mo"]),
    "Orders in last 90 days": ("orders_90d", [-1, 4, 7, 10, 20],
                               ["0-4", "5-7", "8-10", "11+"]),
    "Orders per week since signup": ("order_rate", [-1, .5, .7, .9, 5],
                                     ["<0.5", "0.5-0.7", "0.7-0.9", "0.9+"]),
}
fig, axes = plt.subplots(2, 2, figsize=(12, 8), sharey=True)
for ax, (title, (col, edges, labels)) in zip(axes.ravel(), bands.items()):
    band = pd.cut(df[col], edges, labels=labels)
    bars(ax, rate_table(band), f"Churn rate by {title.lower()}")
axes[0, 0].legend(loc="upper left", frameon=False, fontsize=10)
fig.tight_layout()
fig.savefig("eda_behaviour.png", dpi=150)

for title, (col, edges, labels) in bands.items():
    t = rate_table(pd.cut(df[col], edges, labels=labels))
    print(title, t.rate.round(3).tolist(), t.n.tolist())
```

The printed summary is:

```
Late or refunded share of orders [0.087, 0.128, 0.203, 0.221] [875, 1172, 1013, 603]
Tenure [0.097, 0.118, 0.153, 0.249] [942, 917, 906, 925]
Orders in last 90 days [0.184, 0.183, 0.159, 0.102] [559, 864, 1337, 930]
Orders per week since signup [0.236, 0.189, 0.117, 0.06] [736, 1087, 1364, 503]
```

### Categorical signals

The code writes `eda_categorical.png`. It shows:

- **Plan matters.** Premium customers churn at 21.4%, Family at 11.5%, Basic at 15.4%. The Premium and Family error bars do not overlap, so this is not sampling noise.
- **Channel matters a little.** Social-media signups churn at 18.7%, search at 13.0%. Partner and referral sit near the average, and their error bars are wide.
- **Region does not.** All four regions fall between 14.2% and 16.0%, and every bar overlaps the average. Region is a good example of a column that looks like a feature and carries nearly nothing.

### Behavior signals

The code writes `eda_behaviour.png`, with four behavior bands. It shows:

- **Order consistency is the strongest signal.** Customers ordering fewer than 0.5 boxes per week since signup churn at 23.6%; those above 0.9 churn at 6.0%. That is a nearly fourfold spread.
- **Late or refunded share shows a clear gradient**, from 8.7% up to 22.1%.
- **Tenure runs in an unexpected direction.** Customers of 18 months or more churn at 24.9%, versus 9.7% for those under 6 months. Long tenure does not protect against churn here. One explanation to test rather than assume: long-tenured customers have had more chances for a bad delivery.
- **Orders in the last 90 days** helps only at the top: 11 or more orders gives 10.2%, while the three lower bands are close together.

## Signals can stack

Tenure and late share are correlated (Spearman 0.16), so do they carry different information? Cross them.

```python
tenure = pd.cut(df.tenure_days, [-1, 365, 800], labels=["<= 1 yr", "> 1 yr"])
late = pd.cut(df.bad_share, [-0.01, 0.10, 1], labels=["<= 10% late", "> 10% late"])
print(df.groupby([tenure, late], observed=True).churn
        .agg(n="size", rate="mean").round(3))
```

```
                            n   rate
tenure_days bad_share
<= 1 yr     <= 10% late  1090  0.088
            > 10% late    742  0.135
> 1 yr      <= 10% late   957  0.136
            > 10% late    874  0.273
```

The corners tell the story. Newer customers with few problems churn at 8.8%; longer-tenured customers with more problems churn at 27.3%. Each factor adds risk, and together they roughly triple it. A model with both will do better than a model with either, and that is exactly the kind of structure machine learning finds.

## Keep exploration honest

- **Everything above is descriptive.** Association is not causation. Nothing here says late deliveries cause cancellations; the data only shows that they go together.
- **We explored all 3,690 customers.** That is acceptable for looking at the data, but do not tune features by staring at the labels of the customers you will later use as the test set. When we split the data in the modeling phase, choices such as thresholds and model selection must come from training data only.
- **Small differences are not findings.** With 15.4% churn and groups of a few hundred, a two-point gap between bars is usually noise. The error bars are there to remind you.
- **The 27 customers who never ordered** churn at 11.1%. It is a tiny group; note it and move on.

## Recap

You built one exploration table and ranked signals. Plan, channel, order consistency, tenure, and late-or-refunded share carry information; region, age, and recent tickets do not; and tenure and late share stack. Next you write all of this down in a checkpoint review before any modeling begins.
