# Lesson 44 — Environments: Dev, Test, and Prod · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Environments — dev, test, and prod. The single most common early
mistake is skipping this entirely.

## S2 · CODE CARD (three workspaces, one pipeline)

One workspace for everything means no separation between changing
something and it going live. Three workspaces, moved between with
lesson 15's deployment pipeline, is the fix.

## S3 · CODE CARD (what actually differs)

Dev has small sample data and relaxed permissions. Test has
production-shaped data with prod-level permissions. Prod has the
real thing. But the KQL and eventstream logic itself stays
identical across all three.

## S4 · STEPS CARD (why dev never touches real data)

Dev and test never touch real production data — a bug in an
untested query could write into a table real dispatchers are
watching. Production-shaped data is realistic, but safe to break.

## S5 · OUTRO CARD

Same logic everywhere, different data and permissions underneath.
Next up: CI/CD — automating the move between these environments
instead of doing it by hand.
