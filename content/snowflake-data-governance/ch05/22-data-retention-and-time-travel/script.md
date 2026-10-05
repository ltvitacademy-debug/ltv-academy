# Lesson 22 — Data Retention and Time Travel · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Every other lesson in this course has governed who can see data. This lesson governs something different: how long data exists at all.

## S2 · STEPS CARD (a governance lever)

Time Travel lets you query or restore a table as it existed in the past, for as long as its retention policy says to. DATA_RETENTION_TIME_IN_DAYS is that policy — a governed setting, not just a safety net. Fail-safe is seven more days after that, recoverable only by Snowflake itself.

## S3 · CODE CARD (querying the past)

AT and BEFORE both accept the same three ways of naming a past moment: an absolute timestamp, an offset in seconds, or a specific statement ID. STATEMENT is especially useful for governance investigations — showing a table exactly as it was right before a specific query ran.

## S4 · CODE CARD (undoing a drop)

UNDROP restores a dropped table — but only inside its Time Travel window. And ALTER TABLE SET DATA_RETENTION_TIME_IN_DAYS is the real governance decision: how many days of history this table actually keeps.

## S5 · STEPS CARD (retention as policy)

Standard Edition only allows zero or one day — no real choice. Enterprise Edition and higher allows zero to ninety days, settable per table, schema, or database. The tradeoff is real: longer retention means more recovery time, but more storage cost.

## S6 · OUTRO CARD

Next lesson: Cross-Account Governance — one account's policy, applied consistently across every account in the organization.
