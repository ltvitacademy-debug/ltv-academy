# Lesson 19 — Symmetric vs. Asymmetric Encryption

**Chapter 5 · Authentication, Access Control & Cryptography Basics · Lesson 19 of 32**

## What you'll learn

- How symmetric encryption works: one shared key encrypts and decrypts, and why that
  makes it fast
- How asymmetric encryption works: a mathematically linked public/private key pair,
  and why that makes it slower
- The real key-exchange problem symmetric encryption has, and why it's a genuine
  problem, not a theoretical one
- How the two are actually combined in practice — specifically how TLS, the
  encryption behind HTTPS, uses both together

## Symmetric encryption: one key, both directions

**Symmetric encryption** uses a single shared key to both encrypt and decrypt data.
Whoever holds that key can lock the data and whoever holds a copy of the same key can
unlock it — there's only one key involved, used both ways. **AES** (Advanced
Encryption Standard) is the real-world standard here, used to encrypt everything from
files on a hard drive to database columns to the bulk of the traffic inside a TLS
connection. Symmetric encryption is computationally cheap, which is why it's fast
enough to encrypt large amounts of data — gigabytes of disk or a live video stream —
without a noticeable performance hit.

## The key-exchange problem

Symmetric encryption has one hard, practical problem: both sides need the *same*
secret key before they can communicate securely, but how do you get that key to the
other side in the first place, over a network an attacker might already be watching?
If you just send the key in plain text, anyone intercepting that message now has it
too, and your entire encrypted channel is worthless. This is the **key-exchange
problem**, and it's exactly the problem that led to the invention of asymmetric
encryption.

## Asymmetric encryption: a public/private pair

**Asymmetric encryption** uses two mathematically linked keys instead of one: a
**public key**, which can be shared with literally anyone, and a **private key**,
which never leaves its owner's possession. Data encrypted with the public key can
only be decrypted with the matching private key. **RSA** is the classic real-world
example of this approach. Because the public key can be handed out openly — posted on
a website, emailed, anything — there's no secret that has to travel anywhere in the
clear. The trade-off is speed: the math behind asymmetric encryption is far more
computationally expensive than symmetric encryption, so it's too slow to encrypt large
volumes of data on its own.

## How they're actually combined: TLS

In practice, almost nobody chooses one or the other — real systems use both together,
each for what it's good at. **TLS**, the protocol behind the padlock icon in a
browser and the "S" in HTTPS, uses asymmetric encryption briefly during the initial
handshake to securely exchange a freshly generated symmetric key (the **session
key**), then switches to fast symmetric encryption, using that session key, for the
rest of the connection. Asymmetric encryption solves the key-exchange problem once,
at the start; symmetric encryption does the actual heavy lifting of encrypting every
page, image, and request for the rest of the session.

## A simple way to picture it

Think of the public key as a padlock anyone can snap shut, but only the matching
private key can open. Your browser uses that padlock to safely hand the website a
symmetric session key without anyone watching the network being able to read it. From
that point forward, both sides just use the fast shared key.

## Key terms

| Term | Meaning |
|---|---|
| Symmetric encryption | One shared key both encrypts and decrypts; fast; e.g. AES |
| Asymmetric encryption | A public/private key pair; slower; e.g. RSA |
| Key-exchange problem | The challenge of safely sharing a symmetric key over an untrusted network |
| Session key | A temporary symmetric key, exchanged via asymmetric encryption, used for the rest of a TLS connection |

## Check yourself

Why does TLS bother using slow asymmetric encryption at all, instead of just using
fast symmetric encryption the whole way through?
