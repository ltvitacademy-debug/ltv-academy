# Lesson 33 — Purview Case Study: Enterprise Rollout

**Chapter 7 · Purview in Practice · Lesson 33 of 35**

## What you'll learn

- A full walkthrough applying every chapter of this course to one realistic, fictional scenario
- How foundations, the Data Map, classification, the catalog, lineage, and governance workflows connect as one rollout, not six disconnected projects
- What a Purview rollout actually looks like in sequence, from a first collection to a running access policy

## The scenario (fictional, illustrative)

**Thistledown Retail Group** is a fictional mid-sized outdoor and home goods retailer with four regional distribution centers, each one having grown its own systems and habits over the years. Each region keeps its own spreadsheet defining "SKU" and "in-stock," each region's analysts pull from different copies of the same underlying inventory data, and nobody at the corporate level can say with confidence what data exists across the company, where it lives, or who's allowed to see it. This is a realistic composite of the kind of rollout this course prepares you for — not a real company's data or systems.

## Applying the course, chapter by chapter

**Chapter 1 (Purview Foundations):** The newly formed data governance team provisions a Purview account, chooses an environment sized for the company's four regions, and sets up collections mirroring the business — one collection per region under a shared root, with a data governance administrator and a data source admin assigned per collection so regional teams can manage their own sources without needing corporate sign-off for every scan.

**Chapter 2 (The Data Map):** Each region registers its own sources — Azure SQL Database for point-of-sale data, Azure Data Lake Storage for raw inventory feeds, and a shared Fabric workspace for the regions that have already modernized. A common scan rule set captures structural metadata consistently across all four, scans are scheduled to run nightly rather than once, and when one region's ADLS scan stalls, a data source admin walks through credential and network checks before finding the real cause: a storage firewall rule blocking Purview's managed identity.

**Chapter 3 (Classification and Labels):** Purview's built-in classifiers immediately flag a legacy payments table in one region still storing partial card numbers — a genuine finding the governance team routes to security the same day. A custom classification is built for the company's SKU format, and a Confidential sensitivity label is applied to anything touching customer loyalty-program data, consistently across all four regions instead of whatever each one happened to be doing before.

**Chapter 4 (Catalog and Glossary):** Rather than four competing definitions, the team publishes one glossary term for "SKU" and one for "In-Stock Quantity," each with a clear business definition and an accountable steward. Data products are curated around real use cases — "Regional Inventory Snapshot," "Point-of-Sale Transactions" — organized into business domains by region and by function, so an analyst in any region can search the catalog and find the same data everyone else sees.

**Chapter 5 (Lineage and Insights):** With sources scanned and cataloged, lineage now shows the real path: raw point-of-sale data moves through an Azure Data Factory pipeline into the warehouse, then into a Fabric semantic model, and finally into the regional inventory Power BI report executives actually look at. A Data Estate Insights report surfaces exactly which registered sources still have no owner assigned — a concrete, prioritized list instead of a vague sense that "governance isn't finished yet."

**Chapter 6 (Governance Workflows):** The inventory data lake gets an access policy, with Data use management enabled and a Data source admin publishing it. A self-service access workflow lets a new regional analyst request and receive read access to "Regional Inventory Snapshot" without a support ticket. A Data quality rule checks that every SKU value is unique and that in-stock quantities are never blank, catching a feed error within a day instead of a quarter. And a publish approval workflow means no glossary term or data product goes live without a second person reviewing it first — the same checks-and-balances pattern from Lesson 28, now actually running.

## The result

Six months in, an analyst in any of the four regions can search one catalog, find one glossary-defined "SKU," trace exactly which pipeline feeds their report, and request access to a new dataset without emailing anyone — because the underlying rollout touched every layer this course has covered, in the order it taught them: foundations first, then the data itself, then what it means, then where it's trustworthy to use.

## Key terms

| Term | Meaning |
|---|---|
| Rollout sequence | Foundations → Data Map → classification → catalog/glossary → lineage/insights → governance workflows, the order this course taught and this case study applied |
| Governance health finding | A concrete, prioritized gap (like an unowned source) surfaced by Data Estate Insights, rather than a vague sense of incompleteness |

## Lab

Pick one department or team you're familiar with (work, school, or a hobby project) that has at least two different systems holding related data. Sketch, in one sentence per chapter, how you'd apply this course's six chapters to that team the way Thistledown Retail Group's rollout did — you don't need Purview access to do this exercise, just the sequence of decisions.

## Check yourself

Can you walk through the Thistledown Retail Group rollout from memory, chapter by chapter, and explain why the chapters had to happen roughly in that order — why classification and cataloging couldn't meaningfully start before the Data Map was scanned?
