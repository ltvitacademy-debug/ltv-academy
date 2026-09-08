# Lesson 1 — What Is a Blockchain?

**Chapter 1 · Blockchain Foundations · Lesson 1 of 5**

> This lesson is real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine.

## What you'll learn

- The "trust dilemma" that blockchain was actually invented to solve
- A working definition of blockchain, in plain language
- Why blocks are chained together the way they are
- That blockchain's real applications go far beyond cryptocurrency

## The trust dilemma

Before any technical definition, the class starts with a story — and it's worth
sitting with, because it's the actual reason blockchain exists.

Imagine a small town where people frequently exchange goods and money, but
**no one has a reliable record of these transactions**. Alice lends Bob $50.
Later, Bob claims he never received it. With no documentation, the dispute
comes down to word of mouth — and mistakes or dishonest behavior lead to real
conflict and real losses. The town needs someone, or something, trustworthy
to referee these transactions.

Historically, that referee has been a bank, a notary, or a government
institution — a centralized ledger-keeper. But centralized systems carry
their own real risk: they're vulnerable to fraud or manipulation, and the
whole system depends on trusting one entity (or a small group) to stay honest
and competent. If that trust breaks, the whole system can be subverted.

**This is the actual problem blockchain solves** — not "how do we invent a
new currency," but "how do we build trust without needing a single trusted
authority at all."

## A working definition

Once the story lands, the class puts a real definition on screen:

![Instructor's lesson-plan outline alongside a live definition lookup for "blockchain."](/courses/blockchain/ch01/01-what-is-a-blockchain/shot_definition_blockchain.png)
*At its simplest: a blockchain is a digital, decentralized ledger that
securely records transactions across a network of computers.*

Four ideas make that definition concrete:

| Idea | What it actually means |
|---|---|
| **Decentralized ledger** | No single bank or authority holds the record — every participant on the network holds their own copy. |
| **Blocks and chains** | Transactions are grouped into blocks; each block links to the one before it using cryptography, forming the "chain." |
| **Security and trust** | Because everyone holds an identical copy, and changes require network-wide consensus, altering a confirmed transaction becomes nearly impossible. |
| **Applications beyond money** | Bitcoin popularized blockchain, but the same idea underlies supply chain tracking, digital identity, and smart contracts. |

## Why "chain" is the right word

Each block doesn't just sit next to the one before it — it's **cryptographically
linked** to it. Changing anything in an old block would break that link, and
the break would be visible to every single copy of the ledger on the network.
That's precisely what makes tampering with a confirmed transaction so
impractical: you'd have to rewrite every block after it, on every copy,
simultaneously, without anyone noticing.

## A quick preview: cryptography

The blockchain definition leans on the word "cryptography," so the class
pauses to define that too, live:

![ChatGPT answering "what is cryptography at its simplest definition" on screen during the live class.](/courses/blockchain/ch01/01-what-is-a-blockchain/shot_definition_crypto.png)
*At its simplest: cryptography is the practice of hiding information so that
only the right people can read it — like a secret message only a friend with
the right key can decode.*

Notice the tool being used here: the instructor looks this up live with
ChatGPT, in front of the class. That's a genuinely useful habit to pick up
early — using AI tools to get a clean, simple definition on demand is exactly
the kind of workflow you'll rely on throughout this course.

Lesson 3 goes much deeper into cryptography and hashing specifically — this
is just enough to make today's definition make sense.

## Key terms

| Term | Meaning |
|---|---|
| Decentralization | No single party controls or holds the only copy of the ledger |
| Block | A group of transactions bundled together and sealed at a point in time |
| Chain | The sequence of blocks, each cryptographically linked to the one before it |
| Consensus | Network-wide agreement required before a change to the ledger is accepted |

## Check yourself

You're ready for Lesson 2 when you can explain, in your own words, why a
centralized ledger (like a single bank's records) is more vulnerable to
fraud than a blockchain — and why "the chain" specifically is what makes
tampering so difficult.
