# Lesson 8 — Deduplication · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Deduplication is matching applied specifically within a single system —
finding multiple records that already exist there for the same real
person or organization.

## S2 · STEPS CARD (why duplicates happen)

Multiple entry points — a web signup and a call center agent who didn't
find the existing record. System migrations that merge two databases
without matching built in. No real-time check at the point of entry, so
nothing stops a second record from being created.

## S3 · STEPS CARD (the process)

Find duplicate groups by running matching within the dataset. Decide
which values survive for each group — that's survivorship rules,
Lesson 10. Then merge the records into one, or keep them linked by a
shared ID, depending on the architecture style in use.

## S4 · CODE CARD (prevention vs. cleanup)

Cleanup is reactive: periodically dedup what's already accumulated.
Prevention is proactive: check for a near-match the moment a new record
is submitted, before a duplicate ever exists. A mature program needs
both — cleanup for the backlog, prevention to stop it regrowing.

## S5 · OUTRO CARD

Next: golden records — what the merged, trusted result of all this
matching and deduplication actually looks like.
