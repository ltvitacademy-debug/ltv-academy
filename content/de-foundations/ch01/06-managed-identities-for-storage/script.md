# Lesson 6 — Managed Identities for Storage · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Every application that touches storage has to authenticate somehow.
Managed identities are Azure's answer to doing that without a single
secret in your code.

## S2 · CODE CARD (the problem)

Here's the problem they solve. Before managed identities, an app
needed a connection string or access key, stored somewhere — a config
file, an environment variable, sometimes accidentally committed
straight into source control. That's a real secret. It can leak. It
has to be rotated. Someone has to manage it.

## S3 · SCREENSHOT (create user-assigned identity)

A managed identity is an Azure A-D identity Azure creates and manages
FOR you, attached to a resource. A user-assigned one is created once,
as its own standalone resource — you can attach that SAME identity to
multiple things that all need the same access.

## S4 · SCREENSHOT (role assignment)

But an identity by itself can't do anything. It still needs a role
assignment — this is Lesson 5's RBAC, applied directly. Grant it
Storage Blob Data Reader on your account, right here, and it can
authenticate. Zero secrets, anywhere, ever.

## S5 · OUTRO CARD

Nothing to leak, nothing to rotate, and every access shows up in a
real audit log tied to a real identity. Next lesson: SAS tokens —
granting temporary access without an identity at all. See you there.
