# Strategy Families: Momentum, Mean Reversion & Carry

Almost every systematic strategy you'll encounter is a variation on one of three families, or a blend of them. Knowing the family tells you what kind of edge the strategy is claiming, what market regime it needs to work, and — just as importantly — how and when it tends to fail.

## What you'll learn

- How a momentum signal is constructed and why it's supposed to work
- How a mean-reversion signal is constructed and why it's supposed to work
- What a carry strategy is and where its edge is claimed to come from
- The characteristic failure mode of each family
- Why "which family is better" is the wrong question

## Momentum: trend continuation

Momentum bets that an instrument's recent relative performance will continue for a while longer — a 12-month lookback (often skipping the most recent month to avoid short-term reversal effects) is the classic academic formulation.

```python
# Classic 12-1 month momentum signal:
# total return over the past 12 months,
# excluding the most recent month.
lookback, skip = 252, 21  # ~trading days
past_12m = prices.pct_change(lookback)
past_1m = prices.pct_change(skip)
momentum_signal = (1 + past_12m) / (1 + past_1m) - 1
momentum_signal = momentum_signal.shift(1)  # avoid lookahead
```

Why it's supposed to work: under-reaction to new information, slow-moving capital (institutions rebalance gradually), and herding behavior. Its characteristic failure mode is the **momentum crash** — sharp reversals, often around market turning points, that can wipe out months of gains in days because the strategy is, by construction, fully invested in whatever has recently worked.

## Mean reversion: betting on snap-back

Mean reversion bets that a price that has moved far from some reference level (its own recent average, or a peer's price) will move back toward it. The simplest building block is a rolling z-score:

```python
window = 20
rolling_mean = prices.rolling(window).mean()
rolling_std = prices.rolling(window).std()
zscore = (prices - rolling_mean) / rolling_std
zscore = zscore.shift(1)  # avoid lookahead

# Signal: short when far above mean, long when far below
mean_reversion_signal = -zscore.clip(-3, 3)
```

Why it's supposed to work: short-term liquidity imbalances, overreaction to news, and market-making-style compensation for providing liquidity when others need to transact urgently. Its characteristic failure mode is a **regime shift** — when a "temporary" deviation is actually the start of a real trend, mean reversion keeps adding to a losing position exactly when it should be cutting it, since the rule is designed to "buy the dip" and "sell the rip."

## Carry: getting paid to wait

Carry strategies hold a position because it earns a yield or roll return simply for being held, independent of price direction — the classic example is FX carry (borrow a low-interest-rate currency, hold a high-interest-rate one) or futures roll yield (the return from a futures curve in backwardation or contango as a contract rolls toward expiry).

```python
# A simplified carry signal for a futures curve:
# positive roll yield when the near contract trades
# above the far contract (backwardation)
roll_yield = (near_price - far_price) / far_price
carry_signal = roll_yield.shift(1)
```

Why it's supposed to work: carry is largely a compensated risk premium — you're being paid for bearing a risk (an interest-rate differential reversing, a curve flipping from backwardation to contango) that most participants want to avoid. Its characteristic failure mode is the **carry crash**: these risks are usually small and steady until a risk-off shock hits, at which point the "paid for waiting" position unwinds all at once, often correlated across many carry trades simultaneously.

## Why "which is best" is the wrong question

Each family has a plausible economic or behavioral story, a regime it needs, and a way it blows up. None of them is unconditionally better — professional allocators often hold blends of all three precisely because their failure modes tend not to coincide (a momentum crash and a carry crash aren't usually triggered by the same event). The right question for any specific implementation is narrower: does this version's claimed edge survive realistic costs and an honest out-of-sample test — the subject of the rest of this course.

## Key terms

| Term | Meaning |
|---|---|
| Momentum | Betting recent relative performance continues; classic failure mode is a sharp momentum crash |
| Mean reversion | Betting a price snaps back toward a reference level; classic failure mode is a persistent regime shift |
| Carry | Earning a yield/roll return for holding a position; classic failure mode is a correlated carry crash in risk-off shocks |
| Z-score | `(x - rolling_mean) / rolling_std` — how many standard deviations a value is from its recent average |
| Roll yield | The return from a futures position as it rolls along a curve in backwardation or contango |

## Recap

Momentum, mean reversion, and carry each tell a different story about where returns come from, and each has a predictable way of failing. Next, Lesson 4 goes deep on one specific mean-reversion technique built for pairs of instruments: statistical arbitrage and cointegration-based pairs trading.
