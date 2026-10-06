# Lesson 25 — Lineage From Fabric and Power BI · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

We've covered lineage in general, and lineage from Data Factory and Synapse. Now the layer most business users actually look at: Fabric, and Power BI.

## S2 · STEPS — One scan, a whole tenant

Scanning a Fabric tenant brings in lineage across every experience, not just Power BI. Real-Time Analytics, Data Science, Data Engineering with Lakehouses and notebooks, Data Warehouse, and Power BI itself. For everything except Power BI, though, that lineage stops at the item level — a Lakehouse as a whole, not the individual tables inside it.

## S3 · SCREENSHOT — One scanned tenant

One scanned Fabric tenant, inventoried as a single browsable source in the catalog — every workspace, every experience, every item, over thirty of them here.

## S4 · SCREENSHOT — Crossing into Power BI

Here's where that item-level lineage earns its keep. A Fabric Lakehouse, DataflowsStagingLakehouse, feeding a Power BI dataset of the same name. Same rectangle and round-edge mechanics as always — just crossing from the engineering side of Fabric into the reporting side.

## S5 · STEPS — The Power BI artifact chain

Inside Power BI, lineage follows a predictable chain: Dataflow, to Dataset, to Report, to Dashboard. A consumer looking at a wrong number on a dashboard walks backward through that chain to find the responsible dataset — and the source behind it. External lineage, though, is currently limited to four source types: Azure SQL Database, Azure Blob Storage, and Data Lake Storage Gen1 and Gen2.

## S6 · SCREENSHOT — The chain, in practice

PBIConnectDM, into a Sales health dataset, into a Sales health report, into a Sales health dashboard. One source, traced all the way to the dashboard a business user actually opens.

## S7 · SCREENSHOT — Column-level, one source only

Purview can trace lineage down to individual columns and measures inside a dataset — but only when the source is Azure SQL Database. Here, specific columns from four SQL tables trace into specific columns and measures of the Power BI dataset. Every other source type gets table-level lineage at best.

## S8 · STEPS — Where this breaks

A few gaps worth knowing. Dynamic M query parameters — passing a server name as a parameter instead of hardcoding it — break lineage capture entirely. Non-Power BI items don't get cross-workspace lineage. Notebook-to-pipeline hops aren't captured. And SQL views show up as table assets, which can look like duplicates if you've scanned the source database too.

## S9 · OUTRO

Next lesson: data estate insights — the dashboards Purview itself builds on top of everything we've scanned, classified, and traced so far.
