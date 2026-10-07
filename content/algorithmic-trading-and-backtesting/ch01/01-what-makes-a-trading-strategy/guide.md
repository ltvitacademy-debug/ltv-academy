# What Makes a Trading Strategy

Welcome to Algorithmic Trading & Backtesting. This course is step seven of the Quantitative Developer / Researcher path, and it assumes you can already code and already know some statistics — what's new here is turning a market idea into a systematic, testable set of rules, and then being honest with yourself about whether that edge is real. This first lesson defines the one thing every later lesson builds on: what actually counts as a trading strategy.

## What you'll learn

- The difference between a trading "idea" and a trading "strategy"
- The five components every systematic strategy needs: universe, signal, sizing, risk rules, and execution
- Systematic vs. discretionary trading, and why this course is entirely about the systematic side
- The research pipeline this course follows, start to finish
- Why most strategy ideas don't survive contact with real, honest testing — and why that's fine

## From idea to strategy

"Stocks that go up tend to keep going up for a while" is an idea. It's not a strategy, because nobody could run it. A strategy has to answer, in advance and in writing: which instruments, using what rule, sized how, exited when, and traded how. If you can't turn an idea into an unambiguous set of rules that a computer could execute without you in the loop, you don't have a strategy yet — you have a hunch. This course is about making that conversion rigorously, and about catching yourself when the conversion is quietly circular (tuning the rule until it matches the history you already looked at — more on this in Chapter 4).

## The five components of a systematic strategy

- **Universe** — which instruments are eligible (e.g., S&P 500 constituents, a currency pair, a futures curve). The universe has to be defined without hindsight — "the stocks that did well" is not a valid universe definition.
- **Signal** — the rule that turns data into a view: is this instrument attractive right now, and in which direction? (Chapters 1–2 are mostly about building good signals.)
- **Position sizing** — how much capital or risk a signal gets, given its strength and your available risk budget (Lesson 9, Lesson 10).
- **Risk rules** — stop-losses, exposure caps, correlation limits — the rules that keep one bad bet or one broken assumption from being catastrophic.
- **Execution** — how the signal actually becomes an order: timing, order type, and the realistic cost of getting in and out (Chapter 6).

A backtest, which the rest of this course spends a lot of time on, is simply running all five components against historical data to see how the resulting equity curve would have looked — honestly, that is, without letting the test see the future.

## Systematic vs. discretionary

A **discretionary** trader uses rules as input to a human judgment call — two discretionary traders looking at the same chart can act differently, and that's fine, that's the point. A **systematic** strategy removes the human from the moment-to-moment decision: given the same data, it always produces the same position. Systematic strategies are not inherently better, but they are the only kind you can backtest, automate, and reason about statistically — which is why this entire course, and this entire career track, is about the systematic side.

```python
# A systematic strategy is just a deterministic function:
# given the same historical data up to time t, it always
# returns the same target position. That determinism is
# exactly what makes it backtestable.

def strategy(prices_up_to_t: "pd.Series") -> float:
    """Return a target position in [-1, 1] using only
    information available at or before time t."""
    lookback = 20
    signal = prices_up_to_t.pct_change(lookback).iloc[-1]
    return 1.0 if signal > 0 else -1.0
```

## The pipeline this course follows

Chapters 1–2 build the idea into signals and a portfolio. Chapter 3 turns that into a runnable backtesting engine. Chapter 4 is the most important chapter in the course: it's entirely about the ways a backtest lies to you. Chapter 5 measures performance and risk honestly. Chapter 6 is about the gap between a backtest and a live account. The capstone in Chapter 7 asks you to do the whole thing yourself, end to end.

## An honest word before you start

Most trading ideas, even good-sounding ones, do not survive a rigorous out-of-sample test. That is not a flaw in this course — it is the actual state of the field, and a huge amount of this course (especially Chapter 4) is dedicated to teaching you to recognize when you've fooled yourself. Nothing here is investment advice, and nothing here promises a profitable system. What it teaches is the research discipline and engineering skill professional quant teams use to separate a real, if modest, edge from a statistical illusion.

## Key terms

| Term | Meaning |
|---|---|
| Strategy | A fully specified, rule-based mapping from data to positions — universe, signal, sizing, risk, execution |
| Systematic | Rule-driven and deterministic; the same inputs always produce the same output |
| Discretionary | Human judgment makes the final call, even if informed by rules |
| Backtest | Running a strategy's rules against historical data to estimate how it would have performed |
| Universe | The set of instruments a strategy is eligible to trade |

## Recap

A strategy is not a hunch — it's five things nailed down in advance: universe, signal, sizing, risk rules, and execution, all deterministic enough to backtest. Next, Lesson 2 gives you the vocabulary to describe what a strategy's returns are actually made of: alpha, beta, and edge.
