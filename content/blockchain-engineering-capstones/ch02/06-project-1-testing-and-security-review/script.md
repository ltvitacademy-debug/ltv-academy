# Lesson 6 — Testing & Security Review · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Unit tests only prove the happy path. This lesson adds fuzz tests,
invariant tests, and a written security-review checklist — the three
layers that actually probe for real failure modes.

## S2 · STEPS CARD (testing pyramid)

Unit tests check specific, hand-picked numbers. Fuzz tests run the same
function hundreds of times with randomized inputs. Invariant tests check
a property that must hold no matter what sequence of calls happens —
that's a different and deeper kind of check.

## S3 · CODE CARD (fuzz test)

Foundry fuzzes any parameter on a test-prefixed function automatically.
Bound clamps the randomized input to a realistic range. This test checks
that a fee-paying swap never decreases the pool's constant product.

## S4 · CODE CARD (invariant test)

targetContract tells Foundry to generate long, randomized call sequences
against the pool. This invariant checks that the pool's real token
balance never falls below its own bookkeeping — exactly the class of bug
that causes an insolvent pool.

## S5 · STEPS CARD (security checklist, part 1)

Confirmed: checks-effects-interactions ordering against reentrancy,
Solidity 0.8's built-in overflow checks, and the first-depositor branch
that avoids dividing by zero.

## S6 · STEPS CARD (security checklist, part 2)

Stated explicitly, not left as an oversight: no access control, because
this pool is intentionally permissionless. Flagged as a known gap: no
slippage protection on swaps, and integer-division rounding that can
trap small dust amounts.

## S7 · STEPS CARD (events)

Emit a Swap and a LiquidityAdded event from every state-changing
function. Without them, reconstructing activity means replaying every
block by hand — the same indexing problem this path's backend material
covers, now applied to your own contract.

## S8 · OUTRO CARD

Next: deploying this pool to the Sepolia testnet, verifying it, and
writing the README that wraps up Project 1.
