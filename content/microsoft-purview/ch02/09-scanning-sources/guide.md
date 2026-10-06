# Lesson 9 — Scanning Sources

**Chapter 2 · The Data Map · Lesson 9 of 35**

## What you'll learn

- What a scan actually does once a source is registered
- How to scope a scan to only the folders or tables you actually need
- The three scan levels — L1, L2, L3 — and what each one extracts
- How to watch a scan move from In progress to Completed

## From registered to scanned

Registering a source only gives Purview its address. **Scanning** is the step that actually connects to the source, captures technical metadata — names, file size, columns — extracts schema for structured data, and applies classifications. Before you scan, make sure you've registered the source, picked the right integration runtime for your network, and know which authentication method the source supports (the **Scan** section of every source's own documentation page lists this).

## Creating a scan

1. Open **Data Map → Data sources**, find your registered source, and select **New Scan**.
2. Enter a **Name** for the scan, and choose your **Credential** (Managed Identity is the recommended default — it eliminates storing and managing secrets yourself).
3. Choose the collection or subcollection the scan should store its discovered metadata in, then select **Test connection**. On success, select **Continue**.
4. Scope the scan to a subset of data if you don't need the whole source — folders and subfolders for a storage account, tables for a database:

   ![Screenshot showing the scope your scan window with files and folders selected for an Azure Blob Storage source.](/courses/microsoft-purview/ch02/09-scanning-sources/register-blob-scope-scan.png)
   *Every folder and subfolder has three selection states — fully selected, partially selected, not selected — and a toggle controls whether new assets under a partially selected parent get swept in automatically on future scans.*

5. Select a **scan rule set** — the system default, an existing custom set, or build one inline (the next lesson covers this in depth).
6. Choose your scan trigger — once, or a recurring schedule (covered in Lesson 11).
7. Review and select **Save and run**.

## Choosing a scan level

For supported sources (Azure SQL Database, Azure Blob Storage, ADLS Gen2, Snowflake, Azure Databricks Unity Catalog, and others), you can also control *how deep* the scan goes:

- **L1** — basic metadata only: file name, size, fully qualified name
- **L2** — adds schema extraction for structured file types and database tables, but no sampling or classification
- **L3** — full schema extraction plus data sampling and classification

![Screenshot that shows the drop-down list for selecting scan levels: Auto detect, Level-1, Level-2, Level-3.](/courses/microsoft-purview/ch02/09-scanning-sources/customize-scan-level-select-options.png)
*The default, **Auto detect**, resolves to the highest level the source supports — for Azure SQL Database, that's L3. Dropping to a lower level on a scheduled scan triggers one full scan on the next run, then resumes incremental.*

## Watching a scan run

Once you've saved and run a scan, check its progress from the source's **Overview** tab. **Last run status** updates live:

![Screenshot of a source detail page with a scan showing an In progress status.](/courses/microsoft-purview/ch02/09-scanning-sources/register-blob-scan-in-progress.png)
*In progress — the scanner is actively connecting, sampling, and classifying.*

![Screenshot of a source detail page with a scan showing a Completed status.](/courses/microsoft-purview/ch02/09-scanning-sources/register-blob-scan-completed.png)
*Completed — scanned and classified asset counts are now final for this run. Assets become searchable only after ingestion finishes processing the scan's output, which can take a few minutes longer.*

## Key terms

| Term | Meaning |
|---|---|
| Scan | The process that connects to a registered source, captures metadata, and classifies it |
| Scope | Limiting a scan to specific folders, subfolders, or tables instead of the whole source |
| Scan level (L1/L2/L3) | How deep a scan goes — metadata only, plus schema, or plus sampling and classification |
| Ingestion | The background process that loads a completed scan's output into the Data Map |

## Lab

Pick a source type you're familiar with (or the Azure Blob Storage example from this lesson). Write out, step by step, every decision you'd need to make to create its first scan — credential, scope, scan rule set, scan level if supported, and trigger — before you'd be ready to select Save and run.

## Check yourself

What's the difference between an L2 and an L3 scan, and why might you deliberately choose L2 over the higher level for some sources?
