# Lesson 24 — Lineage From Azure Data Factory and Synapse

**Chapter 5 · Lineage and Insights · Lesson 24 of 35**

## What you'll learn

- How to connect an Azure Data Factory or Synapse workspace to Purview so lineage flows automatically
- Which three activity types actually report lineage, and what gets silently dropped
- The two lineage shapes you'll see most often: 1:1 copy, and n:1 data flow
- How to confirm a specific pipeline run actually reported its lineage
- The one capability gap between ADF and Synapse coverage

## Connecting the pipeline to the catalog

Nothing reports automatically until you connect the source. In Purview's management center, under **Lineage connections → Data Factory**, you link up to **10 Azure Data Factory accounts** at a time (more in batches), and each one needs its system-assigned managed identity granted the **Data Curator** role on Purview's root collection — that's what authenticates the lineage push. Synapse workspaces connect the same way, and multiple Synapse workspaces can feed a single Purview account too.

![Screenshot of the Data factory connection list in the Microsoft Purview management center, showing two connected Data Factory accounts — adc239testadcfactory and svtest2020 — each with a green "Connected" status.](/courses/microsoft-purview/ch05/24-lineage-from-azure-data-factory-and-synapse/data-factory-connection.png)
*Two Data Factory accounts, both Connected. "Disconnected" means the factory is linked to a different Purview account instead; "Unknown" means the current user just can't see its status.*

## Only three activity types report lineage

Once connected, Purview captures runtime lineage from exactly three Data Factory activity types: **Copy Data**, **Data Flow**, and **Execute SSIS Package**. Synapse pipelines report the same way, minus Execute SSIS Package — Synapse doesn't run SSIS packages, so that path doesn't apply there.

This coverage has real limits worth knowing before you rely on it. Purview supports only a subset of the 80-plus sources and sinks ADF itself supports — if a Copy or Data Flow activity's source or sink uses something unsupported, **Purview drops the lineage silently**, with no error anywhere. And for most Azure SQL, Synapse, Oracle, and Teradata sources, lineage only covers table and view-level objects — queries and stored procedures aren't captured as lineage sources.

## The 1:1 pattern — the one you'll see constantly

The simplest and most common shape: one source, one process, one sink.

![Screenshot of a Purview lineage diagram showing a one-to-one Data Factory Copy operation: a "Customer" SQL table flowing through an "Azure Data Factory copy operation" process labeled CopyCustomerInfo1, into a "Customer1.csv" output.](/courses/microsoft-purview/ch05/24-lineage-from-azure-data-factory-and-synapse/adf-copy-lineage.png)
*One table in, one Copy activity, one file out — the pattern behind most straightforward pipeline lineage.*

Wildcard-based copies (matching many files by a shared name pattern) render the same way, but Purview captures file-level lineage for every individual file the wildcard matched — not just one generic blob.

## The n:1 pattern — data flows that merge sources

Data Flow activities that merge, join, or otherwise combine multiple inputs show up as several sources converging on one process, into one sink:

![Screenshot of a Purview lineage diagram showing an n-to-one Data Factory Data Flow operation: "Customer.csv" and "Sales.parquet" both flowing into a "Data Flow" process, producing a single "companydata" output.](/courses/microsoft-purview/ch05/24-lineage-from-azure-data-factory-and-synapse/adf-data-flow-lineage.png)
*Two inputs, one Data Flow activity, one merged output — Purview captures file-level lineage for each input even though they land in a single downstream table.*

Data Flow lineage has its own caveat: Purview shows which sources and sinks were involved, but not the step-by-step transformation logic inside the data flow itself — joins, merges, derived columns stay inside ADF, invisible to the lineage graph.

## Confirming a specific run actually reported lineage

Lineage ingestion is asynchronous — a pipeline can succeed without you knowing, at a glance, whether its lineage made it to Purview. Synapse's pipeline monitoring view has a dedicated answer: a **Lineage status** icon next to each activity run.

![Screenshot of the Azure Synapse pipeline monitoring "Activity runs" list for a SQLServerDataIngestion pipeline, with a Lineage status icon highlighted next to a succeeded CopyData activity run.](/courses/microsoft-purview/ch05/24-lineage-from-azure-data-factory-and-synapse/monitor-lineage-reporting-status.png)
*Selecting that icon (or checking the activity's output JSON for `reportLineageToPurview`) confirms whether this specific run's lineage actually landed.*

## What it looks like once it lands

Here's an Azure Synapse Copy Activity's own lineage page — `IngestData`, moving `SumTotal` from a `CustomerOrders` SQL table into a `CustomerOrders.csv` file, with that one column selected and highlighted on both sides:

![Screenshot of the Lineage tab for the "IngestData" Azure Synapse Copy Activity asset in Microsoft Purview, showing CustomerOrders flowing through IngestData into CustomerOrders.csv, with the SumTotal column selected and highlighted on both the source and output columns panel.](/courses/microsoft-purview/ch05/24-lineage-from-azure-data-factory-and-synapse/browse-azure-synapse-pipeline-lineage.png)
*Same lineage mechanics as Lesson 23's generic canvas — because under the hood, this is the exact same Lineage tab every asset has.*

## Key terms

| Term | Meaning |
|---|---|
| Lineage connection | The link between an ADF or Synapse account and a Purview account that enables automatic lineage push |
| Managed identity | The ADF/Synapse identity granted Data Curator on Purview's root collection to authenticate lineage pushes |
| 1:1 lineage | One source, one process, one sink — the most common Copy activity pattern |
| n:1 lineage | Multiple sources converging through one Data Flow process into a single sink |
| Lineage status | The per-activity-run indicator confirming whether that run's lineage actually reached Purview |

## Lab

Sketch the lineage shape (1:1 or n:1) for a hypothetical pipeline that joins a `Customers` table and an `Orders` table into one `CustomerOrderSummary` table using an ADF Data Flow activity. Then list one Copy activity feature from this lesson that would cause Purview to silently drop lineage if you used it — and explain how you'd confirm, after the fact, whether a given run's lineage actually arrived.

## Check yourself

Can you name the three ADF activity types that report lineage, and the one Synapse doesn't support? Can you explain the difference between the 1:1 and n:1 lineage patterns? Can you explain why Purview "drops lineage silently" instead of erroring, and what that means for how much you should trust an empty lineage graph?
