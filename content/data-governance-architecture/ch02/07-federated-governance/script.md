# Lesson 7 — Federated Governance · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Next up architecturally: federated governance — the model that splits authority deliberately, and the system that has to make that split real.

## S2 · STEPS — Beyond the org chart

Foundations Lesson 11 described the split organizationally — central standards for shared data, local authority for everything else. Architecturally, that split has to become something domain catalogs can actually check themselves against.

## S3 · STEPS — Four required components

Four components. A shared core schema — the common tags every domain catalog must populate. A central index, the catalog-of-catalogs from earlier, holding registrations rather than full detail. And domain-owned catalogs, which keep real local authority and real local detail.

## S4 · STEPS — Two layers doing the work

Two more pieces do the actual work. A two-tier policy split — global rules enforced everywhere, local rules left to the domain. And connectors or APIs that automatically pull the shared-schema fields out of each domain catalog, so nobody re-enters the same tag twice.

## S5 · CODE — The architecture, drawn out

Drawn out: three domain catalogs each hold their own local detail, but only their shared-schema fields travel up into the central index, where global policy gets enforced.

## S6 · OUTRO

Next lesson: decentralized governance — what happens when there's no shared layer connecting any of this at all.
