# Lesson 13 — Data Dictionary Standards · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Lesson 12 showed that INFORMATION_SCHEMA auto-generates most of a
dictionary entry's structural fields. That doesn't mean a dictionary is
automatically consistent.

## S2 · STEPS CARD (three names, one meaning)

One table might use CustID, another CustomerID, another customer_id —
all meaning the same thing. The schema is auto-documented; the
consistency of what it documents still has to be deliberately
maintained.

## S3 · STEPS CARD (three standards)

Three standards every dictionary should enforce. Naming convention
compliance — a dictionary is a good place to actually catch naming
violations, since it surfaces every column in one place. Mandatory
description coverage — every column, not just the ones someone got
around to. And terminology consistency with the glossary.

## S4 · CODE CARD (before and after)

Here's a worked before and after. Before: CustID, "probably unique,"
cust_active with no description. After: CustomerId, unique identifier,
primary key. IsActiveFlag, true when Active Customer per the glossary
definition, recalculated nightly. Naming fixed, hedging removed,
explicitly linked to the glossary term it implements.

## S5 · OUTRO CARD

This isn't a new idea — it's Data Governance Foundations' naming
standards and this course's own metadata standards, enforced
specifically on the dictionary. Next: building a data dictionary —
putting the whole chapter together, end to end.
