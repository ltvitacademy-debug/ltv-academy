# Lesson 3 — Composability & Money Legos

**Chapter 1 · DeFi Building Blocks · Lesson 3 of 30**

## What you'll learn

- What "composability" actually means at the smart-contract level
- How a receipt token (an LP token or an aToken) becomes an input to a different protocol
- Why a flash loan is the purest example of composability — multiple protocols, one atomic transaction
- The other side of the coin: how composability turns isolated bugs into cascading failures

## Composability, mechanically

Any smart contract on a public blockchain can call any other smart
contract's public functions, as long as it has the right address and
arguments — there's no approval process between protocol teams, no
partnership agreement, no API key. If Protocol B's interface is public,
Protocol A's contract can call it in the same transaction, and nobody at
Protocol B needs to know Protocol A exists. That single fact is what
"money legos" means: protocols aren't just side by side, they're
stackable, because each one's output (a token, a balance, a receipt) is a
valid input to the next.

```
Deposit ETH into a lending pool
   -> receive an aToken (a receipt representing your deposit + accruing interest)
   -> use that aToken as collateral in a DIFFERENT protocol
   -> borrow against it, without ever withdrawing the original ETH
```

The aToken (Lesson 10 covers this receipt pattern in depth) isn't a
special case — it's an ERC-20 token like any other, which is exactly why
a second, unrelated protocol can accept it as collateral without writing
any custom integration code.

## Flash loans: composability in one atomic transaction

A flash loan (Lesson 13 goes deep on this) lets a contract borrow a large
sum with zero collateral, on the condition that it's repaid — with a fee —
before the transaction ends. That's only possible because of
composability: inside that single transaction, the borrower's contract can
call an AMM, call a lending protocol, and call the flash-loan pool again
to repay, all atomically. If any one of those calls fails, the entire
transaction reverts as if it never happened — there's no partial state
where the loan went out but the repayment didn't.

```
One transaction, three protocols:
1. Borrow 1,000,000 USDC (flash loan, zero collateral)
2. Use it to execute a trade across two AMMs for a price difference (arbitrage)
3. Repay 1,000,000 USDC + fee to the flash-loan pool
   -> if step 3 fails, steps 1 and 2 never happened (the whole tx reverts)
```

## The other side: cascading risk

Composability is also why DeFi has systemic risk that traditional finance's
siloed systems don't. If Protocol B's price oracle is manipulated, every
protocol that accepted Protocol B's token as collateral is exposed —
automatically, without any of them choosing that exposure. The 2022 Mango
Markets exploit and multiple oracle-manipulation flash-loan attacks worked
exactly this way: one protocol's weak link became every composed
protocol's problem, in the same transaction.

## Key terms

| Term | Meaning |
|---|---|
| Composability | Any contract can call any other contract's public functions, with no approval needed |
| Money legos | The nickname for protocols stacking, because each one's output is a valid input elsewhere |
| Receipt token | A token (like an aToken or LP token) that represents a claim on a deposit elsewhere |
| Atomic transaction | A transaction that either fully completes or fully reverts — no partial state |
| Systemic / contagion risk | Risk that spreads between protocols because they're composed together |

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: why does
a flash loan's "all-or-nothing" atomicity depend on composability, rather
than on anything specific to flash loans themselves?
