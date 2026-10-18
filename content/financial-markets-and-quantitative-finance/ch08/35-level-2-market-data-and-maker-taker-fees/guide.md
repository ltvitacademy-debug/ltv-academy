# Level 2 Market Data and Maker/Taker Fees

The order book simulator from Lesson 34 shows every resting order as if you had perfect visibility into it. Real market participants pay for that visibility, in a specific, tiered way — and the fee structure around getting an order onto that book versus taking one off it is its own real piece of market design. This lesson covers both: what traders actually see, and what it actually costs them.

## What you'll learn

- The difference between Level 1, Level 2, and Level 3 market data
- Why Level 2 depth data is what a serious trading operation actually needs, and what it costs
- The maker-taker fee model: why adding liquidity is often rewarded and removing it is charged
- How fee tier structures change trading-strategy economics at scale

## The three levels of market data

- **Level 1** is the simplest and most widely available: just the best bid, best ask, and last trade price. This is what shows up on a basic stock quote — enough to know the current market, nothing about what's behind it.
- **Level 2** shows the **full depth of the book** — every price level with resting orders, and the aggregate quantity at each level (though usually not which specific firm or order, for anonymity). This is what Lesson 34's simulator effectively gives you a god's-eye view of.
- **Level 3** goes further still: individual order-level detail, including the ability to see (and for authorized participants, directly manage) specific orders — this tier is mostly relevant to exchange members and market makers with direct market access, not ordinary traders.

```python
# What Level 1 shows:
level_1 = {"best_bid": 99.95, "best_ask": 100.10, "last_trade": 100.08}

# What Level 2 shows: the full depth, not just the touch
level_2 = {
    "bids": [(99.95, 400), (99.90, 1200), (99.85, 800)],   # (price, aggregate size)
    "asks": [(100.10, 300), (100.15, 1500), (100.20, 600)],
}
```

Level 2 is what lets you answer questions Level 1 can't: is the best ask thin (300 shares, easily consumed by one moderate order) or does it have real depth behind it? Is the book heavier on the bid side right now (hinting at buying pressure, the same signal behind Lesson 34's cousin concept, the microprice)? A strategy that only ever sees Level 1 is working with meaningfully less information than one with Level 2 access — which is exactly why Level 2 feeds are a real, paid product, not a free upgrade.

## The maker-taker fee model

Most modern electronic exchanges don't charge a flat fee per trade. Instead, they price differently depending on which side of the trade you were on:

- **Adding liquidity** (your order rested on the book and someone else traded against it) typically earns a **rebate** — the exchange pays you.
- **Removing liquidity** (your order crossed the spread and matched immediately, like the aggressor orders in Lesson 34's examples) typically costs a **fee** — you pay the exchange.

```python
maker_rebate_per_share = 0.0015
taker_fee_per_share = 0.0025

# A strategy that adds 100,000 shares of liquidity and removes 5,000
shares_added = 100_000
shares_removed = 5_000

rebate = shares_added * maker_rebate_per_share
fee = shares_removed * taker_fee_per_share
net = rebate - fee

print(f"Rebate earned: ${rebate:,.2f}")
print(f"Fees paid:     ${fee:,.2f}")
print(f"Net:           ${net:,.2f}")
```

```
Rebate earned: $150.00
Fees paid:     $12.50
Net:           $137.50
```

This is a deliberate piece of exchange design: exchanges want deep, resting liquidity (it makes their market more attractive to trade on), so they subsidize the behavior that creates it, and charge the behavior that consumes it. It's also why the distinction between "adding" and "removing" liquidity isn't just vocabulary — it's a real, quantifiable difference in a strategy's economics, exactly as Lesson 38 (market-maker P&L) covers for a market maker's own book specifically.

## Fee tiers change the economics at scale

Exchanges typically offer **tiered fee schedules** — the rebate/fee rates improve as a firm's monthly volume crosses certain thresholds, since exchanges want to reward (and retain) their highest-volume participants:

```python
def tiered_maker_rebate(monthly_volume_shares):
    if monthly_volume_shares >= 50_000_000:
        return 0.0025   # highest tier: best rebate
    elif monthly_volume_shares >= 10_000_000:
        return 0.0020
    else:
        return 0.0015   # base tier

# A firm trading 60M shares/month gets a materially better rate than
# one trading 2M/month -- on the exact same strategy
small_firm_rebate = tiered_maker_rebate(2_000_000)
large_firm_rebate = tiered_maker_rebate(60_000_000)
print(f"Small firm rebate/share: ${small_firm_rebate}")
print(f"Large firm rebate/share: ${large_firm_rebate}")
```

```
Small firm rebate/share: $0.0015
Large firm rebate/share: $0.0025
```

This is a real, structural reason scale matters in market making and high-frequency strategies beyond just "more trades, more profit" — the exact same strategy, run at higher volume, earns a meaningfully better rate per share. A strategy whose economics only work at the highest fee tier is a genuinely different (and riskier) proposition than one that's profitable even at a smaller firm's base tier.

## Key terms

| Term | Meaning |
|---|---|
| Level 1 data | Best bid, best ask, and last trade price only |
| Level 2 data | Full order book depth, by price level, usually anonymized |
| Level 3 data | Individual order-level detail, typically limited to exchange members |
| Maker-taker fee model | Exchange pricing that rebates liquidity-adding orders and charges liquidity-removing orders |
| Fee tier | A volume threshold at which an exchange offers improved maker/taker rates |

## Check yourself

Why would a market-making strategy's profitability look meaningfully different for a firm trading 2 million shares a month versus one trading 60 million, even running the exact same quoting logic?
