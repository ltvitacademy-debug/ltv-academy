# Lesson 19 — Chainlink Automation & Functions

**Chapter 4 · Oracles & External Data · Lesson 19 of 24**

## What you'll learn

- What Chainlink Automation and Chainlink Functions were each built to do
- The real, current interfaces both are built on
- An important, current fact: both have been deprecated in favor of Chainlink's Runtime Environment (CRE)
- Why understanding the underlying pattern still matters, even as the specific product does

## A live update, found while researching this lesson

Chainlink's own documentation, as of this course being built, carries two
deprecation notices that matter for anyone building on this today:
**Chainlink Automation** was deprecated as of June 30, 2026 (v2.1: July
31, 2026), and **Chainlink Functions** was deprecated as of June 30,
2026. Chainlink's guidance for both is to migrate to the **Chainlink
Runtime Environment (CRE)**, a newer platform the documentation describes
as supporting "everything Functions can do — and more." This is worth
stating plainly rather than teaching the old products as if they were
still the current recommendation: if you're starting a new integration
today, CRE — not Automation or Functions — is where Chainlink is actually
pointing new builders. The patterns below are still worth understanding,
both because production contracts built on the older interfaces are
still running until their deprecation dates, and because CRE extends the
same underlying ideas rather than replacing them conceptually.

## Automation: triggering a contract without a keeper you run

Chainlink Automation solved a specific gap: a smart contract can't wake
itself up. Something external has to call `performUpkeep` when a
condition is met — a time interval passing, a price crossing a
threshold, anything. The pattern is `AutomationCompatibleInterface`'s two
functions:

```solidity
contract Counter is AutomationCompatibleInterface {
  uint256 public counter;
  uint256 public lastTimeStamp;
  uint256 public immutable interval;

  function checkUpkeep(bytes calldata) external view override
    returns (bool upkeepNeeded, bytes memory) {
    upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;
  }

  function performUpkeep(bytes calldata) external override {
    if ((block.timestamp - lastTimeStamp) > interval) {
      lastTimeStamp = block.timestamp;
      counter = counter + 1;
    }
  }
}
```

`checkUpkeep` is a `view` function simulated off-chain, at no gas cost,
by Chainlink's network — it just answers "should `performUpkeep` run
right now?" `performUpkeep` only executes on-chain when the answer is
true, and re-checks its own condition rather than trusting the off-chain
simulation blindly, since chain state can shift between the check and
the execution.

## Functions: running real off-chain computation

Functions solved a different gap: not "when should this run," but "this
needs an answer that requires actual computation or an authenticated API
call the contract itself can't make." A contract sends JavaScript source
code as part of a request; a decentralized oracle network (DON) executes
that code independently across multiple nodes, aggregates the results,
and returns a single answer on-chain — the same independent-nodes-plus-
aggregation shape from Lesson 17, applied to arbitrary computation
instead of just price data. Secrets (like API keys) could be included
via threshold encryption, so the source code could authenticate to a
real API without exposing the key on-chain.

## Why the underlying pattern still matters

Both products, deprecated or not, are concrete instances of the same two
problems every on-chain system eventually hits: *something* has to
trigger logic without a human in the loop, and *something* has to bridge
arbitrary off-chain computation into a contract safely. CRE is
Chainlink's current answer to both, built on the same independent-node,
aggregated, incentive-backed foundation Lesson 17 described — the
specific contract interfaces change faster than the underlying problem
does.

## Key terms

| Term | Meaning |
|---|---|
| `checkUpkeep` / `performUpkeep` | Automation's two-function pattern: simulate off-chain, execute on-chain when true |
| DON | Decentralized Oracle Network — the nodes that execute a Functions request independently |
| Chainlink Runtime Environment (CRE) | Chainlink's current platform, superseding both Automation and Functions |
| Threshold encryption | How Functions let source code use a secret (like an API key) without exposing it on-chain |

## Check yourself

You're ready for Lesson 20 when you can explain: why does `performUpkeep`
re-check its own condition instead of trusting that `checkUpkeep`'s
off-chain simulation is still accurate by the time it executes?
