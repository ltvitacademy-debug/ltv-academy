# Market-Maker P&L: Spread Capture, Inventory Risk, and Execution Costs

A market maker's daily P&L is a single number on a report, but it's actually the sum of several genuinely different sources — some the maker is directly compensated for, some it's structurally exposed to regardless of skill, and at least one it can lose money on even while "winning" at its core job. This lesson decomposes market-maker P&L into its real components, which is both how production systems actually monitor themselves and a near-guaranteed interview topic for any market-making-adjacent role.

## What you'll learn

- The three real components of market-maker P&L: spread capture, inventory mark-to-market, and fees
- Why spread capture and inventory P&L can move in opposite directions on the same day
- The maker-taker fee model, and why it's a real, non-trivial part of the P&L picture
- A full worked decomposition tying Lessons 34-37 together into one daily P&L statement

## Component 1: spread capture

**Spread capture** is the P&L earned purely from buying at the bid and selling at the ask across completed round trips — the "textbook" market-making profit, independent of where the price ends up:

```python
round_trips = 850          # completed buy-then-sell (or sell-then-buy) pairs today
avg_captured_spread = 0.015  # average spread actually captured per round trip, in price terms
shares_per_trip = 100

spread_capture_pnl = round_trips * avg_captured_spread * shares_per_trip
print(f"Spread capture P&L: ${spread_capture_pnl:,.2f}")
```

```
Spread capture P&L: $1,275.00
```

This is the component Lessons 34-36 are directly trying to maximize — a better fair-value estimate, well-sized spread, and effective inventory management all flow through to this number.

## Component 2: inventory mark-to-market

**Inventory P&L** is the gain or loss on whatever position the maker is still holding at the end of the measurement period, marked to the current price — this is pure market exposure, unrelated to how good the market-making logic was:

```python
ending_inventory = 300     # shares held at end of day (positive = long)
entry_vwap = 100.05         # average price the held shares were acquired at
closing_price = 99.80        # end-of-day price

inventory_pnl = ending_inventory * (closing_price - entry_vwap)
print(f"Inventory mark-to-market P&L: ${inventory_pnl:,.2f}")
```

```
Inventory mark-to-market P&L: $-75.00
```

Notice this can be negative even on a day where spread capture was strongly positive — the maker earned real spread on hundreds of round trips, but the inventory it happened to be holding at the close moved against it. This is exactly why Lessons 35-36's inventory management matters: a maker with poor inventory discipline can have excellent spread capture and still lose money overall, because it's carrying larger, more poorly-timed positions into closes than a well-managed one would.

## Component 3: fees — the maker-taker model

Most exchanges don't charge a flat fee per trade — they charge differently depending on whether an order **added** liquidity (rested on the book and got filled, the market maker's normal role) or **removed** liquidity (crossed the spread to trade immediately, the liquidity taker's role). Under the standard **maker-taker** fee model, adding liquidity typically earns a small **rebate** (the exchange pays the maker), while removing liquidity costs a **fee**:

```python
maker_rebate_per_share = 0.0015   # exchange pays the maker this much per share
taker_fee_per_share = 0.0025       # a taker pays the exchange this much per share

shares_added_liquidity = 170_000    # total shares across all maker-side fills today
shares_removed_liquidity = 4_000     # shares where the maker had to cross the spread itself
                                      # (e.g., actively reducing inventory past a limit, Lesson 36)

rebate_earned = shares_added_liquidity * maker_rebate_per_share
fees_paid = shares_removed_liquidity * taker_fee_per_share

fee_pnl = rebate_earned - fees_paid
print(f"Rebate earned:  ${rebate_earned:,.2f}")
print(f"Fees paid:      ${fees_paid:,.2f}")
print(f"Net fee P&L:    ${fee_pnl:,.2f}")
```

```
Rebate earned:  $255.00
Fees paid:      $10.00
Net fee P&L:    $245.00
```

The maker-taker structure is a real, deliberate piece of market design: exchanges want resting liquidity, so they subsidize it, and that rebate is a genuine, non-trivial part of a market maker's economics — notice it's actually larger here than the fee cost, because a well-run maker overwhelmingly adds liquidity rather than removing it. A maker that frequently has to cross the spread itself (from Lesson 36's hard inventory limit forcing an active unwind) pays the taker fee on exactly those trades, which is one more real cost of letting inventory run too far in the first place.

## Putting the full day together

```python
total_pnl = spread_capture_pnl + inventory_pnl + fee_pnl
print(f"Spread capture:  ${spread_capture_pnl:,.2f}")
print(f"Inventory P&L:   ${inventory_pnl:,.2f}")
print(f"Net fees:        ${fee_pnl:,.2f}")
print(f"Total P&L:       ${total_pnl:,.2f}")
```

```
Spread capture:  $1,275.00
Inventory P&L:   $-75.00
Net fees:        $245.00
Total P&L:       $1,445.00
```

This decomposition is the honest answer to "how did the market-making desk do today" — a single aggregate P&L number hides whether the day's result came from the maker's actual skill (spread capture), simple market exposure it happened to be holding (inventory P&L), or structural rebate income unrelated to either (fees). A desk that only ever looks at the aggregate number can't tell a good day with bad luck on inventory from a mediocre day saved by the rebate — and can't diagnose which lever (Lesson 34's fair-value quality, Lesson 35-36's inventory discipline, or Lesson 37's toxicity exposure) actually needs attention.

## Key terms

| Term | Meaning |
|---|---|
| Spread capture | P&L earned from completed round trips at the quoted spread, independent of where price ends up |
| Inventory mark-to-market | Gain or loss on the position still held, marked to the current price |
| Maker-taker fee model | An exchange fee structure that rebates liquidity-adding orders and charges liquidity-removing orders |
| Rebate | The payment an exchange makes to an order that added liquidity (rested on the book and got filled) |

## Check yourself

A market maker reports strong positive total P&L for the day. Why isn't that alone enough to conclude its market-making logic performed well — what two other numbers would you need to see first?
