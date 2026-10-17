# Lesson 4 — Flash Loan Attacks: The Harvest Finance Exploit

**Chapter 10 · Security Auditing · Lesson 4 of 6**

This lesson is a written case study — not a recording of a class
session. It uses the same checks-effects-interactions mindset from the
reentrancy lessons, applied to a different vulnerability class: a
contract trusting a price it should never have trusted.

## What you'll learn

- What a flash loan actually is, and why it turns "I don't have enough
  capital to manipulate this market" into a non-problem for an attacker
- The real mechanics of the October 2020 Harvest Finance exploit — not
  a stolen private key, not a reentrancy bug, but a single atomic
  transaction that briefly lied to a vault about the price of its own
  assets
- Why reading a token's price directly from an AMM pool is dangerous,
  and what a manipulation-resistant price source looks like instead
- How to write a Foundry test that actually catches this class of bug
  before it ships

## What a flash loan is

A **flash loan** lets you borrow an arbitrary amount of capital with
**zero collateral**, on the condition that you repay it — plus a small
fee — within the same transaction. If the loan isn't repaid by the time
the transaction ends, the entire transaction reverts, as if it never
happened. Protocols like Aave and dYdX, and the Uniswap V2 pools
themselves, support this natively.

This sounds like a gimmick until you realize what it removes: **capital
as a constraint.** An attacker who would normally need millions of
dollars to meaningfully move a market can borrow those millions for
about fifteen seconds, use them, and give them back — walking away with
whatever profit the manipulation created, for the cost of a flash loan
fee and some gas.

## The Harvest Finance exploit, October 26, 2020

Harvest Finance ran **yield farming vaults** — you deposit a stablecoin
like USDC, and the vault's strategy automatically moves it through
other DeFi protocols to earn yield. One of those strategies routed
deposits through a Curve pool (the "Y pool") that held several
stablecoins.

The vault's share price — how much of the pool's underlying assets one
vault share is worth — was calculated **directly from the current,
on-chain exchange rate inside that Curve pool at the moment of the
transaction.**

That's the entire vulnerability. Here's the attack, in order, all
inside one transaction:

1. **Borrow** a huge sum of USDC and USDT via a Uniswap V2 flash loan —
   no collateral required.
2. **Dump** a large amount of one stablecoin into the Curve Y pool,
   which briefly pushes that pool's internal exchange rate away from
   $1:$1 — Curve pools re-price based on their own reserves, and a
   large enough trade moves that price, if only for a moment.
3. **Deposit** into the Harvest vault *while the pool is distorted* —
   the vault calculates the attacker's share price using the
   now-skewed rate, so the attacker's deposit buys more vault shares
   than it should.
4. **Trade back** in the Curve pool to push the price back toward
   normal.
5. **Withdraw** from the Harvest vault — now that the pool price has
   reverted, the vault redeems the attacker's shares at close to the
   *correct* rate, handing back more value than the attacker actually
   deposited.
6. **Repay** the flash loan and keep the difference.

Harvest's own post-mortem confirmed the pattern: the attacker
"manipulated prices on one money lego (the Curve Y pool) to drain
another money lego (the fUSDT/fUSDC vaults), many times" — the entire
six-step cycle above was repeated in quick succession within the same
few minutes, each repetition skimming more value. The whole attack took
about **seven minutes** end to end. Harvest's post-mortem put the total
drained at **$33.8 million**, of which the attacker later returned
**$2.5 million** for reasons that were never explained, for a net loss
of roughly **$31 million**. Users panicked and withdrew funds in the
hours after, which Harvest itself said made the realized loss worse
than the exploit alone would have caused.

## Why this isn't a reentrancy bug

It's worth being precise about what this *isn't*. Nothing here called
back into a function mid-execution the way the DAO hack did. Every
function call in the attack completed normally and returned. The bug
wasn't in the *order* of operations inside a single function — it was
in **what the vault treated as ground truth**: the live, manipulable
internal state of a liquidity pool, instead of something harder to
move in a single transaction.

## The underlying pattern: don't price an asset using a spot source an attacker can move

A Curve or Uniswap pool's instantaneous exchange rate is **not** a
trustworthy price feed on its own — it's a *spot price*, set entirely
by whatever is currently sitting in that pool's reserves, and a large
enough trade (which a flash loan makes nearly free to execute) can move
it arbitrarily within a single block.

```solidity
// Vulnerable: derives a price directly from a pool's current reserves,
// which a flash loan can distort for the length of one transaction.
function getVaultSharePrice() public view returns (uint256) {
    uint256 reserveA = curvePool.balances(0);
    uint256 reserveB = curvePool.balances(1);
    return (reserveA * 1e18) / reserveB; // manipulable in-transaction
}
```

The fix isn't one line the way the reentrancy guard was — it's a
design decision about where a price is allowed to come from:

```solidity
// Safer: use a time-weighted average price (TWAP) instead of the
// instantaneous spot price. A TWAP is computed from a price history
// accumulated over many prior blocks, so distorting it for the length
// of a single flash-loaned transaction barely moves the average.
function getVaultSharePriceTWAP() public view returns (uint256) {
    return oracle.consult(address(curvePool), TWAP_WINDOW);
}
```

```solidity
// Also widely used in production: a Chainlink price feed, which is
// reported by an independent off-chain network of nodes rather than
// read from any single on-chain pool an attacker could move.
function getVaultSharePriceChainlink() public view returns (uint256) {
    (, int256 price, , , ) = priceFeed.latestRoundData();
    require(price > 0, "Invalid price");
    return uint256(price);
}
```

Both fixes share the same idea: **the price source has to be expensive
or slow for an attacker to move, not just technically "on-chain."** A
TWAP needs sustained manipulation across many blocks, which costs far
more than a single flash-loaned transaction can buy. A Chainlink feed
is sourced off the pool entirely.

## Detecting this with Foundry

A reentrancy guard can be checked with a mostly-mechanical fuzz test.
Flash loan price manipulation needs a different kind of test: one that
proves the contract's accounting **doesn't change** when a single
actor can freely move the price source it depends on, within one
transaction.

```solidity
// A negative test: simulate the exact shape of the Harvest exploit
// against a vault that uses getVaultSharePrice() (the vulnerable,
// spot-price version), and assert the attacker cannot profit.
function test_FlashLoanCannotManipulateVaultSharePrice() public {
    uint256 attackerBalanceBefore = usdc.balanceOf(attacker);

    vm.startPrank(attacker);
    flashLoanProvider.flashLoan(LARGE_BORROW_AMOUNT);
    // Inside the borrower callback: skew curvePool, deposit into the
    // vault, unskew curvePool, withdraw, repay the loan.
    vm.stopPrank();

    uint256 attackerBalanceAfter = usdc.balanceOf(attacker);

    // The whole point of the test: after repaying the flash loan and
    // its fee, the attacker should not be net positive.
    assertLe(attackerBalanceAfter, attackerBalanceBefore);
}
```

```solidity
// An invariant: across any sequence of deposits, withdrawals, and
// pool trades a fuzzer generates, the vault's total redeemable value
// should never exceed the real value of the assets it actually holds.
function invariant_VaultCannotBeDrainedAboveItsRealHoldings() public {
    uint256 totalShareValue = vault.totalSupply() * vault.sharePrice() / 1e18;
    uint256 realHoldings = underlyingAsset.balanceOf(address(vault));
    assertLe(totalShareValue, realHoldings);
}
```

The negative test catches the *specific* attack. The invariant is the
more durable defense: it holds regardless of exactly how an attacker
tries to distort the price, because it checks the actual property that
matters — the vault can never promise out more value than it holds —
rather than re-testing one known attack shape.

## Practical engineering trade-offs

- **TWAPs add latency, not just safety.** A time-weighted price lags
  genuine, legitimate price movements by design — that's exactly what
  makes it resistant to one-transaction manipulation, but it also means
  the protocol is briefly "wrong" during fast, real market moves. Teams
  have to choose a window length that balances the two.
- **Chainlink feeds add a dependency.** They're a different, external
  trust assumption — the protocol is now trusting Chainlink's node
  operators and update cadence instead of trusting its own pool. For
  most teams this is a better trade, but it's still a trade, not a
  free fix.
- **"It worked in every test" isn't the bar.** Harvest's strategy had
  presumably been tested under normal conditions. What it hadn't been
  tested against was an adversary who could temporarily buy the exact
  market condition needed to break an assumption — which is precisely
  what the invariant above is written to catch instead.

## Key terms

| Term | Meaning |
|---|---|
| Flash loan | An uncollateralized loan that must be borrowed and repaid within a single transaction, or the whole transaction reverts |
| Spot price | A price read directly from a pool's current reserves at this exact moment — manipulable within one transaction |
| TWAP | Time-weighted average price — a price computed from history across many blocks, resistant to one-transaction manipulation |
| Price oracle | Any source a contract trusts for an external value like an asset's price; the central question is always how hard that source is to move |

## Check yourself

Before moving to the next lesson, make sure you can explain, in your
own words, why "the attacker never broke into anything" is actually
the scariest part of this exploit — and why a TWAP would have stopped
it without changing a single line of the vault's deposit or withdraw
logic.
