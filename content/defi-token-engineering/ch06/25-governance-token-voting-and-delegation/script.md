# Script — Governance Token Voting & Delegation

## Segment 1 (title)

Most governance tokens default to the simplest rule: your voting power equals the tokens you hold, plus whatever's been delegated to you. Let's see that in a real voting interface, then look at how delegation actually works.

## Segment 2 (screenshot: Tally voting UI)

This is Tally, a real governance front-end used by production DAOs on the OpenZeppelin Governor contract -- a voter's current voting power displayed above the proposal, with For, Against, and Abstain as the three options.

## Segment 3 (screenshot: Aave's Voting Network)

Voting power isn't read live at the moment you vote -- it's snapshotted, usually at the block the proposal was created. That closes the flash-loan hole: borrow tokens, vote, repay, all in one transaction. Aave's Voting Network diagram shows exactly this kind of registered-balance verification.

## Segment 4 (screenshot: Aave's representative voting flow)

Delegation lets you keep your tokens and hand off your vote. Aave's own representative voting flow shows a participant choosing a representative, who then submits votes on their behalf -- the delegate never gains any ability to move the underlying tokens.

## Segment 5 (code: the delegate() pattern)

The ERC20Votes delegation pattern is a single function call. Alice holds ten thousand governance tokens but delegates to Bob instead of tracking every proposal herself -- her tokens never leave her wallet, but Bob's effective voting power now includes her weight on top of his own.

## Segment 6 (outro)

Voting power, snapshotted and delegatable, without ever requiring custody of the underlying tokens. Next up: timelocks and multisig treasuries -- the safeguards that sit between a vote passing and funds actually moving.
