# Fair Value Estimation: What a Market Maker Actually Prices Around

Every strategy in this course so far has been a **liquidity taker** — deciding when to buy or sell, then using Lesson 27's execution algorithms to get the order filled with minimal cost. A **market maker** does the opposite job: it never decides "buy or sell" based on a view of future direction, it continuously quotes *both* a price it will buy at and a price it will sell at, and earns the spread between them. This chapter builds that discipline from the ground up, starting with the one question everything else depends on: what price should you actually be quoting around?

## What you'll learn

- Why a market maker's quotes center on a **fair value** estimate, not the last traded price
- Three real ways to estimate fair value: the midpoint, a volume-weighted microprice, and a short-horizon fair-value model
- Why naively quoting around the last trade price is a losing strategy
- How fair value connects to the reservation price built in the next lesson

## The last trade price is the wrong anchor

A beginner's instinct is to quote a market maker's bid and ask symmetrically around the **last traded price**. This fails for a concrete reason: the last trade already happened — it tells you where the market *was*, not where it *is*. If the market has moved since that trade (which, in any liquid instrument, it constantly has), quoting around a stale last-trade price means one side of your quote is already wrong, and informed traders will pick it off before you can update.

## Fair value anchor #1: the midpoint

The simplest real anchor is the **midpoint** of the current best bid and best ask:

```python
best_bid = 100.02
best_ask = 100.06

midpoint = (best_bid + best_ask) / 2
print(f"midpoint: {midpoint:.4f}")
```

```
midpoint: 100.0400
```

The midpoint is live (it updates with every change to the book, not just every trade) and symmetric by construction. Its weakness: it treats the book as if both sides carry equal information, which isn't always true — a thin ask with 50 shares and a deep bid with 5,000 shares aren't equally meaningful.

## Fair value anchor #2: the microprice

The **microprice** fixes the midpoint's blind spot by weighting each side by the *other* side's size — a large bid size pulls the microprice toward the ask, because a large resting bid signals buying pressure likely to push price up:

```python
bid_size = 5_000
ask_size = 50

microprice = (best_bid * ask_size + best_ask * bid_size) / (bid_size + ask_size)
print(f"microprice: {microprice:.4f}")
print(f"midpoint:   {midpoint:.4f}")
```

```
microprice: 100.0596
midpoint:   100.0400
```

Notice the microprice sits much closer to the ask here — exactly because the large resting bid (5,000 shares) signals real buying interest that the plain midpoint ignores entirely. This is a genuinely more information-rich fair-value estimate than the midpoint, and it's what most production market-making systems actually use as their base anchor.

## Fair value anchor #3: a short-horizon model

For instruments with predictable short-term patterns (mean reversion in the spread, momentum in recent trade flow), a market maker can layer a lightweight statistical model on top of the microprice — the same autoregressive and signal-building techniques from Chapters 1-2 of this course, applied at a much shorter horizon (seconds, not days). This is where the line between "market making" and "very short-horizon alpha generation" genuinely blurs in practice; a market maker with a better short-horizon fair-value estimate than its competitors earns a real edge beyond the spread alone.

## Why this matters before anything else in this chapter

Every lesson that follows — the reservation price, inventory skewing, adverse-selection defense — starts from "here is my fair value estimate" and builds quoting logic on top of it. A market maker with a bad fair-value estimate will skew its quotes correctly around the wrong number, which is a more dangerous failure than skewing imperfectly around the right one: the downstream logic in every later lesson inherits whatever error exists here.

## Key terms

| Term | Meaning |
|---|---|
| Market maker | A participant quoting both a bid and ask continuously, earning the spread, without taking a directional view |
| Fair value | The price a market maker's quotes are centered around — an estimate of the instrument's true current value |
| Midpoint | The simplest fair-value anchor: the average of the best bid and best ask |
| Microprice | A size-weighted fair-value estimate that pulls toward the side with less resting size |

## Check yourself

Why does a large resting bid size pull the microprice toward the ask, rather than toward the bid?
