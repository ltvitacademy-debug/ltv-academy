# Lesson 23 — Lineage in Purview · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Chapter Five is lineage and insights. We start with lineage itself: how Purview traces exactly where a piece of data came from, and everywhere it went.

## S2 · STEPS — Two shapes, one canvas

Every lineage diagram reduces to two shapes. A dataset — a rectangular box — is any source or target: a SQL table, a blob, a Power BI dataset. A process — a round-edged box — is the activity that moves or transforms it: a copy activity, a dataflow refresh, a Data Share snapshot. A lineage canvas is just these two shapes, chained together.

## S3 · SCREENSHOT — Opening lineage

Every asset — dataset or process — has its own Lineage tab. Here we've searched for "data factory" and opened the Copy Company Data activity's Lineage tab directly.

## S4 · SCREENSHOT — A real canvas

Here's a fully populated one. SalesOrderHeader, an Azure SQL table, feeding six downstream processes. Two defaults matter: the canvas only renders five levels by default — more collapses into that numbered bubble you expand on demand — and every column is listed on the left, so you can select just one field and trace its exact path through the graph, not the whole table's.

## S5 · STEPS — Where lineage comes from

Purview doesn't guess at lineage — it's reported by three categories of systems. Data processing systems, like Data Factory, Synapse pipelines, and Databricks, push lineage at execution time. Data storage systems, like Oracle, Teradata, and Snowflake, report it from scanned views and stored procedures. And data analytics and reporting systems — Power BI datasets, dataflows, reports — report their own lineage back in.

## S6 · SCREENSHOT — A process, expanded

Select a process node and it expands with a Switch to asset button — because a process, like this CopyToBlob activity, is itself a Purview asset with its own metadata page, not just a connector line.

## S7 · SCREENSHOT — Taming a busy canvas

For graphs too large to read at a glance, the canvas has its own control stack: full screen, zoom to fit, zoom in and out, auto-align, a zoom preview, and a menu to recenter or reset the view.

## S8 · OUTRO

Next lesson: lineage from Azure Data Factory and Synapse specifically — what gets captured automatically, and what doesn't.
