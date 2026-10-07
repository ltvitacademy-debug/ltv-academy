# Script — Liquidity, Spreads & Market Impact

## Segment 1 (title)

This lesson closes out chapter one by pulling together the order book, the spread, and market makers into one practical question: what actually happens when you try to trade a large amount of something? The answer is market impact, and it's one of the biggest constraints institutional traders deal with every day.

## Segment 2 (steps)

Liquidity actually has three dimensions. Tightness is how narrow the bid-ask spread is — cheap to trade small size immediately. Depth is how much size is resting near the best bid and ask, so a market can absorb a decent-sized order without the price moving much. Resiliency is how fast the book refills and price snaps back after a large trade temporarily depletes it. A security can be tight but shallow, or wide but deep — truly liquid means all three are favorable at once.

## Segment 3 (steps)

A large order doesn't just fill at the best price — once it exhausts the size resting there, it keeps buying or selling at progressively worse prices until it's done. That's market impact, and the gap between the price you expected and what you actually paid is slippage. Part of that impact is temporary, because the price partly snaps back once the order finishes. Part of it is permanent, because a large order itself conveys information other traders react to.

## Segment 4 (steps)

Because trading it all at once is expensive, institutions split a large order into many small pieces over time using execution algorithms. TWAP trades equal-sized pieces at equal time intervals, regardless of volume. VWAP sizes each piece to match the market's typical volume at that time of day, trading more when the market can naturally absorb more. Both aim at the same thing: fill near the market's natural average price instead of paying the full cost of walking through the book in one shot.

## Segment 5 (outro)

Participants place orders that rest on the book, market makers price the spread, and a large order moves price against itself unless it's spread out with VWAP or TWAP — that's chapter one, start to finish. Up next, lesson six: equities and corporate actions, opening chapter two.
