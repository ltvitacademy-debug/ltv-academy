# Lesson 12 — Completeness · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Accuracy asked "is it true?" Completeness asks a simpler question:
"is it even there?"

## S2 · STEPS — Two levels of completeness

Completeness splits into two levels. Field-level: does this column
have a value for this row? Record-level: does the entire record exist
at all — did an order get placed with no matching shipment row
anywhere? Most day-to-day checking is field-level, because it's
directly measurable with one query.

## S3 · STEPS — Missing in disguise

Here's the trap: missing data doesn't always look missing. A real
NULL is easy to catch. An empty string isn't NULL, so a naive NULL
check misses it completely. And a sentinel value — N-slash-A, Unknown,
a default date like 1900 — looks like real data to a plain COUNT, but
means exactly the same thing: nothing was ever captured here.

## S4 · CODE — Per-column missingness

This is the pattern that catches both NULL and blank-string
missingness in one condition: IS NULL, OR the trimmed string equals
empty. Run it per important column and you get a real missing count,
not just a NULL count.

## S5 · STEPS — Three disguises, recap

NULL, the database's actual no-value marker. Empty string, invisible
to an IS NULL check. And sentinel values — N slash A, Unknown, zero,
a placeholder date — that need their own explicit, business-specific
check.

## S6 · CODE — A completeness rate

A single count is useful once. A rate is useful every time you run it.
This turns missingness into a percentage you can track release over
release, or day over day — the simplest possible data quality monitor
for a single column.

## S7 · OUTRO

Complete isn't the same as consistent. Next up: consistency — what
happens when the same fact is stored two different ways in two
different places.
