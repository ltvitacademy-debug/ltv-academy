# Script — Hedging Strategies

## Segment 1 (title)

Lesson 25 named the risk types. This lesson covers the practical side: once you've identified a risk, what do you actually do to reduce it? Hedging means taking an offsetting position so that losses in one place get cushioned by gains in another, and the mechanics differ depending on what you're hedging and what you're hedging with.

## Segment 2 (code)

Here's delta-hedging worked through. An option's delta measures how much its price moves for a dollar move in the underlying. A long call with a delta of point-six-oh, on a standard hundred-share contract, behaves like sixty shares of exposure. To offset it, the trader sells sixty shares short. The combined position's delta comes out close to zero, so a small move in the stock produces roughly no net change in the combined position's value.

## Segment 3 (steps)

Not every hedge needs that kind of attention. A static hedge gets put on once and left in place, which works fine when the exposure itself doesn't change shape over time. A dynamic hedge has to be rebalanced periodically because the thing being hedged does change shape as markets move — delta-hedging an option is the classic example, because delta itself shifts as the underlying price moves. That shift is gamma, and it's exactly why a delta-hedge that was perfect yesterday needs to be recalculated today.

## Segment 4 (steps)

No hedge is ever perfect. Basis risk is the risk that the hedging instrument doesn't move in exact lockstep with the exposure being hedged. A jet-fuel buyer who hedges with crude oil futures, because there's no liquid jet-fuel futures market, is still exposed to the gap between jet fuel and crude prices even with the futures position sized correctly. That's a cross-hedge — using a related but not identical instrument — and it reduces risk substantially without eliminating it the way a hedge in the exact same instrument would.

## Segment 5 (outro)

Delta-hedging with stock, linear hedging with futures, rebalancing dynamically as gamma shifts the ratio, and accepting basis risk when a perfect instrument doesn't exist — that's the hedging toolkit. Up next, Lesson 27: regulation and risk governance, the rules and oversight structures shaping how firms are expected to manage all of this.
