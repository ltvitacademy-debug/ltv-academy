# Script — Order Types & the Limit Order Book

## Segment 1 (title)

Lesson two introduced market makers quoting a bid and an ask. This lesson opens up what's actually behind those quotes: the limit order book, the structure every modern exchange uses to match buyers with sellers, and the order types traders use to interact with it.

## Segment 2 (steps)

A market order says buy or sell right now at whatever price is available — it guarantees execution, not price. A limit order says only at this price or better — it guarantees price, not execution, and if the market never gets there, it just sits unfilled. A stop order is dormant until the market trades at a trigger price, then becomes a market order, often used to cap a loss. A stop-limit order uses the same trigger but becomes a limit order instead, trading price protection for a guaranteed fill.

## Segment 3 (steps)

Every unfilled limit order rests on the limit order book, split into two sides. The bid side holds resting buy orders ranked from highest price down. The ask side holds resting sell orders ranked from lowest price up. The highest bid and lowest ask are the best bid and best ask, and the gap between them is the bid-ask spread. A trade happens the instant an incoming order's price crosses the book.

## Segment 4 (steps)

When multiple orders sit at the same price, exchanges use price-time priority: a better price always fills first, and among orders at the same price, whoever arrived first fills first. That rewards committing to a price early instead of constantly canceling and re-entering. Across every competing venue combined, the single best bid and ask available is called the National Best Bid and Offer, or NBBO — and how much size is resting beyond just the top of the book is called order book depth.

## Segment 5 (outro)

Market, limit, stop, and stop-limit orders interact with a book that's just two ranked lists, bid and ask, filled by price and then by time. Up next, lesson four: market microstructure, and why that spread exists in the first place.
