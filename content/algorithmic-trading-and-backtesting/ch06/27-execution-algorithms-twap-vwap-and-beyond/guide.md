# Execution Algorithms: TWAP, VWAP & Beyond

Lesson 17 established that a large order moves the market against itself if dumped in all at once. The practical answer professional desks use is to split a large order into smaller slices and work it over time — and the specific slicing rule you pick has a name and a measurable effect on your fill price. This lesson covers the standard execution algorithms and how to benchmark them.

## What you'll learn

- TWAP (time-weighted average price) execution and how to simulate it
- VWAP (volume-weighted average price) execution and how it differs from TWAP
- Implementation shortfall: the standard way to score any execution algorithm
- Why a VWAP algo can "cheat" when benchmarked against realized volume, and why real ones can't actually do that
- Percentage-of-volume (POV) execution as a third, adaptive approach

## TWAP: equal slices over time

**TWAP (time-weighted average price)** execution is the simplest approach: split the order into equal-sized pieces and submit one piece at each of N evenly spaced intervals over the execution window, regardless of how much volume is trading at any given moment.

```python
import numpy as np
import pandas as pd

rng = np.random.default_rng(27)
n_bars = 13  # e.g., 13 half-hour bars across a trading day
# Illustrative synthetic intraday price (random walk) and volume
# (U-shaped profile: heavier at the open and close, lighter midday —
# the standard real-world intraday volume pattern)
price = 100 + np.cumsum(rng.normal(0, 0.05, n_bars))
u_shape = np.array([3.0, 2.0, 1.4, 1.0, 0.8, 0.7, 0.7, 0.7, 0.8, 1.0, 1.4, 2.0, 3.0])
volume = (u_shape * rng.uniform(900, 1100, n_bars)).round()
bars = pd.DataFrame({"price": price, "volume": volume})

order_size = 10_000
arrival_price = bars["price"].iloc[0]

twap_slice = order_size / n_bars
twap_fill_price = (bars["price"] * twap_slice).sum() / order_size

print(f"arrival price  : {arrival_price:.4f}")
print(f"TWAP fill price: {twap_fill_price:.4f}")
```

```
arrival price  : 100.0627
TWAP fill price: 100.0936
```

TWAP is simple, predictable, and easy to implement — but because it ignores volume, it trades the same size during thin, illiquid midday periods as it does during heavy open/close periods, which means its slices are proportionally larger relative to available liquidity exactly when liquidity is scarcest.

## VWAP execution: size slices by volume

**VWAP (volume-weighted average price)** execution instead sizes each slice proportional to that period's expected trading volume, so the order participates more heavily when the market is naturally most liquid:

```python
volume_weights = bars["volume"] / bars["volume"].sum()
vwap_slices = order_size * volume_weights
vwap_fill_price = (bars["price"] * vwap_slices).sum() / order_size

day_vwap = (bars["price"] * bars["volume"]).sum() / bars["volume"].sum()
print(f"VWAP-algo fill price : {vwap_fill_price:.4f}")
print(f"day VWAP (benchmark) : {day_vwap:.4f}")
```

```
VWAP-algo fill price : 100.0631
day VWAP (benchmark)  : 100.0631
```

Notice the VWAP-algo fill price matches the day's VWAP benchmark almost exactly here — but that's a tell, not a triumph. This simulation sized slices using the *realized* volume in each bar, which a real VWAP algo cannot know in advance; it has to size slices against a *predicted* volume profile (typically built from recent historical averages), and will only match the realized day-VWAP benchmark as closely as that prediction turns out to be accurate. The gap between predicted and realized intraday volume is exactly where a real VWAP algo's performance versus its own benchmark comes from — a point worth remembering any time a vendor or backtest claims a VWAP algo achieves "zero" shortfall.

## Implementation shortfall: scoring any execution algorithm

**Implementation shortfall** measures the gap, in basis points, between the price you actually achieved and a reference price — most commonly the **arrival price** (the price at the moment you decided to trade):

```python
twap_shortfall_bps = (twap_fill_price - arrival_price) / arrival_price * 10_000
vwap_shortfall_bps = (vwap_fill_price - arrival_price) / arrival_price * 10_000

print(f"TWAP shortfall vs arrival: {twap_shortfall_bps:+.2f} bps")
print(f"VWAP shortfall vs arrival: {vwap_shortfall_bps:+.2f} bps")
```

```
TWAP shortfall vs arrival: +3.08 bps
VWAP shortfall vs arrival: +0.04 bps
```

In this illustrative run, TWAP cost about 3 basis points more than the arrival price, while the (realized-volume) VWAP algo cost almost nothing relative to arrival — though some of that gap here is the price simply drifting upward over the day, which both algorithms are exposed to regardless of slicing method. A full comparison should always benchmark against both arrival price (which captures total cost including market drift) and the VWAP benchmark itself (which isolates how well the algo tracked its own target, separate from which direction the market happened to drift that day).

## Percentage of volume (POV) and beyond

**Percentage of volume (POV)** execution adapts in real time: rather than following either a fixed clock (TWAP) or a pre-set volume curve (VWAP), it continuously targets trading at some fixed fraction (e.g., 10%) of whatever volume is actually printing right now, speeding up when the market is active and slowing down when it's quiet. This reacts to real-time conditions that neither TWAP nor VWAP can, at the cost of making the order's completion time uncertain — if the market goes quiet, a POV order might not finish within the day at all. Beyond these three, real trading desks also use **implementation-shortfall algorithms** that explicitly trade off expected market impact against the risk of price drift while waiting, and this is an active area many execution-focused quant roles specialize in entirely.

## Choosing an algorithm for your own strategy

For most systematic strategies built in this course — daily-bar signals, moderate position sizes relative to typical volume — a simple VWAP or TWAP slice over the first part of the next trading day is a reasonable, defensible default, consistent with the next-bar-open fill convention from Lesson 20. The choice matters more as position size grows relative to average daily volume (Lesson 17's capacity question) or as the strategy's holding period shrinks toward intraday, at which point the execution algorithm itself becomes a meaningful source of the strategy's edge or cost, not just an implementation detail.

## Key terms

| Term | Meaning |
|---|---|
| TWAP | Time-weighted average price execution: equal-sized order slices spread evenly over time |
| VWAP (execution) | Volume-weighted average price execution: slices sized proportional to expected trading volume |
| Implementation shortfall | The gap, in basis points, between the achieved execution price and a reference price (often arrival price) |
| Arrival price | The market price at the moment a trading decision was made, before execution began |
| POV | Percentage-of-volume execution: continuously trades a fixed fraction of real-time market volume |

## Recap

TWAP slices an order equally across time; VWAP slices it proportional to expected volume; POV adapts in real time to a fixed share of whatever volume is actually printing — and implementation shortfall versus arrival price is the standard way to score any of them. Next, Lesson 28 moves one layer down the stack: how a strategy actually connects to a broker or exchange to place these orders in the first place.
