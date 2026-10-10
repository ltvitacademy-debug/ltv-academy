# Lesson 6 — Encryption and Monitoring Concepts

**Chapter 1 · Designing Security · Lesson 6 of 15**

## What you'll learn

- The general encryption vocabulary an architect needs before looking at any specific product: at rest vs. in transit, symmetric vs. asymmetric, and what a key actually is
- Why encryption is a confidentiality control, specifically, and not a substitute for authorization
- How "monitoring" as a concept (introduced in Lesson 4) relates to encryption as a concept — they solve different problems and neither replaces the other
- How this lesson sets up Chapter 2's two dedicated lessons: Platform Encryption specifics and Event Monitoring specifics

## Encryption: the vocabulary before the product

**Encryption** transforms readable data (plaintext) into unreadable data (ciphertext) using a mathematical algorithm and a **key**, such that only someone holding the correct key can reverse the transformation and get the plaintext back. A few distinctions matter before looking at any specific vendor's implementation:

- **Encryption at rest** protects data while it's stored — on disk, in a database, in a backup. **Encryption in transit** protects data while it's moving across a network, typically via TLS. A system can have one without the other, and an architect has to ask about both separately: data can be perfectly encrypted sitting in storage and still travel across the network in the clear if transit encryption wasn't separately configured, or vice versa.
- **Symmetric encryption** uses the same key to encrypt and decrypt. It's fast and is what's typically used for encrypting bulk data at rest. **Asymmetric encryption** uses a mathematically related key pair — a public key that can encrypt (or verify a signature) and a private key that can decrypt (or create a signature) — and is typically used for things like establishing a secure connection or verifying identity, rather than encrypting large volumes of stored data directly.
- **Key management** is the practice of generating, storing, rotating, and eventually destroying keys securely — and it's usually the hardest part of any encryption design, not the math. An encryption scheme is only as strong as the protection around its keys; an attacker who steals the key doesn't need to break the algorithm at all.

## Encryption protects confidentiality, not authorization

A common design mistake is treating encryption as if it were an access control. It isn't. Encryption protects **confidentiality of data at rest or in transit** — specifically, it protects data from someone who gets hold of the raw storage or the raw network traffic without having gone through the application's normal access path at all (a stolen hard drive, an intercepted network capture, a cloud provider's infrastructure being compromised below the application layer). It does nothing to stop a legitimately authenticated, legitimately authorized user from reading data through the normal application interface — that's exactly what Lesson 1's authorization boundaries (CRUD, sharing, field-level security) are for. An architect who encrypts a sensitive field but leaves it visible to every profile through normal FLS hasn't actually restricted who can see it day to day; they've only protected it from a narrower, different threat (someone bypassing the application entirely).

## Monitoring and encryption solve different problems

Lesson 4 introduced monitoring as "what's happening right now" versus auditing's "what changed." Encryption and monitoring are easy to lump together as "the technical security stuff," but they protect against genuinely different failure modes: encryption limits the damage *if* data is exposed outside normal access paths; monitoring tries to *detect* unusual access or activity happening through the normal paths, so a misuse of legitimate access doesn't go unnoticed. Neither substitutes for the other, and neither substitutes for the authorization layer from Lesson 3's table. A fully encrypted field with zero monitoring on who's querying it, and a fully monitored but unencrypted field, each leave a different gap uncovered.

## Where Chapter 2 picks this up

This lesson is deliberately general — none of it is Salesforce-specific yet, because the vocabulary needs to be solid before the next chapter gets concrete. Chapter 2 has two lessons that cash in this chapter's groundwork directly: **Data Protection: Platform Encryption Overview** takes this lesson's at-rest/key-management vocabulary and applies it to exactly how Salesforce Shield implements encryption, including its real, documented limitations. **Event Monitoring Overview** takes Lesson 4's monitoring concept and this lesson's "monitoring is not encryption" distinction and applies it to the real tools (Event Log Files, Event Log Objects, Real-Time Event Monitoring, Transaction Security Policies).

## Key terms

| Term | Meaning |
|---|---|
| Encryption at rest / in transit | Protecting stored data versus protecting data moving across a network |
| Symmetric / asymmetric encryption | Same key for encrypt+decrypt, versus a public/private key pair |
| Key management | Generating, storing, rotating, and destroying encryption keys securely |
| Confidentiality control | A control (like encryption) that protects data from exposure outside normal access paths — distinct from an authorization control |

## Lab

A company encrypts its customer Social Security numbers at rest using strong encryption, but every Service Agent profile in the org has Field-Level Security set to "Visible" on that field, and no monitoring is configured on who views or exports it. Explain, in writing, exactly what threat this configuration actually protects against, and exactly what threat it does *not* protect against — then propose the two additional controls (one from Lesson 1-3's authorization layers, one from Lesson 4's monitoring layer) that would close the gap.

## Check yourself

Can you explain, without naming a specific product, the difference between encryption at rest and encryption in transit, and why an architect has to verify both separately? Can you explain why encrypting a field does not, by itself, restrict which users can see that field's value through the normal application?
