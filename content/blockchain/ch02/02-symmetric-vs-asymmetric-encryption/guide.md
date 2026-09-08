# Lesson 2 — Symmetric vs. Asymmetric Encryption

**Chapter 2 · Cryptography Basics · Lesson 2 of 3**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine.

## What you'll learn

- The two real families of encryption used today
- What makes a system "symmetric"
- What makes a system "asymmetric," and why it uses multiple keys
- Real algorithm names you'll actually encounter: AES, DES, RSA

## Two real types of cryptography

There are two main types of encryption in use today: **symmetric
cryptography** and **asymmetric cryptography**. Both use keys to encrypt
and decrypt data — the real difference is *how many* keys, and *who* holds
them.

![The real lecture notes on screen: "Types of cryptography," defining symmetric and asymmetric encryption side by side.](/courses/blockchain/ch02/02-symmetric-vs-asymmetric-encryption/shot_1.png)
*A crypto system is symmetric when sender and receiver use the same key. It's asymmetric when they use different — some shared, some private — keys.*

## Symmetric cryptography

A crypto system is **symmetric** when each party — the sender and the
receiver — uses **the same key** to both encrypt and decrypt data. Two real
algorithms you'll encounter:

- **AES** — Advanced Encryption Standard
- **DES** — Data Encryption Standard

Both are symmetric systems, meaning whoever has the one shared key can both
lock and unlock the data.

## Asymmetric cryptography

**Asymmetric cryptography** uses multiple keys — some shared, some private.
The sender and receiver each hold different, asymmetrical keys. The most
common real example:

- **RSA** — named after its creators, **R**ivest, **S**hamir, and
  **A**dleman. It's one of the most widely used public-key encryption
  algorithms in the world.

## Which one is actually "more secure"?

Asymmetric systems are generally considered more secure, specifically
because of their use of private keys — nobody else needs to hold the key
that can decrypt your data. But the real, honest measure of a system's
strength isn't which family it belongs to; it's **key length and
complexity**. A weak asymmetric implementation can be beaten by a strong
symmetric one, and vice versa.

## Why this distinction actually matters for blockchain

Public-key (asymmetric) cryptography is specifically what makes wallets,
digital signatures, and identity on a blockchain possible — you'll see
exactly how in Lesson 3, when digital signatures are built directly on top
of this asymmetric key structure.

## Key terms

| Term | Meaning |
|---|---|
| Symmetric cryptography | The same key encrypts and decrypts data — e.g. AES, DES |
| Asymmetric cryptography | Different keys for sender and receiver — e.g. RSA |
| Key length and complexity | The real measure of a cryptographic system's actual strength |

## Check yourself

You're ready for Lesson 3 when you can explain, in your own words, why
asymmetric cryptography — with its separate keys — is specifically what
makes something like a digital signature possible, in a way symmetric
cryptography alone couldn't.
