# Lesson 62 — Secrets Management · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Secrets management — the direct tension between committing
readable definitions to git and never exposing a secret.

## S2 · CODE CARD (where secrets belong)

A connection string embedded directly is exposed the moment it's
committed, permanently, even if fixed later. The right approach
references a key vault secret by name — safe to commit — while the
real value never touches git.

## S3 · CODE CARD (managed identities)

A managed identity goes further — fabric authenticates as itself
through azure a-d, with nothing stored and nothing to leak at all.
Use it wherever the target resource supports it.

## S4 · STEPS CARD (rotation)

A secret that's never rotated stays exploitable forever if it ever
leaks once. Referencing it by name means rotating it is one key
vault change, not a hunt through every notebook and eventstream.

## S5 · OUTRO CARD

Nothing sensitive in git, and a limited lifespan for anything that
could leak. Next up: access reviews and least privilege — who can
reach a secret, and why.
