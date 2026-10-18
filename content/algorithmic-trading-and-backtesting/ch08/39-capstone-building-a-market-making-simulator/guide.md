# Capstone: Building a Market-Making Simulator

Lessons 34-38 built every piece separately: a fair-value estimate, a reservation price that skews with inventory, a spread-sizing rule, adverse-selection awareness, and a P&L decomposition. This lesson wires all of them into one running simulation — a genuine market-making loop that quotes, gets filled based on how competitive its own quotes are, manages inventory, and reports a real P&L at the end. This is also, directly, a practical interview-style exercise: "build a market-making simulator that adjusts quotes in response to inventory and changing market conditions" is a real, common prompt, and this lesson is exactly that.

## What you'll learn

- How to structure a market-making simulation loop: quote, check for a fill, update state, repeat
- Why fill probability has to depend on how competitive your own quote is — not a fixed, quote-independent chance — for inventory skewing to do anything at all
- How to verify your simulator is actually working: checking that inventory stays bounded, not just that it runs without an error
- A full worked run with real numbers, plus the specific bug this exact exercise is designed to catch

## The structure of the simulation loop

Each step does the same four things: update the true fair value, compute the reservation price and quotes from current inventory, check whether each side gets filled, and update inventory/cash if it does:

```python
import numpy as np

rng = np.random.default_rng(39)

n_steps = 1000
fair_value = 100.0
sigma_step = 0.02        # per-step fair-value volatility
risk_coeff = 0.02          # how strongly inventory skews the reservation price
base_half_spread = 0.03
base_prob = 0.35            # baseline fill probability at a "fair" quote
prob_scale = 0.05            # how quickly fill probability decays as a quote gets worse

inventory = 0
cash = 0.0
max_abs_inventory = 0
fills_ask = fills_bid = 0

for _ in range(n_steps):
    fair_value += rng.normal(0, sigma_step)

    reservation = fair_value - risk_coeff * inventory
    bid = reservation - base_half_spread
    ask = reservation + base_half_spread

    # How far each quote sits from fair value -- this is what fill
    # probability actually has to respond to for skewing to work at all
    ask_edge = ask - fair_value
    bid_edge = fair_value - bid

    fill_prob_ask = np.clip(base_prob * np.exp(-ask_edge / prob_scale), 0, 1)
    fill_prob_bid = np.clip(base_prob * np.exp(-bid_edge / prob_scale), 0, 1)

    if rng.random() < fill_prob_ask:   # a buyer lifts the ask -> we SELL
        inventory -= 1
        cash += ask
        fills_ask += 1

    if rng.random() < fill_prob_bid:   # a seller hits the bid -> we BUY
        inventory += 1
        cash -= bid
        fills_bid += 1

    max_abs_inventory = max(max_abs_inventory, abs(inventory))

mark_to_market = inventory * fair_value
total_pnl = cash + mark_to_market

print(f"Total fills: {fills_ask + fills_bid} (sells: {fills_ask}, buys: {fills_bid})")
print(f"Final inventory: {inventory}")
print(f"Max |inventory| during run: {max_abs_inventory}")
print(f"Cash: {cash:.2f}")
print(f"Mark-to-market: {mark_to_market:.2f}")
print(f"Total P&L: {total_pnl:.2f}")
```

```
Total fills: 415 (sells: 208, buys: 207)
Final inventory: -1
Max |inventory| during run: 3
Cash: 110.27
Mark-to-market: -101.05
Total P&L: 9.22
```

## Why fill probability has to depend on the quote, not be fixed

The single most important modeling decision in this whole simulator is `fill_prob_ask`/`fill_prob_bid` being a function of `ask_edge`/`bid_edge` — how far each quote sits from fair value — rather than a flat, fixed probability every step. If fill probability were fixed regardless of where the quote actually sits, **inventory skewing would have no effect on anything**, because the reservation price could move the quotes anywhere without changing how likely either side is to get hit. The entire mechanism Lesson 35 teaches — skew the reservation price to make the "right" side more attractive — only does real work in a simulation (or in reality) because a more attractive quote genuinely is more likely to get taken. This is also exactly the bug to watch for if your own version of this simulator produces inventory that runs away unboundedly instead of staying controlled: check whether fill probability is actually responding to quote competitiveness, or secretly independent of it.

## Verifying the simulator is actually working

Don't just check that the code runs without an error — that proves nothing about whether the market-making logic is correct. Check the thing the logic is actually supposed to produce: **`max_abs_inventory` staying small relative to the number of fills.** In this run, 415 fills happened, but inventory never exceeded 3 shares in either direction at any point — exactly what the skewing mechanism is supposed to deliver: lots of two-sided trading activity, with the reservation price continuously nudging the maker back toward flat rather than letting inventory drift. If your own version shows inventory climbing steadily into the hundreds (the kind of result an earlier, buggy version of this exact exercise produces when fill probability isn't actually tied to the quote, or when a buy/sell fill is accidentally coded with the wrong sign on inventory), that's the signal something in the mechanism is broken — not a detail to shrug off because the loop still runs to completion.

## Connecting the final numbers back to Lesson 38

The printed P&L breakdown is exactly Lesson 38's decomposition, computed from a real simulation instead of invented numbers: `cash` is the running total of spread capture net of financing the position, `mark_to_market` is Lesson 38's inventory component applied to whatever's left at the end (here, a small short position worth -$101.05 at the final fair value), and their sum is total P&L. Notice the total ($9.22) is meaningfully smaller than a naive "415 fills times the full half-spread" estimate (415 × 0.03 ≈ $12.45) — exactly because some fills happened while the reservation price was skewed away from fair value to manage inventory, trading a bit of theoretical per-trade edge for keeping risk under control. That gap is the real, quantifiable cost of inventory management, not a bug.

## Extending this simulator

A few genuine next steps, left as an exercise rather than built out here: tie `base_half_spread` to Lesson 36's volatility-scaled sizing instead of a constant; add Lesson 37's markout analysis by recording the fair value some steps after each fill; and add a hard inventory limit from Lesson 36 that forces an aggressive unwind (crossing the spread, paying a taker fee per Lesson 38) if `abs(inventory)` ever exceeds a threshold despite the soft skew.

## Key terms

| Term | Meaning |
|---|---|
| Quote-dependent fill probability | Fill likelihood that responds to how competitive a quote actually is — the mechanism that makes inventory skewing do real work |
| `max_abs_inventory` | The real verification metric for a market-making simulator: inventory should stay bounded, not just "the code runs" |

## Check yourself

If you removed the dependence of `fill_prob_ask`/`fill_prob_bid` on `ask_edge`/`bid_edge` and replaced both with a fixed constant probability, what would you expect to happen to `max_abs_inventory` over a long run, and why?
