# Lesson 20 — Utility vs. Governance Tokens

**Chapter 5 · Tokenomics Design · Lesson 20 of 30**

## What you'll learn

- What a utility token actually does inside a protocol
- What a governance token actually controls
- Why most real tokens are hybrids rather than purely one or the other
- How a "fee switch" lets a token capture value from protocol activity

## Utility tokens — a job inside the protocol

A **utility token** exists to perform a specific function the protocol
needs, independent of any voting rights:

- **Gas/fee payment** — the token required to pay for transactions or
  protocol actions (ETH on Ethereum is the clearest example).
- **Access/feature unlock** — holding or spending the token unlocks a
  tier, a feature, or a service within the protocol.
- **Staking collateral** — the token that must be staked to perform a
  role (validating, providing liquidity, backing an oracle report).
- **Discounts** — holding the token reduces fees elsewhere in the
  protocol (a common exchange-token pattern).

None of these require the holder to have any say in how the protocol
changes — a utility token's value comes from *needing* it, not from
*controlling* anything.

## Governance tokens — a say inside the protocol

A **governance token** exists to grant voting rights over the protocol
itself:

- **Proposal rights** — the ability to submit a change for a vote (often
  gated by a minimum token holding).
- **Voting power** — weight in deciding whether a proposal passes, almost
  always proportional to tokens held or delegated (Lesson 25).
- **Treasury control** — governance token holders typically decide how
  the protocol's accumulated fees/reserves get spent.
- **Parameter changes** — adjusting interest rate curves, fee tiers,
  collateral factors, or emission schedules through a vote rather than a
  centralized team decision.

A governance token's value is speculative on *future* decisions — it's
worth something because holding it lets you influence outcomes that
affect the protocol's revenue or survival.

## Most real tokens are hybrids

In practice, very few tokens are purely one or the other. A single token
commonly does double duty: it's required for staking (utility) *and* it
grants voting rights (governance) *and* it may also capture a share of
protocol fees (value accrual, below). Separating the two frameworks here
is about understanding what job a given token mechanism is doing, not
about sorting real tokens into two bins.

## Value accrual — the fee switch

A **fee switch** is a governance-controlled mechanism that routes a share
of protocol revenue to token holders, usually via **buyback-and-burn**:
the protocol uses collected fees to buy its own token on the open market,
then burns it.

```
Example: protocol collects $500,000 in fees this month
Governance has voted to route 20% to the fee switch

buyback_budget = 500,000 x 0.20 = $100,000
If token price = $2.50, tokens bought and burned = 100,000 / 2.50
                                                   = 40,000 tokens burned
```

This ties governance tokens directly back to Lesson 19's deflationary
supply models — a fee switch is one of the most common ways a
real-revenue burn mechanism actually gets implemented, and it's a
governance decision (whether to turn it on, and at what rate) rather than
a fixed protocol rule.

## Key terms

| Term | Meaning |
|---|---|
| Utility token | Token required to perform a function inside a protocol (gas, access, collateral) |
| Governance token | Token that grants voting rights over protocol decisions |
| Fee switch | A governance-controlled mechanism routing protocol revenue to token holders |
| Buyback-and-burn | Using protocol revenue to purchase and destroy tokens, reducing circulating supply |

## Check yourself

Before Lesson 21, make sure you can name at least two utility functions
and two governance functions a token can serve, and compute a buyback-and-
burn amount from a fee total and a fee-switch percentage.
