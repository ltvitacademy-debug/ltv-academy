# Lesson 20 — Lineage Tools Overview

**Chapter 4 · Documenting Lineage · Lesson 20 of 25**

## What you'll learn

- Three broad categories real lineage tools fall into, and a few named examples of each
- What dbt's own built-in lineage graph looks like, from a real screenshot
- What an open standard like OpenLineage is for, and why it exists alongside vendor tools
- Why this lesson names specific tools carefully, without claiming features it can't verify

## Enterprise data catalog and governance platforms

Several enterprise platforms combine a searchable data catalog (the kind covered in Metadata Management, Chapter 5) with automated lineage capture as one of their core features:

- **Microsoft Purview** — Microsoft's unified data governance service. It scans supported data sources across an organization's data estate (databases, Data Factory pipelines, Power BI, and more) and automatically builds a lineage map from what those scans find.
- **Collibra** — an enterprise data governance and catalog platform that includes data lineage visualization, combining automated harvesting from supported systems with manually documented relationships where automation doesn't reach.
- **Alation** — a data catalog platform that captures lineage automatically by analyzing SQL query activity across connected systems, surfacing it alongside its catalog and glossary features.

These three are the kind of platform an organization adopts as its central source of truth across many different source systems at once, not just one tool.

## Open-source and tool-native lineage

Not every real lineage graph requires a dedicated enterprise platform:

- **Apache Atlas** — an open-source metadata and governance framework, originally built for the Hadoop ecosystem, used to track metadata and lineage across tools like Hive and Kafka.
- **dbt's own lineage graph** — if your transformation layer is built in dbt (covered in this catalog's dbt course), dbt generates an interactive lineage graph automatically from every `ref()` call between models, with no separate lineage tool required for that layer.

Below is a real screenshot of dbt's own lineage graph, from dbt's official documentation, showing an example project's dependency graph:

![A real screenshot of dbt's lineage graph (dbt Catalog/Explorer) for an example e-commerce project — source tables on the left flowing through staging and intermediate models into a final customers mart on the right, with a model detail panel open.](/courses/data-lineage-and-impact-analysis/ch04/20-lineage-tools-overview/dbt-lineage-graph.png)
*Boxes for each model and source, arrows for the ref() dependencies between them — exactly the visual conventions from Lesson 18, generated automatically rather than hand-drawn.*
Source: [dbt Docs — Discover data with Catalog](https://docs.getdbt.com/docs/collaborate/explore-projects)

## An open standard: OpenLineage

**OpenLineage** is different from the tools above — it isn't a product you install, it's an open specification for how lineage metadata should be structured and emitted, so different tools can share lineage information with each other instead of each one inventing its own incompatible format. Pipeline tools like Apache Airflow and Apache Spark have integrations that emit lineage events in the OpenLineage format, which a metadata service can then collect and display. Think of it as the common language several of the tools above could speak to each other, rather than a destination of its own.

## Choosing carefully, not guessing

This lesson deliberately sticks to naming tools by category and describing only capabilities that are well-established and verifiable, rather than listing every feature of every product — tool capabilities change, and a course claiming something inaccurate about a specific vendor is worse than a course that stays general. If you're evaluating a specific tool for a real organization, verify its current feature set directly against that vendor's own documentation before relying on anything stated here.

## Key terms

| Term | Meaning |
|---|---|
| Data catalog/governance platform | A tool like Purview, Collibra, or Alation combining a searchable catalog with automated lineage capture |
| Apache Atlas | An open-source metadata and governance framework from the Hadoop ecosystem |
| OpenLineage | An open standard/specification for structuring and sharing lineage metadata between different tools |

## Lab

For one lineage tool named in this lesson (or one you've encountered elsewhere), visit its official documentation and find one real example of its lineage graph or diagram. Note what categories of consumer it shows (reports, tables, pipelines) and compare it to the diagram conventions from Lesson 18.

## Check yourself

Can you name one tool from each of the two categories this lesson covers — enterprise catalog/governance platforms, and open-source/tool-native lineage? Can you explain, in one sentence, what OpenLineage is for and how it's different from a product like Purview or Collibra?
