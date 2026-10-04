# Lesson 22 — Cataloging Business and Technical Metadata · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Metadata gets into a catalog one of two ways, and a mature program uses
both, deliberately. Automated scanning connects directly to source
systems and pulls technical metadata automatically. Manual curation is
a human adding the business layer scanning can never produce on its
own.

## S2 · STEPS CARD (why both are needed)

A catalog built on scanning alone is technically comprehensive and
completely useless for business users — it can tell you CustomerId is
an INT, but not that it's the key every revenue report joins on. A
catalog built on curation alone is accurate where someone bothered to
write something, and silently empty everywhere else.

## S3 · STEPS CARD (coverage vs. meaning)

Scanning guarantees coverage. Curation supplies meaning. Neither
substitutes for the other.

## S4 · CODE CARD (worked entry)

For dbo.Orders.OrderTotal, the scan captures DECIMAL, not null, row
count, last modified — automatically, nightly. Curation adds the
business definition, a glossary link, and an owner — written once by a
steward, updated only when the meaning actually changes.

## S5 · OUTRO CARD

An organization that only scans gets meaningless entries. An
organization that only curates gets silent gaps nobody notices. Running
both is what makes a catalog genuinely trustworthy. Next lesson:
metadata quality — the catalog has the same quality problem the data
itself has.
