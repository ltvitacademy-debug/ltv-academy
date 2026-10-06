# Script — On-Chain Governance Mechanics

## Segment 1 (title)

Every on-chain governance system enforces the same core loop: propose, vote, delay, execute. The real proposal lifecycle is stricter than it sounds -- let's look at it from a production protocol's own documentation.

## Segment 2 (screenshot: Compound's governance lifecycle)

This is Compound's own published lifecycle diagram: a two-day review period, three days of active voting, then succeeded or defeated, then two days queued in the timelock before execution -- or canceled at any stage before that.

## Segment 3 (screenshot: Aave's Core Network)

Aave's own architecture diagram shows the same loop -- propose, activate vote, execute -- running through its Core network on Ethereum, which is where governance power and proposals actually live.

## Segment 4 (screenshot: Aave's full cross-chain flow)

The detailed, numbered version shows exactly which contract calls happen at each step, from a proposer creating a payload through voting results being sent back and finally executed -- fifteen steps, because voting itself happens cheaply on a separate chain.

## Segment 5 (code: quorum and majority)

A proposal passing requires two separate checks: quorum, meaning enough total votes were cast, and majority, meaning more than half of those votes were in favor. Both have to pass -- a 95 percent For vote means nothing if almost nobody showed up to vote.

## Segment 6 (outro)

Propose, vote, delay, execute -- with quorum and majority both gating whether a vote actually counts. Next up: governance token voting and delegation -- who actually casts these votes, and how voting power moves between accounts.
