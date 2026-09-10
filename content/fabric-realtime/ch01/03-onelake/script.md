# Lesson 3 — OneLake · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Let's properly cover the thing previewed last lesson — OneLake.

## S2 · CODE CARD (automatic)

Recall Databricks Lesson 40 — creating a catalog meant choosing a
real managed location, a decision you had to make. OneLake skips
that entirely. Every Fabric tenant gets exactly one, automatically,
the moment the tenant exists.

## S3 · CODE CARD (path shape)

Every lakehouse, warehouse, and eventhouse gets a real path under
that same OneLake root, whether you ever look at it directly or
not — the same structured idea as Databricks Lesson 45's Volumes
path, just with Fabric's own naming.

## S4 · CODE CARD (shortcuts preview)

And that's exactly what makes a shortcut possible — a second item
referencing the first item's data directly, with nothing copied,
because there's only ever been one storage location to begin
with. Lesson 7 covers the mechanics properly.

## S5 · OUTRO CARD

One copy of the data, many consumers, instead of many copies kept
painfully in sync by hand. Next lesson: creating a lakehouse, the
real UI, start to finish.
