# Lesson 19 — Token Supply Models

**Chapter 5 · Tokenomics Design · Lesson 19 of 30**

## What you'll learn

- The four basic token supply models and how they differ
- The precise definitions of circulating, total, and max supply
- How burn mechanisms turn a nominally inflationary token net-deflationary
- Why the supply model is a design choice, not an afterthought

## Four supply model shapes

**Fixed supply** — a hard cap set at genesis; no mechanism ever mints more.
The entire schedule of "how much exists, ever" is known from block one.

**Capped/disinflationary supply** — a maximum supply exists, but it's
minted gradually over time (often via a decaying emission schedule, as in
Lesson 18), approaching the cap asymptotically rather than all at once.

**Inflationary (uncapped) supply** — new tokens are minted continuously
with no hard ceiling, typically to fund ongoing staking rewards or
protocol operations indefinitely.

**Deflationary supply** — the circulating supply actively shrinks over
time, usually through a burn mechanism that permanently removes tokens
from circulation, often funded by a cut of transaction or protocol fees.

These aren't mutually exclusive in practice — a token can have a capped
max supply *and* a burn mechanism that makes its net inflation rate
negative even before the cap is reached.

## Circulating, total, and max supply — not the same number

```
Max supply     = the hard ceiling the protocol can ever mint (or "none"
                  if uncapped)
Total supply   = everything minted so far, including tokens that are
                  locked, burned-and-tracked, or held in treasury
Circulating supply = total supply minus tokens that are locked, vested,
                  held in treasury, or otherwise not freely tradeable

Example:
  Max supply:          1,000,000,000 (hard cap)
  Total supply:           600,000,000 (minted so far)
  Locked/vesting/treasury: 250,000,000
  Circulating supply:      350,000,000
```

Market cap calculations that use total supply instead of circulating
supply overstate how much of a token is actually liquid and tradeable
right now — a distinction that matters directly for Lesson 23's
supply/demand modeling.

## Burn mechanisms, worked

A burn mechanism permanently destroys tokens, usually by sending them to
an address nobody controls (or via a native `burn()` function). The net
effect on supply growth:

```
net_supply_change = emissions_minted − tokens_burned

Example, one year:
  Staking emissions:        20,000,000 tokens minted
  Transaction-fee burns:    25,000,000 tokens burned
  net_supply_change = 20,000,000 - 25,000,000 = -5,000,000

Result: circulating supply shrinks by 5,000,000 tokens that year,
even though the protocol is still actively minting rewards.
```

This is the mechanism behind "ultrasound money" style designs: an
inflationary reward schedule combined with a burn large enough (usually
fee-driven, so it scales with usage) to make the *net* effect
deflationary during periods of high activity.

## Key terms

| Term | Meaning |
|---|---|
| Max supply | The hard ceiling on tokens that can ever exist (or none, if uncapped) |
| Circulating supply | Freely tradeable tokens — total supply minus locked/vesting/treasury holdings |
| Burn | Permanently removing tokens from supply, usually via an unspendable address or `burn()` call |
| Net supply change | Emissions minted minus tokens burned in a given period |

## Check yourself

Before Lesson 20, make sure you can state the difference between
circulating and total supply from memory, and compute the net supply
change given a period's emissions and burns.
