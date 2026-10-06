# Lesson 5 — Building the Frontend · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Now the frontend. The one rule that matters most here: the contract is
the source of truth. Never store pool state locally and trust it —
always read it live.

## S2 · STEPS CARD (stack + principle)

React, wagmi, and viem handle wallet connection and contract calls.
Reserves change with every swap anyone makes, so the frontend re-reads
the contract rather than caching a copy that can silently drift out of
sync.

## S3 · CODE CARD (reading reserves)

wagmi's useReadContract hook, built on viem, calls a view function and
keeps the result current. Here it's wrapped in a small usePoolReserves
hook that reads both token reserves live from the chain.

## S4 · CODE CARD (writing a swap)

useWriteContract sends a state-changing transaction through the
connected wallet. The user signs, it broadcasts, and the hook tracks
pending, success, and error states for the UI.

## S5 · CODE CARD (quote preview)

Before committing to a swap, show a preview computed the same way the
contract computes it — same fee, same constant-product formula — so the
number on screen doesn't mislead the user.

## S6 · STEPS CARD (approve-then-swap)

An ERC-20 token never lets another contract move it without permission
first. That means two sequential transactions: approve, then swap — not
a single click that silently fails when allowance is missing.

## S7 · OUTRO CARD

Next: testing this pool properly — unit tests, fuzz tests, invariant
tests, and a written security-review checklist.
