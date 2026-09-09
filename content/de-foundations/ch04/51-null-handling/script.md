# Lesson 51 — Null Handling · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

This lesson's been building all chapter — let's actually deal with
nulls.

## S2 · CODE CARD (isNull)

Is null and is not null are the correct way to check. Comparing
with double equals to none doesn't work — Spark follows SQL's
three-valued logic, where a comparison against null just isn't
equal in the way you'd expect.

## S3 · CODE CARD (na.drop)

N-A dot drop removes rows with nulls — with no arguments, it drops
a row if any column at all is null, which is often too aggressive
on a wide table. Passing subset narrows that down to just the
columns that actually matter.

## S4 · CODE CARD (na.fill)

N-A dot fill replaces nulls with a default instead — a number for
numeric columns, a string for string columns — and only touches the
columns named in subset.

## S5 · OUTRO CARD

isNull to check correctly, drop or fill depending on what the null
actually means. Next lesson: removing duplicates, the other common
data-cleaning step.
