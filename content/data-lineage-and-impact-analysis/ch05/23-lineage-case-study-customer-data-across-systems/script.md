# Lesson 23 — Lineage Case Study: Customer Data Across Systems · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

A second case study — Caldwell & Finch Insurance, a fictional company
used purely as a realistic scenario. This time the problem spans three
separate systems, not one pipeline.

## S2 · STEPS CARD (problem and trace)

Customers got the same renewal email two or three times, and a
customer-count metric kept creeping up with no real growth. The CRM,
the policy system, and the support system each create their own
customer record, keyed differently. A downstream "unified customer
view" merges them by email address — but slightly different formatting
for the same person creates duplicate rows.

## S3 · STEPS CARD (impact)

Tracing upstream and downstream shows the unified view feeds four
consumers: the marketing send list, the leadership customer count, a
churn calculation, and a compliance report. All four were quietly wrong
in the same direction, which is why the count crept up even without
real growth.

## S4 · STEPS CARD (fix)

The formatting fix closes the immediate gap, but the real problem was
structural: no system was ever designated the authoritative source of
record for the customer identifier. The lasting fix assigns the CRM's
ID as authoritative, requires the other systems to capture it, and
documents the cross-system lineage explicitly.

## S5 · OUTRO CARD

Next up: a hands-on practice lab — you'll trace a lineage path through
a small, fictional system yourself, on paper, no software required.
