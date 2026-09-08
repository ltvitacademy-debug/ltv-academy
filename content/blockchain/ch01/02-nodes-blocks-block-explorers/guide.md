# Lesson 2 — Nodes, Blocks & Block Explorers

**Chapter 1 · Blockchain Foundations · Lesson 2 of 5**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Savvada Wilson.

## What you'll learn

- What a node actually is, and the three real tiers of nodes
- What a block is, and how "block height" is measured
- What a block explorer is, and which ones are actually used
- Why blockchains tier their nodes at all

## Nodes: the network's actual holders of information

A **node** is an object on the network that stores and transmits
information. In the context of a blockchain, a node is both a holder of
information and a beacon of information — it keeps a copy of the ledger and
helps broadcast transactions to the rest of the network.

Nodes aren't all the same. There are genuinely three real tiers:

| Node type | What it stores | Real-world example |
|---|---|---|
| **Snapshot / light node** | Just enough to connect and broadcast transactions | A wallet app like MetaMask |
| **Full node** | More detail than a snapshot node | Standard network participant |
| **Archive node** | The most detail — full historical, empirical transaction data | Used for research, trading advantage |

Each tier stores a different size and level of detail of the transactions
sent across the chain. That tiering isn't arbitrary — it's a direct result
of calculations about **scalability**: every transaction costs money, since
miners and verifiers have to be rewarded for confirming it, so storing every
last detail on every single node everywhere would make the network far more
expensive to run.

## Blocks and block height

A **block** is a data structure that stores the collection of transactions
that occurred within it. Blocks are indexed by integers, starting from
**zero — the genesis block** — and counting up from there.

**Block height** is simply the last recorded value for how many blocks have
been produced on a chain so far — effectively, how long the blockchain has
been running.

## Block explorers: the front end for the ledger

A **block explorer** is a website that acts as the user interface for
scraping a blockchain and looking up real transaction data. Two real,
commonly used examples:

- **EtherScan** — for Ethereum specifically.
- **Bitquery** — supports multiple chains at once (Ethereum, Bitcoin, Bitcoin
  Cash, Solana).

Different explorers are built by different third parties, but they're all
consistent in one respect: they exist to let anyone view the ledger. Getting
comfortable navigating a block explorer pays off constantly — for research,
for checking a transaction's status, or just for studying real examples of
smart contract code that's already live on-chain.

## Why this matters before you touch any code

Everything later in this course — deploying a contract, verifying it,
debugging a failed transaction — happens through the lens of nodes, blocks,
and block explorers. This is the vocabulary the rest of the course is built
on.

## Key terms

| Term | Meaning |
|---|---|
| Node | A network participant that stores and transmits ledger data |
| Genesis block | The first block in a blockchain — block zero |
| Block height | The count of blocks produced so far on a chain |
| Block explorer | A website used to look up real transactions and ledger data |

## Check yourself

You're ready for Lesson 3 when you can explain, in your own words, why a
snapshot node (like a wallet app) doesn't need to store as much data as an
archive node.
