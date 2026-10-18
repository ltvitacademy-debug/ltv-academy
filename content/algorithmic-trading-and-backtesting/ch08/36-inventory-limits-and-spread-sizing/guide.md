# Inventory Limits and Spread Sizing

Lesson 35 showed how the reservation price shifts a market maker's quotes to encourage returning to flat. That mechanism alone doesn't stop inventory from growing — it just makes growth less likely than staying flat, probabilistically. This lesson covers the second half of inventory management: how wide to make the spread in the first place, and the hard backstop every real market maker needs in addition to reservation-price skewing.

## What you'll learn

- What actually determines how wide a market maker's spread should be
- Why spread width is a real trade-off, not a free parameter to maximize
- Hard inventory limits as a backstop, separate from reservation-price skewing
- How gamma (risk aversion), spread width, and inventory limits work together as one system, not three independent choices

## The spread-width trade-off

A wider spread earns more per trade but gets filled less often (fewer counterparties are willing to trade at a worse price); a narrower spread fills more often but earns less per trade and raises adverse-selection risk (Lesson 37 covers this directly — a too-narrow spread gets picked off by informed traders more easily). The right width isn't a fixed number — it depends on the instrument's volatility (a more volatile instrument needs a wider spread to compensate for the risk of the price moving before the position unwinds) and on how much competition exists at the current best bid/ask (a market maker competing against other makers has less room to widen without simply losing all its fills to a tighter competitor).

```python
# Illustrative spread-sizing logic: scale with volatility, respect a
# competitive floor
def size_spread(sigma, risk_aversion, competitive_floor):
    """
    sigma:              instrument volatility
    risk_aversion:       the market maker's own risk tolerance parameter
    competitive_floor:    the tightest spread the maker can quote and still
                           reasonably expect fills, given current competition
    """
    risk_based_spread = risk_aversion * sigma
    return max(risk_based_spread, competitive_floor)

# A calmer instrument: risk-based sizing wins
print(size_spread(sigma=0.15, risk_aversion=0.20, competitive_floor=0.02))

# A volatile instrument: risk-based sizing wins by more
print(size_spread(sigma=0.60, risk_aversion=0.20, competitive_floor=0.02))
```

```
0.03
0.12
```

This is deliberately simplified versus the full Avellaneda-Stoikov closed-form spread derivation (which also incorporates order-arrival-rate assumptions and a time-remaining term) — real systems tune the exact functional form against live fill data rather than trusting a closed form exactly, but the core trade-off this simplified version captures is the real one: spread should widen with volatility, with a floor set by competition, not shrink toward zero just because a tighter spread fills more often.

## Why reservation-price skewing alone isn't enough

Lesson 35's reservation price makes it *more likely* a market maker drifts back toward flat — but it's a soft nudge, not a guarantee. In a one-sided market (say, broad selling pressure across the whole instrument, not specific to this maker's quotes), a market maker can keep getting filled on the buy side even with a skewed reservation price, because the skew only changes relative competitiveness, not whether a counterparty shows up at all. Left unchecked, inventory can grow well past what the risk-aversion parameter was ever tuned to tolerate.

## Hard inventory limits as a backstop

Real market-making systems add an explicit, hard **inventory limit** — a maximum position size beyond which the system takes action regardless of what the reservation-price math says:

```python
inventory = 500
max_inventory = 1000

if abs(inventory) >= max_inventory:
    # Stop quoting the side that would grow inventory further,
    # or widen that side's spread aggressively, or actively
    # cross the spread to reduce the position directly
    print("Inventory limit reached -- suppress or heavily skew the buy side")
else:
    print(f"Within limit: {inventory} / {max_inventory}")
```

```
Within limit: 500 / 1000
```

This is a genuinely different mechanism from reservation-price skewing — it's a hard rule, not a probabilistic nudge, and it exists specifically because "the skew usually works" isn't a strong enough guarantee for a system running continuously, unattended, against a market that can trend persistently in one direction.

## How the three pieces fit together

```
gamma (risk aversion)  -->  how aggressively the reservation price skews
                             per unit of inventory (Lesson 35)

spread width            -->  how much is earned per round trip, and how
                             exposed the maker is to adverse selection
                             (this lesson)

inventory limit          -->  the hard backstop when skewing alone isn't
                              enough to prevent runaway inventory
                              (this lesson)
```

These three aren't independent dials — a market maker running a wide spread and a high gamma can often tolerate a higher inventory limit, since each individual fill already carries more compensation and the reservation price is already working harder to prevent extreme positions. Tuning them together, against real fill data, is a continuous part of running a market-making system, not a one-time setup step.

## Key terms

| Term | Meaning |
|---|---|
| Spread-width trade-off | Wider spreads earn more per fill but fill less often and raise adverse-selection exposure; narrower spreads do the opposite |
| Competitive floor | The tightest spread a maker can quote and still reasonably expect fills, given other makers' quotes |
| Inventory limit | A hard maximum position size that triggers direct action, separate from the probabilistic nudge of reservation-price skewing |

## Check yourself

Why is reservation-price skewing alone, without a hard inventory limit, not a sufficient risk control for a market maker running unattended in a one-sided (trending) market?
