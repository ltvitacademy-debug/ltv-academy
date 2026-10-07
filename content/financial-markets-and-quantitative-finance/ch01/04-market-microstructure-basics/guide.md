# Market Microstructure Basics

Lesson 3 gave you the limit order book's mechanics. This lesson asks the "why" underneath it: why does a bid-ask spread exist at all, where does a stock's price actually come from, and what's different about the open and close of the trading day versus the middle of it? This is the study of **market microstructure** — how the rules and mechanics of trading shape prices, independent of what a security is "really worth."

## What you'll learn

- What price discovery means and how continuous trading produces it
- The three components that make up the bid-ask spread
- Tick size and why it matters
- Continuous trading vs. opening and closing auctions

## Price discovery

**Price discovery** is the process by which a market arrives at the price of an asset through the interaction of buy and sell orders. No single party decides a stock's price — it emerges from the ongoing back-and-forth of market participants submitting, canceling, and crossing orders on the limit order book. A liquid market with many active participants discovers prices quickly and accurately; a thin, illiquid market discovers prices slowly and with more noise.

## Why the spread exists: three components

Market makers quote a bid below and an ask above where they believe the "true" price sits. That gap, the bid-ask spread, isn't arbitrary — it compensates for three distinct risks:

1. **Order-processing cost** — the operational cost of handling a trade: exchange fees, technology, and the market maker's own cost of doing business.
2. **Inventory risk** — the risk of holding a position between trades. A market maker who just bought shares from one client is now exposed to the price falling before they can sell to the next client, so they widen the spread to compensate.
3. **Adverse selection (information asymmetry)** — the risk of trading with someone who knows something the market maker doesn't. If a trader with better information is more likely to buy right before good news, the market maker who sold to them loses money systematically — so the spread also prices in the probability of trading against better-informed counterparties.

These three components are why spreads widen in volatile or uncertain conditions (inventory risk and adverse selection both rise) and narrow in calm, liquid, heavily-traded names (where order-processing cost dominates).

## Tick size

**Tick size** is the smallest allowed increment between prices — in US equities, typically one cent for most stocks. Tick size puts a floor under how narrow the spread can get: a market maker can't quote a spread smaller than one tick. A smaller tick size tends to produce tighter spreads and more price levels in the book; a larger tick size can mean wider spreads but deeper liquidity concentrated at each price level, which is one reason some lower-priced or less liquid securities trade with different tick conventions.

## Continuous trading vs. auctions

Most of the trading day operates under **continuous trading**: orders are matched the instant they cross on the book, one trade at a time, throughout the session. The **open** and **close** of the trading day work differently. Many exchanges run an **opening auction** and a **closing auction**: orders submitted before the auction accumulate without executing, and at a single moment the exchange computes the single price that matches the maximum possible volume, executing all crossing orders simultaneously at that one price. This matters because overnight news and after-hours order flow all pile up before the open — a single auction price absorbs that imbalance more smoothly than switching straight into continuous trading would. The closing auction, similarly, sets the official "closing price" used for index calculations, fund valuations (NAVs), and countless other references — which is why a large volume of trading is often deliberately timed to execute exactly at the close.

## Key terms

| Term | Meaning |
|---|---|
| Market microstructure | The study of how trading rules and mechanics shape prices |
| Price discovery | The process by which buy/sell order interaction produces a market price |
| Order-processing cost | The operational cost component of the bid-ask spread |
| Inventory risk | The risk of holding a position between trades; a spread component |
| Adverse selection | The risk of trading against better-informed counterparties; a spread component |
| Tick size | The smallest allowed price increment |
| Opening/closing auction | A single-price batch execution at the start/end of the trading day |

## Recap

Prices emerge from continuous order interaction (price discovery), and the bid-ask spread that market makers charge compensates for order-processing cost, inventory risk, and adverse selection. Tick size sets a floor on spread width, and the open and close run as batch auctions rather than continuous matching. Next up, Lesson 5: liquidity, spreads, and the market impact that comes from trading in size.
