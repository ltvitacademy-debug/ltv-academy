# Lesson 17 — The Oracle Problem

**Chapter 4 · Oracles & External Data · Lesson 17 of 24**

## What you'll learn

- Why a smart contract can't call an external API directly, by design
- What "the oracle problem" specifically refers to
- Why a single, trusted data feed recreates the centralization smart contracts avoid
- The shape of the fix: decentralized, incentive-aligned data delivery

## Determinism cuts both ways

Lesson 14 required subgraph mapping handlers to be deterministic — every
indexer must compute the same result from the same input. That same
requirement applies to every node validating the Ethereum network itself,
for the same reason: if one validator's execution of a contract could
produce a different result than another's, the network couldn't agree on
the chain's state at all. Consensus *requires* determinism.

An HTTP call is the textbook example of something non-deterministic. Call
a weather API, a stock price endpoint, or a sports score feed at the
exact same block from two different nodes, and you might get two
different answers — the API could be down for one node and not the
other, return different data on a race condition, or simply change
between the two calls. That's exactly the class of operation Lesson 14
banned inside a mapping handler, and it's banned inside the EVM for the
identical reason: **a smart contract cannot make an HTTP request.**
There is no `fetch()` opcode, and there never will be, because it would
break consensus.

## Why this is a real problem, not a footnote

This isn't an edge case — most of what makes smart contracts
economically useful depends on external data. A lending protocol needs
to know an asset's price to determine if a position is undercollateralized.
An insurance contract needs to know whether a flight was delayed. A
prediction market needs to know who won an election. None of that
information originates on-chain, and none of it can be fetched by the
contract itself. Something has to get real-world data onto the chain in
a form a contract can read — and that something is called an **oracle**.

## The naive fix recreates the problem smart contracts exist to avoid

The simplest possible oracle is: one trusted server watches an API and
pushes the value on-chain in a transaction. That works technically — and
it's also a single point of failure and a single point of trust,
functionally identical to trusting one company's API in the first place.
If that one server is compromised, offline, or simply lies, every
contract depending on its data inherits that failure directly. A lending
protocol whose liquidation logic depends on one server's honesty hasn't
actually removed a trusted intermediary — it's just renamed it.

```
Naive oracle:
  one server  →  watches an API  →  pushes one value on-chain

Single point of: failure, trust, and manipulation
```

That gap — between "data has to get on-chain somehow" and "trusting one
source to do it defeats the purpose of a smart contract" — is **the
oracle problem**, and it's the specific problem Chainlink exists to
solve.

## The shape of the real fix

A real fix needs the same properties blockchain consensus itself relies
on: no single party's failure or dishonesty should corrupt the result.
Concretely, that means multiple independent nodes retrieving the data
independently, those nodes aggregating their answers (so one bad or
malicious response gets outvoted or averaged out), and an economic
incentive structure where lying or failing to deliver costs the node
real money. The next three lessons cover exactly how Chainlink implements
that: price feeds, Automation, and Functions.

## Key terms

| Term | Meaning |
|---|---|
| Determinism | The requirement that every node computes the same result from the same input |
| Oracle | A system that delivers off-chain data on-chain in a form a contract can use |
| The oracle problem | The gap between needing external data and trusting one source to deliver it safely |
| Single point of trust | A naive oracle design where one party's honesty determines every dependent contract's correctness |

## Check yourself

You're ready for Lesson 18 when you can explain: why can't the fix for
the oracle problem just be "run the API call off-chain and have a
contract trust whatever value shows up" — what specifically is still
missing from that description?
