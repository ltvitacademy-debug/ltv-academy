# Lesson 23 — Lineage in Purview

**Chapter 5 · Lineage and Insights · Lesson 23 of 35**

## What you'll learn

- What data lineage actually tracks, and the two shapes everything in a lineage canvas reduces to
- Where lineage comes from: the three categories of systems that report it automatically
- How to open an asset's lineage, and what the canvas shows by default
- Column-level lineage: tracing one specific field instead of a whole table
- Manual lineage, for the sources that don't report it on their own

## Two shapes, one canvas

Every lineage diagram in Purview is built from exactly two shapes:

- **Dataset (node)** — a rectangular box. A SQL table, an Azure blob, a Power BI dataset, a `.csv` file — anything that can be a source or a target.
- **Process (edge)** — a round-edged box. The activity that moves or transforms data: an ADF Copy activity, a Data Share snapshot, a Power BI dataflow refresh.

A lineage canvas is just these two shapes chained together, tracing exactly where a piece of data came from and everywhere it went.

![Screenshot of the Lineage tab for an Azure Data Factory Copy activity asset named "Copy Company Data," opened from a search for "data factory" in the Microsoft Purview governance portal.](/courses/microsoft-purview/ch05/23-lineage-in-purview/select-lineage-from-asset.png)
*Every asset — dataset or process — has its own Lineage tab. This one is a process: the "Copy Company Data" ADF Copy activity.*

## Where lineage actually comes from

Purview doesn't infer lineage — it's reported by the systems that move the data, and those systems fall into three categories:

1. **Data processing systems** — ETL and pipeline tools that push lineage at execution time: Azure Data Factory, Azure Synapse pipelines, Azure Databricks, Azure Data Share, Airflow.
2. **Data storage systems** — databases and warehouses whose views and stored procedures get lineage extracted during a scan: Oracle, Teradata, SAP, Snowflake, Azure SQL Database (preview), and others.
3. **Data analytics and reporting systems** — tools that consume storage-layer data to build something new: Power BI datasets, dataflows, reports, and dashboards all report their own lineage back into Purview.

If a source isn't in one of these three categories, Purview has no automatic way to know it's connected to anything else — which is exactly the gap manual lineage exists to close.

## Reading a real lineage canvas

Here's a fully populated canvas: `SalesOrderHeader`, an Azure SQL table, feeding six different downstream processes — two copy activities, two ingest processes, a dataflow, and a Synapse copy — each pointing at its own target dataset.

![Screenshot of a Microsoft Purview lineage canvas for the "SalesOrderHeader" Azure SQL table, showing six outgoing processes (CopyOrders, two Ingest Data activities, dataflow1, CopyToReportsStorage, CopyToSynapse) each connecting to a downstream dataset, with a "3+" bubble indicating additional hidden nodes, and the Lineage tab and columns panel both highlighted with Microsoft's own red boxes.](/courses/microsoft-purview/ch05/23-lineage-in-purview/view-columns-from-lineage.png)
*One table, six outbound processes, each a rectangle-to-round-edge-to-rectangle chain. The left panel lists every column on `SalesOrderHeader` — check one to trace just that field through the canvas.*

Two defaults matter here. First, the canvas only renders **five levels of lineage** around the asset in focus by default — any more is collapsed into a numbered bubble (that "3+" circle) you expand on demand, so a popular table's lineage doesn't render as an unreadable wall of boxes. Second, every column of the selected dataset is listed in the left panel — selecting one highlights that exact column's path through every process and target downstream, instead of just the whole table's path.

## A process node, expanded

Selecting a process (round-edged) node expands it and offers a **Switch to asset** button — because a process is itself a Purview asset with its own metadata, contacts, and overview, not just a connector line.

![Screenshot of the "CopyToBlob" copy activity process node, expanded in a Purview lineage canvas, highlighted with a red box drawn by Microsoft's own documentation.](/courses/microsoft-purview/ch05/23-lineage-in-purview/select-copy-activity.png)
*A process node, selected. "Switch to asset" takes you to the Copy activity's own asset page — the same kind of page any dataset has.*

## Navigating a busy canvas

For lineage graphs too large to read at a glance, the canvas has its own control stack: full screen, zoom to fit, zoom in/out, auto-align, a zoom preview, and a menu for centering the current asset or resetting to the default view.

![Screenshot of the Microsoft Purview lineage canvas's smart button stack — full screen, zoom to fit, zoom in/out, auto align, zoom preview, and more options — labeled a through f by Microsoft's own documentation.](/courses/microsoft-purview/ch05/23-lineage-in-purview/use-lineage-smart-buttons.png)
*Six controls for taming a large lineage graph, rather than scrolling and guessing.*

## When automation isn't enough: manual lineage

Not every source reports lineage automatically. For those, Purview supports **manual lineage** — curators can draw the connection themselves from an asset's Edit screen, no code required, including column-level mapping between two assets. It's deliberately limited (one asset at a time, data curator access needed on both ends) and unavailable for asset types that already support automated lineage, like ADF or Power BI datasets — manual lineage is a gap-filler, not a replacement.

## Key terms

| Term | Meaning |
|---|---|
| Dataset (node) | A rectangular box in the lineage canvas — a table, file, or similar data object |
| Process (edge) | A round-edged box — the activity or transformation that moves/transforms data |
| Column-level lineage | Tracing one specific column's path through processes and downstream datasets |
| Five-level default | The lineage canvas's default render depth; more collapses into an expandable bubble |
| Manual lineage | Curator-drawn lineage for sources that don't report it automatically |

## Lab

Pick any table you've worked with professionally (or imagine one). List three "process" steps — real or hypothetical — that could move data out of it (a copy activity, a dataflow, a stored procedure), and for each one name the downstream dataset it would point to. Then say which single column of your source table you'd most want to trace end-to-end, and why.

## Check yourself

Can you explain the difference between a dataset node and a process node, including their shapes? Can you name the three categories of systems that report lineage into Purview? Can you explain why manual lineage isn't available for Azure Data Factory or Power BI datasets?
