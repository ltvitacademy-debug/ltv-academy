# Lesson 12 — Amazon S3 Governance · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE CARD

Amazon S3 Governance — three layers: Object Ownership, bucket policies, and Block
Public Access.

## S2 · SCREENSHOT (object ownership)

S3 originally used per-object ACLs, separate from IAM. AWS has moved decisively away
from them — ACLs disabled, bucket owner enforced, is now the recommended default for
every new bucket. Access runs through policies only.

## S3 · SCREENSHOT (block public access, bucket level)

Block Public Access is deliberately blunt — four settings that override any policy
or ACL that would otherwise grant public access, without changing the policy itself.

## S4 · SCREENSHOT (block public access, account level)

The same four settings exist at the account level, and S3 always enforces whichever
combination is more restrictive. A bucket cannot opt back out of an account-wide block.

## S5 · CODE (bucket policy JSON)

A real two-statement bucket policy — one Allow scoped to a specific IAM role, and one
explicit Deny that blocks any non-TLS request for absolutely everyone, including the
bucket owner.

## S6 · OUTRO CARD

Next up: cloud data catalogs — once storage is locked down, how do people actually
find what's in it?
