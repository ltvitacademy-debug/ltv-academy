# Script — Building a Simple AMM Contract

## Segment 1 (title)

Everything you've calculated by hand across the last three lessons — the x times y equals k formula, LP token minting, fee accrual — fits in about thirty lines of Solidity. This is a simplified teaching example, not production code, but every line maps to math you already know.

## Segment 2 (code: addLiquidity)

The first deposit into an empty pool bootstraps the ratio. Every deposit after that mints LP tokens proportional to the smaller of the two reserve ratios — exactly the arithmetic from the liquidity pools lesson, written as Solidity instead of numbers on paper.

## Segment 3 (code: swapAForB)

Take the 0.3 percent fee off the input before running the formula. Multiply the current reserves to get k, divide by the new reserve to find the new output reserve, and the difference is the amount out. That's the constant-product formula from Lesson 5, line for line.

## Segment 4 (steps: what's deliberately missing)

This contract has no reentrancy guard, no slippage protection, no real ERC-20 transfers, and a spot price that's trivially manipulable within one transaction. Every one of those is load-bearing in a real deployment — this exists to make the formulas concrete in code, not to be a template you'd actually deploy.

## Segment 5 (outro)

Simple to write and safe to deploy are two very different bars. Next up: concentrated liquidity — how Uniswap v3 let LPs choose exactly which price range their capital actually works in.
