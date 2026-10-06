# Lesson 24 — On-Chain Governance Mechanics

**Chapter 6 · DAOs & Governance · Lesson 24 of 30**

## What you'll learn

- The real proposal lifecycle a production governance system enforces
- What quorum and majority thresholds actually check
- Why a timelock delay sits between "proposal passes" and "changes apply"
- How a cross-chain governance system (Aave) extends the same core loop

## The proposal lifecycle, from a real protocol's own docs

The diagram below is Compound's own published governance lifecycle
diagram — not a simplified teaching version, the actual states its
contracts enforce:

**Review (2 days) → Active voting (3 days) → Succeeded/Defeated →
Queued in Timelock (2 days) → Executed** (or Canceled at any stage before
execution).

![Compound's own published proposal lifecycle diagram: Review, Active voting, Succeeded/Defeated, Queued in a 2-day Timelock, then Executed or Canceled.](/courses/defi-token-engineering/ch06/24-on-chain-governance-mechanics/compound_gov_lifecycle.png)
*Compound's actual governance lifecycle, from its own documentation — the Timelock stage is highlighted.*

That structure — propose, vote, delay, execute — is close to universal
across on-chain governance systems, even when the exact day counts differ
protocol to protocol. The delay stage specifically (labeled "Timelock"
above) is covered in depth in Lesson 26; for now, the key point is that it
exists *between* a vote succeeding and anything actually changing.

## Quorum and majority — two separate checks

A proposal passing isn't just "more For votes than Against." Two
independent thresholds usually both have to clear:

```
Quorum check:
  total_votes_cast >= quorum_threshold
  Example: quorum = 400,000 tokens' worth of votes
           votes cast = 450,000 -> quorum met

Majority check:
  for_votes / (for_votes + against_votes) > 50%
  Example: for = 300,000, against = 150,000
           300,000 / 450,000 = 66.7% -> majority met

Both checks pass -> proposal succeeds
Either check fails -> proposal defeated, regardless of the other
```

Quorum exists specifically to stop a small, motivated minority from
passing changes that the broader token-holder base never weighed in on —
a 95%-For vote means nothing if only 0.1% of eligible voting power showed
up.

## Aave's governance flow — the same loop, across chains

Aave's own architecture diagrams (from its official governance v3
repository) show the identical propose → vote → queue → execute loop, but
split across a **Core network** (Ethereum, where governance and
proposals live) and separate **voting networks** (lower-fee chains like
Polygon, where the actual vote casting happens cheaply).

![Aave's own Core Network architecture diagram, showing a proposer creating and activating a proposal against the Governance contract, which forwards to a.DI and the voting/execution layers.](/courses/defi-token-engineering/ch06/24-on-chain-governance-mechanics/aave_core_network.jpg)
*Aave governance v3's Core Network — from its official GitHub documentation.*

The detailed, numbered flow shows exactly which contract calls happen at
each of its 15 steps — from a proposer creating a payload on step 1,
through voting results being sent back to the Core network and finally
executed.

![Aave's own detailed, numbered governance flow diagram, showing all 15 steps from proposal creation through cross-chain voting and final execution.](/courses/defi-token-engineering/ch06/24-on-chain-governance-mechanics/aave_full_flow.jpg)
*The full cross-chain proposal flow — also from Aave's official governance v3 repository.*

The architecture is more complex than Compound's single-chain version,
but it's solving the same underlying problem from Lesson 25: letting
large numbers of token holders vote cheaply, without weakening the
security of where the actual governance power lives.

## Key terms

| Term | Meaning |
|---|---|
| Quorum | The minimum total voting participation required for a proposal to be valid |
| Majority | The minimum share of For votes (among votes cast) required to pass |
| Timelock | An enforced delay between a proposal succeeding and its changes executing |
| Proposal lifecycle | The full sequence of states a governance proposal moves through, start to finish |

## Check yourself

Before Lesson 25, make sure you can state the difference between quorum
and majority from memory, and explain in one sentence why a timelock
delay sits between a vote succeeding and the change actually executing.
