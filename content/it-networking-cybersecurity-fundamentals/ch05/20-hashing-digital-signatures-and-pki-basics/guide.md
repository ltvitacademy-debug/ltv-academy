# Lesson 20 — Hashing, Digital Signatures, and PKI Basics

**Chapter 5 · Authentication, Access Control & Cryptography Basics · Lesson 20 of 32**

## What you'll learn

- How hashing works: a one-way function producing a fixed-length output, like
  SHA-256, and why it can never be reversed back into the original data
- The two real jobs hashing does — storing passwords safely and verifying that data
  hasn't been tampered with
- How a digital signature is actually built from a hash and a private key, and what
  it proves
- The basics of PKI: certificate authorities, public key certificates, and the trust
  chain that makes HTTPS work

## Hashing: one-way, fixed-length, never reversible

A **hash function** takes any input — a password, a file, an entire disk image — and
produces a fixed-length string of characters called a **hash** or **digest**. Feed it
the same input twice and you get the exact same hash both times. Change even a single
character of the input and the hash comes out completely different. Critically,
hashing is a **one-way** function: there is no mathematical operation that takes a
hash and recovers the original input from it. That's by design, not a limitation.
**SHA-256** is the real-world standard algorithm most commonly used today, always
producing a 256-bit output no matter how large or small the input is.

## What hashing is actually used for

**Password storage**: a well-built system never stores your actual password. It
stores the *hash* of your password. When you log in, the system hashes what you typed
and compares that new hash to the one on file — if they match, you typed the right
password, but the real password itself was never saved anywhere. This is exactly why
a database breach that exposes password hashes doesn't automatically hand attackers
working passwords (though weak, guessable passwords can still be cracked by hashing
huge lists of guesses and comparing).

**Integrity checks**: hashing also proves a file hasn't been altered. If a vendor
publishes a file's SHA-256 hash alongside a download, you can hash the file you
actually received and compare it to the published value — any mismatch, even a single
flipped bit, means the file was corrupted or tampered with in transit.

## Digital signatures: proof of authenticity and integrity

A **digital signature** combines hashing with asymmetric encryption to prove two
things at once: that a message really came from the claimed sender, and that it
hasn't been altered since. The sender hashes the message, then encrypts that hash
with their **private key** — producing the signature. Anyone holding the sender's
public key can decrypt the signature back into the hash, independently hash the
message themselves, and compare the two. If they match, the message is authentic
(only the private-key holder could have produced that signature) and unaltered (any
change to the message would produce a different hash entirely).

## PKI: the trust chain behind HTTPS

A public key by itself has a problem: how do you know a given public key really
belongs to the website or person claiming it? **Public Key Infrastructure (PKI)**
solves this with **certificate authorities (CAs)** — trusted organizations that issue
**digital certificates** binding a public key to a verified identity, and sign that
certificate with their own private key. Your browser ships with a built-in list of
trusted root CAs. When you visit an HTTPS site, it presents a certificate signed
(directly or through intermediates) by one of those trusted roots, letting your
browser verify the chain of trust back to a root it already trusts — without ever
having met the site before. That verified chain is exactly what the padlock icon in
the address bar represents.

## Key terms

| Term | Meaning |
|---|---|
| Hash | A fixed-length, one-way output of a hash function, e.g. SHA-256 |
| Digital signature | A hash encrypted with a private key, proving authenticity and integrity |
| Certificate authority (CA) | A trusted organization that issues digital certificates binding a public key to an identity |
| Chain of trust | The verified path from a site's certificate back to a root CA the browser already trusts |

## Check yourself

If a password database is breached and attackers only get the password *hashes*, why
isn't that the same as the attackers getting everyone's actual passwords?
