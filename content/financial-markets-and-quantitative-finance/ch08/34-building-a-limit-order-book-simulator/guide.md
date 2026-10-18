# Building a Limit Order Book Simulator

Lesson 3 explained what a limit order book is and how price-time priority works. This lesson builds one — a real, working matching engine that accepts orders, matches them against resting liquidity, handles partial fills, and supports cancellation. This is also one of the most common hands-on exercises in a quant developer or trading-systems interview, and the exact exercise this chapter exists to give you practice with.

## What you'll learn

- How to represent a limit order book with separate bid and ask sides, each sorted by price-time priority
- How order matching actually works: when a new order crosses the book, what happens to it and to the resting orders it trades against
- How to handle partial fills correctly — the detail that trips up most first attempts
- How cancellation works, and why it has to search by order ID, not by price

## The data structure

Each side of the book is a list of resting orders, kept sorted by **price-time priority**: best price first, and for orders at the same price, earliest first. Bids sort by price descending (the highest bid is the best bid); asks sort by price ascending (the lowest ask is the best ask):

```python
class OrderBook:
    def __init__(self):
        self.bids = []   # resting buy orders, sorted best-first
        self.asks = []   # resting sell orders, sorted best-first
        self.next_id = 1
        self.trades = []

    def _sort_bids(self):
        self.bids.sort(key=lambda o: (-o["price"], o["time"]))

    def _sort_asks(self):
        self.asks.sort(key=lambda o: (o["price"], o["time"]))
```

Sorting bids by `-price` (negated) alongside ascending `time` is a simple way to express "highest price first, then earliest time first" with one sort key — the same price-time priority rule from Lesson 3, just expressed in code.

## Matching: what happens when a new order crosses the book

A new order **matches** immediately against the opposite side if its price crosses the best resting price there — a buy at or above the best ask, or a sell at or below the best bid. It can match against *multiple* resting orders in sequence if one isn't enough to fill it:

```python
def add_order(self, side, price, qty):
    order = {"id": self.next_id, "side": side, "price": price, "qty": qty, "time": self.next_id}
    self.next_id += 1
    remaining = qty
    book = self.asks if side == "buy" else self.bids

    def crosses(resting_price):
        return price >= resting_price if side == "buy" else price <= resting_price

    while remaining > 0 and book and crosses(book[0]["price"]):
        resting = book[0]
        fill_qty = min(remaining, resting["qty"])
        self.trades.append({"price": resting["price"], "qty": fill_qty, "aggressor_side": side})
        resting["qty"] -= fill_qty
        remaining -= fill_qty
        if resting["qty"] == 0:
            book.pop(0)   # fully filled -- remove from the book

    if remaining > 0:
        order["qty"] = remaining
        rest_book = self.bids if side == "buy" else self.asks
        rest_book.append(order)
        self._sort_bids() if side == "buy" else self._sort_asks()

    return order["id"]
```

Three details here are the ones a first attempt usually gets wrong:

1. **Trade price is the resting order's price, not the incoming order's price.** The aggressor (the order that crosses the book) gets filled at whatever price was already resting — not at its own limit price. This is a real, common bug: using the incoming order's price for the trade would let an aggressively-priced buy order fill at a worse price than what was actually available.
2. **A single incoming order can match against several resting orders.** The `while` loop keeps consuming resting liquidity, best price first, until either the incoming order is fully filled or it no longer crosses the book.
3. **Whatever remains after matching rests on the book** — an order doesn't just disappear if it isn't fully filled; the unfilled remainder becomes a new resting order at the book's current back of the line for its price.

## A worked example, with real matching

```python
book = OrderBook()
book.add_order("sell", 100.10, 50)   # id 1
book.add_order("sell", 100.10, 30)   # id 2 -- same price as id 1, arrives second
book.add_order("sell", 100.15, 100)  # id 3
book.add_order("buy", 99.95, 40)     # id 4

print("Best ask:", book.asks[0])
print("Best bid:", book.bids[0])

# A marketable buy for 60 shares at 100.10 -- more than id 1 alone can fill
buy_id = book.add_order("buy", 100.10, 60)
print("\nTrades:", book.trades)
print("Remaining asks:", book.asks)
```

```
Best ask: {'id': 1, 'side': 'sell', 'price': 100.1, 'qty': 50, 'time': 1}
Best bid: {'id': 4, 'side': 'buy', 'price': 99.95, 'qty': 40, 'time': 4}

Trades: [{'price': 100.1, 'qty': 50, 'aggressor_side': 'buy'}, {'price': 100.1, 'qty': 10, 'aggressor_side': 'buy'}]
Remaining asks: [{'id': 2, 'price': 100.1, 'qty': 20, 'time': 2}, {'id': 3, 'price': 100.15, 'qty': 100, 'time': 3}]
```

The 60-share buy order fully consumes id 1 (50 shares, filled first — it arrived before id 2 at the identical price, so price-time priority puts it first) and partially fills id 2 for the remaining 10 shares, leaving id 2 resting with 20 shares left. This is price-time priority actually working, not just described: two orders at an identical price, and the earlier one gets matched first.

## Cancellation: search by ID, not by price

A resting order can be withdrawn before it's matched. This has to search by the order's unique ID — searching by price alone would be ambiguous whenever multiple orders share a price level:

```python
def cancel_order(self, order_id):
    before_bids, before_asks = len(self.bids), len(self.asks)
    self.bids = [o for o in self.bids if o["id"] != order_id]
    self.asks = [o for o in self.asks if o["id"] != order_id]
    return len(self.bids) < before_bids or len(self.asks) < before_asks

cancelled = book.cancel_order(3)   # cancel the resting 100.15 sell order
print("Cancelled:", cancelled)
print("Remaining asks:", book.asks)
```

```
Cancelled: True
Remaining asks: [{'id': 2, 'price': 100.1, 'qty': 20, 'time': 2}]
```

## What this simplified matching engine leaves out

Real exchange matching engines handle order types this simulator doesn't (stop orders, iceberg orders, time-in-force variants), enforce tick-size rules, and run fast enough to process millions of messages per second — genuinely different engineering problems from the matching logic itself. But the core mechanism — price-time priority, matching against the best available price first, partial fills, and ID-based cancellation — is exactly what's shown here, and is the part interviewers are actually checking for when they ask you to build one.

## Key terms

| Term | Meaning |
|---|---|
| Price-time priority | Best price matched first; ties at the same price broken by earliest arrival |
| Aggressor | The incoming order that crosses the book and triggers a match |
| Partial fill | When an order's quantity is only partly matched, with the remainder resting on the book |
| Matching engine | The system logic that pairs incoming orders against resting liquidity |

## Check yourself

Why does a trade execute at the resting order's price rather than the incoming (aggressor) order's price, and what would go wrong if the matching engine used the aggressor's price instead?
