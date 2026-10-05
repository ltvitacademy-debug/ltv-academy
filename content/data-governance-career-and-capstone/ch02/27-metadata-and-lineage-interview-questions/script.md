# Lesson 27 — Metadata and Lineage Interview Questions · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Metadata and lineage questions are usually more direct than open scenarios — be ready to explain the concept, and then point at your own artifact as proof.

## S2 · STEPS — Glossary vs. dictionary

"What's the difference between a business glossary and a data dictionary?" A weak answer just says one's for business and one's for IT. A strong answer explains why: the glossary covers meaning, can span many tables, owned by a business steward. The dictionary covers structure, one row per column, owned by the system.

## S3 · STEPS — Identifying critical data elements

"How would you identify critical data elements for a new regulatory report?" Start from what the report actually discloses, trace every field back through its lineage, and flag anything whose error would misstate a regulated number — with a named owner and a stricter threshold.

## S4 · STEPS — Impact analysis before a change

"Three dashboards broke after a report changed. How would you have caught that?" Walk downstream through documented lineage before making the change, assess every dependency's exposure, and notify owners ahead of time — impact analysis, the mirror of root-cause analysis.

## S5 · STEPS — Column-level vs. table-level lineage

"How do you decide between column-level and table-level lineage?" Table-level is cheaper and enough for simple questions. Column-level costs more but is necessary for a wide table where you need to trace one specific number's formula, not just its source table.

## S6 · OUTRO

Next lesson in this chapter covers security, privacy, and AI governance interview questions — the next layer of this same preparation.
