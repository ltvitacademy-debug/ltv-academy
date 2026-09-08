# Lesson 1 — Signing & Verifying Blockchain Transactions

**Chapter 3 · Bitcoin Deep Dive · Lesson 1 of 2**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine — using a live, interactive blockchain demo tool.

## What you'll learn

- How signing and verifying actually works, with a live demo
- What a Coinbase transaction really is
- What's actually inside a real Bitcoin-style block
- Why the previous block's hash matters

## From theory to a real demo

Chapter 2 covered public/private keys and digital signatures conceptually.
This lesson makes it concrete, using a real interactive tool: type a
message, sign it with a private key, and verify it with the matching
public key — live, on screen.

The class demonstrates something worth noticing directly: **if you change
the signed message without changing anything else, verification fails.**
The signature was created for that exact message — nothing else.

## Applying it to a real transaction

The same signing mechanism scales up directly to an actual Bitcoin-style
transaction: "$20 sent from one public key to another." The sender signs
that message with their private key, producing a signature; anyone can then
verify it using the sender's public key.

## Inside a real block

The class then shows a real interactive block-mining tool, with every
genuine field a block actually contains:

![A live blockchain demo tool showing linked blocks with Nonce, Coinbase, transactions (From/To/Amount/Signature), Previous hash, and Hash fields, plus a Mine button.](/courses/blockchain/ch03/01-signing-verifying-transactions/shot_block.png)
*Every real field: the block number, a nonce, a Coinbase transaction, one or more signed transactions, the previous block's hash, and this block's own hash — with a live "Mine" button.*

A few real terms this demo makes concrete:

- **Coinbase** — the first transaction in a block. It's created by whoever
  mined that block, and it's how new coins actually enter circulation —
  notably, it has no inputs, unlike every transaction that spends existing
  funds.
- **Previous hash** — every block (except the very first) includes the
  hash of the block before it. That's the literal chain in "blockchain."
- **Mine** — clicking it recalculates the block's hash from its actual
  contents. Change *any* transaction inside the block, and re-mining
  produces a completely different hash — exactly the tamper-evidence
  Chapter 1's hashing lesson described, now visible on a real, working
  block.

## Why this matters

Every transaction inside a block carries its own signature, tied to a
specific private key. The block itself is also hashed as a whole, and
chained to the block before it via that previous hash. Change one signed
transaction, and the block's hash changes; change the block, and every
block after it stops matching. This is the real, working mechanism behind
everything Chapter 1 described conceptually.

## Key terms

| Term | Meaning |
|---|---|
| Coinbase transaction | The first transaction in a block, with no inputs, that mints new coins for the miner |
| Previous hash | The hash of the prior block, stored in the current block — the literal "chain" |
| Nonce | The value a miner adjusts while searching for a valid block hash |

## Check yourself

You're ready for Lesson 2 when you can explain, in your own words, why
changing a single transaction inside a block would change that block's
entire hash — and why that breaks the link to every block after it.
