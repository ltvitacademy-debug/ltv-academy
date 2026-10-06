# Lesson 10 — Scan Rule Sets

**Chapter 2 · The Data Map · Lesson 10 of 35**

## What you'll learn

- What a scan rule set actually controls during a scan
- How to build one: file types, then classification rules
- System scan rule sets versus the ones you create yourself
- Where to find and manage every system scan rule set Purview ships with

## What a scan rule set is

A **scan rule set** is a container that groups scan rules together — it's the thing that tells a scan exactly which file types to look at and which classifications to compare your data against. You associate a scan rule set with a scan, and you can reuse the same one across every scan of that source type, so your whole organization scans consistently.

## Building a scan rule set

1. In the Microsoft Purview portal, open **Data Map**, and under **Source management** select **Scan rule sets**, then **New**.
2. Pick a **Source Type** from the dropdown — the scanner supports a specific set of classifications and file types per source, so you'll build one scan rule set per type you intend to scan.
3. Give it a **Name** (max 63 characters, no spaces) and an optional **Description**, then select a **domain** — the scan rule set can only be used inside the domain where it was created.
4. Select **Continue** to reach **Select file types**:

   ![Screenshot showing the Select file types page, with CSV, JSON, PSV, SSV, TSV, TXT, XML, PARQUET, AVRO, ORC, and Document file types all enabled by default.](/courses/microsoft-purview/ch02/10-scan-rule-sets/select-file-types-page.png)
   *All file types are enabled by default. Deselecting one doesn't stop ingestion — the file is still ingested, just without schema and classification extraction.*

5. Select **Continue** again to reach **Select classification rules** — this is where you decide what Purview actually looks *for*:

   ![Screenshot showing the Select classification rules page, with System rules categories (Government, Financial, Personal, Security, Miscellaneous) all checked and a Custom rules section below.](/courses/microsoft-purview/ch02/10-scan-rule-sets/select-classification-rules.png)
   *By default every System rules category is selected. You can clear a whole category, or expand one to clear individual rules that produce too many false positives for your data.*

   ![Screenshot showing how to expand a category and select or clear individual system classification rules, such as Argentina National Identity (DNI) Number under Government.](/courses/microsoft-purview/ch02/10-scan-rule-sets/select-system-rules.png)
   *Expanding Government shows each individual rule — clear just the one causing noise instead of the whole category.*

6. Select **Create** to finish.

## System scan rule sets

You don't have to build everything from scratch. Microsoft automatically creates a **system scan rule set** for every data source type in your catalog, already loaded with every currently available system classification for that source:

![Screenshot showing the list of system scan rule sets under the System tab, including AzureDataExplorer, AzureStorage, AmazonS3, AzurePostgreSql, and many more, each with a Name, Source type, and Version.](/courses/microsoft-purview/ch02/10-scan-rule-sets/system-scan-rule-sets.jpg)
*Scan rule sets → System tab. Each row shows a Version — when Microsoft updates a system rule set's classifications, you can update your catalog's copy and apply it to every associated scan.*

Use a system scan rule set as-is when you want full coverage, or build a custom one when your data is limited to specific regions or categories — fewer classifications compared means faster scans. Custom rule sets are also how you make sure your own **custom classifications** (next lesson) actually get applied during a scan.

## Key terms

| Term | Meaning |
|---|---|
| Scan rule set | A named container of file types + classification rules, attached to a scan |
| System scan rule set | Microsoft-managed, auto-created per source type, covers every system classification |
| Custom scan rule set | One you build, scoped to a domain, often narrower for speed or to include custom classifications |

## Lab

Open the list of system scan rule sets for a source type you've worked with in this course (Azure Blob Storage, Azure SQL Database, or similar). Note its current Version number, then write down one reason you might build a custom scan rule set instead of using it as-is.

## Check yourself

What two things does every scan rule set actually define, and what happens to a file's schema and classification extraction if you deselect its file type on the Select file types page?
