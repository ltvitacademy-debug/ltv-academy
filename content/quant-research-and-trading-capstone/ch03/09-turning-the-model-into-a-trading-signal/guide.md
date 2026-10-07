# Turning the Model Into a Trading Signal

The Ridge model from Lesson 8 only produces scores — a predicted forward rank for each sector. This lesson turns those scores into an actual set of positions: the SR-5 signal itself, with real weights, real timing, and a real regime overlay.

## What you'll learn

- How predicted scores become a tercile-sorted, dollar-neutral long/short book
- Why positions are inverse-volatility weighted within each leg, not equal-weighted
- The weekly rebalance timing: Friday-close signal, Monday execution, with a 1-day lag
- The VIX-regime overlay, and the 40%-per-name position cap

## From scores to a tercile sort

Every sector gets ranked, each week, by its Ridge-predicted score:

- The **bottom tercile** — sectors predicted to bounce back hardest — is bought **long**
- The **top tercile** — sectors predicted to keep underperforming — is sold **short**
- The middle tercile is held flat

## Inverse-volatility weighting, dollar-neutral

```python
def build_weights(scores, inv_vol):
    ranks = scores.rank(pct=True)
    long_leg = ranks <= 1 / 3
    short_leg = ranks >= 2 / 3
    w = pd.Series(0.0, index=scores.index)
    w[long_leg] = inv_vol[long_leg] / inv_vol[long_leg].sum() * 0.5
    w[short_leg] = -inv_vol[short_leg] / inv_vol[short_leg].sum() * 0.5
    return w
```

Within each leg, weight isn't split equally — it's split by **inverse volatility**, so a calmer sector gets more weight than a choppier one for the same conviction. The two legs are sized **dollar-neutral**: 100% gross exposure, split 50% long and 50% short, so the book has no net directional bet on the market as a whole. On top of that, no single sector is allowed to exceed **40% of its leg's weight** — a hard cap that keeps the signal from collapsing into a bet on one or two names.

## Timing: Friday signal, Monday execution

Rebalancing happens **weekly**. The signal is computed using **Friday's closing** data, but the resulting trades are executed at **Monday's session** — a deliberate **1-day lag**. This matters for the same reason the Lesson 7 embargo matters: it keeps the backtest from trading on a price the model couldn't actually have acted on in real time.

## The VIX-regime overlay

Lesson 5's statistical work (and the capstone's hypothesis) found that the reversal effect is much weaker when the VIX is calm: high-VIX-tercile IC ≈ -0.11 (significant), low-VIX-tercile IC ≈ -0.02 (not significant). The signal construction reflects that finding directly: in the **low-VIX tercile**, gross exposure is cut to **half-size**, concentrating risk in the regime where the edge is actually real rather than spreading it evenly across regimes where half of it doesn't exist.

## Key terms

| Term | Meaning |
|---|---|
| Tercile sort | Splitting the ranked universe into thirds — bottom third long, top third short |
| Dollar-neutral | Equal long and short dollar exposure, so net market exposure is near zero |
| Inverse-volatility weighting | Weighting positions inversely to their volatility, so calmer names get more weight |
| Regime overlay | Scaling exposure up or down based on which volatility regime (VIX tercile) is currently active |

## Recap

Ridge's predicted scores become a dollar-neutral, tercile-sorted, inverse-volatility-weighted long/short book, rebalanced weekly with a Friday-close-to-Monday-execution lag, capped at 40% per name per leg, and scaled to half-size in the low-VIX tercile where the edge is weak. That's the complete SR-5 signal. Next, Lesson 10 moves from Python prototype to an actual backtest engine.
