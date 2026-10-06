# Lesson 2 — The Major Categories of DeFi Protocols

**Chapter 1 · DeFi Building Blocks · Lesson 2 of 30**

## What you'll learn

- The five major categories of DeFi protocol, and what each one actually does
- A real example of how a single dollar can pass through several categories in one session
- Which real, named protocols belong to which category
- Why this course spends two full chapters on just two of these categories

## The five categories

| Category | What it does | Example protocols |
|---|---|---|
| DEXs / AMMs | Swap one token for another without an order book, priced by a formula | Uniswap, Curve, Balancer |
| Lending & borrowing | Supply an asset to earn interest; borrow against collateral | Aave, Compound |
| Derivatives & perpetuals | Trade price exposure without holding the underlying asset | GMX, dYdX, Synthetix |
| Stablecoins | A token designed to hold a stable value, collateralized or algorithmic | USDC (fiat-collateralized), DAI (crypto-collateralized) |
| Yield & asset management | Automate moving capital between the categories above to chase yield | Yearn, Convex |

Chapters 2 and 3 of this course go deep on exactly two of these — AMMs and
lending — because they're the two categories that almost every other DeFi
protocol is built on top of. A perpetuals exchange needs a pricing
mechanism descended from AMM math; a yield vault is usually just
automating deposits into lending pools and AMMs on your behalf.

## One dollar's journey

```
1. Swap   — USDC → ETH on an AMM (Uniswap-style constant-product pool)
2. Supply — deposit that ETH as collateral in a lending protocol (Aave-style)
3. Borrow — borrow a stablecoin against that ETH collateral
4. Deploy — supply the borrowed stablecoin into a yield vault that itself
             deposits into an AMM pool to earn trading fees
```

Four categories, one transaction sequence, one dollar. Nothing here
required a bank, an account application, or a company's approval — each
step was a direct smart contract call, and each protocol had no idea the
others existed. That's composability, which Lesson 3 covers directly.

## Why these categories, specifically

Every category above solves one of two problems that exist the moment you
remove a centralized intermediary: **how do strangers trade with each
other without an order book and a matching engine** (AMMs), and **how do
strangers lend to each other without a bank's credit check and legal
recourse** (lending protocols, solved by requiring collateral instead of
trust). Derivatives, stablecoins, and yield products are all, underneath,
built from those two primitives.

## Key terms

| Term | Meaning |
|---|---|
| AMM | Automated Market Maker — prices trades by formula instead of an order book |
| Perpetual (perp) | A derivative contract with no expiry, tracking an asset's price |
| Fiat-collateralized stablecoin | Backed by real-world dollars held in reserve (e.g., USDC) |
| Crypto-collateralized stablecoin | Backed by an overcollateralized basket of on-chain assets (e.g., DAI) |
| Yield aggregator | A protocol that automates moving deposits between other protocols to chase yield |

## Check yourself

You're ready for Lesson 3 when you can name, without looking, which two
categories this course spends the next two chapters on, and explain in one
sentence why those two were chosen over the other three.
