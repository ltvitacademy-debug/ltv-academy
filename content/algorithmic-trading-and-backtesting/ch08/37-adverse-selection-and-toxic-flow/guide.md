# Adverse Selection and Toxic Flow

Every fill a market maker gets looks the same in the moment — a counterparty traded at the quoted price. But not every fill is equally good news. Some counterparties are trading on real information the market maker doesn't have yet, and getting filled by them specifically is a loss waiting to happen, even though the trade itself executed at a fair price. This lesson covers how to recognize and defend against that risk.

## What you'll learn

- What adverse selection actually means in a market-making context
- Why being filled isn't automatically good news
- Markout analysis: the standard way to measure how toxic a maker's flow actually is, after the fact
- Practical defenses: widening around news, size limits, and fade protection

## Being filled isn't automatically good news

Picture a market maker quoting a tight spread around fair value, and a large sell order sweeps through its bid right before the price drops sharply. The market maker's fill itself was clean — it bought at its own quoted price — but moments later, the market has moved against the position it just acquired. This is **adverse selection**: getting filled specifically by counterparties who know (or are reacting to) something the market maker's fair-value estimate hasn't caught up to yet.

The uncomfortable truth every market maker has to internalize: *of course* a disproportionate share of your fills come right before the price moves against you — that's not bad luck, it's close to the definition of the job. A counterparty only trades against your quote when your price looks good *to them*, and a quote that looks unusually good to an informed trader is, almost by construction, one the fair-value estimate got slightly wrong.

## Measuring it after the fact: markout analysis

**Markout** measures how the price moved in the seconds or minutes *after* a fill, relative to the fill price — a direct, after-the-fact read on how costly that specific fill turned out to be:

```python
import numpy as np
import pandas as pd

rng = np.random.default_rng(37)

n_fills = 200
fill_price = 100 + rng.normal(0, 0.5, n_fills)
# side: +1 = maker bought (is now long), -1 = maker sold (is now short)
side = rng.choice([1, -1], n_fills)

# Price 30 seconds after each fill -- a small adverse bias plus
# independent noise, to simulate a realistic (not deterministic)
# toxic-flow pattern: MOST, not all, fills are followed by an
# unfavorable move
adverse_bias = 0.08
noise = rng.normal(0, 0.12, n_fills)
price_after_30s = fill_price - side * adverse_bias + noise

# Markout: for a buy, a price DROP after the fill is a loss (we bought,
# then it got cheaper); for a sell, a price RISE after the fill is a loss
markout = side * (price_after_30s - fill_price)

results = pd.DataFrame({"side": side, "fill_price": fill_price, "markout": markout})
print(f"Mean markout:   {results['markout'].mean():+.4f}")
print(f"Share negative: {(results['markout'] < 0).mean():.1%}")
```

```
Mean markout:   -0.0756
Share negative: 70.5%
```

A negative mean markout means, on average, the price moves *against* the maker's position shortly after each fill — exactly the adverse-selection signature. If 70% of fills are followed by an unfavorable move, that's a strong, quantifiable signal this maker's flow is **toxic**: disproportionately filled by informed counterparties, not a representative random sample of market participants. The remaining ~30% of fills that *do* move favorably are exactly why this has to be measured statistically across many fills rather than judged fill-by-fill — no single fill proves anything, but the aggregate pattern does. A healthy, well-defended market maker should see markout close to zero (or even slightly positive, since the spread itself is compensation) — a persistently negative, large-magnitude markout means the spread isn't wide enough to compensate for the adverse selection actually occurring.

## Practical defenses

- **Widen around scheduled information events** (earnings, economic data releases) — adverse selection spikes predictably around known information events, and a maker that doesn't widen its spread (or pull quotes entirely) right before one is accepting much higher toxicity risk for no additional compensation.
- **Size limits per quote** — a counterparty willing to trade a very large size against your resting quote is statistically more likely to be trading on real information than one trading a small, routine size; capping the size available at the touch limits the damage any single toxic fill can do.
- **Fade protection** — if several fills in rapid succession all move the same direction (a burst of same-side fills, not the normal back-and-forth of a healthy two-sided market), that pattern itself is a toxicity signal worth reacting to immediately — widening or pulling quotes — rather than waiting for a scheduled markout analysis to catch it after the fact.

## Why this connects back to spread sizing

Lesson 36 sized the spread as `max(risk_based_spread, competitive_floor)` without a toxicity term. A more complete version of that function would price in realized markout directly — if markout analysis on a given instrument or time-of-day shows a persistently toxic pattern, the spread for that specific context should widen beyond what volatility alone would suggest, since the true cost of market-making there is adverse selection, not just price risk.

## Key terms

| Term | Meaning |
|---|---|
| Adverse selection | Getting filled disproportionately by informed counterparties, right before the price moves unfavorably |
| Toxic flow | A pattern of fills with persistently negative markout — a signal the maker is trading against informed counterparties more often than a random sample would predict |
| Markout | The price movement after a fill, relative to the fill price, measuring how costly that specific fill turned out to be |
| Fade protection | Reacting to a burst of same-direction fills as an immediate toxicity signal, rather than waiting for after-the-fact analysis |

## Check yourself

Why is it misleading to think of every fill a market maker gets as equally good news, and what does a persistently negative mean markout actually reveal about a maker's flow?
