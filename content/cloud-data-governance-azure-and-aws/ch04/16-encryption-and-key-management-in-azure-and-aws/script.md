# Lesson 16 — Encryption and Key Management in Azure and AWS · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE CARD

Encryption and Key Management in Azure and AWS — Chapter Four begins. Encryption at
rest is now the default in both clouds. Key management is where the real decisions live.

## S2 · SCREENSHOT (Key Vault secret hidden)

A Key Vault secret's metadata is visible by default — created, updated, identifier.
The value itself isn't. Revealing it is a separate, explicit, logged action.

## S3 · SCREENSHOT (Key Vault secret shown)

After Show Secret Value, the plaintext appears. Same two-step principle behind
Always Encrypted: separate who can see a secret exists from who can see what's in it.

## S4 · SCREENSHOT (KMS key details)

AWS KMS organizes a key's cryptographic configuration across four dimensions — key
type, origin, key spec, and key usage. Those four fields are the real governance
decisions, not the key's numeric value.

## S5 · STEPS (three tiers)

Both clouds converge on the same three tiers: platform-managed, with no visibility.
Service-managed, visible but not controlled. And customer-managed — the tier you
can rotate, restrict, and revoke yourself.

## S6 · OUTRO CARD

Next up: cloud security and compliance frameworks — why key custody specifically
keeps coming up in audits.
