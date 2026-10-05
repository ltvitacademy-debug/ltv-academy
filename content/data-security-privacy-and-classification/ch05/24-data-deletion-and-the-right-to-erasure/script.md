# Lesson 24 — Data Deletion and the Right to Erasure · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

In most applications, clicking delete sets a flag rather than removing
the row. That's deliberate — it supports undo and audit trails — but
it means the data is still physically present. This lesson is about
what deletion actually requires, and what a legal right to erasure
actually grants.

## S2 · STEPS CARD (three kinds of delete)

A soft delete just flags the row — it's still there, still in every
backup taken before the flag was set. A hard delete actually removes
it from the active store. Secure deletion goes further: the underlying
storage is overwritten, or the encryption key is destroyed, so it
isn't recoverable from disk remnants either.

## S3 · STEPS CARD (GDPR Article 17)

GDPR's Article 17 — the right to erasure — lets individuals request
deletion when data is no longer necessary, consent is withdrawn, or
processing was unlawful. But it's conditional, not absolute: an
organization can decline when a legal obligation requires continued
retention, or for legal claims, or public-interest archiving.

## S4 · STEPS CARD (where it fails)

Marking a row deleted in production is the easy part. Backups taken
before the deletion still hold the data. Caches and search indexes
don't vanish with the source row. A logged email address outlives the
account it belonged to. And any third party you shared the data with
needs its own deletion request — the obligation doesn't stop at your
own database.

## S5 · OUTRO CARD

Erasure is just one of several rights someone can actually invoke.
Next lesson: data subject requests — the full set, and how an
organization actually fulfills one.
