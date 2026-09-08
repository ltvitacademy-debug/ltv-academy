# Lesson 2 — PGP: Public Key Cryptography in the Real World

**Chapter 3 · Bitcoin Deep Dive · Lesson 2 of 2**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine.

## What you'll learn

- What PGP actually is, and why it matters beyond blockchain
- How to generate a real public/private key pair
- How encrypting and decrypting actually works, step by step
- How signing and verifying works outside of a blockchain context

## Public key cryptography, outside of blockchain

**PGP — Pretty Good Privacy** — is a real, widely used encryption program
that predates blockchain entirely, and it's genuinely one of the most
popular real-world applications of public and private keys. It mixes
symmetric and asymmetric cryptography (Chapter 2, Lesson 2) to secure
emails and files, ensuring confidentiality, authenticity, and integrity.

## Generating a real key pair, live

The class demonstrates the actual process, live:

![A live PGP key-generation tool: entering a name and email, then generating a private/public key pair with download options.](/courses/blockchain/ch03/02-pgp-public-key-crypto-real-world/shot_pgp2.png)
*Enter a name and email, generate a new key pair, and you get both a private key block and a public key block — each downloadable, each clearly labeled.*

Notice the block headers: a private key literally starts with "BEGIN PGP
PRIVATE KEY BLOCK," and a public key with "BEGIN PGP PUBLIC KEY BLOCK." Both
are just long strings of numbers, letters, and characters — the same
underlying idea as a blockchain wallet's keys, just formatted differently.

## Encrypting and decrypting

The real flow, demonstrated step by step:

1. **Import the recipient's public key.**
2. **Write a message** and encrypt it. The output is wrapped in "BEGIN PGP
   MESSAGE" / "END PGP MESSAGE" — unreadable to anyone without the matching
   private key.
3. **To decrypt**, the recipient imports the encrypted block and their own
   private key, and gets the original plain message back.

One correction the instructor makes live, worth remembering exactly because
it's an easy mix-up: **encrypting a message uses the recipient's public
key. Decrypting it requires the recipient's own private key.** It's the
opposite direction from signing.

## Signing and verifying, the PGP way

This is the same mechanism from Lesson 1, in a non-blockchain context:

1. **Import your own private key** and enter your passphrase.
2. **Sign your text.** You get back a "BEGIN PGP SIGNED MESSAGE" block — the
   original text, plus a signature that's a hash representation of that
   exact message (using SHA-256, the same algorithm from Chapter 1).
3. **To verify**, import the signer's *public* key and check the signed
   message. If it's valid, you know exactly who signed it — and that the
   text hasn't been altered since.

## Why this lesson matters

PGP proves that everything Chapter 2 and Lesson 1 covered isn't a
blockchain-only trick — public/private key pairs, signing, and encryption
are a general-purpose real-world technology, and blockchain is simply one
particularly well-known application of it.

## Key terms

| Term | Meaning |
|---|---|
| PGP (Pretty Good Privacy) | A real-world encryption program combining symmetric and asymmetric cryptography |
| Encrypt (PGP) | Done with the *recipient's* public key |
| Decrypt (PGP) | Done with the *recipient's own* private key |

## Check yourself

You're ready for the rest of this chapter's real Bitcoin history when you
can explain, in your own words, why encrypting uses the recipient's public
key, while signing uses your own private key — two genuinely different
directions for two genuinely different purposes.
