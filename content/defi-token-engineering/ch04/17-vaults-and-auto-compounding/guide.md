# Lesson 17 — Vaults & Auto-Compounding

**Chapter 4 · Staking & Yield · Lesson 17 of 30**

## What you'll learn

- What a yield vault actually automates, and what it doesn't
- The math showing why compounding frequency alone creates extra yield
- How `pricePerShare` lets a vault represent compounding growth without
  paying out anything until you withdraw
- The fee layers (management + performance) that sit on top

## What a vault automates

A yield vault (the Yearn-style "aggregator" pattern) takes the manual loop
from Lesson 16 — claim reward, sell or re-stake it, repeat — and runs it
on a schedule via a bot or keeper network instead of requiring you to do
it by hand. You deposit once; the vault's strategy contract **harvests**
rewards periodically and **compounds** them back into the position
automatically.

The vault doesn't invent new yield. It captures the compounding gap from
Lesson 15 that a manual, infrequent claimer leaves on the table.

## The math: manual vs. automated compounding

```
Same 20% APR yield farm, one year, starting with $10,000:

Manual, claims once a month (n = 12):
  value = 10,000 x (1 + 0.20/12)^12
  value ≈ $12,194

Auto-compounding vault, harvests daily (n = 365):
  value = 10,000 x (1 + 0.20/365)^365
  value ≈ $12,213

Difference ≈ $19/year on $10,000 -- before vault fees
```

The gap is real but modest at these frequencies — this is why vault
marketing emphasizing "huge APY boosts from auto-compounding" deserves
scrutiny: most of the gain at reasonable compounding frequencies is small,
and fees (below) can easily eat it.

## `pricePerShare` — how a vault tracks growth without paying out

Instead of crediting your wallet with new tokens every harvest, most
vaults mint a **vault share token** at deposit time and let the exchange
rate between shares and underlying assets rise as the strategy compounds:

```
pricePerShare = totalAssets / totalShares

Deposit: you put in 1,000 tokens when pricePerShare = 1.00
         you receive 1,000 vault shares

After 6 months of harvesting, strategy grows totalAssets,
pricePerShare rises to 1.08

Your withdrawal value = your_shares x pricePerShare
                       = 1,000 x 1.08 = 1,080 tokens
```

You never "claim" anything along the way — the share price itself
embodies the compounding. This is also what lets vault shares be freely
transferable or even used as collateral elsewhere, since the IOU for your
growing position is a normal, fungible token.

## Fees sit between the strategy and you

Vaults typically charge two fee types, both deducted before
`pricePerShare` updates in your favor:

- **Management fee** — a small annual percentage of assets under
  management, charged regardless of performance (commonly 0-2%).
- **Performance fee** — a cut of the profit the strategy actually
  generates, charged only on gains (commonly 10-20%).

```
Example: strategy earns $1,000 profit, 20% performance fee
  protocol/strategist keeps: $1,000 x 0.20 = $200
  you keep:                  $1,000 x 0.80 = $800
```

## Key terms

| Term | Meaning |
|---|---|
| Harvest | The strategy claiming accrued rewards from the underlying farm |
| Compound | Reinvesting harvested rewards back into the position |
| pricePerShare | The exchange rate between vault shares and underlying assets; rises as the strategy compounds |
| Performance fee | A percentage of profit (not principal) taken by the protocol/strategist |

## Check yourself

Before Lesson 18, make sure you can explain why a rising `pricePerShare`
is functionally equivalent to receiving more tokens, and why vault fees
are usually charged in two separate ways rather than one.
