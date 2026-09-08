# Lesson 3 — Digital Signatures & Public Key Cryptography

**Chapter 2 · Cryptography Basics · Lesson 3 of 3**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine.

## What you'll learn

- What a digital signature actually is
- The two-step process: signing, then verifying
- The real-world wax-stamp analogy the class uses
- The three things a digital signature actually proves

## A virtual fingerprint

A **digital signature** is a cryptographic way to prove that a message or
document was created by a specific person (**authenticity**) and that it
hasn't been changed since (**integrity**). The class's own description: a
digital signature is like a **virtual fingerprint for documents**.

![Live ChatGPT explanation on screen, alongside real lecture notes on signing and verification algorithms.](/courses/blockchain/ch02/03-digital-signatures-public-key-crypto/shot_1.png)
*Signing algorithms create the signature using the sender's private key; verification algorithms check it using the sender's public key.*

## How it actually works, step by step

1. **You create a hash** of your message — a digital summary (this is
   exactly the hashing you saw demonstrated live in Chapter 1, Lesson 3).
2. **You encrypt that hash using your private key.** The encrypted hash
   *becomes* your digital signature.
3. **Anyone with your public key can verify** that you signed it, and that
   the message hasn't been altered since.

This is precisely why Lesson 2's asymmetric cryptography matters here:
a digital signature genuinely couldn't exist without separate public and
private keys. Your private key is what only you hold and use to sign;
your public key is what anyone can use to check that signature.

## The real-world analogy

Imagine writing a letter and sealing it with a **unique wax stamp** that
only you own. Anyone who sees the stamp knows the letter came from you, and
that it hasn't been tampered with since it was sealed. That's exactly what
a digital signature does, online.

## What a digital signature actually proves

Three concrete things, each with its own real name:

| What it proves | Meaning |
|---|---|
| **Authentication** | Who actually sent the message |
| **Integrity** | Whether the message has been changed since it was signed |
| **Non-repudiation** | The sender can't later deny that they signed it |

That last one — non-repudiation — is genuinely important for blockchain
specifically: it's part of what makes a signed transaction legally and
practically binding. Once you've signed it with your private key, you can't
credibly claim later that you didn't.

## Key terms

| Term | Meaning |
|---|---|
| Digital signature | An encrypted hash, created with a private key, proving authorship and integrity |
| Signing algorithm | Creates the signature using the sender's private key |
| Verification algorithm | Checks the signature using the sender's public key |
| Non-repudiation | The sender can't deny having signed the message |

## Check yourself

You've finished Chapter 2 when you can explain, in your own words, the full
path from a plain message to a verified digital signature — hashing,
encrypting with a private key, and verifying with the matching public key.
