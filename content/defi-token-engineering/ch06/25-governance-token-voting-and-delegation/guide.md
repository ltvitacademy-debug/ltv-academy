# Lesson 25 — Governance Token Voting & Delegation

**Chapter 6 · DAOs & Governance · Lesson 25 of 30**

## What you'll learn

- The default 1-token-1-vote model, seen in a real voting interface
- Why voting power is snapshotted, not read live
- How delegation lets you keep your tokens but hand off your vote
- Aave's representative-voting pattern as a real delegation implementation

## 1-token-1-vote, in a real interface

Most governance tokens default to the simplest possible rule: your voting
power equals the number of tokens you hold (or that are delegated to
you). The screenshot below is Tally — a real governance front-end used by
multiple production DAOs built on the OpenZeppelin Governor contract —
showing exactly this: a voter's current voting power displayed above the
proposal, with three options (**For**, **Against**, **Abstain**) to cast a
vote.

```
voting_power(address) = balance(address) + sum(delegated_to(address))
```

![Tally's real voting interface for an on-chain governance proposal, showing voting power displayed above the proposal and For/Against/Abstain vote options.](/courses/defi-token-engineering/ch06/25-governance-token-voting-and-delegation/tally_vote_ui.png)
*Tally's actual voting UI, from OpenZeppelin's own governance documentation.*

## Why voting power is snapshotted, not read live

If voting power were read live at the moment each vote is cast, a voter
could borrow tokens via a flash loan, vote, and repay the loan — all in a
single transaction — temporarily inflating their influence with capital
they never actually held. Production governance systems close this hole
by recording voting power at a specific **snapshot block**, usually the
block the proposal was created (or activated):

```
voting_power_for_proposal(address) = balance_at_block(address, snapshot_block)
```

Tokens acquired after the snapshot block simply don't count for that
proposal, no matter how many you hold by the time voting ends.

![Aave's own Voting Network architecture diagram, showing registered voting-token roots (Aave, stkAave, aAave) and a voting machine verifying power against them.](/courses/defi-token-engineering/ch06/25-governance-token-voting-and-delegation/aave_voting_network.jpg)
*Aave governance v3's Voting Network — from its official GitHub documentation.*

## Delegation — keeping your tokens, handing off your vote

Delegation lets a token holder assign their voting power to another
address without transferring the underlying tokens. The ERC20Votes
pattern (the extension OpenZeppelin's Governor system reads voting power
from) exposes this as a single function call:

```solidity
// Simplified illustration of the ERC20Votes delegation pattern
function delegate(address delegatee) external;

// Example:
// Alice holds 10,000 governance tokens but doesn't want to track
// every proposal herself. She delegates to Bob, a known community
// contributor who votes actively.

token.delegate(bob);

// Alice's tokens never leave her wallet. Bob's effective voting
// power now includes Alice's 10,000 tokens on top of his own.
```

Delegation is reversible and non-custodial — Alice can re-delegate to
herself or anyone else at any time, and Bob never has the ability to move
Alice's tokens, only to vote with the weight they represent.

## Aave's representative voting — delegation, implemented

Aave's governance v3 architecture includes a specific **representative
voting flow**: a governance participant chooses a representative, who can
then submit votes on their behalf on Aave's voting network. Registered
representative roots let the voting machine verify a vote was cast by an
authorized delegate without requiring the original token holder to
transact on every single proposal.

![Aave's own Representative Voting Flow diagram, showing a governance participant choosing a representative who submits votes on their behalf.](/courses/defi-token-engineering/ch06/25-governance-token-voting-and-delegation/aave_representative_voting.jpg)
*Aave governance v3's representative voting flow — from its official GitHub documentation.*

## Key terms

| Term | Meaning |
|---|---|
| Voting power | The weight an address controls when casting a vote, usually tokens held + delegated |
| Snapshot block | The specific block voting power is measured at, preventing last-minute manipulation |
| Delegation | Assigning your voting power to another address without transferring tokens |
| Representative | An address authorized to cast votes on behalf of a token holder who delegated to them |

## Check yourself

Before Lesson 26, make sure you can explain why voting power is read from
a snapshot block instead of live, and describe what delegation does and
does not give a delegate control over.
