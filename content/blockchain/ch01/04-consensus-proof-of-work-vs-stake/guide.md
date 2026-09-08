# Lesson 4 — Consensus: Proof of Work vs. Proof of Stake

**Chapter 1 · Blockchain Foundations · Lesson 4 of 5**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Savvada Wilson.

## What you'll learn

- What a consensus algorithm actually does
- The double-spend attack it exists to prevent
- How Proof of Work (Bitcoin) really works
- How Proof of Stake (Ethereum) genuinely differs from it

## What a consensus algorithm actually does

A **consensus algorithm** determines the finality of transactions sent on
the blockchain — it's how the network agrees, collectively, that a
transaction actually happened and can't be undone.

Without a strong consensus algorithm, a real attack becomes possible: the
**double-spend attack**. Imagine sending a transaction that spends $10 —
once it's finalized, your balance should reflect that. But with weak
consensus, you could send a *second* transaction using money you no longer
actually have. A real consensus algorithm is what makes that impossible.

## Proof of Work: Bitcoin's approach

Proof of Work involves two real kinds of participants:

- **Nodes** — participants who allow others to connect, perform remote
  procedure calls, and broadcast signed transactions.
- **Miners** — participants whose job is to solve a random function pushed
  to the network.

Once a miner finds the correct answer, they earn rewards in the form of
newly minted Bitcoin, plus transaction fees. Solving that function is also
what lets the miner push all the transactions they've seen into a finalized
block — which is the literal mechanism by which blocks get produced under
Proof of Work.

## Proof of Stake: Ethereum's approach

On a Proof of Stake chain, blocks aren't "produced" by solving a function —
they're **verified** by validators. The core mechanics are genuinely
different:

| | Proof of Work | Proof of Stake |
|---|---|---|
| Who confirms transactions | Miners | Validators |
| What they do | Solve a random function | Verify and vote |
| What determines influence | Computing power | Amount of ether staked |
| Block creation | "Produced" by the winning miner | "Verified" by validators |

Validators vote on which transactions get committed to each block, weighted
by how much they've staked. Some people call this unfair since bigger
stakers get more influence — but the selection process is arbitrary enough,
in practice, to stay consistently fair.

## A real wrinkle: Flashbots and MEV

One more real detail worth knowing: services like **Flashbots** let someone
bribe the block producer in the Ethereum network to include their
transaction in a specific position — an advantage useful for trading on a
decentralized exchange, or getting priority access to a hot NFT mint before
anyone else. This is part of what's called MEV (miner/maximal extractable
value), and it's a genuinely real dynamic in how transactions actually get
ordered on-chain.

## Key terms

| Term | Meaning |
|---|---|
| Consensus algorithm | Determines the finality of transactions on a blockchain |
| Double-spend attack | Spending the same funds twice due to weak consensus |
| Miner (PoW) | Solves a random function to produce blocks and earn rewards |
| Validator (PoS) | Verifies transactions and votes on blocks, weighted by stake |
| Flashbots / MEV | Bribing a block producer for advantageous transaction ordering |

## Check yourself

You're ready for Lesson 5 when you can explain, in your own words, the real
difference between a miner "producing" a block and a validator "verifying"
one.
