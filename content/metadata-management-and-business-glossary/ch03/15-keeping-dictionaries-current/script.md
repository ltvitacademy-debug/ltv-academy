# Lesson 15 — Keeping Dictionaries Current · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

This is the maintain stage of the metadata lifecycle from Lesson 4,
applied specifically to dictionaries — and it splits into two distinct
problems, because the two halves of a dictionary entry go stale in
completely different ways.

## S2 · STEPS CARD (two kinds of staleness)

Structural drift — a column gets renamed, resized, or dropped, and the
documentation still describes the old shape. This is detectable
automatically, since the real schema and the documented schema can be
directly compared. Descriptive drift — the column hasn't changed, but
what it means in practice has, and nothing in the schema signals that.

## S3 · CODE CARD (catching structural drift)

Because INFORMATION_SCHEMA is always current by definition, structural
drift is detectable with a straightforward comparison — this query
surfaces every column that exists in the live schema but has no
extended property description. A column mismatch is an immediate,
unambiguous signal, no judgment call required.

## S4 · STEPS CARD (worked silent drift)

A ShippingStatus column was documented with three values: Pending,
Shipped, Delivered. Six months later, a developer added a fourth value,
Returned, without telling anyone documenting the dictionary. The schema
itself didn't change — it's still a VARCHAR column — so no
structural-drift query catches this.

## S5 · OUTRO CARD

Only a scheduled review, where someone actually checks current values
against documented ones, would catch it. That's the "last reviewed"
field from Lesson 3 doing real work. Next: Chapter 4, critical data
elements — not every column deserves the same level of scrutiny.
