# Market-Knowledge & Trading Interviews

Trading and market-making interviews test something the math and coding rounds don't: fast, intuitive judgment about how markets actually behave. This round asks whether you understand the mechanics underneath a position, not just how to backtest one.

## What you'll learn

- What a market-knowledge round is actually testing, and how it differs from a research round
- Order types and market-making mechanics, with a worked P&L example
- A fast mental-math drill pattern used in live trading interviews
- How to connect SR-5's own market structure (dollar-neutral, correlation-to-one) to trading-specific questions

## What this round tests that the others don't

Math rounds test probabilistic reasoning; stats/ML rounds test modeling judgment. A market-knowledge round tests whether you understand market mechanics well enough to reason about a position's risk in real time — how an order actually gets filled, what moves a spread, and what happens to a book when markets move fast. This matters most for trading and market-making roles, less for pure research roles, so calibrate prep time to the role (Lesson 17).

## Order types and market-making mechanics

Know these cold, since they come up directly or get assumed as background knowledge:

- **Market order** — executes immediately at the best available price, guaranteeing execution but not price.
- **Limit order** — executes only at a specified price or better, guaranteeing price but not execution.
- **Bid-ask spread** — the gap between the best buy price (bid) and best sell price (ask); a market maker profits by capturing this spread repeatedly, not by predicting direction.

**Worked example:** A market maker quotes a stock at 99.95 bid / 100.05 ask. A customer sells 1,000 shares into the bid, then a different customer buys 1,000 shares at the ask. The market maker bought at 99.95 and sold at 100.05 on the same 1,000 shares: `(100.05 - 99.95) × 1,000 = $100` captured, with no directional view taken at all. The real risk a market maker manages isn't "will the price go up or down" — it's **inventory risk**: what happens if the market maker ends up net long or net short because one side of the quote gets hit far more than the other.

## A fast mental-math drill

Live trading interviews often include rapid P&L arithmetic under light time pressure — not because the math is hard, but because speed and accuracy under pressure is itself the skill being tested. Practice the pattern, not just the answer:

**Drill:** You're short 500 shares at $80. The stock drops to $76.50. What's your P&L?

**Answer:** `(80 - 76.50) × 500 = $1,750` profit — a short position gains when the price falls, so the entry price minus the exit price, times shares, is the correct direction for the arithmetic. Practice dozens of these — different directions (long/short), different instruments (shares, options deltas, futures contracts with multipliers) — until the arithmetic is instant and the sign never trips you up.

## Risk-scenario questions

Expect open-ended prompts like "the Fed just surprised the market with a rate hike — walk me through what happens to a long/short equity book like this one." A strong answer references real mechanics: a macro surprise tends to move every name in the same direction at once, which is exactly the **correlation-to-one** effect from Lesson 12 — the dollar-neutral construction of a book like SR-5 reduces net market exposure *on average*, but a sudden, broad macro shock is precisely the scenario where long/short diversification is weakest, because every position starts moving together instead of independently. Being able to name that mechanism specifically, rather than giving a generic "markets would be volatile" answer, is what separates a strong response here.

## Connecting SR-5's own structure to this round

SR-5 is a legitimate source of trading-specific talking points, not just a research exercise. Its dollar-neutral construction (Lesson 9) demonstrates understanding of market-neutral positioning. Its VIX-regime conditioning (Lesson 2) shows awareness that strategy behavior should vary with the volatility environment. And the COVID beta spike to ~0.25 (Lesson 12) is a concrete, honest example you can cite if asked "tell me about a time your assumptions about market structure broke down" — a question that comes up in trading interviews specifically because every real trader has a story like it.

## Key terms

| Term | Meaning |
|---|---|
| Inventory risk | The risk a market maker takes on from ending up net long or net short after filling customer orders on one side more than the other |
| Bid-ask spread | The gap between the best bid and best ask; a market maker's primary source of profit, captured without taking a directional view |
| Market order vs. limit order | A market order guarantees execution but not price; a limit order guarantees price but not execution |

## Recap

Market-knowledge rounds test real-time intuition about market mechanics: order types, how market makers actually profit (spread capture, not direction), fast and accurate P&L arithmetic under pressure, and the ability to reason about a book's risk during a macro shock using concepts like correlation-to-one. SR-5's own dollar-neutral construction and COVID beta spike are legitimate, honest talking points for this round. Next, Lesson 22 covers research presentations and case interviews.
