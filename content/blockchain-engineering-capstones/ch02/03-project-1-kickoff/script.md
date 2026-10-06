# Lesson 3 — Project 1 Kickoff · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

This chapter, you're building a simplified, teaching-grade automated
market maker liquidity pool — the same core mechanism behind real
protocols like Uniswap, scoped down to what one person can design, test,
and ship.

## S2 · STEPS CARD (scope)

In scope: one pool contract, two ERC-20 token reserves, liquidity
providers who get a proportional claim, and a constant-product swap
function with a small fee. Out of scope, on purpose: a factory, a
router, a protocol-fee switch, flash loans, and any third-party audit.

## S3 · STEPS CARD (the stack)

Contracts in Solidity, built and tested with Hardhat 3. Tests include
Hardhat's unit runner plus Foundry-style fuzz and invariant tests. The
frontend uses React with wagmi and viem. Deployment targets the Sepolia
testnet only — never a wallet holding real funds.

## S4 · STEPS CARD (deliverables)

Four deliverables carry this chapter: Lesson 4 designs the pool
contract, Lesson 5 builds the frontend, Lesson 6 covers testing and a
security review, and Lesson 7 deploys to Sepolia and wraps up the
README.

## S5 · CODE CARD (repo layout)

Before any Solidity, lay out the repo: a contracts folder, an ignition
folder for deployment modules, a test folder, and a separate frontend
folder — two clearly separated concerns, not tangled together.

## S6 · OUTRO CARD

Next: designing the pool contract itself — the state variables and the
three functions every liquidity provider and trader will call.
