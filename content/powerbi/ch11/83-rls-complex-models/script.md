# Lesson 83 — RLS With Complex Data Models · Voiceover script

Segments map 1:1 to slides. Target: ~3 minutes total.

---

## S1 · TITLE CARD

RLS filters only flow one direction by default — even across a
relationship that's otherwise bidirectional.

## S2 · IMAGE: powerbi-security-apply-filter-in-both-directions.png

One checkbox turns that on, per relationship. Reach for it
specifically when dynamic RLS needs it — not as a general fix.

## S3 · CODE: One table, multiple bidirectional relationships -> only ONE can have this enabled

One real constraint: a table in several bidirectional relationships
can only have security filtering in both directions turned on for
one of them. And the real cost is performance — it can slow queries
meaningfully in large, related models, so test thoroughly before
trusting it anywhere real.

## S4 · IMAGE: row-level-security-test-role-3.png

Test as role isn't limited to one report — switch and check every
report built on the same semantic model, not just the first one.

## S5 · OUTRO CARD

That closes Chapter Eleven, and everything this course teaches about
securing a semantic model on purpose. Chapter Twelve puts all of it
together in one capstone project.
