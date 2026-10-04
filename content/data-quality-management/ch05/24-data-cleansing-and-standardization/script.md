# Lesson 24 — Data Cleansing and Standardization · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Lesson twenty-four covers two related but different jobs: cleansing, fixing values that are wrong, and standardization, making correct values consistent.

## S2 · STEPS — CLEANSING VS STANDARDIZATION

Cleansing fixes values that are wrong — a null, a typo, a missing "at" sign. Standardization fixes values that are right but inconsistent — "N-Y" and "New York" both correctly mean the same state, but they break a group-by or a join until they match.

## S3 · STEPS — FOUR CLEANSING OPERATIONS

Four core operations: parsing, splitting messy text into real structure; correcting, fixing a value against a known-good reference; deduplicating, collapsing records for the same entity; and enriching, filling a gap from a trustworthy second source.

## S4 · STEPS — STANDARDIZATION PATTERNS

Common standardization targets: addresses normalized against a postal reference, names with consistent casing and structure, phone numbers in one format, and categorical codes mapped to a single canonical value through a reusable lookup table.

## S5 · CODE — AN IDEMPOTENT UPDATE

Cleansing scripts get run more than once, so they need to be idempotent — safe to re-run without changing the result further. This update only touches rows that still need the fix, so a second run changes nothing.

## S6 · STEPS — WHY AN AUDIT TRAIL MATTERS

Every cleansing step should keep an audit trail: the original value, which rule changed it, and when. Without that, a later root cause investigation — or an auditor — has no evidence of what happened to the data.

## S7 · OUTRO

Next lesson turns these operations into a repeatable process — Lesson twenty-five, remediation workflows.
