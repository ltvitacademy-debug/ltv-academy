# Lesson 18 — Critical Data Element Documentation · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

A CDE record starts from the same base as any dictionary entry — name,
definition, type, owner, status, last reviewed. CDE status doesn't
replace any of that — it adds to it, because the elevated risk from the
last two lessons justifies capturing more.

## S2 · STEPS CARD (four additional fields)

Four additional fields. Source system of record — the one authoritative
system this element originates from, named explicitly. Validation rule
reference — a direct link to the actual data quality rule. Lineage
summary — how it gets from source to consumption. And escalation
contact — who's notified immediately on failure, distinct from the
general owner.

## S3 · CODE CARD (worked record)

Here's a worked record for OrderTotal. Source: the order management
system, not the warehouse copy. Validation: rule DQ-ORD-002, must be
positive and match line items plus tax plus shipping. Lineage: OMS to
nightly ETL to dbo.Orders, feeding revenue and commission reporting.
Escalation: the Finance Data Steward, with a two-hour response SLA.

## S4 · STEPS CARD (deliberately heavier)

Compare this to the three-field mini-dictionary entries from Lesson 14
— a CDE record is deliberately heavier, because the cost of getting
OrderTotal wrong justifies the extra effort in a way a routine column
doesn't.

## S5 · OUTRO CARD

If every column required this much documentation, effort would collapse
under its own weight — exactly what Lesson 16 warned about. These
fields are valuable specifically because they're rare. Next lesson:
critical data elements and regulatory reporting — where the stakes get
highest.
