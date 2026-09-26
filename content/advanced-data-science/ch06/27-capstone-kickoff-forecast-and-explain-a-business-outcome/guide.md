# Capstone Kickoff: Forecast and Explain a Business Outcome

The capstone pulls this course together on one project. You will forecast a business outcome, prove the forecast is better than a simple alternative, and explain to a non-technical audience what drives it. This first lesson is the kickoff: frame the problem, look at the data, protect a test set, and set the bar you have to beat before you build anything. Lesson 28 builds the models, and lesson 29 evaluates, presents and packages the work.

## What you'll learn

- How to turn a vague request into a forecasting problem with a decision, a horizon and a metric
- How to inspect a weekly demand series that includes promotions
- How to seal a final test set and plan a rolling-origin backtest
- How to establish baselines and a success criterion before modeling

## The scenario

An illustrative retailer must decide how many units of one product to order for the next 13 weeks. Ordering too little loses sales; ordering too much ties up cash. The manager also wants to know how much the planned promotions and the holiday season really move demand. So there are two deliverables: a **forecast** of weekly units, and an **explanation** of the drivers.

Frame it in four lines before writing code:

1. **Decision:** how many units to order for the next quarter.
2. **Horizon:** 13 weekly forecasts, made once at the start of the quarter.
3. **Metric:** mean absolute error (MAE) in units per week, because it is in units the manager understands.
4. **Comparison:** the best simple baseline. A model must beat it to be worth using.

## The data (synthetic)

We use a seeded synthetic series, so results are reproducible and no real company is implied. Save this as `adv_capstone_data.py`; lessons 28 and 29 import it.

```python
import numpy as np
import pandas as pd

def make_demand(weeks=156, seed=2024):
    """Illustrative weekly demand for one product (synthetic)."""
    rng = np.random.default_rng(seed)
    idx = pd.date_range("2022-01-03", periods=weeks, freq="W-MON")
    t = np.arange(weeks)
    week = idx.isocalendar().week.values.astype(int)
    promo = (rng.random(weeks) < 0.18).astype(int)
    holiday = ((week >= 47) & (week <= 51)).astype(int)
    base = 500 + 1.5 * t
    season = 1 + 0.15 * np.sin(2 * np.pi * (week - 10) / 52)
    lift = 1 + 0.30 * promo + 0.25 * holiday
    noise = rng.normal(1, 0.05, weeks)
    units = (base * season * lift * noise).round()
    return pd.DataFrame({"units": units, "promo": promo,
                         "holiday": holiday, "week": week}, index=idx)
```

Demand grows steadily, follows a yearly wave, jumps in promotion weeks and in a holiday window, and carries a little noise. Now load it and look:

```python
from adv_capstone_data import make_demand

df = make_demand()
print(df.head(4))
print(df.shape, df.index[0].date(), "to", df.index[-1].date())
print(df.groupby("promo")["units"].mean().round(0))
```

```
            units  promo  holiday  week
2022-01-03  446.0      0        0     1
2022-01-10  437.0      0        0     2
2022-01-17  491.0      0        0     3
2022-01-24  475.0      0        0     4
(156, 4) 2022-01-03 to 2024-12-23
promo
0    625.0
1    847.0
```

That is 156 weekly rows. Promotion weeks average 847 units against 625 in other weeks, a raw gap of about 35%. A raw gap is not a causal lift, since promotions and season overlap, but it says promotions are worth modeling.

We plot it once the test set is sealed, in the section below.

## Protect the test set

Seal the **last 13 weeks** as the final test set: the same length as the real forecast. You do not use it to choose features or models. Everything else is the development set, where you compare models with a **rolling-origin backtest**: train on the data before an origin date, forecast the next 13 weeks, record the error, then move the origin forward. This is the method from the forecasting chapter, applied for real. Never shuffle: the training data always comes before the test data.

One rule about inputs. The forecast is made at the start of the quarter, so a feature is allowed only if you would know it then. The promotion calendar and holidays are planned in advance, so they are fair. Last week's sales are not known for week 10 of the horizon.

## Baselines first

```python
dev, final = df.iloc[:-13], df.iloc[-13:]      # final = sealed test
print(len(dev), "dev weeks;", len(final), "sealed weeks from",
      final.index[0].date())

H = 13
def mae(a, f):
    return float(np.mean(np.abs(a - f)))

rows = []
last = len(dev) - H + 1
for origin in range(91, last, H):
    tr, te = dev.iloc[:origin], dev.iloc[origin:origin + H]
    naive = np.repeat(tr["units"].iloc[-1], H)
    snaive = dev["units"].iloc[origin - 52: origin - 52 + H].values
    rows.append({"origin": te.index[0].date(),
                 "naive": mae(te["units"].values, naive),
                 "snaive": mae(te["units"].values, snaive)})
bt = pd.DataFrame(rows)
print(bt.round(1))
print(bt[["naive", "snaive"]].mean().round(1))
```

The **naive** forecast repeats the last observed value for all 13 weeks. The **seasonal naive** forecast copies the same 13 weeks from a year earlier (52 weeks back). Output:

```
143 dev weeks; 13 sealed weeks from 2024-09-30
       origin  naive  snaive
0  2023-10-02   89.2    99.3
1  2024-01-01   81.3   104.8
2  2024-04-01  112.2   121.7
3  2024-07-01   99.9   190.2
naive      95.7
snaive    129.0
```

Surprise: the seasonal naive is worse. It copies last year's promotion spikes into the wrong weeks, because promotions do not repeat on a calendar. The bar to beat is the naive forecast: an average MAE of 95.7 units per week, on weekly demand that averages about 750 in these windows.

Plot the series with the promo weeks and the sealed weeks marked:

```python
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
fig, ax = plt.subplots(figsize=(9, 4.2))
ax.plot(df.index, df["units"], color="#8E1C1C", lw=1.5)
p = df[df["promo"] == 1]
ax.scatter(p.index, p["units"], color="#C4952E", s=22, zorder=3,
           label="promo week")
ax.axvspan(final.index[0], final.index[-1], color="#6B6259", alpha=0.2,
           label="sealed test")
ax.set_ylabel("units per week")
ax.set_title("Weekly demand (illustrative, synthetic)")
ax.legend()
fig.tight_layout()
fig.savefig("capstone-demand.png", dpi=150)
```

The spikes are the promotion weeks, the trend rises, and a yearly wave is visible.

## Set the success criteria now

Write these down before modeling, so you cannot move the goalposts afterward. Ours (a choice for this project, not a standard):

- Beat the best baseline's average backtest MAE by at least 20%.
- Explain the drivers in plain language, including the effect of a promotion.
- Touch the sealed test set once, at the end, and report whatever it shows.

## Recap

A good project starts with a decision, a horizon, a metric and a baseline. We generated a seeded weekly demand series, sealed the last 13 weeks, and measured two baselines with a rolling-origin backtest: naive at 95.7 MAE and seasonal naive at 129.0. Next: build the models and explain what drives demand.
