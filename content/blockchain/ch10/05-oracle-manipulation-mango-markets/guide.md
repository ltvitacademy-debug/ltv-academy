# Lesson 5 — Oracle Manipulation: The Mango Markets Exploit

**Chapter 10 · Security Auditing · Lesson 5 of 6**

This lesson is a written case study — not a recording of a class
session. It's the same underlying idea as the Harvest Finance lesson —
a contract trusting a price it shouldn't have — but the previous lesson
distorted an external pool for one transaction. This exploit shows what
happens when the manipulated market **is** the oracle itself, and the
attacker doesn't need a flash loan at all — just enough capital to open
a large position, and time.

## What you'll learn

- What a price oracle is in the context of a lending or derivatives
  protocol, and why "where does this number come from" is the single
  most important security question you can ask about one
- The real mechanics of the October 2022 Mango Markets exploit — how
  one trader legally opened a position, moved the price his own
  position was valued against, and borrowed the protocol dry
- Why "the market is thin and the oracle reads straight from it" is a
  more dangerous combination than it sounds
- How to write a Foundry test and invariant that catch a protocol
  over-trusting a single, thin-liquidity price source

## What an oracle actually is here

Mango Markets was a Solana-based protocol offering leveraged trading
and lending. Like most such protocols, it needed to know the current
price of its listed assets — including its own native token, MNGO — to
figure out how much a trader's position was worth and how much they
could safely borrow against it.

The number it used for that came from a **price oracle**: a feed that
reports an asset's price on-chain, sourced from one or more exchanges.
The question every protocol design has to answer is: **how hard is it
for one actor to move the exchanges this oracle is reading from?**

## The Mango Markets exploit, October 11, 2022

The attacker, Avraham Eisenberg, opened two accounts on Mango Markets.
Here's the sequence, as laid out in the CFTC's subsequent complaint
against him:

1. **Open a large position.** Using the first account, he took a
   massive **long** position in a perpetual swap contract tied to the
   price of MNGO against USDC. Using the second account, he took the
   matching **short** side.
2. **Pump the price on the exchanges the oracle read from.** MNGO
   traded on only a few exchanges, all fairly thin. Eisenberg bought
   MNGO aggressively on those exchanges — not on Mango Markets itself,
   but on the external markets feeding Mango's oracle. Over about 30
   minutes, the oracle-reported price of MNGO **rose more than 13x.**
3. **The inflated price made his long position look enormous on
   paper.** Mango's own calculation of his position's value used that
   same manipulated oracle price — so the long position he'd opened for
   relatively little was now, on paper, worth vastly more.
4. **Borrow against the inflated collateral.** With that paper value
   as collateral, Eisenberg borrowed essentially every other asset
   Mango Markets held in its treasury — the CFTC's complaint alleges
   **over $110 million** in digital assets were drained this way.

No contract bug was triggered. No function reverted when it shouldn't
have. Every single transaction executed exactly as written. Eisenberg
later described the trades publicly as "a highly profitable trading
strategy" and "legal open market actions, using the protocol as
designed" — and a subsequent Mango DAO governance vote controversially
allowed him to keep **$47 million** as a bounty in exchange for
returning the rest. The CFTC and DOJ didn't agree with his framing: he
was later charged and arrested.

## Why this isn't the Harvest Finance attack

In the previous lesson, the attacker borrowed capital via a flash loan,
distorted an external pool's price for the length of a single
transaction, and the manipulation had to be undone by the time that
transaction ended. Here, the attacker:

- Used **his own capital**, not a flash loan — there was no "undo"
  required, because the position was never meant to be reversed within
  one transaction
- Manipulated the price **gradually, over 30 minutes**, not atomically
  within one block
- Manipulated markets **external to the protocol he exploited** — the
  price distortion happened on the exchanges feeding the oracle, not on
  Mango Markets itself

Both exploits share the same root cause, though: **a protocol trusted
a price it should have recognized as cheap to move.**

## The underlying pattern: oracle manipulability is about liquidity, not time

```solidity
// Vulnerable: reads a single oracle's current price with no check on
// how much liquidity backs that price, or how recently/sharply it moved.
function getPositionValue(address trader) public view returns (uint256) {
    uint256 price = priceOracle.getPrice(MNGO_USDC_PAIR);
    return positions[trader].size * price;
}
```

The deeper issue isn't the oracle's update mechanism — it's that
**MNGO's real-world liquidity was thin enough that one well-capitalized
trader could move its price across every venue the oracle read from.**
A price oracle averaging multiple exchanges is only as resistant to
manipulation as the combined depth of the markets it's averaging.

```solidity
// Safer: bound how much a single position's value is allowed to be
// derived from a thinly-traded asset's oracle price, and/or require a
// deviation check against a longer-window reference price before
// trusting a large, sudden move.
function getPositionValueSafer(address trader) public view returns (uint256) {
    uint256 spotPrice = priceOracle.getPrice(MNGO_USDC_PAIR);
    uint256 referencePrice = twapOracle.consult(MNGO_USDC_PAIR, 1 hours);

    uint256 deviation = spotPrice > referencePrice
        ? ((spotPrice - referencePrice) * 100) / referencePrice
        : ((referencePrice - spotPrice) * 100) / referencePrice;

    require(deviation <= MAX_ALLOWED_DEVIATION_PERCENT, "Price deviation too large");

    return positions[trader].size * spotPrice;
}
```

This doesn't just apply to exotic DeFi math — it's the same lesson as
the previous one, restated: **a number a contract trusts for collateral
or borrowing decisions needs to be expensive to move relative to the
value it gates**, whether the venue being moved is an on-chain AMM pool
or the thin external exchanges feeding a price oracle.

## Detecting this with Foundry

```solidity
// A negative test: simulate a large, sudden price swing on the oracle
// feeding a thinly-traded asset, and assert that a position's
// borrowing power doesn't scale with it unchecked.
function test_SuddenOraclePriceSpikeCannotUnlockUnboundedBorrowing() public {
    vm.prank(attacker);
    perp.openLongPosition(MNGO_USDC_PAIR, SMALL_COLLATERAL_AMOUNT);

    uint256 borrowingPowerBefore = lending.getBorrowingPower(attacker);

    // Simulate the oracle's reported price jumping 13x, as happened
    // on the real exchanges feeding Mango's oracle.
    mockOracle.setPrice(MNGO_USDC_PAIR, mockOracle.getPrice(MNGO_USDC_PAIR) * 13);

    uint256 borrowingPowerAfter = lending.getBorrowingPower(attacker);

    // With a deviation check in place, a sudden 13x spike shouldn't
    // translate directly into 13x the borrowing power.
    assertLt(borrowingPowerAfter, borrowingPowerBefore * 13);
}
```

```solidity
// An invariant: no single position's reported collateral value should
// exceed some sane multiple of the total real liquidity backing the
// asset it's denominated in, across any price the fuzzer tries.
function invariant_CollateralValueBoundedByRealLiquidity() public {
    uint256 reportedValue = perp.getPositionValue(attacker, MNGO_USDC_PAIR);
    uint256 realLiquidity = dex.getTotalLiquidity(MNGO_USDC_PAIR);
    assertLe(reportedValue, realLiquidity * MAX_LIQUIDITY_MULTIPLE);
}
```

## Practical engineering trade-offs

- **Deviation checks can reject legitimate fast-moving markets.**
  A real crash or rally can also move a price 10%+ in minutes — a
  deviation check has to be tuned so it blocks manipulation without
  freezing the protocol during genuine volatility.
- **Listing a thin-liquidity asset at all is a risk decision, not just
  an engineering one.** No oracle design fully neutralizes the risk of
  listing an asset whose entire market cap a single trader can move;
  teams have to decide whether to list it, and if so, with what
  collateral limits.
- **"The protocol worked as designed" was Eisenberg's actual
  defense.** That's a reminder that a security review has to ask "what
  is this code technically allowed to do" separately from "what did we
  intend it to do" — the gap between those two questions is exactly
  where this exploit lived.

## Key terms

| Term | Meaning |
|---|---|
| Price oracle | An on-chain feed reporting an external asset's price, sourced from one or more exchanges |
| Oracle manipulation | Moving the price an oracle reports by trading on the venues it reads from, rather than attacking the oracle's code directly |
| Thin liquidity | A market small enough that a single well-capitalized trade can meaningfully move its price |
| Deviation check | A safeguard that compares a spot price against a slower reference price and rejects values that moved too far, too fast |

## Check yourself

Before moving to the next lesson, make sure you can explain, in your
own words, why Eisenberg's attack worked without triggering a single
revert, and why that makes it fundamentally harder to defend against
with input validation alone compared to a bug like reentrancy.
