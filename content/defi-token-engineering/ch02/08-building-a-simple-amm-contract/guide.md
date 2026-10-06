# Lesson 8 — Building a Simple AMM Contract

**Chapter 2 · Automated Market Makers · Lesson 8 of 30**

## What you'll learn

- How to write a minimal constant-product AMM in Solidity — deposit, swap, withdraw
- Where exactly the x·y=k invariant and the trading fee show up in actual code
- What this teaching example deliberately leaves out, and why real protocols need it
- Why "simple to write" and "safe to deploy" are two very different bars for a contract like this

## A simplified teaching contract

This is a minimal, illustrative constant-product AMM — **not** production
code. It's missing the safety checks real protocols require (covered
below). Read it next to Lesson 5's formula and Lesson 6's LP-token math;
every line maps directly to something you've already calculated by hand.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// SIMPLIFIED TEACHING EXAMPLE — not production code. See "what's missing"
// below before this pattern goes anywhere near real funds.
contract SimpleAMM {
    uint256 public reserveA;
    uint256 public reserveB;
    uint256 public totalLPTokens;
    mapping(address => uint256) public lpBalance;

    uint256 constant FEE_BPS = 30; // 0.30%, same reference rate as Lesson 5

    function addLiquidity(uint256 amountA, uint256 amountB) external {
        if (totalLPTokens == 0) {
            totalLPTokens = amountA; // bootstrap: first deposit sets the ratio
        } else {
            // mint proportional to the smaller of the two ratios
            uint256 mintA = (amountA * totalLPTokens) / reserveA;
            uint256 mintB = (amountB * totalLPTokens) / reserveB;
            totalLPTokens += mintA < mintB ? mintA : mintB;
        }
        reserveA += amountA;
        reserveB += amountB;
        lpBalance[msg.sender] += totalLPTokens;
    }

    function swapAForB(uint256 amountAIn) external returns (uint256 amountBOut) {
        uint256 amountAfterFee = amountAIn * (10000 - FEE_BPS) / 10000;
        uint256 newReserveA = reserveA + amountAfterFee;
        uint256 k = reserveA * reserveB;          // Lesson 5's invariant
        uint256 newReserveB = k / newReserveA;
        amountBOut = reserveB - newReserveB;

        reserveA += amountAIn;
        reserveB -= amountBOut;
    }
}
```

## Mapping the code back to the math

- `k = reserveA * reserveB` is exactly Lesson 5's `x · y = k`.
- `amountAfterFee` takes the 0.3% fee off the top *before* the formula
  runs — the fee amount stays in `reserveA` (via the full `amountAIn`
  added back on the next line), which is how Lesson 6's fee accrual
  actually happens in code.
- `addLiquidity`'s proportional minting is Lesson 6's LP-token math,
  written as Solidity instead of arithmetic on paper.

## What's deliberately missing

```
[ ] Reentrancy guard        — an external call before updating reserves
                               could be exploited to drain the pool
[ ] Slippage protection      — no amountOutMin / deadline parameters,
                               so a trade can execute at any price
[ ] Real ERC-20 transfers    — this never actually moves tokens in or
                               out; it only updates internal numbers
[ ] LP token as ERC-20       — lpBalance should be a transferable,
                               tradeable token, not just a mapping
[ ] Oracle manipulation risk — spot price here is trivially manipulable
                               within a single transaction
```

Every one of those is load-bearing in a real deployment. This contract
exists to make the formulas from Lessons 5–7 concrete in code, not to be
a template you deploy.

## Key terms

| Term | Meaning |
|---|---|
| Reentrancy | A vulnerability where an external call lets an attacker re-enter a function before state updates finish |
| Slippage protection | A minimum-output parameter that reverts a trade if the price moved too far |
| Bootstrap deposit | The first liquidity deposit into an empty pool, which sets the initial price ratio |

## Check yourself

You're ready for Lesson 9 when you can point to the exact line in
`swapAForB` where the 0.3% fee is applied, and explain why it's applied
*before* the constant-product formula runs rather than after.
