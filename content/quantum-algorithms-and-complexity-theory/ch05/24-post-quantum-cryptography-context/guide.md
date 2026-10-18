# Post-Quantum Cryptography: Context

If breaking RSA-2048 today is genuinely impractical, as Lesson 23 established, why is the cryptography world already migrating away from RSA? This lesson answers that honestly: the migration isn't a reaction to an imminent threat, it's a proactive response to a specific, well-understood risk and a very long lead time.

## What you'll learn

- The "harvest now, decrypt later" threat model and why it matters even if quantum computers aren't ready yet
- Why migrating global cryptographic infrastructure takes a long time, independent of when the threat arrives
- NIST's standardized post-quantum algorithms: ML-KEM, ML-DSA, and SLH-DSA
- The conceptual basis of lattice-based cryptography and why it resists Shor's algorithm

## "Harvest now, decrypt later"

Encrypted data captured and stored today doesn't need to be decrypted today to be a problem later. An adversary can record RSA-encrypted traffic now — intercepted and archived, not decrypted — and simply wait. If a sufficiently capable quantum computer exists at any point in the future, decades from now if necessary, that stored data can be decrypted retroactively. For information with a long shelf life — state secrets, medical records, long-term financial records, infrastructure credentials — "it's safe for the next few years" isn't the right bar. The right bar is "is it safe for as long as this data needs to stay confidential," which can be a much longer window than the time until practical quantum computers arrive.

## The lead-time problem

Separately from harvest-now-decrypt-later, migrating cryptographic standards across the world's actual computing infrastructure is a slow process by nature. It requires new standards to be agreed upon, software libraries to implement them, hardware in some cases to support them efficiently, and an enormous installed base of existing systems — browsers, operating systems, embedded devices, financial systems, government systems — to actually adopt the new standards, often one update cycle at a time. Historically, cryptographic migrations of this scale have taken years to over a decade to substantially complete. Waiting until a quantum threat is imminent to start that migration would mean the migration finishes too late relative to the harvest-now-decrypt-later risk above. That's the actual logic behind migrating now, even while Lesson 23's conclusion (not practical today) remains true.

## NIST's post-quantum standards

The U.S. National Institute of Standards and Technology (NIST) ran a multi-year public competition to select and standardize cryptographic algorithms believed to resist attacks from quantum computers, concluding its initial round of standards in 2024. The named standards are:

- **ML-KEM** (based on CRYSTALS-Kyber) — a key encapsulation mechanism, used for securely establishing shared secret keys
- **ML-DSA** (based on CRYSTALS-Dilithium) — a digital signature algorithm, used for authenticating messages and identities
- **SLH-DSA** (based on SPHINCS+) — a hash-based digital signature algorithm, offered as a structurally different alternative to ML-DSA in case weaknesses are later found in lattice-based approaches

These are real, named, standardized algorithms — not proposals — and they are the specific replacements organizations are migrating toward in place of RSA and elliptic-curve cryptography for the operations those algorithms cover.

## Why lattice-based cryptography resists Shor's algorithm

ML-KEM and ML-DSA are both built on **lattice-based cryptography**, whose security rests on problems like **Learning With Errors (LWE)** — roughly, the difficulty of recovering a hidden vector from a system of linear equations that has had small, deliberate random noise added to each equation. Without the noise, the problem would be easy linear algebra. With it, no known algorithm — classical or quantum — can efficiently recover the hidden vector for well-chosen parameters, as far as current cryptanalysis has found. This is the key structural difference from RSA: Shor's algorithm's speedup comes from exploiting periodic structure (the period-finding reduction from Lessons 21–22) that factoring and discrete-log problems happen to have. The Learning With Errors problem doesn't have that same periodic structure for Shor's approach to exploit, which is why it's currently believed — though, as with all cryptographic hardness assumptions, not proven with mathematical certainty — to remain hard even for quantum computers.

## Key terms

| Term | Meaning |
|---|---|
| Harvest now, decrypt later | The risk that encrypted data captured today could be decrypted retroactively once capable quantum computers exist |
| ML-KEM (CRYSTALS-Kyber) | NIST-standardized post-quantum key encapsulation mechanism, lattice-based |
| ML-DSA (CRYSTALS-Dilithium) | NIST-standardized post-quantum digital signature algorithm, lattice-based |
| SLH-DSA (SPHINCS+) | NIST-standardized hash-based signature algorithm, a structurally different backup to lattice-based ML-DSA |
| Learning With Errors (LWE) | The lattice problem underlying ML-KEM/ML-DSA's hardness; believed hard even for quantum computers |

## Check yourself

Explain why "RSA-2048 is not practically breakable today" (Lesson 23) and "organizations should migrate to post-quantum cryptography now" (this lesson) are both true statements at the same time, rather than contradicting each other.
