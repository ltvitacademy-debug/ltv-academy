# Script — Market Microstructure Basics

## Segment 1 (title)

Lesson three gave you the limit order book's mechanics. This lesson asks the why underneath it: why does a bid-ask spread exist at all, and where does a price actually come from? This is market microstructure — how the rules of trading shape prices, apart from what something is really worth.

## Segment 2 (steps)

Price discovery is the process by which a market arrives at a price through the ongoing interaction of buy and sell orders. No single party decides it — the price emerges from participants submitting, canceling, and crossing orders on the book continuously. A liquid market with lots of active participants discovers prices quickly and accurately. A thin market discovers them slowly, with more noise.

## Segment 3 (steps)

The bid-ask spread isn't arbitrary — it compensates for three risks. Order-processing cost is just the operational cost of handling a trade. Inventory risk is the chance the price moves against a market maker before they can offset a position they just took on. And adverse selection is the risk of trading against someone who knows something you don't — if informed traders tend to buy right before good news, the market maker who sold to them loses systematically, so that risk gets priced into the spread too.

## Segment 4 (steps)

Tick size, the smallest allowed price increment, puts a floor under how narrow a spread can get — a market maker can't quote tighter than one tick. Most of the trading day runs as continuous trading, matching orders the instant they cross. The open and close work differently: orders pile up without executing, and at one moment the exchange computes the single price that matches the most volume, firing every crossing order at once. That closing price is what gets used for index values and fund valuations, which is why so much volume is deliberately timed to trade right at the close.

## Segment 5 (outro)

Spreads price risk, tick size floors them, and the open and close trade as batch auctions rather than continuously. Up next, lesson five: liquidity, spreads, and what happens to price when an order is simply too big for the book to absorb quietly.
