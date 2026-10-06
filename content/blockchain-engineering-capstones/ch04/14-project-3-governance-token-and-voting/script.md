# Lesson 14 — Governance Token & Voting · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Today you're writing the governance token itself -- the piece that gives every holder their voting weight.

## S2 · STEPS — Why a plain balance isn't enough

A plain ERC-20 balance only reports what you hold right now, which means someone could buy a big stack right before a vote and sell it right after. Real governance tokens checkpoint voting weight at a past block instead, so a vote always uses a snapshot from before it could be gamed.

## S3 · CODE — The governance token

Here's the real contract, verified against OpenZeppelin's current governance docs rather than memory. It's an ERC-20 extended with ERC20Permit and ERC20Votes, with one required override: `_update`, the single hook current OpenZeppelin versions route every transfer, mint, and burn through.

## S4 · CODE — Resolving the nonces collision

Because ERC20Permit and the shared Nonces utility both declare `nonces`, Solidity requires you to override it explicitly and pick which implementation wins -- even though, here, they agree.

## S5 · STEPS — Delegation

Holding tokens isn't the same as having voting power. ERC20Votes tracks voting weight per delegate, and a balance carries zero voting power until its owner calls `delegate`, usually to themselves. Forgetting that single call is the most common reason a new governance token looks broken in testing.

## S6 · OUTRO

Next lesson: the timelock-controlled treasury, and exactly why a passed vote still has to wait before it can spend a single token.
