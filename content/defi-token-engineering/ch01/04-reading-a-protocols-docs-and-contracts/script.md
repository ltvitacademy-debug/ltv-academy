# Script — Reading a Protocol's Docs & Contracts

## Segment 1 (title)

A protocol's marketing site tells you what it wants you to believe. Its docs, its GitHub repo, its verified contract, and its audit reports tell you what's actually true — and when they disagree with the marketing, the on-chain contract always wins.

## Segment 2 (steps: four places to check)

Official docs explain how the protocol is supposed to work. The GitHub repo is the actual source and commit history. A verified contract on a block explorer is the exact bytecode running on-chain. Audit reports show what independent researchers actually checked and flagged.

## Segment 3 (code: read functions vs. write functions)

A verified contract exposes Read functions — like getReserves and balanceOf — that cost no gas and just report current state, letting you verify a pool's reserves without trusting any front-end. Write functions, like swap and mint, actually change state and require your signature — these are exactly what a "Swap" button is calling on your behalf.

## Segment 4 (code: what controls the contract)

Before trusting a contract with funds, find out who can change its behavior after you've deposited. Look for an admin key — a red flag if it's a single address instead of a multisig — and a timelock, a mandatory delay that gives users time to exit if they disagree with a proposed change.

## Segment 5 (outro)

Docs tell the story; the verified contract is the only thing actually enforced by code. Next up: Chapter 2 starts with the math underneath the AMM category — how a constant-product pool actually prices a trade.
