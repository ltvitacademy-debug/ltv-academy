# Feature Engineering

Phase 1 established the SR-5 hypothesis and did the statistical groundwork to back it. Phase 2 turns the raw sector panel into something a model can actually learn from. This lesson builds the eight features that feed the Ridge model, states the prediction target precisely, and spends real time on the plumbing that keeps the whole pipeline honest: an embargo against leakage, and cross-sectional z-scoring.

## What you'll learn

- The eight features computed for each of the 11 sector ETFs, every trading day
- The target the model is actually trained to predict
- Why leakage is the easiest way to accidentally fake a good backtest, and how an embargo gap prevents it
- Why every feature is z-scored cross-sectionally each day rather than used in raw, absolute form

## The eight features

Every feature is computed using only data available at the close of day t — nothing from day t+1 or later ever touches a feature value. For each of the 11 sectors, on each trading day:

- **ret_5d_z** — cross-sectional z-score of the trailing 5-day return (the reversal signal itself)
- **ret_21d** — trailing 21-day (roughly one month) momentum
- **rv_20d** — 20-day annualized realized volatility
- **rsi_14** — 14-day Relative Strength Index
- **vol_ratio** — 10-day average volume divided by 60-day average volume, a liquidity/attention signal
- **corr_spy_60d** — 60-day rolling correlation to SPY
- **vix_regime** — the VIX level plus its front/second-month term-structure slope
- **dispersion** — the cross-sectional standard deviation of that day's sector returns

The target is the **forward 5-day return**, expressed as a **forward 5-day cross-sectional rank** — the thing the model is actually trying to predict is not "will Energy go up," but "how will Energy's next five days rank against the other sectors'."

## Cross-sectional z-scoring: the key design choice

```python
def cross_sectional_z(frame):
    return frame.sub(frame.mean(axis=1), axis=0).div(frame.std(axis=1), axis=0)

ret_5d = close.pct_change(5)
features["ret_5d_z"] = cross_sectional_z(ret_5d)
features["rv_20d"] = log_ret.rolling(20).std() * (252 ** 0.5)
features["rsi_14"] = rsi(close, window=14)
```

`cross_sectional_z` subtracts that day's mean *across the 11 sectors* and divides by that day's standard deviation across the 11 sectors — not against each feature's own history. `ret_5d_z` is built exactly this way, and several of the other features (`rv_20d`, `rsi_14`, `corr_spy_60d`, `dispersion`) are z-scored the same way before being handed to the model.

This is the design choice that makes the whole feature set work across 18 years of very different regimes: the model never sees "volatility is 18%," it sees "Energy is one standard deviation more volatile than the other ten sectors today." A relative signal like that stays meaningful whether the regime is 2008's crisis or 2017's calm — an absolute volatility level would mean something completely different in each.

## The target and leakage prevention

**Leakage** is any case where a feature, even accidentally, carries information that wasn't actually knowable at the moment the trading decision was made. It is the single easiest way to produce a backtest that looks great and means nothing.

Because the target is a *forward* 5-day return, the feature window and the target window sit right next to each other in time — and naively computed, they can overlap. The fix is an **embargo**: a 5-day gap purged out between where the feature window ends and the target window begins, so no day's label can leak backward into a feature computed too close to it. This looks like a small detail here, but Lesson 8's purged walk-forward validation depends entirely on getting this embargo right.

## Key terms

| Term | Meaning |
|---|---|
| Leakage | A feature or label carrying information that wasn't actually available at decision time |
| Embargo | A deliberate gap purged between the feature window and the target window to prevent leakage |
| Cross-sectional normalization | Z-scoring a feature across the 11 sectors on a given day, not against its own history |
| Forward 5-day rank | The target: how a sector's next 5 days of return ranks against the other sectors' |

## Recap

Eight features — reversal, momentum, volatility, RSI, volume ratio, SPY correlation, VIX regime, and dispersion — are all computed from data known at the close of day t, cross-sectionally z-scored so the model sees relative standing rather than absolute levels, and paired with a forward 5-day rank target protected by a 5-day embargo. Next, Lesson 8: building the Ridge model and validating it honestly.
