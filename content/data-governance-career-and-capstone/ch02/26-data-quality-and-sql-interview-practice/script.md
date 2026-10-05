# Lesson 26 — Data Quality and SQL Interview Practice · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

SQL is the single most commonly tested skill in a data quality interview, and the questions repeat a small set of patterns. This lesson practices four of them.

## S2 · CODE — Completeness

"What percentage of a column is NULL?" Sum a case-when against the total row count. The follow-up: why multiply by one hundred point zero and not one hundred? Integer division truncates the result to zero before it ever reaches a decimal.

## S3 · CODE — Uniqueness

"Find duplicate customers by email." Group by the column, filter with having count greater than one. The follow-up: how do you get the actual rows, not just the counts? Join back to the base table, or use row_number and keep everything past the first occurrence.

## S4 · CODE — Referential integrity

"Find orders with no matching customer." Left join child to parent, filter where the parent side is null. The follow-up: why also check that the foreign key itself isn't null? A null foreign key usually means no customer, intentionally — that's a completeness question, not an orphan.

## S5 · CODE — Combining checks

"Combine several rules into one report." Union all, one rule per branch, each one labeled. The follow-up: why cast every key to the same type first? Mismatched types across union branches either error out or force a slow implicit conversion.

## S6 · STEPS — How to talk through it

Four moves while you solve any of these live. Restate what "bad" means for this rule. Write the select and from first, then earn the where clause for the failure condition. Run it and sanity-check the count. Say what you'd do next — flag it, never silently delete.

## S7 · OUTRO

Next lesson: the same practice, applied to metadata and lineage interview questions.
