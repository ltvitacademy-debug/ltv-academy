# Script — Timelocks & Multisig Treasuries

## Segment 1 (title)

A timelock's entire purpose is giving token holders a window to react after a proposal passes but before it takes effect -- the last line of defense against a bug, an attack, or a genuinely bad idea that somehow got majority support.

## Segment 2 (screenshot: Aave's Execution Network)

Real systems often run two delay tiers at once. Aave's own Execution Network routes changes through two executor levels -- a shorter delay for lower-risk governance configuration, a longer delay for changes to the protocol itself, where user funds actually sit.

## Segment 3 (screenshot: Tally's queued proposal)

This is what queued looks like in a real interface -- a proposal tagged QUEUED and ON-CHAIN, sitting inside its timelock delay after voting ended but before Execute can be pressed. Anyone can call execute once the delay elapses -- it isn't restricted to the original proposer.

## Segment 4 (screenshot: Safe's multisig comparison)

A multisig spreads control across multiple signers instead of one key. Safe's own comparison shows the trade-off plainly: distributed risk and required approvals, versus a single point of failure that moves immediately.

## Segment 5 (code: TimelockController roles and M-of-N multisig)

OpenZeppelin's TimelockController separates proposer, executor, and canceller roles instead of trusting one address with everything. A 3-of-5 multisig treasury needs any three of five signers -- a compromised key alone can't move funds, and two absent signers don't freeze the treasury.

## Segment 6 (outro)

A timelock delays what a vote decided; a multisig requires multiple humans to agree on sensitive actions directly -- two independent safeguards, not one. Next up: building a simple governance contract, putting all of Chapter 6's mechanics into actual Solidity.
