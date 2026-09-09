# Lesson 4 — Hierarchical Namespace · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Lesson 2 showed you the checkbox. Today, a deeper look at what
hierarchical namespace actually IS, and the real path for turning on
an account that already exists.

## S2 · SCREENSHOT (upgrade steps)

What if you've already got a Blob-only account, full of real data, and
now you want ADLS Gen2? Microsoft provides a genuine, supported
migration — but it's a real multi-step process, not a toggle. Review
the changes first. Validate the account. Only then, upgrade.

## S3 · SCREENSHOT (completed)

Run it all the way through, and the portal confirms it, step by step,
with no need to recreate the account from scratch or copy a single
byte of data.

## S4 · STEPS CARD (constraints)

But this isn't free. It's one-way — there's no supported path back to
Blob-only once you've upgraded, which is why Microsoft recommends
testing it somewhere that isn't production first. Several features
have to be disabled before it'll even pass validation — blob
snapshots, soft delete, encryption scopes, immutable storage. And
validation itself can simply fail, because not every account
configuration is eligible.

## S5 · OUTRO CARD

All of which is exactly why deciding hierarchical namespace at
creation time is almost always the better call — it skips every one
of these constraints entirely. Next lesson: RBAC versus ACLs, two
different ways to control who can actually do what. See you there.
