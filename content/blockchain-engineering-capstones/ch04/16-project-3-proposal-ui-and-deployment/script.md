# Lesson 16 — Proposal UI & Deployment · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

This lesson builds the Governor contract itself, deploys the full system in the right order, and walks a proposal through its entire lifecycle.

## S2 · CODE — The Governor contract

Here's the real composition, verified against current OpenZeppelin docs: Governor combined with GovernorCountingSimple for tallying, GovernorVotes to read the token's voting power, GovernorVotesQuorumFraction to set quorum as a percent of supply, and GovernorTimelockControl to route execution through the timelock.

## S3 · CODE — Six required overrides

Combining Governor with GovernorTimelockControl means both declare the same functions, so Solidity requires six explicit overrides -- state, proposalNeedsQueuing, queueOperations, executeOperations, cancel, and executor. Each one here just calls super, but each is a real hook you could customize.

## S4 · STEPS — Deployment order

Order matters because each contract needs an address from the one before it. Deploy the token first. Deploy the timelock with a temporary admin. Deploy the Governor, passing in both addresses. Grant the timelock's roles to the Governor. And finally, renounce the deployer's admin role -- the step that finishes the handoff to governance.

## S5 · STEPS — The proposal lifecycle

A proposal moves through five states: Pending while the voting delay elapses, Active while voting is open, Succeeded or Defeated once voting ends, Queued once a successful proposal enters the timelock, and Executed once the delay passes and the calls actually run.

## S6 · STEPS — What the UI must show

The single most important rule: a proposal's description is just a string -- it is not what gets voted on. A trustworthy UI decodes and displays the actual target addresses, values, and calldata a proposal will execute, the live vote tally and quorum progress, and the exact timestamp a queued proposal becomes eligible to run.

## S7 · OUTRO

Next lesson: reviewing, testing, and preparing to present this entire system.
