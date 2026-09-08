# Lesson 3 — Hashing & Cryptographic Security

**Chapter 1 · Blockchain Foundations · Lesson 3 of 5**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine — including a live, on-screen hash demo.

## What you'll learn

- What a hash actually is, demonstrated live
- Why even a single-character change produces a totally different hash
- What "genesis block" and "nonce" mean
- How hashing is what actually makes a blockchain tamper-resistant

## What is a hash?

A **hash** is a digital fingerprint of data. A hash function takes any
input — a sentence, a file, a transaction — and turns it into a fixed-length
string of numbers and letters. Even a tiny change to the input produces a
**completely different** hash.

![Live ChatGPT lookup on screen during class: "What is a Hash (in Blockchain)?"](/courses/blockchain/ch01/03-hashing-cryptographic-security/shot_hash_demo1.png)
*A hash is used to identify data (transactions or blocks), keep data secure, and link blocks together — each block points to the hash of the one before it.*

The class's own analogy: think of a hash like sealing a letter with a unique
wax stamp. If someone tampers with the letter afterward, the stamp will no
longer match. That's exactly how a blockchain knows if anything's been
altered.

## Seeing it live

Rather than just describing hashing, the class actually demonstrates it —
typing real text into a live hash-generator tool and watching the output
change in real time:

![The instructor's live hash-generator tool, showing an encrypted output for a typed sentence during class.](/courses/blockchain/ch01/03-hashing-cryptographic-security/shot_hash_demo2.png)
*The specific algorithm used here is SHA-256 — "secure hashing algorithm," 256 bits. Change even one character of the input, and the entire hash output changes.*

The demo makes the point concretely: typing "hello class. This is an
example" and then removing just the period produces a hash with **nothing**
in common with the original. Even changing a single letter's capitalization
does the same thing. That sensitivity to the smallest possible change is
precisely what makes hashing useful for security — there's no way to make a
small, sneaky edit to confirmed data without the hash immediately giving it
away.

## Genesis block and nonce

Two more real terms that come directly out of the live demo:

- **Genesis block** — the first block in a blockchain. Nothing more
  complicated than that; it's just block number one, and it's the only
  block that can exist without a block before it.
- **Nonce** — literally "**n**umber **o**nly used **once**." You'll see this
  term again when this course covers mining and proof of work — it's the
  value miners are actually searching for when they "solve" a block.

## Why this is the real foundation of blockchain security

Every block in a chain includes both a hash of its own data *and* the hash
of the block before it. That's the actual mechanism behind "the chain" from
Lesson 1: if anyone tries to change even one historical block, that block's
hash changes, which breaks the link to every block that came after it — and
that break is visible to every single copy of the ledger on the network
simultaneously.

## Key terms

| Term | Meaning |
|---|---|
| Hash | A fixed-length digital fingerprint generated from any input data |
| SHA-256 | The specific hashing algorithm most commonly referenced in this course |
| Genesis block | The first block in a blockchain — block number one |
| Nonce | "Number only used once" — the value miners search for in proof-of-work mining |

## Check yourself

You're ready for Lesson 4 when you can explain, in your own words, why
changing a single character in a block's data would be immediately obvious
to the rest of the network.
