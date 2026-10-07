# Liquidity, Spreads & Market Impact

This lesson closes out Chapter 1 by pulling together everything so far — the order book, the spread, market makers — into one practical question: what actually happens when you try to trade a large amount of something? The answer is "market impact," and it's one of the most important practical constraints institutional traders deal with every day.

## What you'll learn

- The three dimensions of liquidity: tightness, depth, and resiliency
- What market impact and slippage are, and why they happen
- How VWAP and TWAP execution algorithms are used to reduce impact
- How everything from Lessons 1-4 connects into a single picture

## The three dimensions of liquidity

"Liquidity" gets used loosely, but it actually has three distinct dimensions:

1. **Tightness** — how narrow the bid-ask spread is. A tight spread means it's cheap to trade a small amount immediately.
2. **Depth** — how much size is resting at or near the best bid and ask (recall "order book depth" from Lesson 3). Deep markets can absorb a reasonably large order without the price moving much.
3. **Resiliency** — how quickly the book refills and prices snap back to normal after a large trade temporarily depletes it. A resilient market recovers in seconds; an illiquid one can stay dislocated for much longer.

A security can be tight but shallow (small spread, but only a few hundred shares at the best price), or wide but deep — "liquid" really means all three dimensions are favorable at once.

## Market impact and slippage

**Market impact** is the effect a trader's own order has on the price, simply by virtue of being large enough to need to walk through multiple price levels on the book. A large buy order doesn't just fill at the best ask — once it exhausts the size resting there, it keeps buying at progressively worse (higher) prices until the whole order is filled. The difference between the price you expected to pay and the price you actually ended up paying, averaged across the whole order, is called **slippage**.

Market impact has two components worth knowing: a **temporary** component (the price typically snaps back somewhat once the large order finishes, as the book refills) and a **permanent** component (part of the move sticks, because a large order itself conveys information — other participants reasonably infer that someone with a large position to trade may know something, which shifts the price discovery process described in Lesson 4).

## Reducing impact: VWAP and TWAP

Because trading a large order all at once is expensive, institutional traders break it into many small pieces spread out over time, using execution algorithms. Two of the most common benchmarks:

- **TWAP (Time-Weighted Average Price)** — splits the order into equal-sized pieces executed at regular time intervals, regardless of volume. Simple, but can trade heavily during naturally thin periods.
- **VWAP (Volume-Weighted Average Price)** — sizes each piece in proportion to the market's *typical* trading volume at that time of day, trading more when the market is naturally busier (and therefore more able to absorb the order without much impact) and less when it's quiet.

Both approaches aim at the same goal: get the whole order filled at a price close to the market's natural average over the execution window, rather than paying the full cost of walking through the book in one shot.

## Putting Chapter 1 together

Trace the full picture: participants (Lesson 2) place orders (Lesson 3) that rest on the limit order book; market makers quote a spread (Lessons 2 and 4) to compensate for their risk; and when an order is large relative to the liquidity available (this lesson), it moves the price against itself — which is exactly why institutions use algorithms like VWAP and TWAP to execute size without needlessly giving up money to their own market impact.

## Key terms

| Term | Meaning |
|---|---|
| Tightness | How narrow the bid-ask spread is |
| Depth | How much size rests near the best bid/ask |
| Resiliency | How quickly the book and price recover after a large trade |
| Market impact | The price movement caused by a trader's own large order |
| Slippage | The difference between expected and actual average execution price |
| VWAP / TWAP | Execution algorithms that split a large order over time to reduce impact |

## Recap

Liquidity isn't one thing — it's tightness, depth, and resiliency together. A large order that outsizes available liquidity moves the price against itself (market impact), producing slippage, which is why traders spread execution out over time using VWAP or TWAP. That closes out How Markets Work. Next up, Lesson 6: equities and corporate actions, the first lesson of Chapter 2.
