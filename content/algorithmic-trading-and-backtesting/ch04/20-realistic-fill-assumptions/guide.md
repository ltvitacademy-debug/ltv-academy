# Realistic Fill Assumptions

This lesson closes Chapter 4 by returning to a question Lesson 11 raised and the rest of the chapter has been building toward: exactly what price does a simulated trade fill at, and could that fill have actually happened? Costs, impact, look-ahead bias, and overfitting can all be modeled correctly and a backtest can *still* be unrealistic if the underlying fill assumption is physically impossible. This lesson makes that assumption explicit and gives you a checklist for auditing it.

## What you'll learn

- Why "fills at the signal price" is almost always an impossible assumption
- The realistic fill conventions used by real backtesting practice: next-bar open, VWAP, limit-order logic
- How order type (market vs. limit vs. stop) changes what a "realistic fill" even means
- A fill-assumption checklist to audit any backtest, including your own from earlier lessons
- How this lesson's discipline connects back to every other lesson in Chapter 4

## Why "fill at the signal price" is impossible

Across this chapter and Lesson 11, the recurring guard has been: a decision made from bar N's data can only be acted on starting bar N+1. But *which* price on bar N+1? A backtest that fills at bar N+1's close, having generated the signal from bar N's close, has smuggled in a full extra day of favorable-or-unfavorable movement with no justification — it's quietly assuming you can trade at a price you won't actually observe until the end of that next bar, which is just as physically impossible as trading on bar N's own close.

The realistic answer: a market order placed as soon as the signal is known (e.g., right after bar N's close) can only fill at the *next* price actually quoted to the market, which for daily bar data is conventionally bar N+1's **open**. This is the convention the event-driven backtester in Lesson 13 used, and it's the most common, defensible default for daily-bar backtests without more granular intraday data.

## Fill conventions by order type

Different order types imply genuinely different, equally valid fill logic — conflating them is itself a source of unrealistic backtests:

- **Market order** — fills immediately at the best available price, which for daily data is approximated as next-bar open, and which should also absorb the slippage and impact models from Lessons 16-17 on top of that reference price.
- **Limit order** — only fills if the market actually trades through the specified limit price during the bar; a backtest should check whether the bar's high/low range crossed the limit, not just assume the order filled because the signal fired:

```python
def limit_buy_fills(bar, limit_price):
    """
    A limit buy only fills if the bar's low actually traded
    at or below the limit price — NOT simply because the
    signal said "buy." Conservatively assume it fills at the
    limit price itself if triggered (ignoring queue priority).
    """
    return bar["low"] <= limit_price
```

- **Stop order** — the mirror image: only triggers if price moves *through* the stop level, and even then typically fills somewhat worse than the stop price itself (stop orders convert to market orders once triggered, so they inherit slippage), not exactly at the stop price.
- **VWAP / TWAP execution** — for larger orders worked over a period rather than filled instantly, a common convention is to assume the fill approximates the volume-weighted average price (VWAP) over the execution window, which is both more realistic for size and directly connects to Lesson 17's market impact discussion, since VWAP execution is one real-world technique for managing impact (and is covered further in Lesson 27 of this course).

A backtest using market-order logic to simulate what was actually conceived as a limit-order strategy (or vice versa) is testing a strategy that doesn't exist.

## A fill-assumption checklist

Before trusting any backtest's results — including the ones you built in Lessons 11-15 — walk through these explicitly:

1. **What exact price does each trade fill at?** Name it precisely (next-bar open, VWAP over a window, limit price if triggered) — "the signal price" is never a valid answer.
2. **Is that price actually achievable given the order type modeled?** A limit order's fill must be checked against the bar's actual traded range, not assumed.
3. **Does the fill price already include slippage and impact**, or are those applied as a separate adjustment on top? Either is fine, but doing neither silently assumes frictionless, perfect execution.
4. **Would this fill logic survive being run live, bar by bar, with no knowledge of the future?** This is the same look-ahead-bias question from Lesson 18, applied specifically to the execution layer rather than the signal layer.
5. **Does partial fill matter here?** A large limit order might only partially fill within a bar's traded volume; ignoring this for a strategy near its capacity ceiling (Lesson 17) overstates how much of the position could actually be built.

## Bringing Chapter 4 together

Every lesson in this chapter has been a version of the same discipline: name your assumptions explicitly, and check whether they could have actually happened in real markets. Transaction costs and slippage (Lesson 16) made execution cost explicit. Market impact and capacity (Lesson 17) made your own footprint explicit. Look-ahead and survivorship bias (Lesson 18) made data honesty explicit. Data snooping and overfitting (Lesson 19) made statistical honesty about your search process explicit. This lesson makes the fill price itself explicit. None of these fixes make a mediocre strategy good — if anything, applying all of them typically makes a strategy's backtested performance *worse* than the naive version, often substantially. That is not a flaw in the method. A backtest that gets worse once realism is added was never as good as it looked; a strategy that survives all five checks intact is one worth taking seriously.

## Key terms

| Term | Meaning |
|---|---|
| Market order | An order that fills immediately at the best available price, approximated as next-bar open for daily data |
| Limit order | An order that only fills if the market trades through a specified price |
| VWAP | Volume-weighted average price, a common realistic fill benchmark for orders worked over a period |
| Partial fill | When only part of an order size actually executes within the available liquidity or traded range |

## Recap

A realistic fill assumption names the exact price a trade executes at, checks whether that price was achievable given the order type, and layers in slippage, impact, and look-ahead discipline rather than assuming free, instant, perfect execution. With that, Chapter 4's realism checklist is complete: costs, impact, bias, overfitting, and fills. Next, Chapter 5 turns to measuring what survives all of this honestly — Lesson 21 covers returns, the Sharpe ratio, and the Sortino ratio, the standard vocabulary for describing a strategy's risk-adjusted performance.
