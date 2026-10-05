# Lesson 25 — MDM Case Study · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Brightfield Outdoor Supply, a fictional mid-sized outdoor-gear retailer,
sells through a retail website, a wholesale team, and physical stores —
each with its own systems, and nobody ever unified them.

## S2 · STEPS CARD (Chapters 1-2 applied)

Chapter 1: a VP asks how many wholesale customers they actually have,
and gets three different answers — customer was never formally defined
as master data, with no owner and no architecture style. Chapter 2: the
team matches records across all three systems, collapsing forty
thousand customers down to roughly thirty-one thousand real ones, with
low-confidence matches routed to a steward rather than merged blind.

## S3 · STEPS CARD (Chapters 3-4 applied)

Chapter 3: product master catches the same hiking boot listed under two
SKUs; vendor master catches the same manufacturer set up twice, missing
a discount tier already earned. Chapter 4: a single governed code list
for country and state codes replaces three drifted local lists, with
cross-reference tables mapping old codes during the transition.

## S4 · STEPS CARD (Chapter 5 applied)

Chapter 5: Brightfield chooses a coexistence architecture — the hub is
authoritative, but source systems can still create records locally,
syncing back through an event-driven mechanism. A quality scorecard
tracks completeness monthly, with a named owner, and the tool is picked
to fit their existing stack, not the flashiest demo.

## S5 · OUTRO CARD

Six months later, there's exactly one answer, because there's exactly
one record for each real customer, product, and vendor, everywhere.
Congratulations — that closes Master and Reference Data Management. The
Data Governance path continues with Data Security, Privacy and
Classification — protecting the data this course just taught you to
define, match, and standardize.
