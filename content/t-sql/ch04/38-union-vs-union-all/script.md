# Lesson 38 — UNION vs. UNION ALL · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

JOIN combines tables side by side, adding more columns. This lesson is
about the opposite direction: stacking query results on top of each
other, adding more rows. That's UNION.

## S2 · CODE CARD (UNION example)

First name, last name, where last name starts with A. UNION. First name,
last name, where last name starts with Z. Both queries return the same
two columns, and UNION stacks their rows into one combined result. The
rule: every query combined this way needs the same number of columns,
with compatible types in the same position. Column names in the final
result always come from the first query.

## S3 · STEPS CARD (UNION removes / UNION ALL keeps)

And here's the entire distinction between UNION and UNION ALL, in one
sentence. UNION removes duplicate rows across the combined result — it
behaves like an implicit DISTINCT applied on top of everything. UNION ALL
skips that step completely and just concatenates every row, duplicates
included.

## S4 · CODE CARD (performance note)

That difference matters for performance. Removing duplicates means SQL
Server has to compare every row against every other row to find matches —
genuinely non-trivial work on a large result. UNION ALL skips that
comparison entirely, so it's always at least as fast, often significantly
faster. Default to UNION ALL unless you specifically need duplicates
gone — don't pay for deduplication you don't actually need.

## S5 · OUTRO CARD

UNION stacks and dedupes; UNION ALL stacks and keeps everything, faster.
Next lesson: VAR and a few other statistical aggregates, for measuring how
spread out your data actually is. See you there.
