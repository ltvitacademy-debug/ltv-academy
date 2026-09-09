# Lesson 10 — Designing a Data Lake · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Nine lessons of individual decisions. Time to put them all together
into one real design.

## S2 · CODE CARD (full path)

Here's a single real path for this course's taxi data, using every
decision this chapter has covered. One container. A raw zone holding
the untouched original file. A Hive-style partition by year and month.
And a processed zone holding the same data, converted to Parquet.
Every segment of this path is something you already know how to
decide deliberately.

## S3 · STEPS CARD (four decisions)

It really comes down to four calls. How many containers — usually
few, since directories do the real organizing. What directory
structure — zone, then source, then a partition that matches how
you'll query it. What file format, per zone — original as received,
Parquet or Delta once it's processed. And security and access — broad
RBAC roles, ACLs only for real exceptions, and managed identities or
SAS tokens depending on who's actually connecting.

## S4 · CODE CARD (the HNS dependency)

And none of it works without real directories existing in the first
place. Every single one of these four decisions assumes hierarchical
namespace was already turned on — which is exactly why that one
checkbox got an entire two-lesson discussion earlier in this chapter.

## S5 · OUTRO CARD

Four decisions, one real design. Next lesson goes deep on that
raw-versus-processed split you just saw — raw, cleansed, and curated
zones. See you there.
