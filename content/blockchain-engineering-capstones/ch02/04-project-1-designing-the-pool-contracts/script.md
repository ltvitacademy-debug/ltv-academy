# Lesson 4 — Designing the Pool Contracts · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Time to write the pool contract itself. Everything here is simplified,
unaudited teaching code — written to be read completely in one sitting,
not dropped into production.

## S2 · STEPS CARD (architecture)

A real AMM splits a factory, a pair contract, and a router into separate
pieces. This teaching version collapses all of that into one SimplePool
contract, tracking liquidity shares with a plain mapping instead of a
minted LP token — a deliberate tradeoff for readability.

## S3 · CODE CARD (state)

Two token references, two reserve counters, a running total of shares,
and each address's own share balance — that's the entire state this
contract needs.

## S4 · CODE CARD (addLiquidity)

The first depositor sets the starting price with the square root of
their two amounts, since there's no existing ratio to match yet. Every
depositor after that mints shares proportional to the smaller side of
their deposit, which stops a lopsided deposit from minting too much.

## S5 · CODE CARD (swapAforB)

This is the constant-product formula with a zero-point-three percent fee
built in. Notice the order: reserves update before the outbound token
transfer. That's checks-effects-interactions — state changes before any
external call — and it's what blocks reentrancy here.

## S6 · CODE CARD (removeLiquidity)

Removing liquidity burns shares and returns a proportional slice of both
reserves, following the same state-before-transfer ordering.

## S7 · STEPS CARD (what's simplified)

Flagged simplifications: no explicit reentrancy guard modifier beyond
the ordering itself, no minimum-output slippage parameter on swaps, and
LP shares tracked in a mapping instead of a real transferable token.
Lesson 6 picks the slippage gap back up directly.

## S8 · OUTRO CARD

Next: building the frontend that reads this pool's live state and lets
a connected wallet add liquidity, swap, and withdraw.
