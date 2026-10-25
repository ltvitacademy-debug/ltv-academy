# Lesson 20 — Lineage Tools Overview · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Lesson 19 covered automated versus manual lineage as concepts. This
lesson names real tools — three broad categories they fall into, a
few named examples of each, and what's actually verifiable about what
they do, without claiming features this course can't confirm. Tool
capabilities change fast, so staying accurate matters more than
sounding comprehensive.

## S2 · SCREENSHOT CARD (dbt lineage graph)

Here's a real one: dbt's own lineage graph, from dbt's official docs.
Source tables on the left flow through staging and intermediate
models into a final customers mart on the right, with a model detail
panel open — generated automatically from every ref() call between
models, not hand-drawn. Exactly Lesson 18's boxes-and-arrows
conventions, built for you with no separate lineage tool required.

## S3 · STEPS CARD (enterprise platforms)

Several enterprise platforms combine a searchable data catalog with
automated lineage capture as a core feature. Microsoft Purview scans
an organization's data estate — databases, Data Factory pipelines,
Power BI, and more — and builds a lineage map from what it finds.
Collibra combines automated harvesting from supported systems with
manually documented relationships where automation doesn't reach.
Alation captures lineage by analyzing SQL query activity across
connected systems. All three become an organization's central source
of truth.

## S4 · STEPS CARD (open-source and standards)

Apache Atlas is an open-source metadata and governance framework,
originally built for the Hadoop ecosystem, tracking lineage across
tools like Hive and Kafka. dbt generates its own lineage graph
automatically from ref() calls, with no separate tool needed for that
layer. And OpenLineage isn't a product at all — it's an open
specification so tools like Airflow and Spark can emit lineage events
in a shared format instead of each inventing its own.

## S5 · OUTRO CARD

This lesson named tools carefully by category, sticking to
well-established, verifiable capabilities rather than every feature —
verify any specific tool's current feature set against its own
documentation before relying on it. Next lesson: maintaining lineage,
because naming a tool or drawing one diagram is the easy part; keeping
any of it accurate as systems keep changing is the real discipline.
