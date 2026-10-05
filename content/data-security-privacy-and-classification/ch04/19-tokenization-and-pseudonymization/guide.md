# Lesson 19 — Tokenization and Pseudonymization

**Chapter 4 · Protecting Data · Lesson 19 of 30**

## What you'll learn

- What tokenization is, and why a token is not an encrypted value
- What pseudonymization is, and how it differs from both tokenization and anonymization
- The vault/mapping-table pattern both techniques depend on
- When to reach for tokenization or pseudonymization instead of masking or encryption

## Tokenization: a stand-in with no mathematical relationship to the original

**Tokenization** replaces a sensitive value with a **token** — a substitute value that has no mathematical relationship to the original. A real credit card number, `4111 1111 1111 1111`, might be replaced everywhere in a system with a token like `TOK-9f3e2a71`. Critically, you cannot derive the original card number from the token through any computation, the way you could (in principle, if you had the key) decrypt an encrypted value back to plaintext. The only way to get from the token back to the real value is to look it up in a separate, tightly controlled system: the **token vault**.

This is the key difference from encryption (Lesson 20): an encrypted value is mathematically reversible with the right key — the ciphertext itself still encodes the original data. A token is not reversible through computation at all — it's an arbitrary reference that means nothing without the vault's lookup table. That makes tokenization attractive for data (like credit card numbers) that flows through many systems: the token can travel through logs, applications, and third-party integrations with effectively zero value to anyone who intercepts it, because there's nothing to crack.

## Pseudonymization: a reversible, structured substitute

**Pseudonymization** replaces direct identifiers (a name, a specific customer ID) with a consistent substitute — a **pseudonym** — according to a defined method, while keeping a separate mapping that can reverse the substitution if someone with proper authorization needs to. `Customer 48213` might consistently become `Patient-X92` throughout a research dataset. Unlike tokenization (which is usually about one isolated value, like a card number), pseudonymization is typically applied across a whole record or dataset, specifically so analysts can still work with patterns and relationships in the data (patient X92 shows up five times across different tables, consistently) without seeing who the real person is.

This directly supports **privacy by design** (covered earlier in this course) and underpins GDPR's own distinction: GDPR treats pseudonymized data as still personal data (because it's reversible with the mapping), but recognizes pseudonymization as a risk-reducing safeguard precisely because reversal requires a separate, protectable mapping table rather than being inherent in the data itself.

## Pseudonymization vs. anonymization

These two terms get conflated constantly, and the distinction matters legally, not just technically. **Anonymization** removes the ability to re-identify someone *at all* — done correctly, there's no mapping to reverse, which is why genuinely anonymized data generally falls outside regulations like GDPR entirely. **Pseudonymization** is reversible by design, for someone holding the mapping — which is exactly why it still counts as personal data under most privacy regulations, just a lower-risk form of it. If you can get back to the original value by any legitimate path, it's pseudonymization, not anonymization, no matter how the substitute value looks.

## The shared dependency: protect the vault or the mapping

Both techniques only hold up if the vault (for tokenization) or the mapping table (for pseudonymization) is itself protected with the same rigor as the sensitive data it stands in for — access-controlled (Chapter 3), audited, and ideally encrypted at rest (Lesson 20). A tokenization scheme with an unsecured vault, or a pseudonymization mapping sitting in an unprotected spreadsheet, provides no real protection at all — it just relocates the sensitive data to a second place that now also needs defending.

## Key terms

| Term | Meaning |
|---|---|
| Tokenization | Replacing a sensitive value with a substitute (token) with no mathematical relationship to the original, reversible only via a vault lookup |
| Token vault | The tightly controlled system that maps tokens back to their real values |
| Pseudonymization | Replacing identifiers with a consistent substitute according to a defined, reversible method, via a separate mapping |
| Anonymization | Removing the ability to re-identify someone at all, with no mapping to reverse |

## Lab

Take a short list of five fictional customer records (name, ID, and one sensitive detail). Pseudonymize the names consistently (e.g., Customer 1, Customer 2...), keeping a separate mapping on paper. Then describe, in one sentence, what would have to happen for that dataset to become truly anonymized instead — and why that's a materially bigger step than what you just did.

## Check yourself

- Why can't you mathematically derive a credit card number back from its token, the way you could decrypt an encrypted value?
- Explain why pseudonymized data is still considered personal data under GDPR, while anonymized data generally is not.
