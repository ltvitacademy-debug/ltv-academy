# Script — Building a Simple Governance Contract

## Segment 1 (title)

A simplified teaching example, not production code -- this leaves out access control hardening, reentrancy protection, and the timelock delay a real DAO needs. The goal is seeing Chapter 6's mechanics as actual code.

## Segment 2 (code: the Proposal struct)

Each proposal stores a target, calldata, a snapshot block, a vote-end timestamp, and running for and against tallies. That snapshotBlock field is the snapshot mechanic from two lessons ago, written directly into the data structure.

## Segment 3 (code: propose())

propose assigns the next proposal ID, then records block.number as the snapshot and the current timestamp plus the voting period as the deadline -- both fixed at creation and never touched again.

## Segment 4 (code: castVote())

castVote checks the voting window is still open and the caller hasn't already voted, then reads weight through getPastVotes at the proposal's snapshot block, not the current block -- so tokens acquired after the proposal was created simply don't count.

## Segment 5 (code: execute())

execute checks voting has ended, quorum was met, and for-votes beat against-votes -- the exact quorum and majority checks from the governance mechanics lesson, written as require statements. Notice there's no delay here between the vote ending and execution succeeding.

## Segment 6 (steps: what production adds)

Real delegation handled by an ERC20Votes token, a TimelockController queuing execute behind a mandatory delay, a proposal threshold to prevent spam, and an actual security audit -- none of which this teaching contract has.

## Segment 7 (outro)

Propose, vote, execute -- the full mechanics loop, in code, missing exactly the safeguards a real DAO can't ship without. That closes out Chapter 6 -- next up, Chapter 7: NFTs beyond collectibles, starting with a review of ERC-721 and ERC-1155.
