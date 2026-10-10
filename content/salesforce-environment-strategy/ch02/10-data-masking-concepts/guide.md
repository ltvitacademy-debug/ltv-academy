# Lesson 10 — Data Masking Concepts

**Chapter 2 · Managing Environments · Lesson 10 of 14**

## What you'll learn

- What data masking is, and how it's different from encryption
- The masking approaches Salesforce's own Data Mask product uses
- Why masking is designed to be one-way — and what that means for sandbox refreshes
- Where masking fits in a sandbox's lifecycle, relative to refresh
- The trade-off masking makes between realism and risk reduction

## Masking vs. encryption

Lesson 9 ended on a specific problem: Partial Copy and Full sandboxes carry real sensitive data, and sandbox access controls are often looser than production's. **Data masking** is the standard architectural answer — permanently replacing sensitive field values in a non-production environment with different, realistic-looking values, so the environment is still useful for testing but no longer exposes anyone's actual personal data.

This is a genuinely different tool from encryption. Encrypted data is still the *real* data — scrambled, but mathematically recoverable by anyone holding the right key. Masked data is not the real data at all; once a value has been masked, there's no key, no computation, and no permission level that gets you back to the original value in that environment. That's deliberate: masking exists specifically for environments where no one — not even a sandbox's most privileged admin — should be able to see the real data, which is a stronger guarantee than encryption, which always has to permit decryption for someone.

## How Salesforce's Data Mask approaches this

Salesforce's own packaged solution for this, called **Data Mask**, is installed and configured against a production org and then run against sandboxes created from it, masking sensitive fields with a few different techniques depending on the field and the need:

- Replacing a value with realistic-looking fake data drawn from the product's own libraries, so a masked name still looks like a name and a masked address still looks like an address.
- Replacing a value with random characters, when realism matters less than simply making the original value unrecoverable.
- Deleting a field's contents entirely, for data that a particular test scenario doesn't actually need present at all.

Which technique fits depends on what the environment is actually testing: a UI walkthrough that needs to display something that *looks* like a real customer name benefits from realistic-looking substitution, while a performance test that just needs the field populated at all can use a cheaper random-replacement approach.

## Masking is deliberately one-way

A core design property of real masking tools is that the transformation can't be reversed — not through a weak implementation flaw, but by design, so that even compromising the masked environment entirely doesn't expose the original values. This has a direct, practical consequence for sandbox lifecycle planning: **masking has to be re-applied after every refresh**, because a refresh (Lesson 8) replaces the sandbox's contents with a fresh, unmasked copy from production. Masking isn't a one-time setup step; it's a recurring part of the refresh process itself, and an environment strategy that masks once and then refreshes repeatedly without re-masking has quietly reintroduced the exact exposure masking was supposed to close.

## The trade-off: realism vs. risk

Masking is itself a trade-off, not a free fix. The whole reason Partial Copy and Full sandboxes exist is realistic data for realistic testing (Lessons 5 and 6) — and masking necessarily changes that data, which can occasionally hide a bug that depended on a real value's actual characteristics (an oddly formatted real address that broke a validation rule, for instance, might not exist anymore once addresses are replaced with clean synthetic ones). A deliberate masking strategy accepts this small loss of fidelity in exchange for removing a much larger risk — real customer PII sitting exposed in an environment with weaker access controls than production.

## Key terms

| Term | Meaning |
|---|---|
| Data masking | Permanently replacing sensitive values in a non-production environment with realistic but fake ones |
| One-way transformation | A masking property ensuring the original value can't be recovered from the masked one, even with full access |
| Realistic-value substitution | Replacing a value with fake data that still looks and behaves like the real thing |

## Lab

A QA team masks their Full staging sandbox once, right after it's created, and then refreshes it monthly as part of their normal staging cadence (Lesson 8) without re-masking afterward. Three months later, a security review discovers real customer SSNs sitting unmasked in that sandbox. Explain exactly how this happened, tying your answer to the specific property of masking covered in this lesson, and state what the team's refresh process should have included from the start.

## Check yourself

Can you explain, in your own words, the difference between masking and encryption — specifically, why masking is a stronger guarantee against an admin who shouldn't see the real data? Can you explain why masking has to be re-applied after every sandbox refresh, rather than being a one-time setup task?
