# Script — Chainlink Automation & Functions

## Segment 1 (title)

An important update found while researching this lesson: Chainlink's own docs currently show both Automation and Functions as deprecated, with guidance to migrate to the Chainlink Runtime Environment. The patterns are still worth understanding — CRE extends the same ideas.

## Segment 2 (code: Automation pattern)

Automation solved a specific gap: a contract can't wake itself up. checkUpkeep is simulated off-chain at no cost, answering should performUpkeep run right now. performUpkeep only executes when true, and re-checks its own condition rather than trusting the simulation blindly.

## Segment 3 (steps: Functions pattern)

Functions solved a different gap: computation or an authenticated API call the contract can't make itself. A decentralized oracle network executes submitted source code independently across multiple nodes and aggregates the results — the same independent-plus-aggregation shape from Lesson 17, applied to computation.

## Segment 4 (steps: why the pattern still matters)

Both problems don't go away just because the products did: something has to trigger logic without a human, and something has to bridge off-chain computation in safely. CRE is Chainlink's current answer, built on the same foundation.

## Segment 5 (outro)

Next up, Lesson 20 builds something smaller and very current: a backend service that watches a Chainlink price feed and triggers an action when it crosses a threshold.
