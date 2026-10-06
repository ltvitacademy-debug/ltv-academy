# Lesson 14 — Building a Simple Lending Pool

**Chapter 3 · Lending & Borrowing Protocols · Lesson 14 of 30**

## What you'll learn

- How to write a minimal overcollateralized lending pool in Solidity
- Where the health factor check from Lesson 10 actually lives in code
- Where the liquidation logic from Lesson 12 actually lives in code
- What this teaching example leaves out that every real protocol needs

## A simplified teaching contract

Same caveat as Lesson 8: this is a minimal, illustrative lending pool —
**not** production code. A single asset serves as both collateral and the
borrowed asset here, purely to keep the health-factor math readable; a
real pool supports many assets with independent price feeds.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// SIMPLIFIED TEACHING EXAMPLE — not production code. See "what's missing"
// below before this pattern goes anywhere near real funds.
contract SimpleLendingPool {
    mapping(address => uint256) public collateral;
    mapping(address => uint256) public debt;

    uint256 constant LIQ_THRESHOLD_BPS = 8000; // 80%, matches Lesson 10
    uint256 constant LIQ_BONUS_BPS = 500;      // 5%, matches Lesson 12

    function getPrice() public view returns (uint256) {
        // SIMPLIFIED: a real pool reads this from an oracle (e.g. Chainlink),
        // never a single on-chain AMM spot price (Lesson 13's exploit risk)
        return 2000; // USDC per unit of collateral, hardcoded for this example
    }

    function healthFactor(address user) public view returns (uint256) {
        if (debt[user] == 0) return type(uint256).max;
        uint256 collateralValue = collateral[user] * getPrice();
        return (collateralValue * LIQ_THRESHOLD_BPS) / 10000 / debt[user];
    }

    function borrow(uint256 amount) external {
        debt[msg.sender] += amount;
        require(healthFactor(msg.sender) >= 1, "would be undercollateralized");
        // (real pool transfers `amount` to msg.sender here)
    }

    function liquidate(address user, uint256 repayAmount) external {
        require(healthFactor(user) < 1, "position is healthy");
        uint256 seize = (repayAmount * (10000 + LIQ_BONUS_BPS)) / 10000;
        debt[user] -= repayAmount;
        collateral[user] -= seize;
        collateral[msg.sender] += seize;
        // (real pool transfers repayAmount from msg.sender here)
    }
}
```

## Mapping the code back to the math

- `healthFactor()` is Lesson 10's exact formula —
  `(collateral value * liquidation threshold) / borrowed value` — written
  as integer arithmetic instead of a worked example on paper.
- `borrow()`'s `require` statement is the health-factor check actually
  enforced: it computes the health factor *as if* the new debt already
  existed, and reverts the entire borrow if that would drop below 1.0.
- `liquidate()` is Lesson 12's worked example as code: it requires the
  target's health factor to already be below 1.0, then seizes
  `repayAmount * 1.05` of collateral — the exact liquidation bonus
  calculation from that lesson.

## What's deliberately missing

```
[ ] Real price oracle    — getPrice() is hardcoded; a real pool reads a
                            decentralized oracle, not a single fixed value
[ ] Interest accrual      — debt here never grows; Lesson 11's utilization-
                            based interest rate isn't applied at all
[ ] Multi-asset support   — one asset for everything; real pools track
                            collateral and debt per asset, independently
[ ] Reentrancy guard       — external token transfers before/after state
                            updates need protection, same as Lesson 8
[ ] Real ERC-20 transfers — this never actually moves tokens, only updates
                            internal balances
```

## Key terms

| Term | Meaning |
|---|---|
| Price oracle | A trusted external data feed a contract reads a real-world price from |
| Interest accrual | The mechanism by which outstanding debt grows over time based on the interest rate model |
| Health-factor check | The `require` statement that blocks a borrow from pushing a position below 1.0 |

## Check yourself

You're ready to move on when you can point to the exact line in
`liquidate()` where the 5% liquidation bonus from Lesson 12 is calculated,
and explain why `borrow()` checks the health factor *after* adding the
new debt rather than before.
