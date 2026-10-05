# Lesson 28 — Governance Architecture Case Study: Financial Services · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

A second case study, a very different pressure. This time it's not plant sprawl — it's a regulator requiring one traceable, accountable number.

## S2 · STEPS — The scenario

Northbridge Financial Group, a fictional bank holding company, runs retail banking, lending, and insurance as separate data silos. Its regulator requires accurate group-wide risk reporting — the kind real banking regulators require through frameworks like BCBS 239. Northbridge's last exam flagged that it couldn't trace a reported risk figure back to its source systems.

## S3 · STEPS — Chapters 1 and 2 applied

Chapter 1: each business line actually has decent data ownership — the gap is entirely cross-line traceability. Chapter 2: a loosely federated model won't satisfy a regulator expecting one accountable number, so Northbridge adopts a hybrid — centralized governance specifically for risk reporting, federated everywhere else.

## S4 · STEPS — Chapters 3 and 4 applied

Chapter 3: lineage architecture becomes the central requirement — every field in the group risk report needs a traceable path to its source. Chapter 4: policy as code enforces access and masking rules automatically across every platform touching regulated data, and centralizing lineage tracking on one platform gets its own ADR.

## S5 · STEPS — Chapter 5 applied, and the result

Chapter 5: the strategy is anchored to the regulator's documented finding, which makes sponsorship easy to secure, and the compliance officer gets a standing seat on the review board. At the next exam, Northbridge traces every reported figure back through its catalog to its source system and the ADR explaining why — not because it centralized everything, but because it centralized exactly the one domain that required it.

## S6 · OUTRO

Next lesson: a hands-on practice lab where you design a governance architecture of your own, drawing on both of these case studies — Governance Architecture Practice Lab.
