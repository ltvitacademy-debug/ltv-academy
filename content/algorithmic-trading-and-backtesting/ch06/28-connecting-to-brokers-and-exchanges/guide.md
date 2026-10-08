# Connecting to Brokers & Exchanges

Everything up to this lesson has assumed orders simply "happen." In production, an order has to actually travel from your code to a broker or exchange, get acknowledged, possibly fill in pieces, and have its outcome reconciled back into your own records — all over a network connection that can time out, drop, or duplicate a message at the worst possible moment. This lesson covers that connectivity layer and the defensive patterns every serious trading system needs around it.

## What you'll learn

- The three common ways strategies connect to brokers: REST, FIX, and native/proprietary APIs
- The order lifecycle: new, acknowledged, partially filled, filled, rejected, cancelled
- Why idempotent order submission is non-negotiable, not a nice-to-have
- Rate limits and why hitting them is a design failure, not bad luck
- Sandbox/paper endpoints as the direct infrastructure link back to Lesson 26

## Three ways to connect

- **REST APIs** — the most common for retail and many institutional brokers: HTTP requests to place, modify, and cancel orders, with responses as JSON. Simple to integrate, but typically higher latency and no persistent push connection, so you usually also need a separate WebSocket or polling mechanism to learn about fills as they happen.
- **FIX (Financial Information eXchange) protocol** — the institutional standard, a persistent, stateful binary/text session over which orders and execution reports flow as structured messages. Lower latency and the de facto standard for serious institutional connectivity, but materially more complex to implement correctly (session management, sequence numbers, message recovery after a disconnect).
- **Native/proprietary APIs** — a specific exchange's or broker's own SDK, often wrapping one of the above with convenience methods. Easiest to get started with for that specific venue, at the cost of being locked into that venue's abstractions if you ever need to add a second broker.

Whichever protocol, the strategy code itself (signal, sizing, risk rules from Chapters 1-2) should not need to know which one is underneath — that's exactly what an order management system (OMS) layer is for: a stable internal interface your strategy calls, which translates to whatever protocol the specific broker actually speaks.

## The order lifecycle

Every order moves through a predictable set of states, and your system has to track all of them correctly, not just "did it fill":

```python
from dataclasses import dataclass

@dataclass
class Order:
    client_order_id: str
    symbol: str
    qty: float
    status: str = "NEW"
    filled_qty: float = 0.0
    fill_notional: float = 0.0

    @property
    def avg_fill_price(self):
        return self.fill_notional / self.filled_qty if self.filled_qty else None
```

An order typically moves `NEW -> WORKING (acknowledged) -> PARTIALLY_FILLED (zero or more times) -> FILLED`, or it can be `REJECTED` outright (bad symbol, insufficient buying power, risk check failure at the broker) or `CANCELLED` mid-way. A system that only checks "is it filled yet, yes or no" will silently mishandle partial fills and rejections — both of which happen constantly in real trading.

## Idempotent submission: the non-negotiable pattern

A network call can fail in a way where you genuinely don't know whether the broker received your order — the request could have timed out before the response arrived, even though the order was placed successfully. The standard defense is a **client order ID**: a unique ID your system generates and attaches to every order, which the broker treats as a de-duplication key. Retrying a submission with the *same* client order ID must not create a second, duplicate position.

```python
class SimpleOMS:
    def __init__(self):
        self.orders: dict = {}

    def submit(self, client_order_id, symbol, qty):
        if client_order_id in self.orders:
            return self.orders[client_order_id]  # already submitted -- don't duplicate
        order = Order(client_order_id=client_order_id, symbol=symbol, qty=qty)
        self.orders[client_order_id] = order
        return order

oms = SimpleOMS()
o1 = oms.submit("algo-2024-001", "ABC", 1000)
o1_retry = oms.submit("algo-2024-001", "ABC", 1000)  # retry after a dropped ack

print(f"orders tracked after retry: {len(oms.orders)}")
print(f"same order returned        : {o1 is o1_retry}")
```

```
orders tracked after retry: 1
same order returned        : True
```

Without this pattern, a single dropped network response during a routine retry can silently double a position — a real and common cause of live trading incidents, almost never a problem that shows up in a backtest at all, which is exactly why it belongs in this chapter rather than any earlier one.

## Reconciling broker events into your own state

The broker sends back a stream of events (acknowledgement, partial fills, final fill, or rejection), and your OMS has to apply them correctly to compute the real average fill price you actually achieved — the number implementation shortfall (Lesson 27) is measured against:

```python
def on_broker_event(order, event, qty=0.0, price=0.0):
    if event == "ACK":
        order.status = "WORKING"
    elif event in ("PARTIAL_FILL", "FILL"):
        order.filled_qty += qty
        order.fill_notional += qty * price
        order.status = "PARTIALLY_FILLED" if event == "PARTIAL_FILL" else "FILLED"
    elif event == "REJECT":
        order.status = "REJECTED"
    return order

on_broker_event(o1, "ACK")
on_broker_event(o1, "PARTIAL_FILL", qty=400, price=50.10)
on_broker_event(o1, "PARTIAL_FILL", qty=350, price=50.15)
final = on_broker_event(o1, "FILL", qty=250, price=50.20)

print(f"status        : {final.status}")
print(f"filled_qty     : {final.filled_qty}")
print(f"avg_fill_price : {final.avg_fill_price:.4f}")
```

```
status        : FILLED
filled_qty     : 1000.0
avg_fill_price : 50.1425
```

The order filled in three pieces at three different prices, and the average fill price (50.1425) is the real number to compare against the arrival price for implementation shortfall — not any single one of the three fill prices in isolation.

## Rate limits and sandbox environments

Every broker API enforces rate limits (requests per second, orders per minute); hitting them in production is a design failure in your own system — queuing and backing off, not retrying in a tight loop — not bad luck. Every serious broker also provides a **sandbox (paper) endpoint**, functionally identical to production but against simulated money: this is the literal infrastructure that Lesson 26's paper trading runs against, which is why the two lessons are directly connected rather than coincidentally adjacent in this chapter.

## Key terms

| Term | Meaning |
|---|---|
| FIX protocol | The institutional-standard stateful protocol for order and execution messages |
| Client order ID | A unique ID attached to an order submission, used by the broker to prevent duplicate orders on retry |
| Idempotent submission | Resubmitting the same request has no additional effect beyond the first successful submission |
| Order lifecycle | The sequence of states an order moves through: new, acknowledged, partially filled, filled, rejected, or cancelled |

## Recap

Connecting to a broker means handling REST, FIX, or a native API underneath a stable internal OMS interface, tracking the full order lifecycle (not just filled-or-not), and treating idempotent client order IDs as mandatory rather than optional — a dropped network response without one can silently double a position. Next, Lesson 29 covers what happens after orders are flowing: monitoring a live strategy in real time.
