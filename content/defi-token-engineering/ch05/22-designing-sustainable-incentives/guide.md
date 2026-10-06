# Lesson 22 — Designing Sustainable Incentives

**Chapter 5 · Tokenomics Design · Lesson 22 of 30**

## What you'll learn

- The red flags that mark an incentive design as unsustainable
- The real distinction between "real yield" and "inflationary yield"
- A worked side-by-side comparison of the two
- The principles a durable incentive design actually follows

## Red flags worth checking for

This lesson pulls together Chapter 4's mechanics (emissions, farming,
vaults) and this chapter's supply math into a single question: **where
does the yield actually come from?** A few warning signs that the answer
is "nowhere sustainable":

- **Rewards paid entirely in the protocol's own inflationary token**, with
  no path to being paid from real revenue.
- **Advertised APY that dramatically exceeds any plausible real revenue**
  the protocol could be generating from actual usage.
- **No token sink** — nothing in the system (burns, staking lockups, fee
  payments) removes tokens from circulation to offset new emissions.
- **New deposits are required to keep paying existing depositors' yield**
  — structurally, this is the same shape as a Ponzi scheme, whether or not
  anyone involved intends it that way.

None of these are automatically disqualifying in isolation (a brand-new
protocol legitimately needs emissions to bootstrap before it has real fee
revenue) — but stacked together, they describe a design that only works
as long as new capital keeps arriving faster than old capital exits.

## Real yield vs. inflationary yield, worked

```
Protocol A -- "inflationary yield"
  Advertised APY: 150%
  Source: 100% newly minted governance tokens
  Real protocol revenue this year: $50,000
  Tokens emitted this year (at current price): $15,000,000
  -> yield is backed almost entirely by new token issuance, not revenue

Protocol B -- "real yield"
  Advertised APY: 8%
  Source: 100% trading fees paid in USDC/ETH, no new token minting
  Real protocol revenue this year: $2,400,000
  Amount paid out to stakers: $2,400,000
  -> yield is fully backed by actual usage-driven revenue
```

Protocol A's 150% is only "real" as long as the token's price holds up
under the weight of $15,000,000/year in new supply — which, per Lesson 16,
is exactly the sell-pressure spiral that tends to collapse the number.
Protocol B's 8% is smaller, but every dollar paid out already exists as
revenue, independent of the token's price.

## Principles behind a sustainable design

1. **Pay real yield from fees wherever possible** — tie rewards to actual
   protocol revenue, not purely to new token issuance.
2. **Cap and taper emissions** (Lesson 18) — if inflation is needed to
   bootstrap, give it an end date and a declining curve, not an open tap.
3. **Build in token sinks** — burns, staking lockups, and governance
   participation requirements all remove tokens from active circulation,
   offsetting new supply.
4. **Match lock duration to reward duration** — rewards that vest over the
   same horizon as the value they're meant to create (Lesson 21) discourage
   farm-and-dump behavior more than instant, liquid payouts do.

## Key terms

| Term | Meaning |
|---|---|
| Real yield | Returns paid from actual protocol revenue (fees), independent of token price |
| Inflationary yield | Returns paid primarily from newly minted tokens, dependent on the token holding its price |
| Token sink | Any mechanism (burn, lockup, fee payment) that removes tokens from active circulation |
| Ponzi-shaped incentive | A design structurally dependent on new deposits to pay existing depositors |

## Check yourself

Before Lesson 23, make sure you can list at least three red flags of an
unsustainable incentive design, and explain the real difference between
real yield and inflationary yield in one sentence.
