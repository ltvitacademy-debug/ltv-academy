# Order Types & the Limit Order Book

Lesson 2 introduced market makers quoting a bid and an ask. This lesson opens up what's actually behind those quotes: the limit order book, the data structure every modern exchange uses to match buyers with sellers, and the handful of order types traders use to interact with it.

## What you'll learn

- The four core order types: market, limit, stop, and stop-limit
- What the limit order book is, and its two sides — bid and ask
- Price-time priority: the rule that decides whose order gets filled first
- The National Best Bid and Offer (NBBO) and what "order book depth" means

## The core order types

- **Market order** — "buy or sell right now, at whatever the best available price is." Guarantees execution, not price. It fills immediately against the best resting orders on the book.
- **Limit order** — "buy or sell, but only at this price or better." Guarantees price, not execution — if the market never reaches your limit, the order simply sits unfilled. A limit order that isn't immediately filled rests on the limit order book.
- **Stop order** — dormant until the market trades at a specified "stop price," at which point it becomes a market order. Commonly used to limit losses on an existing position (a "stop-loss").
- **Stop-limit order** — the same trigger as a stop order, but once triggered it becomes a limit order rather than a market order, giving price protection at the cost of a guarantee that it fills at all.

## The limit order book

The **limit order book** is the running list of all unfilled limit orders for a given security, organized into two sides:

- The **bid side** — resting buy orders, ranked from highest price (most aggressive) to lowest.
- The **ask (offer) side** — resting sell orders, ranked from lowest price (most aggressive) to highest.

The highest bid and the lowest ask are the **best bid** and **best ask**. The gap between them is the bid-ask spread introduced in Lesson 2. A trade happens the moment an incoming order's price crosses the book — for example, a market buy order fills against the lowest-priced resting sell orders until it's fully filled.

## Price-time priority

When multiple resting orders sit at the same price, exchanges need a rule to decide which one gets filled first. The standard rule is **price-time priority**: better prices are always filled first (a bid of $50.02 fills before a bid of $50.01), and among orders at the *same* price, the order that arrived *first* gets filled first. This rewards traders who commit to a price early and discourages constantly canceling and replacing an order just to "cut in line" — most exchanges reset time priority when an order's price is changed.

## NBBO and order book depth

In markets with multiple competing venues (recall ECNs and dark pools from Lesson 2), the **National Best Bid and Offer (NBBO)** is the single best bid and best ask available across *all* of them combined — U.S. regulations generally require that a retail customer's market order be executed at a price at least as good as the NBBO. **Order book depth** refers to how many shares (or contracts) are resting at each price level beyond just the best bid and ask — a "deep" book has large quantities available near the top of the book, meaning a large order can be filled with relatively little price movement; a "thin" book means even a modest order can move the price noticeably, a theme picked up in Lesson 5.

## Key terms

| Term | Meaning |
|---|---|
| Market order | Execute immediately at the best available price; guarantees fill, not price |
| Limit order | Execute only at a specified price or better; guarantees price, not fill |
| Stop / stop-limit order | Dormant order triggered at a stop price, becoming a market or limit order |
| Limit order book | The ranked list of resting bid and ask orders for a security |
| Price-time priority | Better price fills first; ties broken by whoever arrived first |
| NBBO | The best bid and ask available across all trading venues combined |

## Recap

A market order trades now at whatever price is available; a limit order waits for its price; stop and stop-limit orders activate only once a trigger price is hit. All resting limit orders live on the limit order book, split into bid and ask sides, filled in price-time priority order. Next up, Lesson 4: market microstructure — the mechanics behind how prices actually get discovered and why that spread exists in the first place.
