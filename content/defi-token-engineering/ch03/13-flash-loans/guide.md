# Lesson 13 — Flash Loans

**Chapter 3 · Lending & Borrowing Protocols · Lesson 13 of 30**

## What you'll learn

- How a flash loan can lend with zero collateral, mechanically
- The callback pattern a borrowing contract must implement
- Three legitimate uses, continuing Lesson 12's liquidator example directly
- Why flash loans were the mechanism behind some of DeFi's largest exploits

## Zero collateral, because of atomicity

Lesson 3 introduced flash loans as the purest example of composability.
Here's the mechanical reason zero collateral is actually safe for the
lender: the entire borrow-use-repay sequence happens inside **one
transaction**, and a transaction either fully succeeds or fully reverts —
there is no partial state. If the borrower's contract doesn't repay the
loan plus a fee before the transaction ends, the *entire* transaction
(including the initial loan disbursement) is undone, as if it never
happened. The lender never actually bears any default risk, because a
default is mechanically impossible — it just means the attempted
transaction never completed.

## The callback pattern

```solidity
// SIMPLIFIED TEACHING EXAMPLE — illustrates the pattern, not a deployable contract
interface IFlashLoanReceiver {
    function executeOperation(
        address asset,
        uint256 amount,
        uint256 fee,
        bytes calldata params
    ) external returns (bool);
}

contract MyFlashBorrower is IFlashLoanReceiver {
    function executeOperation(
        address asset,
        uint256 amount,
        uint256 fee,
        bytes calldata params
    ) external returns (bool) {
        // 1. Do whatever this loan was for (arbitrage, collateral swap, etc.)

        // 2. Repay amount + fee before this function returns
        uint256 owed = amount + fee;
        IERC20(asset).transfer(msg.sender, owed);

        return true;
        // if `owed` isn't actually transferred, the lending pool's own
        // code reverts the ENTIRE transaction right after this call returns
    }
}
```

The lending pool calls `executeOperation` on the borrower's own contract
*mid-transaction*, hands it the funds, and checks its own balance
immediately after that call returns. If the balance isn't back to at
least `amount + fee`, the pool's code reverts everything.

## Three legitimate uses

```
1. Arbitrage — borrow, buy an asset cheap on one AMM, sell it higher
   on another, repay, keep the difference (Lesson 3's example)

2. Self-liquidation — a borrower about to be liquidated (Lesson 12) can
   flash-borrow to repay their own debt, withdraw collateral, sell just
   enough to cover the loan, and avoid paying the liquidation bonus to
   someone else

3. Collateral swap — move an entire lending position from one collateral
   asset to another in a single transaction, without ever needing the
   capital to "bridge" the swap yourself
```

## Why flash loans show up in exploit post-mortems

A flash loan doesn't create new attack vectors by itself — it removes the
**capital constraint** on exploiting an existing one. An attacker who
finds a price-oracle manipulation bug no longer needs millions of dollars
of their own capital to exploit it profitably; a flash loan supplies that
capital for the length of one transaction, for a small fee, with the
vulnerability doing the rest. Several of DeFi's largest exploits (oracle
manipulation attacks against protocols using a single AMM pool as a price
source, among others) used flash loans exactly this way — not because the
loan itself was the vulnerability, but because it removed the last
practical barrier to using one.

## Key terms

| Term | Meaning |
|---|---|
| Flash loan | An uncollateralized loan that must be borrowed and repaid within a single atomic transaction |
| Callback | The function the lending pool calls on the borrower's own contract mid-transaction |
| Self-liquidation | Using a flash loan to repay your own debt and avoid a third party's liquidation bonus |
| Capital constraint | The amount of capital normally required to execute a strategy — what flash loans remove |

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: why
does a flash loan's lender bear zero default risk, in a way that's
different from how Lesson 10's overcollateralized loan manages risk?
