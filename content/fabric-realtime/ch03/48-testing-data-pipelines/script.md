# Lesson 48 — Testing Data Pipelines · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Testing data pipelines — filling in what lesson 45's test stage
actually runs.

## S2 · STEPS CARD (four kinds of test)

Unit tests check one transformation in isolation. Schema tests
catch drift before it reaches production. Row-count tests catch a
run that silently processed zero rows, or ten times too many.
Regression tests catch a query that quietly changed shape.

## S3 · CODE CARD (a concrete example)

Neither of these examples is complicated — checking a fare is
never negative, checking a row count falls in a plausible range.
Both catch a real mistake, automatically, every single run.

## S4 · OUTRO CARD

A data pipeline test has to also ask whether its input is even
representative of real production data — hand-picked rows can
pass while missing a real problem entirely. Next up: unit testing
PySpark transformations, in full depth.
