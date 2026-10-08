# Monitoring Live Strategies

A backtest runs once and produces a final report. A live strategy runs continuously, and something can go wrong at 2am with nobody watching. This lesson covers what it actually takes to monitor a systematic strategy once it's trading real capital: tracking P&L in real time, automatically enforcing risk limits with a kill switch, and continuously comparing live behavior against what the backtest led you to expect.

## What you'll learn

- Why continuous monitoring is a different engineering problem than a backtest report
- How to build an automatic kill switch around hard risk limits
- Why comparing live P&L volatility to backtested expectations is an ongoing, not one-time, task
- What belongs in a strategy's operational log, and why
- The difference between a monitoring alert and an automatic kill switch, and when you want each

## From a one-time report to a continuous process

Every measure from Chapter 5 — Sharpe, drawdown, Calmar — was computed once, after the fact, over a finished series. Live monitoring needs the same ideas running continuously, updating after every trade or every bar, with a human or an automated system able to act *immediately* on a problem rather than discovering it in next quarter's performance review. The engineering shift this requires: risk checks and loss limits have to be code that runs on every single update, not a spreadsheet formula someone checks when they remember to.

## Building an automatic kill switch

A **kill switch** is a hard, automatic rule that stops a strategy from placing new orders (and often flattens existing positions) the moment a defined limit is breached — deliberately removing the "let's wait and see" human hesitation that makes losses worse in a real crisis.

```python
import numpy as np
import pandas as pd

rng = np.random.default_rng(29)
n_days = 40
# Illustrative synthetic daily P&L in dollars, with one deliberately injected
# bad day (e.g., a model break or bad data feed) to demonstrate a breach
daily_pnl = rng.normal(150, 900, n_days)
daily_pnl[27] = -6200

equity_curve = daily_pnl.cumsum()
running_max = np.maximum.accumulate(equity_curve)
drawdown_dollars = equity_curve - running_max

DAILY_LOSS_LIMIT = -5000     # kill switch: single-day loss limit
MAX_DRAWDOWN_LIMIT = -8000   # kill switch: cumulative drawdown limit

breaches = []
killed = False
for day, (pnl, dd) in enumerate(zip(daily_pnl, drawdown_dollars)):
    if killed:
        break
    if pnl <= DAILY_LOSS_LIMIT:
        breaches.append((day, "DAILY_LOSS_LIMIT", pnl))
        killed = True
    elif dd <= MAX_DRAWDOWN_LIMIT:
        breaches.append((day, "MAX_DRAWDOWN_LIMIT", dd))
        killed = True

print(f"days run before kill switch: {day + 1} / {n_days}")
for b in breaches:
    print(f"  breach on day {b[0]}: {b[1]} (value={b[2]:.2f})")
```

```
days run before kill switch: 29 / 40
  breach on day 27: DAILY_LOSS_LIMIT (value=-6200.00)
```

The strategy was allowed to run for 29 days before a single bad day breached the $5,000 daily-loss limit and triggered an automatic stop, 11 days before the end of the illustrative sample. The entire point of setting `DAILY_LOSS_LIMIT` and `MAX_DRAWDOWN_LIMIT` as hard numbers *in advance* — the same discipline Lesson 22 recommended for drawdown-based risk limits — is that nobody has to make a judgment call in the moment the limit is breached; the system already decided what "too much" means, before the bad day arrived.

## Alerts vs. kill switches: not the same decision

Not every anomaly should auto-stop the strategy — some things should page a human and let a person decide, because an automatic stop has its own cost (missing a genuine opportunity, or badly timing an exit). The practical split: breaches of genuinely hard, pre-committed risk limits (max daily loss, max drawdown, max position size) belong in the kill switch; softer warning signs (volume lower than usual, a data feed running a few minutes late, an unusually large but not limit-breaching single trade) belong in an alert that notifies a human promptly without stopping the strategy. Confusing the two in either direction — auto-stopping on every minor anomaly, or only ever alerting and never auto-stopping on genuinely hard limits — both lead to real losses in practice.

## Comparing live behavior to backtest expectations, continuously

Lesson 26 compared paper-trading results to backtest expectations once, as a gate before going live. That comparison doesn't stop once a strategy is live — it should run continuously, because a growing gap between realized and expected behavior is often the earliest sign of the strategy decay covered in the next lesson:

```python
expected_daily_vol = 850  # dollars, from the original backtest
realized_daily_vol = pd.Series(daily_pnl[:day + 1]).std(ddof=1)

print(f"expected daily P&L vol (backtest): {expected_daily_vol:.2f}")
print(f"realized daily P&L vol (live)    : {realized_daily_vol:.2f}")
print(f"ratio (live / expected)           : {realized_daily_vol / expected_daily_vol:.2f}")
```

```
expected daily P&L vol (backtest): 850.00
realized daily P&L vol (live)    : 1555.23
ratio (live / expected)           : 1.83
```

A realized-to-expected volatility ratio of 1.83 — the live strategy is swinging nearly twice as hard, day to day, as the backtest led anyone to expect — is exactly the kind of number that should trigger a review well before it triggers a kill switch. It doesn't automatically mean the strategy is broken (one injected bad day in a 29-day sample can move this ratio substantially, which is itself a reminder of Lesson 25's point about short-sample noise), but a sustained, growing version of this gap over weeks or months is a real signal, not noise.

## What belongs in the operational log

Beyond P&L and risk numbers, a production strategy's log should record every order submitted (with its client order ID from Lesson 28), every fill with its actual price, every risk-limit check performed and its result (not just the breaches), and every alert or kill-switch trigger with a timestamp. This is what turns "the strategy lost money last Tuesday, not sure why" into an answerable question — reconstructing exactly what happened, in what order, after the fact, which a live P&L number alone can never do.

## Key terms

| Term | Meaning |
|---|---|
| Kill switch | An automatic, pre-committed rule that halts trading or flattens positions when a hard risk limit is breached |
| Alert | A notification to a human about an anomaly that doesn't automatically stop the strategy |
| Operational log | A detailed record of every order, fill, risk check, and alert, used to reconstruct what happened after the fact |
| Realized vs. expected volatility | Comparing live P&L volatility to what the backtest predicted, as an ongoing health check |

## Recap

Monitoring turns Chapter 5's one-time performance measures into a continuous process: hard risk limits become an automatic kill switch set in advance, softer anomalies become human alerts, and live P&L behavior gets continuously compared against backtest expectations rather than assumed to match. Next, Lesson 30 closes this chapter by asking the question that continuous monitoring eventually forces: when has a strategy decayed enough that it should actually be retired?
