# Lesson 5 — Lineage Standards and Approaches · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Chapter 1 closes with the practical question: how does lineage actually
get captured? Three approaches, two open standards worth knowing, and
the tradeoffs between them.

## S2 · STEPS CARD (three approaches)

Manual documentation — cheap to start, decays the moment the real
pipeline changes. Static parsing — a tool reads the actual source code
and derives lineage automatically, but only sees what the code expresses
directly. Runtime capture — a tool observes what actually happens when a
pipeline runs, the most trustworthy in principle, but requires
instrumenting the running system.

## S3 · STEPS CARD (standards)

If every tool records lineage in its own format, you can't combine
lineage from a warehouse tool with lineage from an orchestration tool.
OpenLineage is an open specification for describing lineage events in a
common format. W3C PROV is an older, broader model for provenance in
general, that underlies a lot of modern lineage tooling.

## S4 · STEPS CARD (tradeoffs, mixing approaches)

Manual decays over time but suits small, stable systems. Static parsing
reflects code as written and scales well. Runtime capture reflects what
actually ran. Most real organizations mix all three — automated capture
for the technical detail, manual documentation for legacy gaps, and a
business-lineage layer written by people on top.

## S5 · OUTRO CARD

That closes Chapter 1 — lineage concepts. Chapter 2 moves from concepts
to practice: tracing lineage through real source systems, ETL and ELT
pipelines, lakes and warehouses, semantic models, and all the way into
Power BI dashboards.
