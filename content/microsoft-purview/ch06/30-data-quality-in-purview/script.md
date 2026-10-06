# Lesson 30 — Data Quality in Purview · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Access answers who can see a dataset. Data quality answers a different question: once someone can see it, should they trust it?

## S2 · STEPS CARD (dimensions)

Purview breaks that question into measurable dimensions — accuracy, completeness, consistency, timeliness, and more — each checked by rules a steward attaches to a column, rolling up into one score.

## S3 · SCREENSHOT (freshness)

Freshness checks whether an asset was updated within an expected window, based on its last-modified date. It's binary — a hundred for pass, zero for fail, no partial credit.

## S4 · SCREENSHOT (uniqueness)

Unique values confirms every value in a column is distinct — the obvious check for a customer ID or order number, anything meant to identify exactly one record.

## S5 · SCREENSHOT (data type match)

Data type match confirms a column's values actually match the expected type, translated through Purview's own internal type system since source systems don't all agree on native types.

## S6 · SCREENSHOT (empty fields)

Empty or blank fields flags nulls, and for strings, whitespace-only values too — and switching it on changes how every other rule on that same column treats a null it finds.

## S7 · OUTRO CARD

Rules catch bad data after the fact. Next, Governance Workflows and Approvals looks at who actually signs off before a change goes live in the first place.
