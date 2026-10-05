# Lesson 20 — Lineage Tools Overview · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Lesson 19 covered automated versus manual lineage as concepts. This
lesson names real tools — what category each falls into, and what's
actually verifiable about what they do.

## S2 · SCREENSHOT CARD (dbt lineage graph)

Here's a real one: dbt's own lineage graph, from dbt's official docs.
Source tables on the left flow through staging and intermediate
models into a final customers mart on the right — generated
automatically from every ref() call, not hand-drawn. Exactly Lesson
18's conventions, built for you.

## S3 · STEPS CARD (enterprise platforms)

Several enterprise platforms combine a data catalog with automated
lineage as a core feature. Microsoft Purview scans an organization's
data estate and builds a lineage map from it. Collibra combines
automated harvesting with manual documentation. Alation captures
lineage by analyzing SQL query activity.

## S4 · STEPS CARD (open-source and standards)

Apache Atlas is an open-source metadata and governance framework from
the Hadoop ecosystem. And OpenLineage isn't a product at all — it's
an open specification, so different pipeline tools like Airflow and
Spark can emit lineage in a shared, common format.

## S5 · OUTRO CARD

Next lesson: maintaining lineage — because naming a tool, or drawing
one diagram, is the easy part. Keeping any of this accurate as systems
keep changing is the real discipline.
