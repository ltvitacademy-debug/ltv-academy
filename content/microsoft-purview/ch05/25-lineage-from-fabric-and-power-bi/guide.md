# Lesson 25 — Lineage From Fabric and Power BI

**Chapter 5 · Lineage and Insights · Lesson 25 of 35**

## What you'll learn

- Which Fabric experiences report lineage into Purview, and the one place item-level stops short of sub-item level
- How to browse to a Fabric item's lineage from the Unified Catalog
- The Power BI artifact chain lineage follows: Dataflow → Dataset → Report → Dashboard
- Why column-level lineage inside a Power BI dataset only works for one specific kind of source
- The real limitations: dynamic parameters, cross-workspace gaps, and view/table mismatches

## One scan, a whole tenant of items

Scanning a Microsoft Fabric tenant brings in metadata and lineage for items across every Fabric experience, not just Power BI: Real-Time Analytics (KQL databases, KQL querysets), Data Science (experiments, ML models), Data Factory (data pipelines, Dataflow Gen2), Data Engineering (Lakehouses, notebooks, Spark job definitions, SQL analytics endpoints), Data Warehouse (warehouses), and Power BI itself (dashboards, reports, datasets, dataflows, datamarts, paginated reports).

![Screenshot of the "Browse by source type" page in Microsoft Purview's Data Catalog, with Microsoft Fabric selected as the source type filter, showing a single "Fabric workspaces" card listing "30+ items."](/courses/microsoft-purview/ch05/25-lineage-from-fabric-and-power-bi/fabric-workspaces.png)
*One scanned Fabric tenant, inventoried as a single browsable source: every workspace, every experience, every item.*

For everything except Power BI, Purview captures lineage at the **item level only** — a Lakehouse as a whole, not the individual tables inside it (sub-item metadata scanning for Lakehouse tables and files is in preview, but sub-item *lineage* still isn't supported there).

## Crossing from Fabric into Power BI

Here's where that item-level lineage actually earns its keep — tracing data as it crosses from a Fabric Data Engineering item into a Power BI artifact:

![Screenshot of a Microsoft Purview lineage canvas showing a "DataflowsStagingLakehouse" Fabric Lakehouse item flowing through a process into a Power BI Dataset of the same name, with "Switch to asset" and "Open in Fabric" options visible.](/courses/microsoft-purview/ch05/25-lineage-from-fabric-and-power-bi/lakehouse-to-lakehouse.png)
*A Fabric Lakehouse feeding a Power BI semantic model — the same rectangle/round-edge mechanics from Lesson 23, just crossing from the engineering side of Fabric into the reporting side.*

## The Power BI artifact chain

Inside Power BI itself, Purview captures lineage among the artifacts in a predictable chain: **Dataflow → Dataset → Report → Dashboard**. A data consumer looking at a dashboard with a wrong number can walk backward through that chain to find the dataset — and ultimately the external source — responsible. A data owner changing a dataset can walk forward to see every report and dashboard that would break.

![Screenshot of a Microsoft Purview lineage canvas for the "Sales health" Power BI Dataset, showing it fed by a "PBIConnectDM" source and flowing forward into a "Sales health" Report and a "Sales health" Dashboard.](/courses/microsoft-purview/ch05/25-lineage-from-fabric-and-power-bi/powerbi-lineage.png)
*PBIConnectDM → Sales health dataset → Sales health report → Sales health dashboard. One source, traced all the way to the dashboard a business user actually opens.*

That lineage to **external** data assets (outside Power BI itself) is currently limited to four source types: Azure SQL Database, Azure Blob Storage, Azure Data Lake Storage Gen1, and Gen2. A Power BI dataset built on anything else still shows up in the catalog — it just won't show lineage reaching back past Power BI's own boundary.

## Column-level lineage — one source type only

Purview can trace lineage down to individual columns and measures *inside* a Power BI dataset — but only when that dataset's source is **Azure SQL Database**. For measures, selecting Properties → Expression on a column shows the actual transformation behind it.

![Screenshot of Purview's Power BI subartifact lineage view for the "AzureSQLDB_ColumnLineage" dataset, showing individual source columns (MonthID, MonthName, Quarter, CONTINENT, COUNTRY) from four SQL tables flowing into specific columns and measures of the Power BI dataset.](/courses/microsoft-purview/ch05/25-lineage-from-fabric-and-power-bi/power-bi-lineage-subartifacts.png)
*Column-by-column, not just table-by-table — but this granularity is an Azure SQL Database-only capability. Every other source gets table-level lineage at best.*

## The limitations worth remembering

A few gaps are easy to get burned by in practice:

- **Dynamic M query parameters** — if a Power BI query passes a server or database name as a parameter instead of hardcoding it, lineage isn't captured for that connection at all.
- **No cross-workspace lineage for non-Power BI items** — a Fabric pipeline in one workspace feeding a Lakehouse in another won't show that link.
- **Notebook → Pipeline lineage isn't supported** — if a pipeline triggers a notebook, that specific hop won't appear in the graph.
- **Views captured as tables** — a Power BI dataset referencing a SQL view shows up as a table asset, which can create a duplicate-looking entry if you've also scanned the source database directly.

None of these mean lineage is broken — they mean a clean-looking graph isn't automatically a complete one, and it's worth knowing where the blind spots are before trusting an absence of lineage as proof that a connection doesn't exist.

## Key terms

| Term | Meaning |
|---|---|
| Item-level lineage | Lineage at the whole-item granularity (a Lakehouse, not its individual tables) — the default for non-Power BI Fabric items |
| Artifact chain | Power BI's lineage sequence: Dataflow → Dataset → Report → Dashboard |
| Subartifact lineage | Column/measure-level lineage inside a Power BI dataset, supported only for Azure SQL Database sources |
| Dynamic M query parameter | A Power BI query parameter (e.g., server name) set dynamically rather than hardcoded — breaks lineage capture |

## Lab

A business user reports that a number on a Power BI dashboard looks wrong. Using the artifact chain from this lesson, write the exact sequence of lineage hops you'd walk backward through to find the responsible dataset and its source. Then say what would happen to that lineage trail if the dataset's source connection used a dynamic M query parameter for the database name.

## Check yourself

Can you name at least four Fabric experiences (besides Power BI) that report lineage into Purview? Can you state the four-artifact Power BI lineage chain in order? Can you explain why column-level lineage inside a Power BI dataset only works for one source type?
