# Lesson 19 — Reference Data Governance · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Reference data governance: who can change a code list, who approves it,
and how every consuming system finds out.

## S2 · STEPS CARD (why its own discipline)

A master data change affects one record — one customer's address.
A reference data change can silently affect every system storing that
code. Small size, as the last lesson showed, doesn't mean small risk —
and that's why this gets its own governance mechanics.

## S3 · STEPS CARD (the steward role)

A reference data steward is accountable for one or more code lists —
narrower and more operational than a data owner. Often it's someone
close to the business process the list supports, like a finance analyst
for a chart of accounts, applying a process the central team still sets.

## S4 · STEPS CARD (change request)

A real change request documents the specific code change, the business
reason, which systems consume the list, the effective date, and what
happens to historical data already using the old value. Skip any of
those and a routine update becomes an incident.

## S5 · STEPS CARD (centralized vs distributed)

Centralized management maximizes consistency through one team and one
process, but can bottleneck. Distributed management keeps expertise close
to the decision, but risks uneven rigor. Most mature programs land on a
hybrid: central tooling, distributed stewards.

## S6 · OUTRO CARD

Next lesson: cross-reference and mapping tables — what happens when two
systems each have their own code list for the same concept.
